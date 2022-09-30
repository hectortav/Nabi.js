import { ReactElement } from "react";

const Footer = (): ReactElement => {
    return (
        <footer className="w-full z-10">
            <div className="flex flex flex-auto flex-col sm:flex-row">
                <div className="sm:w-1/2">Logo</div>
                <div className="sm:w-1/4 my-10 sm:my-0">
                    <div className="grid gap-4 grid-cols-3">
                        <a href="/">Home</a>
                    </div>
                </div>
                <div className="sm:w-1/4">
                    <div className="text-2xl font-normal">Text</div>
                </div>
            </div>
            <div className="mt-10">© {new Date().getFullYear()}</div>
            <div className="flex flex-auto justify-center mt-10 flex-col sm:flex-row">
                <div>Built with</div>
                <div className="flex flex-row">
                    <a
                        className="flex align-center justify-center sm:ml-1"
                        href="https://reactjs.org/"
                    >
                        React{" "}
                        <img
                            src="/assets/react.png"
                            alt="react logo"
                            width={20}
                            height={20}
                            className="ml-1"
                        />
                    </a>
                    ,
                    <a
                        className="flex align-center justify-center ml-1"
                        href="https://www.typescriptlang.org/"
                    >
                        TypeScript{" "}
                        <img
                            src="/assets/typescript.png"
                            alt="typescript logo"
                            width={20}
                            height={20}
                            className="ml-1"
                        />
                    </a>
                    ,
                </div>
                <div className="flex flex-row">
                    <a
                        className="flex align-center justify-center sm:ml-1"
                        href="https://vitejs.dev/"
                    >
                        Vite{" "}
                        <img
                            src="/assets/vite.png"
                            alt="vite logo"
                            width={20}
                            height={20}
                            className="ml-1"
                        />
                    </a>
                    and
                    <a
                        className="flex align-center justify-center ml-1"
                        href="https://tailwindcss.com/"
                    >
                        Tailwindcss
                        <img
                            src="/assets/tailwindcss.png"
                            alt="tailwind logo"
                            width={20}
                            height={20}
                            className="ml-1"
                        />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
