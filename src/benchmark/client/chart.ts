import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarController,
} from "chart.js";
import getBenchmarks from "./benchmarksHandles/getBenchmarks";
import renderChart from "./renderChart";

document.addEventListener("DOMContentLoaded", () => {
  const runButton = document.getElementById("runBenchmark");

  if (runButton) {
    runButton.addEventListener("click", async () => {
      const canvasLatency = document.getElementById("chart") as HTMLCanvasElement;
      const canvasRps = document.getElementById("chartRps") as HTMLCanvasElement;

      if (canvasLatency && canvasRps) {
        //@ts-ignore
        Chart.register(
          BarController,
          BarElement,
          CategoryScale,
          LinearScale,
          Title,
          Tooltip,
          Legend
        );
        const ctxLatency = canvasLatency?.getContext("2d")!;
        const ctxRps = canvasRps?.getContext("2d")!;

        ctxLatency.clearRect(0, 0, canvasLatency.width, canvasLatency.height);
        ctxLatency.font = "16px Arial";
        ctxLatency.textAlign = "center";
        ctxLatency.fillText(
          "Loading benchmarks...",
          canvasLatency.width / 2,
          canvasLatency.height / 2
        );

        ctxRps.clearRect(0, 0, canvasRps.width, canvasRps.height);
        ctxRps.font = "16px Arial";
        ctxRps.textAlign = "center";
        ctxRps.fillText(
          "Loading benchmarks...",
          canvasLatency.width / 2,
          canvasLatency.height / 2
        );

        const { latency, rps } = await getBenchmarks();

        ctxLatency.clearRect(0, 0, canvasLatency.width, canvasLatency.height);
        ctxRps.clearRect(0, 0, canvasRps.width, canvasRps.height);

        renderChart({
          canvas:canvasLatency,
          datasets: latency.datasets,
          labels: latency.labels,
          text: 'Latency'
        });

        renderChart({
          canvas: canvasRps,
          datasets: rps.datasets,
          labels: rps.labels,
          text: "rps"
        });
      }
    });
  }
});
