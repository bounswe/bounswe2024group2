import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ForgotPassword from "./components/login/ForgotPassword.js";
import Dashboard from "./components/Dashboard.js";
import NewsPage from "./components/news/NewsPage.js";
import HomePage from "./components/home/HomePage.js";
import CommunityPage from "./components/community/CommunityPage.js";
import MarketsPage from "./components/markets/MarketsPage.js";
import PortfolioPage from "./components/portfolio/PortfolioPage.js";
import NotFound from "./components/notfound/NotFound.js";
import PostView from "./components/community/PostView.js";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/"
            element={<Dashboard /*user={{ name: "John Doe" }}*/ />}
          >
            <Route path="home" element={<HomePage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="markets" element={<MarketsPage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="portfolio" element={<PortfolioPage />} />

            <Route path="/post/:postId" element={<PostView />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;