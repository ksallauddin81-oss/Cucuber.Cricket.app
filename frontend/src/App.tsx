import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import HomePage from "./pages/HomePage";
import MatchesPage from "./pages/MatchesPage";
import MatchDetailPage from "./pages/MatchDetailPage";
import NewsPage from "./pages/NewsPage";
import AlertsPage from "./pages/AlertsPage";
import ChatPage from "./pages/ChatPage";
import StatsPage from "./pages/StatsPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";

import SplashScreen from "./components/SplashScreen";
import BottomNav from "./components/BottomNav";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeSplash, setFadeSplash] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("cucuber_logged_in") === "true"
  );

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeSplash(true), 6200);
    const removeTimer = setTimeout(() => setShowSplash(false), 7000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  const handleLogin = () => {
    localStorage.setItem("cucuber_logged_in", "true");
    setIsLoggedIn(true);
  };

  return (
    <Router>
      {/* Toast Notifications */}
      <Toaster
        richColors
        position="top-center"
        closeButton
        duration={4000}
        theme="dark"
      />

      {/* Splash Screen */}
      {showSplash && (
        <div
          className={`fixed inset-0 z-[100] transition-opacity duration-1000 ${
            fadeSplash ? "opacity-0" : "opacity-100"
          }`}
        >
          <SplashScreen />
        </div>
      )}

      {/* Login Screen */}
      {!showSplash && !isLoggedIn && (
        <LoginPage onLogin={handleLogin} />
      )}

      {/* Main App */}
      {!showSplash && isLoggedIn && (
        <>
          <ThemeToggle />

          <div className="min-h-screen bg-white text-black dark:bg-[#070b16] dark:text-white transition-all duration-300 pb-[80px]">
            <Routes>
              {/* Main Pages */}
              <Route path="/" element={<HomePage />} />
              <Route path="/matches" element={<MatchesPage />} />

              {/* Match Details */}
              <Route path="/match-detail" element={<MatchDetailPage />} />
              <Route path="/matches/:id" element={<MatchDetailPage />} />

              {/* Other Pages */}
              <Route path="/news" element={<NewsPage />} />
              <Route path="/alerts" element={<AlertsPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </div>

          {/* Bottom Navigation */}
          <BottomNav />
        </>
      )}
    </Router>
  );
}

export default App;