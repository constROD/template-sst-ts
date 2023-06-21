# Template SST TypeScript

## Prerequisites

- Download extension **ESLint** and **Prettier - Code formatter** in your VSCode.
- Install **node** 16.13.2.
- Install **pnpm** ^7.x.x.

---

- **(Required for MacOSX):** Execute this command to grant Husky the necessary permissions to run the pre-commit hook.

```bash
chmod ug+x .husky/*
chmod ug+x .git/hooks/*
```

- **(Optional):** Do this if you are using **nvm**.

```bash
nvm use # For MacOSX and Linux
nvm use $(cat .nvmrc) # For Windows (Git Bash)
```

**Install Dependencies:**

```bash
pnpm i
```

**Build:**

```bash
pnpm build --stage=<stage>
```

**Development:**

```bash
pnpm dev --stage=<stage>
```

**Secrets:**

Note: Secrets are stored in AWS Secrets Manager (Parameter Store).

If you want to add secrets, you need to follow these steps:

1. Go to `stacks/secrets.ts` and add your secret key to `secrets` object.
2. Either run `pnpm secrets set <key> <value> --stage <stage>` or `pnpm secrets load <path_to_env> --stage <stage>` to add secrets to AWS Secrets Manager.
3. Run `pnpm build --stage <stage>` to build the project.

**Add secret**

```bash
pnpm secrets set <secret_key> <secret_value> --stage=<stage>
```

**List of secrets**

```bash
pnpm secrets list --stage=<stage>
```

**Delete secret**

```bash
pnpm secrets remove <secret_key> --stage=<stage>
```

**Load secrets from .env file**

```bash
pnpm secrets load <path_to_env> --stage=<stage>
```
