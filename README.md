# OpenInter Panel

## Getting Started

To get started with this panel frontend:

### Setup Requirements

- Bun: [bun website](https://bun.sh/)
- Make: [make website](https://www.gnu.org/software/make/)

### Setup ".env" file

- rename the `.env.example` file to `.env`
- fill in the required environment variables
- you can use the `.env.example` file as a reference

### fill backend path

- open tsconfig.app.json
- change the `compilerOptions.paths["@backend/*"]` to the path of your backend
  - for example, if your backend is in `../openinter-backend`, you would set it to `["../openinter-backend/src/*"]`
  - use default value as a reference if you are not sure

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
