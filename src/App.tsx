import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Body from "./pages/Body";
import Plot from "./pages/Plot";
import Output from "./pages/Output";
import ExportPage from "./pages/Export";
import History from "./pages/History";
import Usage from "./pages/Usage";
import Gallery from "./pages/Gallery";
import Genres from "./pages/Genres";
import Settings from "./pages/Settings";
import { PlotProvider } from "./context/PlotContext";
import { SettingsProvider, useSettings } from "./context/SettingsContext"; // ✅
import { useEffect } from "react";


function AppContent() {
  const { theme } = useSettings(); // ✅ 現在のテーマを取得

  return (
    <div className={theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/body" element={<Body />} />
            <Route path="/plot" element={<Plot />} />
            <Route path="/output" element={<Output />} />
            <Route path="/export" element={<ExportPage />} />
            <Route path="/history" element={<History />} />
            <Route path="/usage" element={<Usage />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <PlotProvider>
      <SettingsProvider>
        <Router>
          <AppContent />
        </Router>
      </SettingsProvider>
    </PlotProvider>
  );
}
