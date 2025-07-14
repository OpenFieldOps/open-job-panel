# Application Development

This documentation explains best practices for developing the application, including data management, caching, and global state handling.

## 1. Data Fetching

- Use `eden-treaty` as the client, located in `/src/app/queryClient.ts`.
- Do not include data fetching logic in components; use custom hooks instead.
- Handle errors and loading states appropriately.

## 2. Cache Management

- Use TanStack React Query for automatic caching.
- The first key for each React Query should use the `QueryCacheKey` enum found in `/src/app/queryClient.ts`.
- Do not use a centralized data store (such as Redux) for cache management.

## 3. Global State Management

- Use Jotai for global state management.
- Define global state in the `/src/features/${feature}/atoms.ts` file.
- Prefer wrapping global state in custom hooks for better encapsulation.

## 3.1 Backend Imports

- From the backend, no imports should be made except for type-only imports using `import type { ... }`.
- This ensures that only type definitions are shared between the backend and frontend, preventing unwanted coupling at the runtime code level.
- It also ensures that there are no backend dependencies to resolve, which could otherwise increase the frontend bundle size.

## 4. Folder Structure

- Organize features in the `/src/features/${feature}` directory.
- Each feature should have its own directory containing components, hooks, and atoms.

> Note: The placement of generic components, hooks, and atoms in the folder structure is still under consideration. For example, they could be organized in a dedicated `generic` folder within `features`.

## 5. Useful Resources

- [React Query Documentation](https://tanstack.com/query/latest)
- [Jotai Documentation](https://jotai.org/docs/introduction)
- [React Documentation](https://react.dev/)
- [React Hook Form](https://react-hook-form.com/get-started)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Eden Treaty (Elysia) Documentation](https://elysiajs.com/eden/treaty/overview.html)
