import { Route } from "wouter";
import "./index.css";
import { DarkModeWrapper, Layout } from "./components";
const pages = import.meta.glob("./pages/**/*.tsx", { eager: true });

const routes = Object.keys(pages).map((path) => {
    const name = path?.match(/\.\/pages\/(.*)\.tsx$/)?.[1];
    let uri = `/${name?.toLowerCase().replace(/\/?index$/, "")}`;
    uri = uri.replace(/\[/g, ":").replace(/]/g, "");
    return {
        name,
        path: uri,
        component: (pages?.[path] as any)?.default,
        // component: lazy(() => import(/* @vite-ignore */path)),
    };
});

const App = () => {
    return (
        <DarkModeWrapper>
            <Layout>
                {routes.map(({ path, component: RouteComp }) => {
                    return (
                        <Route key={path} path={path}>
                            {(params) => <RouteComp {...params} />}
                        </Route>
                    );
                })}
            </Layout>
        </DarkModeWrapper>
    );
};

export default App;
