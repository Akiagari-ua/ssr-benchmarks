import runBenchmark,{BenchmarkResult} from './runBenchmark'

async function nextV14():Promise<BenchmarkResult> {
 
    const url = `http://${process.env.NEXT_V14_HOSTNAME || 'localhost'}:${process.env.NEXT_V14_PORT}/list`

    return runBenchmark(url, 'nextV14');

}

export default nextV14