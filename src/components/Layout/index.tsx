import { ReactNode, ReactElement, Suspense } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Loading from "../Loading";
import { DarkModeWrapper } from "../DarkMode";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps): ReactElement => {
    return (
        <DarkModeWrapper>
            <div className="w-full min-h-screen bg-background mx-auto px-8 sm:px-20 dark:bg-dark-background dark:text-slate-50">
                <Navbar />
                <Suspense fallback={<Loading />}>
                    <div className="mt-5">{children}</div>
                </Suspense>
                <div className="h-[100px]" />
                <Footer />
                <div className="h-[100px]" />
            </div>
        </DarkModeWrapper>
    );
};

export default Layout;
