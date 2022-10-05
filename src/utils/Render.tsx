import { useEffect, useRef, useState, Ref } from "react";

const Render = ({
    children,
    render = "ssr",
}: {
    children: JSX.Element;
    render: "csr" | "ssr";
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [ssrender, setSsrender] = useState<boolean>(import.meta.env.SSR);
    const [hasMounted, setHasMounted] = useState<boolean>(false);
    useEffect(() => {
        const isEmpty = ref?.current?.innerHTML === "";
        if (isEmpty) {
            setSsrender(true);
        }
    }, [ref]);
    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (render === "csr") {
        if (!hasMounted) {
            return null;
        }
        if (import.meta.env.SSR) {
            return null;
        } else {
            return <div>{children}</div>;
        }
    } else {
        /* ssr */
        if (import.meta.env.SSR && ssrender) {
            return <div>{children}</div>;
        } else {
            return (
                <div
                    ref={ref as Ref<HTMLDivElement>}
                    suppressHydrationWarning
                    dangerouslySetInnerHTML={{ __html: "" }}
                />
            );
        }
    }
};

export default Render;
