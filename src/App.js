import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import { CastProfile } from "./pages/castProfile/CastProfile";
import ContactPage from "./pages/contact/ContactPage";
import { DetailsPage } from "./pages/details/DetailsPage";
import { HomePage } from "./pages/home/HomePage";
import { PeoplePage } from "./pages/people/PeoplePage";
import { SearchPage } from "./pages/search/SearchPage";
import { WatchList } from "./pages/watchList/WatchList";
function App() {
    return (
        <>
            <Router>
                <Navbar />
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/:mediaType/:id/*" element={<DetailsPage />} />
                    <Route path="/watchList" element={<WatchList />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/people" element={<PeoplePage />} />
                    <Route path="/people/:id" element={<CastProfile />} />
                </Routes>
                <Footer />
            </Router>
        </>
    );
}

export default App;
