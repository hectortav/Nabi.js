const render = (
    children: Element | ((args: any) => JSX.Element),
    render: "csr" | "ssr" = "csr"
): Element | ((args: any) => JSX.Element) => {
    if (render === "csr" && import.meta.env.SSR) {
        return () => <div></div>;
    }
    return children;
};

export default render;
