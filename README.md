# Nabi.js

A modern react framework/boiletplate using Vite, Typescript, Tailwind, Wouter

<div style="display:flex; flex-direction:row;">
  <img src="/public/assets/react.png" alt="react" width="25px" height="25px"/>  
  <img src="/public/assets/typescript.png" alt="typescript" width="25px" height="25px"/>  
  <img src="/public/assets/vite.png" alt="vite" width="25px" height="25px"/>  
  <img src="/public/assets/tailwindcss.png" alt="tailwindcss" width="25px" height="25px"/>  
</div>

### Tecnologies used:

-   React: A front-end JavaScript library for building user interfaces based on UI components.
-   TypeScript: A strict syntactical superset of JavaScript and adds optional static typing to the language.
-   Vite: A rapid development tool for modern web projects.
-   Yarn: An alternative to the npm package manager.
-   Tailwind: A utility-first CSS framework.
-   Wouter: A tiny router for modern React.

### Roadmap:

-   [x] Common page Layout
-   [x] Navbar
-   [x] Footer
-   [x] Mobile navbar (Hamburger)
-   [x] Darkmode & Darkmode switch
-   [ ] Code splitting
-   [ ] Testing
-   [ ] CLI, code generator
-   [x] Server-side rendering
-   [x] Hybrid SSR - CSR
-   [ ] Static site generation
-   [x] File system based routes
-   [x] API
-   [ ] File system based routes for API
-   [ ] Npx create project
-   [ ] ORM and Database connection
-   [ ] Authentication
-   [ ] Server side for bots
-   [ ] Server side cache
-   [ ] 404 page

### Features:

#### Hybrid rendering

Why choose between Client Side Rendering, Server Side Rendering or Static Site Generation for your project. Select what fits the needs of each of your pages or components by the addition of a single line of code.

```typescript
const PageSSR = () => (
    <Render render="ssr">
        <div>This page is rendered on the server</div>
    </Render>
);

export default PageSSR;
```

```typescript
const PageCSR = () => (
    <Render render="csr">
        <div>This page is rendered on the client</div>
    </Render>
);
export default PageCSR;
```

_Static site generation coming soon_

#### File system based routes

Define website routes from the file system. Create React components under the `pages/` directory, and a route according to the filename will be generated automatically. For example, a component inside the file `pages/users.tsx` will be accessible at `/users`.

```typescript
const Users = () => {
    return (
        <div>
            <ul>
                <li>Jessie</li>
                <li>James</li>
            </ul>
        </div>
    );
};
export default Users;
```

Dynamic routes are also supported by surrounding the variable with square brackets. For example, a component inside the file `pages/users/[name].tsx` will be accessible at `/users/Jessie`.

```typescript
interface UsersProps {
    name: string;
}
const User = ({ name }: UsersProps) => {
    return <div>{`Hello, ${name}!`}</div>;
};
export default User;
```

#### API

Create and serve API routes with Node.js and Express inside your app under the `api/` directory.

#### Styling

Nabi.js comes packed with [tailwindcss](https://tailwindcss.com/), so you can start building faster.

#### Boilerplate

Nabi.js comes with the necessary boilerplate, so you can focus on building your product and not the same components again and again.
The boilerplate currently includes:

-   A responsive Navigation bar
-   A reusable Footer
-   Customizable Dark mode
