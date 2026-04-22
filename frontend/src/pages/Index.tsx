import { Routes, Route } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import HomePage from "./HomePage";
import MatchesPage from "./MatchesPage";
import NewsPage from "./NewsPage";
import AlertsPage from "./AlertsPage";
import ChatPage from "./ChatPage";
import StatsPage from "./StatsPage";
import ProfilePage from "./ProfilePage";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => (
  <div className="min-h-screen app-theme-bg text-slate-900 dark:text-white transition-all duration-500">
    <ThemeToggle />

    <main className="max-w-md mx-auto px-4 pt-20 pb-40">
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="matches" element={<MatchesPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="alerts" element={<AlertsPage />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="stats" element={<StatsPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Routes>
    </main>

    <BottomNav />
  </div>
);

export default Index;