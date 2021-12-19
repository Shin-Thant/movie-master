import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import { DetailsPage } from "./pages/details/DetailsPage";
import { HomePage } from "./pages/home/HomePage";
import { SearchPage } from "./pages/search/SearchPage";
import { WatchList } from "./pages/watchList/WatchList";

function App() {
    return (
        <>
            <Router>
                {/* Place Navbar here */}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/:mediaType/:id/*" element={<DetailsPage />} />
                    <Route path="/watchList" element={<WatchList />} />
                </Routes>
                <Footer />
            </Router>
        </>
    );
}

export default App;
