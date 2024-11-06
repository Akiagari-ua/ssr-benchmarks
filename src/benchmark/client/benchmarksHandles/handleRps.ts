import { ChartConfiguration } from "chart.js";
import { BenchmarkResult } from "../../benchmarks/runBenchmark";

export interface RpsDataForChart {
    labels: string[]
    datasets: ChartConfiguration['data']['datasets']
}

function handleRps(benchmarks:BenchmarkResult[]):RpsDataForChart {
    const labels = benchmarks.map(b => b.name);

    const datasets = benchmarks.map((benchmark, index) => {
      const latencyValues = [
        benchmark.requests_per_second
      ];
      return {
        label: benchmark.name,
        data: latencyValues,
        backgroundColor: `hsl(${index * 100}, 70%, 50%)`,
        borderColor: `hsl(${index * 100}, 80%, 40%)`,
        borderWidth: 1,
      };
    });

    return {
        labels,
        datasets
    }
}

export default handleRps