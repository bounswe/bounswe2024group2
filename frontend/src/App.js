import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/login/Login.js";
import Register from "./components/login/Register.js";
import ForgotPassword from "./components/login/ForgotPassword.js";
import Dashboard from "./components/Dashboard.js";
import NewsPage from "./components/news/NewsPage.js";
import HomePage from "./components/home/HomePage.js";
import CommunityPage from "./components/community/CommunityPage.js";
import MarketsPage from "./components/markets/MarketsPage.js";
import StocksPage from "./components/markets/StocksPage.js";
import PortfolioPage from "./components/portfolio/PortfolioPage.js";
import ProfilePage from "./components/profile/ProfilePage.js";
import NotFound from "./components/notfound/NotFound.js";
import PostView from "./components/community/PostView.js";
import CreatePostPage from "./components/community/CreatePostPage.js";
import { ToastContainer } from "react-toastify";
import { AlertModalProvider } from "./components/alert/AlertModalContext.js";
import StockOverviewPage from "./components/markets/stocks/StockOverviewPage.js";

function App() {
  return (
    <Router>
      <AlertModalProvider>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/"
              element={<Dashboard /*user={{ name: "John Doe" }}*/ />}
            >
              {/* <Route path="home" element={<HomePage />} /> */}
              <Route path="community" element={<CommunityPage />} />
              <Route path="community/create-post" element={<CreatePostPage />} />
              <Route path="markets" element={<MarketsPage />} />
              <Route path="stocks/:indexId" element={<StockOverviewPage />} />
              <Route path="indices/:indexId" element={<StocksPage />} />
              
              <Route path="news" element={<NewsPage />} />
              <Route path="portfolio" element={<PortfolioPage />} />
              <Route path="profile/:userId" element={<ProfilePage />} />

              <Route path="/post/:postId" element={<PostView />} />
              <Route path="/" element={<Navigate to="/community" />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <ToastContainer />
        </div>
      </AlertModalProvider>
    </Router>
  );
}

export default App;