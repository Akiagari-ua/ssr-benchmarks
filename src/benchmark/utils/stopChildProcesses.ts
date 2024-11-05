import { ChildProccesCache } from "../types";

function stopChildProcesses(childProcesses: ChildProccesCache) {
  if (typeof childProcesses !== 'object') return;
  
  Object.keys(childProcesses).forEach((key) => {
    const child = childProcesses[key];
    console.log(`Stopping child process with PID: ${child.pid}`);
    
    
    child.on('exit', () => {
      console.log(`Child process with PID ${child.pid} exited. Removing from record.`);
      delete childProcesses[key]; 
    });
    
    child.kill(); 
  });
}

export default stopChildProcesses;
