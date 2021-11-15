import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App"
import Panel from "./components/Panel";
import PostForm from "./components/PostForm";

const AdminRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<App />} />
                <Route exact path="/panel" element={<Panel />} />
                <Route exact path="/create" element={<PostForm />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AdminRoutes;