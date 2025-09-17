import { createContext, useContext, useState, ReactNode } from "react";

type ExportHistory = { date: string; tags: string[] };

type PlotContextType = {
  currentPlot: string;
  setCurrentPlot: (plot: string) => void;
  currentText: string;                     // ← 本文用を追加
  setCurrentText: (text: string) => void;  // ← 本文用を追加
  history: ExportHistory[];
  addHistory: (entry: ExportHistory) => void;
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
};

const PlotContext = createContext<PlotContextType | undefined>(undefined);

export function PlotProvider({ children }: { children: ReactNode }) {
  const [currentPlot, setCurrentPlot] = useState("デフォルトプロット");
  const [currentText, setCurrentText] = useState("");          // ← 本文用の状態
  const [history, setHistory] = useState<ExportHistory[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const addHistory = (entry: ExportHistory) => {
    setHistory((prev) => [...prev, entry]);
  };

  return (
    <PlotContext.Provider
      value={{
        currentPlot,
        setCurrentPlot,
        currentText,       // ← ここを渡す
        setCurrentText,    // ← ここを渡す
        history,
        addHistory,
        selectedGenres,
        setSelectedGenres,
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
