import { useState } from "react";
import { usePlot } from "../context/PlotContext";

export default function Body() {
  const { currentText, setCurrentText } = usePlot();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentText(e.target.value);
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: "ライトノベル風の短い文章を書いてください" }),
      });
      const data = await response.json();
      setCurrentText((prev) => prev + "\n" + data.text);
    } catch {
      alert("生成に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded">
      <h1 className="text-2xl font-bold mb-4">本文</h1>
      <textarea
        className="w-full h-64 border rounded p-2 bg-white dark:bg-gray-700 text-black dark:text-white"
        value={currentText}
        onChange={handleChange}
        placeholder="ここに本文を入力してください..."
      />
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        文字数: {(currentText || "").length}
      </p>
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
      >
        {loading ? "生成中..." : "AIで生成"}
      </button>
    </div>
  );
}
