import { BenchmarkResult } from "../../benchmarks/runBenchmark";
import parseStream from "../parseStream";
import handleLatency, { LatencyDataForChart } from "./handleLatency";
import handleRps from "./handleRps";

interface Output {
  latency: LatencyDataForChart;
  rps: any
}

async function getBenchmarks(): Promise<Output> {
  const benchmarks = await fetch("/api/run").then(r => r.json());

  //@ts-ignore
  const latency = handleLatency(benchmarks);
  //@ts-ignore
  const rps = handleRps(benchmarks)

  return {
    latency,
    rps: rps
  };
}

export default getBenchmarks;
