import {
    useState,
    useEffect,
    createContext,
    useContext,
    ReactNode,
    HTMLAttributes,
    useMemo,
} from "react";

window.matchMedia =
    window.matchMedia ||
    function a() {
        return {
            matches: false,
            addListener() {},
            removeListener() {},
        };
    };

const DarkModeContext = createContext({
    darkMode: false,
    setDarkMode: (_: boolean) => {},
});

export const DarkModeWrapper = ({ children }: { children: ReactNode }) => {
    const [darkMode, setDarkMode] = useState<boolean>(false);
    useEffect(() => {
        if (localStorage?.getItem("dark-mode") === "true") {
            setDarkMode(true);
        } else if (
            matchMedia("(prefers-color-scheme:dark)")?.matches === true
        ) {
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }
    }, []);
    useEffect(() => {
        if (darkMode === true) {
            document?.querySelector("html")?.classList.add("dark");
        } else {
            document?.querySelector("html")?.classList.remove("dark");
        }
    }, [darkMode]);

    const changeMode = (v: boolean) => {
        setDarkMode(v);
        localStorage?.setItem("dark-mode", `${v}`);
    };

    const DarkModeProviderValue = useMemo(
        () => ({ darkMode, setDarkMode: (v: boolean) => changeMode(v) }),
        [darkMode]
    );

    return (
        <DarkModeContext.Provider value={DarkModeProviderValue}>
            {children}
        </DarkModeContext.Provider>
    );
};

interface DarkModeSwitchProps extends HTMLAttributes<HTMLButtonElement> {
    onClickFallback: () => void;
}

export const DarkModeSwitch = ({
    onClickFallback = () => {},
    ...props
}: DarkModeSwitchProps) => {
    const { darkMode, setDarkMode } = useContext(DarkModeContext);
    return (
        <button
            type="button"
            data-testid="theme-button"
            className="text-slate-900 dark:text-white"
            aria-label={`switch to ${darkMode ? "light" : "dark"} mode`}
            onClick={() => {
                setDarkMode(!darkMode);
                onClickFallback();
            }}
            /* eslint-disable react/jsx-props-no-spreading */
            {...props}
            style={{
                cursor: "pointer",
                textShadow: `0px 0px 4px ${darkMode ? "white" : "black"}`,
            }}
        >
            {`${darkMode ? "☀️" : "🌕"}`}
        </button>
    );
};
