import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SplashScreen from "./components/SplashScreen";
import BottomNav from "./components/BottomNav";

import HomePage from "./pages/HomePage";
import MatchesPage from "./pages/MatchesPage";
import NewsPage from "./pages/NewsPage";
import AlertsPage from "./pages/AlertsPage";
import ChatPage from "./pages/ChatPage";
import StatsPage from "./pages/StatsPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  const [loading, setLoading] = useState(true);

  // Splash screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500); // animation duration

    return () => clearTimeout(timer);
  }, []);

  // Show Splash Screen first
  if (loading) {
    return <SplashScreen />;
  }

  // Main App
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground pb-16">
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/matches" element={<MatchesPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>

        {/* Bottom Navigation */}
        <BottomNav />
      </div>
    </Router>
  );
};

export default App;