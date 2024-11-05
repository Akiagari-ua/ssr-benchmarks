import { startChildProcess, stopChildProcesses } from '../utils'
import runBenchmark,{BenchmarkResult} from './runBenchmark'
import { ChildProccesCache } from "../types";

function repeatFetch(url:string, options = {}, interval = 1000, maxAttempts = 5):Promise<Response> {
    return new Promise((resolve, reject) => {
      let attempts = 0;
  
      const intervalId = setInterval(async () => {
        if (attempts >= maxAttempts) {
          clearInterval(intervalId);
          reject(new Error("Maximum fetch attempts reached"));
          return;
        }
  
        try {
          const response = await fetch(url, options);
          
          if (response.ok) {
            clearInterval(intervalId);
            resolve(response);
          } else {
            console.warn(`Attempt ${attempts + 1} failed with status: ${response.status}`);
          }
        } catch (error:any) {
          console.error(`Attempt ${attempts + 1} encountered an error: ${error.message}`);
        }
  
        attempts++;
      }, interval);
    });
  }

async function nextV14(childProcesses:ChildProccesCache):Promise<BenchmarkResult> {
    const command = "yarn";
    const args = ["next-start:v14"];
    const url = `http://localhost:${process.env.NEXT_V14_PORT}`
    console.log('childProcesses before start', childProcesses)
    startChildProcess(command, args, childProcesses);
    console.log('childProcesses after start', childProcesses)

    const isAlive = await repeatFetch(`${url}/api/health`, {}).then(res => res.status === 200)

    if(!isAlive) {
        stopChildProcesses(childProcesses);
        throw Error('nextV14 isnt alive')
    }

    const result = await runBenchmark(url);
    console.log('childProcesses before stop', childProcesses)

    stopChildProcesses(childProcesses);
    console.log('childProcesses after stop', childProcesses)
    return result
}

export default nextV14