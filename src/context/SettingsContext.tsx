import { createContext, useContext, useState, ReactNode } from "react";


type SettingsContextType = {
  theme: "light" | "dark";
  setTheme: (value: "light" | "dark") => void;
  toggleTheme: () => void;        // ✅ 追加
  username: string;
  setUsername: (name: string) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);


export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [username, setUsername] = useState("");

  // ✅ ボタン用：テーマを切り替える関数を追加
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <SettingsContext.Provider value={{ theme, setTheme, toggleTheme, username, setUsername }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) throw new Error("useSettings must be used within a SettingsProvider");
  return context;
}
