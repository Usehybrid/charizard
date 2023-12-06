# Charizard (Hybr1d UI)

[![npm version](https://badge.fury.io/js/hybr1d-ui.svg)](https://badge.fury.io/js/hybr1d-ui)

A collection of reusable React components for building beautiful user interfaces. This library is
built using Vite for fast development and Storybook for component documentation and showcase.

## Installation on external repos

To install the library, use pnpm i

```bash
pnpm i @hybr1d/charizard
```

To update the library

```bash
pnpm up @hybr1d/charizard -L
```

## Publishing to npm

Use the following commands, _follow semver for version upgrade_

```bash
pnpm version patch
```

before the PR, the github action will automatically publish it to npm

## Storybook

To start the local storybook playground

```bash
pnpm storybook
```

## How to add a new component

- use named export for the component
- export the prop types
- add named export in the index.ts file
