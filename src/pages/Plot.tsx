import { usePlot } from "../context/PlotContext";
import { useState } from "react";

export default function Plot() {
  const { currentPlot, setCurrentPlot } = usePlot();
  const [tempPlot, setTempPlot] = useState(currentPlot);

  const handleSave = () => {
    setCurrentPlot(tempPlot);
    alert("プロットを保存しました！");
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">プロット</h1>
      <textarea
        className="w-full h-64 border rounded p-2 bg-white dark:bg-gray-700 text-black dark:text-white"
        value={tempPlot}
        onChange={(e) => setTempPlot(e.target.value)}
        placeholder="ここにプロットを入力してください..."
      />
      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        保存
      </button>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        現在のプロット: {currentPlot}
      </p>
    </div>
  );
}
