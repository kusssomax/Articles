import MainLayout from "@/layouts/MainLayout/MainLayout";
import HomePage from "@/pages/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import ArticlePage from "@/pages/ArticlePage/ArticlePage";


export const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
            </Route>
                <Route path="/article/:id" element={<ArticlePage />} />
        </Routes>
    )
}