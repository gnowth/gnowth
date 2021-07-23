# Pipeline

```mermaid
  graph LR
    anyBranch ===> triggerDeployToDev

    featureBranch ===> onPush --> onPullRequest --> onPullRequestClose

    developBranch ===> scheduleOrTriggerRegressionTest

    releaseBranch ===> triggerBuildArtifact --> triggerMigrateBackward & triggerPromoteArtifact & triggerPublishToNpm

    triggerMigrateBackward -.-> triggerPromoteArtifact
```

## Any branch

### triggerDeployToDev

```mermaid
  flowchart LR
    BUILD([Create dev build])
    DEPLOY([Deploy to dev])
    E2ESMOKE([E2e smoke test])
    SETUP([Setup])

    subgraph PHASE1[Phase 1]
      direction LR

      SETUP -.-> BUILD -.-> DEPLOY -.-> E2ESMOKE
    end
```

## Feature / fix branch

### onPush

- Phase1 and Phase 2: on every branch
- Phase3 (optional): maybe on release/main

```mermaid
  flowchart LR
    BUILD([Build])
    E2EMOCK([E2e using mock])

    subgraph PHASE1[Phase 1]
      direction RL

      SETUP([Setup])
    end

    subgraph PHASE2[Phase 2]
      direction RL

      LINT([Lint])
      TEST([Test])
      TYPECHECK([Typecheck])
    end

    subgraph PHASE3[Phase 3 optional]
      direction LR

      BUILD -.-> E2EMOCK
    end

    PHASE1 --> PHASE2 --> PHASE3
```

### onPullRequest

```mermaid
  flowchart LR
    BUILD([Create dev build])
    DEPLOY([Deploy to preview])
    E2EMOCK([E2e using mock])
    E2ESMOKE([E2e smoke test])
    SETUP([Setup])

    subgraph PHASE1[Phase 1]
      direction LR

      SETUP -.-> BUILD -.-> E2EMOCK -.-> DEPLOY -.-> E2ESMOKE
    end
```

### onPullRequestClose

```mermaid
  flowchart LR
    CLEAN([Clean preview environment])
    SETUP([Setup])

    subgraph PHASE1[Phase 1]
      direction LR

      SETUP -.-> CLEAN
    end
```

## Develop branch

### scheduleOrTriggerRegressionTest

```mermaid
  flowchart LR
    BUILD([Create prod build])
    DEPLOY([Deploy to test])
    SETUP([Setup])

    subgraph PHASE1[Phase 1]
      direction LR

      SETUP -.-> BUILD -.-> DEPLOY
    end

    subgraph PHASE2[Phase 2]
      direction LR

      E2ECHROME([E2e regression with chrome])
      E2ECHROMEMOBILE([E2e regression with chrome mobile])
      E2EFIREFOX([E2e regression with firefox])
      E2EFIREFOXMOBILE([E2e regression with firefox mobile])
    end

    subgraph PHASE3[Phase 3]
      direction LR

      CLEAN([Clean test environment])
    end

    PHASE1 --> PHASE2 --> PHASE3
```

## Release branch

### triggerBuildArtifact

```mermaid
  flowchart LR
    ARTIFACTPACK([Zip artifact])
    ARTIFACTRELEASE([Upload artifact to release])
    BUILD([Create prod build])
    SETUP([Setup])
    VERSIONING([Generate changelog and tag version])

    subgraph PHASE1[Phase 1]
      direction LR

      VALIDATEBRANCH(Validate input branch)
      VALIDATEPRE(Validate input pre release)
    end

    subgraph PHASE2[Phase 2]
      direction LR

      SETUP -.-> VERSIONING -.-> BUILD -.-> ARTIFACTPACK -.-> ARTIFACTRELEASE
    end

    PHASE1 --> PHASE2
```

### triggerMigrateBackward

```mermaid
  flowchart LR
    ARTIFACTUNPACK([Unzip artifact])
    ARTIFACTDOWNLOAD([Download artifact from release])
    DATABASEBACKUP([Database backup])
    DATABASEMIGRATE([Migrate backward])
    SETUP([Setup])

    subgraph PHASE1[Phase 1]
      direction LR

      VALIDATEBRANCH(Validate input branch)
      VALIDATEENVIRONMENT(Validate input environment)
      VALIDATETAG(Validate input tag name)
    end

    subgraph PHASE2[Phase 2]
      direction LR

      SETUP -.-> ARTIFACTDOWNLOAD -.-> ARTIFACTUNPACK -.-> DATABASEBACKUP -.-> DATABASEMIGRATE
    end

    PHASE1 --> PHASE2
```

### triggerPromoteArtifact

```mermaid
  flowchart LR
    ARTIFACTUNPACK1([Unzip artifact])
    ARTIFACTDOWNLOAD1([Download artifact from release])
    ARTIFACTUNPACK2([Unzip artifact])
    ARTIFACTDOWNLOAD2([Download artifact from release])
    ARTIFACTUNPACK3([Unzip artifact])
    ARTIFACTDOWNLOAD3([Download artifact from release])
    DATABASEBACKUP([Database backup])
    DATABASEFIXTURE([Database add fixtures])
    DATABASEMIGRATE([Migrate schema & data])
    DEPLOY([Deploy to given environment])
    SETUP1([Setup ci tools])
    SETUP2([Setup ci tools])
    SETUP3([Setup ci tools])

    subgraph PHASE1[Phase 1]
      direction LR

      VALIDATEBRANCH(Validate input branch)
      VALIDATEENVIRONMENT(Validate input environment)
      VALIDATESKIPDEPLOY(Validate input skip deploy flag)
      VALIDATESKIPMIGRATE(Validate input skip migrate flag)
      VALIDATESKIPE2E(Validate input skip e2e flag)
      VALIDATETAG(Validate input tag name)
    end

    subgraph PHASE2[Phase 2]
      direction TB

      ARTIFACTDOWNLOAD1 -.-> ARTIFACTUNPACK1 -.-> SETUP1 -.-> DEPLOY
    end

    subgraph PHASE3[Phase 3]
      direction TB

      ARTIFACTDOWNLOAD2 -.-> ARTIFACTUNPACK2 -.-> SETUP2 -.-> DATABASEBACKUP -.-> DATABASEFIXTURE -.-> DATABASEMIGRATE
    end

    subgraph PHASE4[Phase 4]
      direction TB

      subgraph E2E
        direction LR

        E2ECHROME([E2e regression with chrome])
        E2ECHROMEMOBILE([E2e regression with chrome mobile])
        E2EFIREFOX([E2e regression with firefox])
        E2EFIREFOXMOBILE([E2e regression with firefox mobile])
      end

      ARTIFACTDOWNLOAD3 -.-> ARTIFACTUNPACK3 -.-> SETUP3 -.-> E2E
    end

    PHASE1 --> PHASE2 --> PHASE3 --> PHASE4
```

### triggerPublishToNpm

```mermaid
  flowchart LR
    ARTIFACTUNPACK([Unzip artifact])
    ARTIFACTDOWNLOAD([Download artifact from release])
    STAGE([Publish to mock server])
    PUBLISH([Publish to npm])
    SETUP([Setup ci tools])

    subgraph PHASE1[Phase 1]
      direction LR

      VALIDATEBRANCH(Validate input branch)
      VALIDATEDRY(Validate input dry run flag)
      VALIDATEENVIRONMENT(Validate input environment)
      VALIDATETAG(Validate input tag name)
    end

    subgraph PHASE2[Phase 2]
      direction LR

      ARTIFACTDOWNLOAD -.-> ARTIFACTUNPACK -.-> SETUP -.-> STAGE -.-> PUBLISH
    end

    PHASE1 --> PHASE2
```
