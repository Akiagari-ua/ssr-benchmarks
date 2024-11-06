import runBenchmark,{BenchmarkResult} from './runBenchmark'

async function remixV2():Promise<BenchmarkResult> {
    const url = `http://${process.env.REMIX_V2_HOSTNAME || 'localhost'}:${process.env.REMIX_V2_PORT}`

    return runBenchmark(url, 'remixV2');

}

export default remixV2