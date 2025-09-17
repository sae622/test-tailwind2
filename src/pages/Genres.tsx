import { useState, useEffect } from "react";
import { usePlot } from "../context/PlotContext";

const GENRES = [
  "SF","ファンタジー","現代ドラマ","ライトノベル","百合","BL","ディストピア","恋愛","ホラー","ミステリー"
];

export default function Genres() {
  const { selectedGenres, setSelectedGenres } = usePlot();
  const [localSelected, setLocalSelected] = useState<string[]>(selectedGenres);

  const toggleGenre = (genre: string) => {
    setLocalSelected(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  useEffect(() => {
    setSelectedGenres(localSelected);
  }, [localSelected, setSelectedGenres]);

  return (
    <div className="p-4 bg-white dark:bg-gray-800 text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">ジャンル選択</h1>
      <div className="flex flex-wrap gap-2">
        {GENRES.map(genre => (
          <button
            key={genre}
            onClick={() => toggleGenre(genre)}
            className={`px-3 py-1 rounded border ${
              localSelected.includes(genre)
                ? "bg-blue-600 text-white"
                : "bg-gray-100 dark:bg-gray-700 dark:text-white"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>
      <p className="mt-4">選択中: {localSelected.join(", ") || "なし"}</p>
    </div>
  );
}
