---
title: ASDF
category: tools
---

# asdf v0.12.0

## Setup

1. **Install asdf** by running the following:

```bash
  git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.12.0
```

2. **Add to your Shell** by adding the following to `~/.zshrc`.

```
  . $HOME/.asdf/asdf.sh
```

3. Restart your editor if you are using in-built terminal

4. add plugins required for tools needed, e.g. nodejs. refer to **plugins command**

```bash
  asdf plugin add nodejs
```

5. install the tools from `.tool-versions`

```bash
  asdf install
```

## Plugins command

- list all plugin:

```bash
  asdf plugin list all
```

- add plugin:

```bash
  asdf plugin add <name>
```

## Managing version

- install version based on .tool-versions:

```bash
  asdf install
```

- installing a version:

```bash
  asdf install <name> <version>
```

- list current version:

```bash
  asdf current
```

## Reference

- https://asdf-vm.com/#/core-manage-asdf
