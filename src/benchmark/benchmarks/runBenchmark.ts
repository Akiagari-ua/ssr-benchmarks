import autocannon from 'autocannon';

export interface BenchmarkResult {
  name: string;
  requests: number;
  duration: number;
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

const CONNECTIONS_COUNT = Number(process.env.CONNECTIONS_COUNT)
const TEST_DURATION = Number(process.env.TEST_DURATION)

const connections = isNaN(CONNECTIONS_COUNT) ? 100 : CONNECTIONS_COUNT
const duration = isNaN(TEST_DURATION) ? 30 : TEST_DURATION

function runBenchmark(url: string, name: string): Promise<BenchmarkResult> {
  return new Promise(async (resolve) => {
    const result = await autocannon({
      url,
      connections, 
      duration,      
    });

      const output: BenchmarkResult = {
        name,
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
