---
title: Git
category: tools
---

# Git

## Cheatsheet

- delete a branch locally

```bash
  git branch -d <branchName>
  git branch --delete <branchName>
```

- force delete a branch locally

```bash
  git branch -D <branchName>
  git branch --delete --force <branchName>
```

- delete a tag locally

```bash
  git tag -d <tagName>
  git tag --delete <tagName>
```

- delete branch remotely

```bash
  git push -d origin <branchName>
  git push --delete origin <branchName>
```

- delete a tag remotely

```bash
  git push -d origin <tagName>
  git push --delete origin <tagName>
```
