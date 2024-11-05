import autocannon, { Instance, Result } from 'autocannon';

export interface BenchmarkResult {
  url: string;
  requests: number;
  duration: number; // в секундах
  bytes: number;
  errors: number;
  latency: {
    min: number;
    max: number;
    mean: number;
    p50: number;
    p90: number;
    p97: number;
    p99: number;
  };
  requests_per_second: number;
}

function runBenchmark(url: string): Promise<BenchmarkResult> {
  return new Promise(async (resolve, reject) => {
    const result = await autocannon({
      url,
      connections: 100, 
      duration: 10,      
    });

      const output: BenchmarkResult = {
        url,
        requests: result.requests.total,
        duration: result.duration / 1000,
        bytes: result.throughput.total,
        errors: result.errors,
        latency: {
          min: result.latency.min,
          max: result.latency.max,
          mean: result.latency.average,
          p50: result.latency.p50,
          p90: result.latency.p90,
          p97: result.latency.p97_5,
          p99: result.latency.p99,
        },
        requests_per_second: result.requests.average,
      };

      resolve(output);
    });
}

export default runBenchmark
