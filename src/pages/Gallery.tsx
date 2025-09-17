import { useState } from "react";

export default function Gallery() {
  const [images, setImages] = useState<string[]>([
    "https://placekitten.com/200/200",
    "https://placekitten.com/201/200",
    "https://placekitten.com/202/200",
  ]);

  const removeImage = (i: number) => setImages(prev => prev.filter((_, idx) => idx !== i));
  const moveUp = (i: number) => {
    if (i === 0) return;
    setImages(prev => {
      const copy = [...prev];
      [copy[i-1], copy[i]] = [copy[i], copy[i-1]];
      return copy;
    });
  };
  const moveDown = (i: number) => {
    if (i === images.length-1) return;
    setImages(prev => {
      const copy = [...prev];
      [copy[i+1], copy[i]] = [copy[i], copy[i+1]];
      return copy;
    });
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">ギャラリー管理</h1>
      {images.length === 0 ? (
        <p>画像がありません。</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {images.map((src, i) => (
            <div key={i} className="border p-2 rounded relative bg-gray-50 dark:bg-gray-700">
              <img src={src} alt={`Gallery ${i}`} className="mb-2 rounded" />
              <div className="flex justify-between">
                <button onClick={() => moveUp(i)} className="px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded">↑</button>
                <button onClick={() => moveDown(i)} className="px-2 py-1 bg-gray-300 dark:bg-gray-600 rounded">↓</button>
                <button onClick={() => removeImage(i)} className="px-2 py-1 bg-red-500 text-white rounded">削除</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
