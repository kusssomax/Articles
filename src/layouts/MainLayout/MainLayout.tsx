import Header from "@/layouts/Header/Header.tsx";
import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.scss";


const MainLayout = () => {
    return (
        <>
            <Header/>
            <main className={styles.main}>
                <Outlet />
            </main>
        </>
    );
};

export default MainLayout;