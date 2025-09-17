import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ExportHistory = { date: string; tags: string[] };

type PlotContextType = {
  currentPlot: string;
  setCurrentPlot: (plot: string) => void;
  history: ExportHistory[];
  addHistory: (entry: ExportHistory) => void;
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
  currentText: string;                       // ✅ 追加
  setCurrentText: (text: string) => void;    // ✅ 追加
};

const PlotContext = createContext<PlotContextType | undefined>(undefined);

export function PlotProvider({ children }: { children: ReactNode }) {
  // ✅ localStorage から初期値を読み込む
  const [currentPlot, setCurrentPlot] = useState(() => {
    return localStorage.getItem("currentPlot") || "デフォルトプロット";
  });

  const [history, setHistory] = useState<ExportHistory[]>(() => {
    const saved = localStorage.getItem("exportHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedGenres, setSelectedGenres] = useState<string[]>(() => {
    const saved = localStorage.getItem("selectedGenres");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ 変更があれば localStorage に保存
  useEffect(() => {
    localStorage.setItem("currentPlot", currentPlot);
  }, [currentPlot]);

  useEffect(() => {
    localStorage.setItem("exportHistory", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem("selectedGenres", JSON.stringify(selectedGenres));
  }, [selectedGenres]);

  const [currentText, setCurrentText] = useState<string>(""); // ✅ 初期値を追加

  const addHistory = (entry: ExportHistory) => {
    setHistory((prev) => [...prev, entry]);
  };

  return (
    <PlotContext.Provider
      value={{
        currentPlot,
        setCurrentPlot,
        history,
        addHistory,
        selectedGenres,
        setSelectedGenres,
        currentText,        // ✅ 追加
        setCurrentText,     // ✅ 追加
      }}
    >
      {children}
    </PlotContext.Provider>
  );
}

export function usePlot() {
  const context = useContext(PlotContext);
  if (!context) throw new Error("usePlot must be used within a PlotProvider");
  return context;
}
