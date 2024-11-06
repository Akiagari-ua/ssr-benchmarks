import { ChartConfiguration } from "chart.js";
import { BenchmarkResult } from "../../benchmarks/runBenchmark";

export interface LatencyDataForChart {
    labels: string[]
    datasets: ChartConfiguration['data']['datasets']
}

function handleLatency(benchmarks:BenchmarkResult[]):LatencyDataForChart {
    const labels = ["Min", "Max", "Mean", "P50", "P90", "P97", "P99"];
    const datasets = benchmarks.map((benchmark, index) => {
      const latencyValues = [
        benchmark.latency.min,
        benchmark.latency.max,
        benchmark.latency.mean,
        benchmark.latency.p50,
        benchmark.latency.p90,
        benchmark.latency.p97,
        benchmark.latency.p99,
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

export default handleLatency