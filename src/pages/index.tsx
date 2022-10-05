import { Link } from "wouter";
import { Render } from "../utils";

export const Home = () => {
    return (
        <Render render="ssr">
            <div>
                <div className="flex items-center mb-4">
                    <h1 className="text-3xl font-bold underline">Home</h1>
                    <div className="ml-auto">
                        <Link href="/users/JohnDoe">
                            <a className="link">View users</a>
                        </Link>
                    </div>
                </div>
                <article>
                    <h2 className="text-2xl font-bold my-4">
                        This is rendered on the{" "}
                        {import.meta.env.SSR ? "Server" : "Client"}
                    </h2>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maxime mollitia, molestiae quas vel sint commodi repudiandae
                    consequuntur voluptatum laborum numquam blanditiis harum
                    quisquam eius sed odit fugiat iusto fuga praesentium optio,
                    eaque rerum! Provident similique accusantium nemo autem.
                    Veritatis obcaecati tenetur iure eius earum ut molestias
                    architecto voluptate aliquam nihil, eveniet aliquid culpa
                    officia aut! Impedit sit sunt quaerat, odit, tenetur error,
                    harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                    quia. Quo neque error repudiandae fuga? Ipsa laudantium
                    molestias eos sapiente officiis modi at sunt excepturi
                    expedita sint?
                </article>
            </div>
        </Render>
    );
};

export default Home;
