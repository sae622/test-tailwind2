import React from "react";

const Editor = () => {
  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-bold mb-4">本文エディタ</h1>
      <textarea
        className="w-full h-96 border rounded p-2"
        placeholder="ここに本文を書き始めてください…"
      ></textarea>
    </div>
  );
};

export default Editor;