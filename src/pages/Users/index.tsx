import { Render } from "../../utils";

const Users = () => {
    return (
        <Render render="ssr">
            <div>
                <h2 className="text-2xl font-bold my-4">
                    This is rendered on the{" "}
                    {import.meta.env.SSR ? "Server" : "Client"}
                </h2>
                Users page
            </div>
        </Render>
    );
};

export default Users;
