import { Route } from "wouter";
import { Home, User } from "./pages";
import { DarkModeWrapper, Layout } from "./components";

const App = () => {
    return (
        <DarkModeWrapper>
            <Layout>
                <Route path="/">{(params) => <Home {...params} />}</Route>
                <Route path="/users/:username">
                    {(params) => <User {...params} />}
                </Route>
            </Layout>
        </DarkModeWrapper>
    );
};

export default App;
