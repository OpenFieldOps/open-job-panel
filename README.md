# OpenInter Panel

## Getting Started

To get started with this panel frontend:

## Install with docker

```bash
git clone  https://github.com/OpenFieldOps/open-job-panel
cd open-job-panel
```

- Before running the docker command, fill your backend url in the `.env` file.

```bash
docker compose up --build
```

### Setup Requirements

- Bun: [bun website](https://bun.sh/)
- Make: [make website](https://www.gnu.org/software/make/)

### Setup ".env" file

- rename the `.env.example` file to `.env`
- fill in the required environment variables
- you can use the `.env.example` file as a reference

### fill backend path

- open tsconfig.app.json
- change the `compilerOptions.paths["@backend/*"]` to the path of the backend
  - for example, if the backend is in `../openinter-backend`, you would set it to `["../openinter-backend/src/*"]`
  - use default value as a reference if you are not sure
- change the `compilerOptions.types` to the path of the backend + types
  - for example, if the backend is in `../backend/src/index.d.ts`, you would set it to `../backend/src/index.d.ts`
  - use default value as a reference if you are not sure
- exclude the backend path from the tsconfig.app.json
  - add the backend path to the `exclude` array in tsconfig.app.json
  - for example, if the backend is in `../openinter-backend`, you would add `../openinter-backend` to the `exclude` array

### Install Dependencies

```bash
bun install
```

### Install chakra snippets

```bash
bunx @chakra-ui/cli snippet add
```

### Run the Development Server

```bash
bun run dev
```

### Run the Tests

```bash
bun run test
```

### Run the Linter

```bash
bun run lint
```
