import {  spawn } from "child_process";
import { ChildProccesCache } from "../types";

function startChildProcess(
  command: string,
  args: string[],
  childProcesses: ChildProccesCache
) {
  const process = spawn(command, args, { stdio: "inherit", shell: true });

  if(!process.pid) {
    console.error("process.pid is not defined")
    
    return 
  }
  
  childProcesses[process.pid] = process

  process.on("exit", (code) => {
    console.log(`Child process ${command} exited with code ${code}`);
  });

  if (process.stdout) {
    process.stdout.on("data", (data) => {
      console.log(`[next] ${data}`);
    });
  }

  if (process.stderr) {
    process.stderr.on("data", (data) => {
      console.error(`[next Error] ${data}`);
    });
  }

  process.on("close", (code) => {
    console.log(`[next] exited with code ${code}`);
  });
}


export default startChildProcess