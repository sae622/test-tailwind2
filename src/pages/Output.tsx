import { useState } from "react";
import { usePlot } from "../context/PlotContext";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

export default function Output() {
  const [tags, setTags] = useState<string[]>([]);
  const { addHistory } = usePlot();

  const TAG_CANDIDATES = ["SF","ファンタジー","ライトノベル","百合","BL","恋愛"];

  const toggleTag = (tag: string) => {
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const handleExport = async () => {
    if (tags.length === 0) {
      alert("少なくとも1つのタグを選択してください。");
      return;
    }
    const doc = new Document({
      sections: [{ children: [ new Paragraph({ children: [new TextRun(`選択されたタグ: ${tags.join(", ")}`)] }) ] }]
    });
    const blob = await Packer.toBlob(doc);
    saveAs(blob, "exported.docx");
    const today = new Date().toISOString().slice(0,10);
    addHistory({ date: today, tags });
    alert(`エクスポートしました: ${tags.join(", ")}`);
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">出力</h1>
      <div className="flex flex-wrap gap-2 mb-4">
        {TAG_CANDIDATES.map(tag => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-3 py-1 rounded border ${
              tags.includes(tag)
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-700 dark:text-white"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <button
        onClick={handleExport}
        className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
      >
        エクスポート
      </button>
    </div>
  );
}
