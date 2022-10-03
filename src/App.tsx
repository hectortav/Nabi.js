import { Route } from "wouter";
import "./index.css";
import { Layout } from "./components";

const pages = import.meta.glob("./pages/**/*.tsx", { eager: true });

const routes = Object.keys(pages).map((path) => {
    const name = path?.match(/\.\/pages\/(.*)\.tsx$/)?.[1];
    let component;
    let uri = `/${name?.toLowerCase().replace(/\/?index$/, "")}`;
    if (name?.endsWith(".static")) {
        uri = uri.replace(/\.static$/, "");
    }
    uri = uri.replace(/\[/g, ":").replace(/]/g, "");
    component = (pages?.[path] as any)?.default;
    // if path ends with ".static"
    // check if index html has been generated and use it
    // else ssr

    return {
        name,
        path: uri,
        component,
        // component: lazy(() => import(/* @vite-ignore */path)),
    };
});

const App = () => {
    return (
        <>
            {routes.map(({ path, component: RouteComp }) => {
                return (
                    <Route key={path} path={path}>
                        {(params) => (
                            <Layout>
                                <RouteComp {...params} />
                            </Layout>
                        )}
                    </Route>
                );
            })}
        </>
    );
};

export default App;
