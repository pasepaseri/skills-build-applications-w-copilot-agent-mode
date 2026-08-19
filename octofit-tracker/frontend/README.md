# OctoFit Tracker frontend

The React 19 presentation tier reads the backend Codespaces name from Vite's
environment variables. Create `octofit-tracker/frontend/.env.local` before
starting Vite and define the required value:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

The API base URL becomes
`https://your-codespace-name-8000.app.github.dev/api/[component]/`.
When `VITE_CODESPACE_NAME` is unset, the app safely uses
`http://localhost:8000/api/[component]/` for local development.

Run the frontend with `npm run --prefix octofit-tracker/frontend dev`.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
