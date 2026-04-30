import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MatchesPage from "./pages/MatchesPage";
import MatchDetailPage from "./pages/MatchDetailPage";
import NewsPage from "./pages/NewsPage";
import AlertsPage from "./pages/AlertsPage";
import ChatPage from "./pages/ChatPage";
import StatsPage from "./pages/StatsPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";

import BottomNav from "./components/BottomNav";
import SplashScreen from "./components/SplashScreen";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const savedTheme =
      (localStorage.getItem("theme") as "dark" | "light") || "dark";

    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(savedTheme);

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5200);

    const syncAuth = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    window.addEventListener("authChanged", syncAuth);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("authChanged", syncAuth);
    };
  }, []);

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    window.dispatchEvent(new Event("authChanged"));
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <div className="app-shell min-h-screen pb-20">
        {isLoggedIn && <ThemeToggle />}

        <Routes>
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />

          <Route
            path="/"
            element={isLoggedIn ? <HomePage /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/matches"
            element={isLoggedIn ? <MatchesPage /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/match/:id"
            element={
              isLoggedIn ? <MatchDetailPage /> : <Navigate to="/login" replace />
            }
          />

          <Route
            path="/news"
            element={isLoggedIn ? <NewsPage /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/alerts"
            element={isLoggedIn ? <AlertsPage /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/chat"
            element={isLoggedIn ? <ChatPage /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/stats"
            element={isLoggedIn ? <StatsPage /> : <Navigate to="/login" replace />}
          />

          <Route
            path="/profile"
            element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" replace />}
          />
        </Routes>

        {isLoggedIn && <BottomNav />}
      </div>
    </Router>
  );
}