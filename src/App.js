import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./pages/home/HomePage";

function App() {
    return (
        <>
            <Router>
                {/* Place Navbar here */}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
