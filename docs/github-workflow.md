# Github workflow

## Cheatsheet

- Input as environment variable. [Link to Reference (July 2021)](https://github.community/t/can-workflow-dispatch-inputs-be-enhanced-to-set-input-environmental-variables/125130)

```yml
on:
  workflow_dispatch:
    inputs:
      input_name:
        description: Some input
        required: true

env:
  INPUT_INPUT_NAME: ${{ github.event.inputs.input_name }}

jobs:
  print_input:
    runs-on: ubuntu-latest
    steps:
      - run: echo test $INPUT_INPUT_NAME
```

- Setting environment variable with other environment variables [Link to Reference (July 2021)](https://brandur.org/fragments/github-actions-env-vars-in-env-vars)

```yml
jobs:
  build:
    steps:
      - name: Set environmental variables
        run: echo "PG_DATA_DIR=$HOME/data" >> $GITHUB_ENV

      - name: Can use environment variables
        run: echo "Working variable from variable $PG_DATA_DIR"
```

- Setting environment variable from bash output [Link to Reference (July 2021)](https://stackoverflow.com/questions/57968497/how-do-i-set-an-env-var-with-a-bash-expression-in-github-actions)

```yml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Set env
        run: echo "GITHUB_SHA_SHORT=$(echo $GITHUB_SHA | cut -c 1-6)" >> $GITHUB_ENV
      - name: Test
        run: echo $GITHUB_SHA_SHORT
```

## Limitations

- Using environment variable in container/image is not supported. [Link to Reference (July 2021)](https://github.community/t/how-to-use-env-with-container-image/17252)

- No support for YAML Anchors. [Link to Reference (July 2021)](https://github.com/actions/runner/issues/1182)

- No support for manual trigger on tags or releases. **workaround**: retrieve the tag from an input. [Link to Reference (July 2021)](https://github.community/t/select-tag-release-when-running-workflow-dispatch/132970)

## Issues

- Using lerna inside container gives a permission error when trying to build nextjs. User seems to be switch to 1001 in a lerna session. **workaround**: not to use container. or set user of container to 1001 to match lerna user **Needs further investigation.** (July 2021)

## Disclaimer

Actions below are used for Proof of Concept only. Proper investigations into them are required.

- TheDoctor0/zip-release@0.4.2
- andymckay/cancel-action@0.2
- marocchino/sticky-pull-request-comment@v2
- montudor/action-zip@v1
- svenstaro/upload-release-action@v2
- dsaltares/fetch-gh-release-asset@0.06

## References

- [Syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)

- [Expressions and context](https://docs.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions)

- [Triggers](https://docs.github.com/en/actions/reference/events-that-trigger-workflows)

- [Environment variable](https://docs.github.com/en/actions/reference/environment-variables)

- [Event types object](https://docs.github.com/en/developers/webhooks-and-events/events/github-event-types)

- [Publish using lerna](https://github.com/azu/lerna-monorepo-github-actions-release/blob/master/.github/workflows/publish.yml)
