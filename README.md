# Template SST TypeScript

## Prerequisites

- Download extension **ESLint** and **Prettier - Code formatter** in your VSCode.
- Install **node** >= 16.13.0
- Install **pnpm** >= 7.17.0

- **(Required for MacOSX):** Run this to give permission husky to run pre-commit hook.

```bash
chmod ug+x .husky/*
chmod ug+x .git/hooks/*
```

- **(Optional):** Do this if you are using **nvm**.

```bash
nvm use # For MacOSX and Linux
nvm use $(cat .nvmrc) # For windows (Git Bash)
```

## Without Docker

- Install dependencies.

```bash
pnpm i
```

**Build:**

```bash
pnpm build:<stage> # dev | staging | prod
pnpm build --stage <your-custom-stage> # your-custom-stage
```

**Development Mode:**

```bash
pnpm dev --stage <your-custom-stage> # your-custom-stage
```

**Remove:**

```bash
pnpm remove:<stage> # dev | staging | prod
pnpm run remove --stage <your-custom-stage> # your-custom-stage
```

**Deploy:**

```bash
pnpm deploy:<stage> # dev | staging | prod
pnpm deploy --stage <your-custom-stage> # your-custom-stage
```
