import { Link } from "wouter";

const Home = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold underline">Home</h1>
            <Link href="/users/JohnDoe">
                <a className="link">Profile</a>
            </Link>
            <article>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                mollitia, molestiae quas vel sint commodi repudiandae
                consequuntur voluptatum laborum numquam blanditiis harum
                quisquam eius sed odit fugiat iusto fuga praesentium optio,
                eaque rerum! Provident similique accusantium nemo autem.
                Veritatis obcaecati tenetur iure eius earum ut molestias
                architecto voluptate aliquam nihil, eveniet aliquid culpa
                officia aut! Impedit sit sunt quaerat, odit, tenetur error,
                harum nesciunt ipsum debitis quas aliquid. Reprehenderit, quia.
                Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
                sapiente officiis modi at sunt excepturi expedita sint?
            </article>
        </div>
    );
};

export default Home;
