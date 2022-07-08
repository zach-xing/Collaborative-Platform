# 团队协作与管理平台

This is an official Yarn v1 starter turborepo.

## 启动

```shell
yarn dev # 启动项目
```



## 代码组织

This turborepo uses [Yarn](https://classic.yarnpkg.com/lang/en/) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `client`: a [Next.js](https://nextjs.org) app（port: 3000）
- `server`: a [NestJS](https://nestjs.com/) project（port: 8888）
- `types`: Define the type of data
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

