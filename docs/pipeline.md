# Environment

**Development**

- localhost: to develop on. Test in isolation with mock.
- preview(temporary): reviewer to test on
- test(temporary): automated testing of production build

**Artifact testing**

- dev: developer test against technical specification
- sit: architect test against technical design
- sys: business analyst against solution requirement
- uat: user/stakeholders test against business scenarios
- prod: `[requires approval]`

* other: security and load testing

[Reference](https://www.linkedin.com/pulse/unit-sit-system-uat-pvt-one-same-mae-gajo)

# Pipeline

```mermaid
  graph LR
    anyBranch ===> triggerDeployToDev

    featureBranch ===> onPush --> onPullRequest --> onPullRequestClose

    developBranch ===> scheduleOrTriggerRegressionTest

    developBranch1[developBranch] ===> scheduleOrTriggerSecurityCheck

    releaseBranch ===> triggerBuildArtifact --> triggerPublishToNpm & triggerPromoteArtifact & triggerRollbackArtifact
```

## Any branch

### triggerDeployToDev

- Only when you need to work on a real environment.
- Create a development build
- Bypass any test. Just a smoke test after deployed
- all in 1 phase, to speed up deployment

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
- E2e to only run on release/main

```mermaid
  flowchart LR
    BUILD([Build])
    E2EMOCK([E2e using mock])

    subgraph PHASE1[Phase 1]
      direction RL

      SETUP([Setup])
      QUALITY([Quality check for release/main])
      SECURITY([Security check for release/main])
    end

    subgraph PHASE2[Phase 2]
      direction LR

      BUILD
      LINT([Lint])
      TEST([Test])
      TYPECHECK([Typecheck])
    end

    PHASE1 --> PHASE2
    BUILD -.-> E2EMOCK
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
      E2EEDGE([E2e regression with edge])
      E2EEDGEMOBILE([E2e regression with edge mobile])
      E2EFIREFOX([E2e regression with firefox])
      E2EFIREFOXMOBILE([E2e regression with firefox mobile])
    end

    subgraph PHASE3[Phase 3]
      direction LR

      CLEAN([Clean test environment])
    end

    PHASE1 --> PHASE2 --> PHASE3
```

### scheduleOrTriggerSecurityCheck

- the github ones does not seems to require any setup

```mermaid
  flowchart LR
    subgraph PHASE1[Phase 1]
      direction LR

      QUALITY([Quality check])
      SECURITY([Security check])
    end
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
      VALIDATEPRE(Validate flag pre release)
    end

    subgraph PHASE2[Phase 2]
      direction LR

      SETUP -.-> VERSIONING -.-> BUILD -.-> ARTIFACTPACK -.-> ARTIFACTRELEASE
    end

    PHASE1 --> PHASE2
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
      VALIDATETAG(Validate input tag name)
      VALIDATEDRY(Validate flag dry run)
    end

    subgraph PHASE2[Phase 2]
      direction LR

      ARTIFACTDOWNLOAD -.-> ARTIFACTUNPACK -.-> SETUP -.-> STAGE -.-> PUBLISH
    end

    PHASE1 --> PHASE2
```

### triggerPromoteArtifact

- limitation: cannot select/filter a release tag from the UI. So we have to select a base branch and select a release tag
- limitation: UI does not support dropdown input for enum. Validation is needed on input
- validation on input branch is needed as the branch affect the pipeline

```mermaid
  flowchart LR
    ARTIFACTUNPACK2([Unzip artifact])
    ARTIFACTUNPACK3([Unzip artifact])
    ARTIFACTDOWNLOAD2([Download artifact from release])
    ARTIFACTDOWNLOAD3([Download artifact from release])
    CLEANUP([Clean up temporary infrastructure])
    DATABASEBACKUP([Database backup])
    DATABASEFIXTURE([Database add fixtures])
    DATABASEMIGRATE([Migrate schema & data])
    DEPLOY([Deploy to given environment])
    PROVISION([Provision given environment])
    SETUP2([Setup ci tools])
    SETUP3([Setup ci tools])

    subgraph PHASE1[Phase 1]
      direction LR

      VALIDATEBRANCH(Validate input branch)
      VALIDATETAG(Validate input tag name)
      VALIDATEENVIRONMENT(Validate input environment)
      VALIDATESKIPPHASE1(Validate flag skip phase deploy)
      VALIDATESKIPPROVISION(Validate flag skip provision)
      VALIDATESKIPDEPLOY(Validate flag skip deploy)
      VALIDATESKIPMIGRATE(Validate flag skip migrate)
      VALIDATESKIPE2E(Validate flag skip e2e)
    end

    subgraph PHASE2[Phase 2]
      direction TB

      ARTIFACTDOWNLOAD2 -.-> ARTIFACTUNPACK2 -.-> SETUP2 -.-> DATABASEBACKUP -.-> PROVISION -.-> DEPLOY -.-> DATABASEFIXTURE -.-> DATABASEMIGRATE -.-> CLEANUP
    end

    subgraph PHASE3[Phase 3]
      direction TB

      subgraph E2E
        direction LR

        E2ECHROME([E2e regression with chrome])
        E2ECHROMEMOBILE([E2e regression with chrome mobile])
        E2EEDGE([E2e regression with edge])
        E2EEDGEMOBILE([E2e regression with edge mobile])
        E2EFIREFOX([E2e regression with firefox])
        E2EFIREFOXMOBILE([E2e regression with firefox mobile])
      end

      ARTIFACTDOWNLOAD3 -.-> ARTIFACTUNPACK3 -.-> SETUP3 -.-> E2E
    end

    PHASE1 --> PHASE2 --> PHASE3
```

### triggerRollbackArtifact

- needs more investigation
- e2e test are stored in the artifact, so that only relevant test are run when rolling back
- selected branch must be at least last release branch to have the backward migration code

```mermaid
  flowchart LR
    ARTIFACTUNPACK2([Unzip artifact])
    ARTIFACTUNPACK3([Unzip artifact])
    ARTIFACTDOWNLOAD2([Download artifact from release])
    ARTIFACTDOWNLOAD3([Download artifact from release])
    CLEANUP([Clean up temporary infrastructure])
    DATABASEBACKUP([Database backup])
    DATABASEMIGRATE([Migrate backward schema & data])
    DEPLOY([Deploy to given environment])
    PROVISION([Provision given environment])
    SETUP2([Setup ci tools])
    SETUP3([Setup ci tools])

    subgraph PHASE1[Phase 1]
      direction LR

      VALIDATEBRANCH(Validate input branch)
      VALIDATETAG(Validate input tag name)
      VALIDATEENVIRONMENT(Validate input environment)
      VALIDATESKIPPHASE1(Validate flag skip phase1)
      VALIDATESKIPPROVISION(Validate flag skip provision)
      VALIDATESKIPDEPLOY(Validate flag skip deploy)
      VALIDATESKIPMIGRATE(Validate flag skip migrate)
      VALIDATESKIPE2E(Validate flag skip e2e)
    end

    subgraph PHASE2[Phase 2]
      direction TB

      ARTIFACTDOWNLOAD2 -.-> ARTIFACTUNPACK2 -.-> SETUP2 -.-> DATABASEBACKUP -.-> PROVISION -.-> DEPLOY -.-> DATABASEMIGRATE -.-> CLEANUP
    end

    subgraph PHASE3[Phase 3]
      direction TB

      subgraph E2E
        direction LR

        E2ECHROME([E2e regression with chrome])
        E2ECHROMEMOBILE([E2e regression with chrome mobile])
        E2EEDGE([E2e regression with edge])
        E2EEDGEMOBILE([E2e regression with edge mobile])
        E2EFIREFOX([E2e regression with firefox])
        E2EFIREFOXMOBILE([E2e regression with firefox mobile])
      end

      ARTIFACTDOWNLOAD3 -.-> ARTIFACTUNPACK3 -.-> SETUP3 -.-> E2E
    end

    PHASE1 --> PHASE2 --> PHASE3
```

# Automatic versioning with conventional commits

- Create changelogs
  - chore are ignore in the changelog. Aim for changes code that does not trigger a production code change
  - docs, feat, fix, etc... are added to changelog
  - Ideal when BA decides on the wording, so that the changelog can be targeted at the end user
  - Squash commit recommended
    - to ensure changelog does not capture any WIP commit by accident.
    - also makes cherry picking easier
    - and git bisect as well to prevent false positive
- Semantic release or lerna version for monorepo
  - fix: will do a patch verion bump
  - feat: will do a minor version bump
  - breaking: will do a major version bump
- Changelog can be uploaded to the release tag as well

# Release process

- Create a release branch
- Create an pre release artifact and promote up to uat. Appends alpha/beta to the release
- Then graduate the release and promote from dev to prod. Removes any preId in the version name
- Once an artifact has been created, fixes/hotfixes can be continually applied to the release branch without affecting the artifact
- Displaying the version number in the UI helps identify issue when different environment has different version
- this setup supports maintaining multiple version releases

# Caching

- Yarn/npm/cypress uses cache very effectivly. They do install in seconds if they have all the cache
- Take advantage on this, so that our pipeline cache the `cache`. So npm/yarn only have to download additional package required
- requires: fallback cache key to be effective
- If `node_modules` were cached, on every new package, all the dependencies needs to be redownloaded

```yml
# Github workflow
- name: Cache npm cache on linux
  uses: actions/cache@v2
  with:
    path: ~/.npm
    key: ${{ runner.os }}-setup-${{ hashFiles('**/package-lock.json') }}
    restore-keys: ${{ runner.os }}-setup-

- name: Cache cypress cache on linux
  uses: actions/cache@v2
  with:
    path: ~/.cache
    key: ${{ runner.os }}-cypress-${{ hashFiles('**/package-lock.json') }}
    restore-keys: ${{ runner.os }}-cypress-
```

# Security / Quality check

- 42Crunch API
- CodeScan
- CxSAST
- Codacy Security Scan
- DefenseCode ThunderScan
- DevSkim
- Fortify on Demand Scan
- Kubesec
- Mayhem for API
- njsscan
- OSSAR
- Prisma Cloud IaC Scan
- Scan
- Semgrep
- Snyk Infrastructure as Code
- Synopsys Intelligent Security Scan Action
- Veracode Static Analysis
- Xanitizer

# Renovate

- automatic PR with dependency upgrade.
- PR provides change log
- When used together with Testing/Linting/Typechecking/Previewing. Repo can be updated easily

# Improvement

- Performance test in pipeline
- Visual regression test in with cypress
- Accessibility test with cypress
- Lighthouse test in pipeline
- Playground in preview: to allow reviewing to try different scenarios for components
- Canary releases
- Add Maintenance mode in pipeline
- Deployment strategies in pipeline
  - **Recreate**: Version A is terminated then version B is rolled out.
  - **Ramped** (also known as rolling-update or incremental): Version B is slowly rolled out and replacing version A.
  - **Blue/Green**: Version B is released alongside version A, then the traffic is switched to version B.
  - **Canary**: Version B is released to a subset of users, then proceed to a full rollout.
  - **A/B testing**: Version B is released to a subset of users under specific condition.
  - **Shadow**: Version B receives real-world traffic alongside version A and doesn’t impact the response.
- automating branch creation from ticket, and moving the ticket across the board as it goes to different environment. commit message needs to end with one of these below to track:
  - fix #xxx
  - fixes #xxx
  - fixed #xxx
  - close #xxx
  - closes #xxx
  - closed #xxx
  - resolve #xxx
  - resolves #xxx
  - resolved #xxx
