import * as http from "http";
import * as path from "path";
import { ChildProcess } from "child_process";
import { handleCss, handleHtml, handleJs, stopChildProcesses } from "./utils";
import nextV14 from "./benchmarks/nextV14";
import { ChildProccesCache } from "./types";
require("dotenv").config();

const PORT = process.env.BENCHMARK_SERVER_PORT || 3000;
const childProcesses: ChildProccesCache = {};

function handleSigint(childProcesses: ChildProccesCache) {
  console.log("Received SIGINT. Stopping server and all child processes...", childProcesses );
  stopChildProcesses(childProcesses);
}

const requestHandler = async (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  process.once("SIGINT", handleSigint);

  if (req.url === "/") {
    const fullPath = path.join(__dirname, "./client/index.html");
    handleHtml(res, fullPath);
    return;
  }

  if (req.url === "/chart.js") {
    const fullPath = path.join(__dirname, "./client/chart.js");
    handleJs(res, fullPath);
    return;
  }

  if (req.url?.includes(".css")) {
    const fullPath = path.join(__dirname, `./client${req.url}`);
    handleCss(res, fullPath);
    return;
  }

  if (req.url === "/api/run") {
    console.log('RUN BENCHMARK')

    const result = await nextV14(childProcesses);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404 Not Found");
};

const server = http.createServer((req, res) => requestHandler(req, res).finally(() => process.off("SIGINT", handleSigint)));

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
