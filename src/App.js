import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { DetailsPage } from "./pages/details/DetailsPage";
import { HomePage } from "./pages/home/HomePage";

function App() {
    return (
        <>
            <Router>
                {/* Place Navbar here */}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/details/:id" element={<DetailsPage />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
