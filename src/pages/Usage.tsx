import { usePlot } from "../context/PlotContext";

export default function Usage() {
  const { history } = usePlot();

  // 累計エクスポート数
  const totalExports = history.length;

  // タグ使用回数を集計
  const tagCounts: Record<string, number> = {};
  history.forEach(entry => {
    entry.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  // 最新エクスポート日
  const latestDate = totalExports > 0 ? history[history.length - 1].date : "なし";

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">使用状況</h1>

      <p className="mb-2">📅 最新エクスポート日: {latestDate}</p>
      <p className="mb-4">📦 累計エクスポート数: {totalExports}</p>

      <h2 className="text-lg font-semibold mb-2">🏷 タグ使用回数</h2>
      {Object.keys(tagCounts).length > 0 ? (
        <ul className="list-disc list-inside">
          {Object.entries(tagCounts).map(([tag, count]) => (
            <li key={tag}>
              {tag}: {count} 回
            </li>
          ))}
        </ul>
      ) : (
        <p>まだエクスポート履歴がありません。</p>
      )}
    </div>
  );
}
