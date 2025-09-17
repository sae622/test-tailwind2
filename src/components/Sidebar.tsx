import { Link } from "react-router-dom";
import { usePlot } from "../context/PlotContext";
import { useSettings } from "../context/SettingsContext";

export default function Sidebar() {
  const { currentPlot } = usePlot();
  const { theme } = useSettings();

  return (
    <div
      className={`w-48 p-4 h-screen ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-lg font-bold mb-4">メニュー</h2>
      <p className="text-sm mb-4">現在のプロット: {currentPlot}</p>
      <ul className="space-y-2">
        <li><Link to="/">ホーム</Link></li>
        <li><Link to="/body">本文</Link></li>
        <li><Link to="/plot">プロット</Link></li>
        <li><Link to="/output">出力</Link></li>
        <li><Link to="/history">履歴</Link></li>
        <li><Link to="/usage">使用状況</Link></li>
        <li><Link to="/gallery">ギャラリー</Link></li>
        <li><Link to="/genres">ジャンル</Link></li>
        <li><Link to="/settings">設定</Link></li>
      </ul>
    </div>
  );
}
