import { Routes, Route } from "react-router-dom";


export const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/article" element={<div>Article</div>} />
        </Routes>
    )
}