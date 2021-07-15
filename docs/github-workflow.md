# Github workflow

## Cheatsheet

- Input as environment variable. [[Link to Reference (July 2021)]](https://github.community/t/can-workflow-dispatch-inputs-be-enhanced-to-set-input-environmental-variables/125130)

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

## Limitations

- Using environment variable in container/image is not supported. [[Link to Reference (July 2021)]](https://github.community/t/how-to-use-env-with-container-image/17252)

- No support for YAML Anchors. [[Link to Reference (July 2021)]](https://github.com/actions/runner/issues/1182)

- No support for manual trigger on tags or releases. **workaround**: retrieve the tag from an input. [[Link to Reference (July 2021)]](https://github.community/t/select-tag-release-when-running-workflow-dispatch/132970)

## Issues

- Using lerna inside container gives a permission error when trying to build nextjs. User seems to be switch to 1001 in a lerna session. **workaround**: not to use container. or set user of container to 1001 to match lerna user **Needs further investigation.** (July 2021)

## References

- [Syntax](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)

- [Expressions and context](https://docs.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions)

- [Triggers](https://docs.github.com/en/actions/reference/events-that-trigger-workflows)

- [Environment variable](https://docs.github.com/en/actions/reference/environment-variables)
