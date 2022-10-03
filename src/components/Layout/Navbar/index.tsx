import { useState, useEffect, ReactElement, lazy } from "react";

import Hamburger from "./Hamburger";
import { DarkModeSwitch } from "../../DarkMode";

const routes = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
];

const Navbar = (): ReactElement => {
    const [navVisible, setNavVisible] = useState<boolean>(false);
    useEffect(() => {
        if (navVisible === true) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [navVisible]);

    return (
        <nav className="border-b border-slate-400">
            <div className="w-full h-20 z-10 flex items-center">
                <div className="ml-auto flex flex-row-reverse sm:flex-row items-center justify-center">
                    <Hamburger {...{ navVisible, setNavVisible }}>
                        <ul className="bg-background md:bg-transparent flex flex-auto md:flex-row absolute md:relative inset-0 w-full flex-col items-center justify-center overflow-y-hidden text-xl md:text-lg transition duration-150 ease-out dark:bg-dark-background">
                            {routes.map(({ name, href }) => {
                                return (
                                    <li
                                        className="cursor-pointer px-2"
                                        key={name}
                                    >
                                        <a
                                            href={href}
                                            onClick={() => setNavVisible(false)}
                                        >
                                            {name}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </Hamburger>
                    <div className="sm:ml-4">
                        <DarkModeSwitch
                            onClickFallback={() => setNavVisible(false)}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
