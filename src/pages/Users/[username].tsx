import { Render } from "../../utils";

interface UserProps {
    username: string;
}

const User = ({ username }: UserProps) => {
    return (
        <Render render="csr">
            <div>
                {" "}
                <h2 className="text-2xl font-bold my-4">
                    This is rendered on the{" "}
                    {import.meta.env.SSR ? "Server" : "Client"}
                </h2>
                Hello, {username}!
            </div>
        </Render>
    );
};

export default User;
