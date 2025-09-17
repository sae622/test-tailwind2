// src/pages/Home.tsx
import { usePlot } from "../context/PlotContext";

export default function Home() {
 const { currentPlot } = usePlot();
  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-600">
        {currentPlot} - ホーム
      </h1>
    </div>
  );
}
