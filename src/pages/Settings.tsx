import { useSettings } from "../context/SettingsContext";

export default function Settings() {
  // ❌ useSettingsを二重に呼び出さず、一度で必要な値を取得
  const { theme, setTheme, username, setUsername, toggleTheme } = useSettings();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">設定</h1>
      <p className="mb-4">現在のテーマ: {theme === "light" ? "ライト" : "ダーク"}</p>

      {/* テーマ切替ボタン */}
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-blue-600 text-white rounded mb-6"
      >
        テーマ切り替え
      </button>

      {/* ユーザー名 */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">ユーザー名</label>
        <input
	  className={`border rounded p-2 w-full ${
	    theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
	  }`}          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      {/* セレクト形式でテーマ変更 */}
      <div className="mb-4">
        <label className="block mb-1 font-semibold">テーマ</label>
       <select
  className={`border rounded p-2 ${
    theme === "dark"
      ? "bg-gray-800 text-white border-gray-600"
      : "bg-white text-black border-gray-300"
  }`}
  value={theme}
  onChange={(e) => setTheme(e.target.value as "light" | "dark")}
>
  <option value="light">ライト</option>
  <option value="dark">ダーク</option>
</select>
      </div>

      <p>現在のユーザー名: {username}</p>
      <p>現在のテーマ: {theme}</p>
    </div>
  );
}
