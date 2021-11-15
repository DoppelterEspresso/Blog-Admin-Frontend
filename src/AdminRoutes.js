import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App"
import Panel from "./components/Panel";

const AdminRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<App />} />
                <Route exact path="/panel" element={<Panel />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AdminRoutes;