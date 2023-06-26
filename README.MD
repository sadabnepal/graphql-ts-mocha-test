# GraphQL API Automation Test framework

![header](./samples//GraphQL_banner.png)

## Requirements:

[![NodeJs](https://img.shields.io/badge/-NodeJS-%23339933?logo=npm)](https://nodejs.org/en/download/)
[![VSCode](https://img.shields.io/badge/-Visual%20Studio%20Code-%233178C6?logo=visual-studio-code)](https://code.visualstudio.com/download)

## Getting Started:

Clone Repository

```bash
1. git clone https://github.com/sadabnepal/GraphQLTesting.git
2. Navigate to GraphQLTesting
```

Install the dependencies

```bash
npm install
```

API Sources

```ini
https://demo.vendure.io/shop-api [GraphQl]
https://demo.vendure.io/ [web app]
```

Run tests and Generate Report

```bash
npm test  [run all tests]
```

## Key Features:

    - Mocha framework
    - Supertest library
    - Mochawesome Report
    - GraphQL API Testing
    - Mocha framework to organize tests
    - Multi environment support using dotenv

## Folder structure:

```ini
├───.vscode
|    └───settings.json
├───samples
├───test
|    ├───env
|    ├───helper
|    ├───helper
|    ├───queries
|    └───specs
├───.gitignore
├───package-lock.json
├───package.json
├───README.md
├───report.png
└───tsconfig.json
```

## Sample Report:

![image](./samples/report.png)
