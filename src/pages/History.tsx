import { usePlot } from "../context/PlotContext";

export default function Body() {
  const { currentText, setCurrentText } = usePlot();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentText(e.target.value);
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded text-black dark:text-white">
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
    </div>
  );
}
