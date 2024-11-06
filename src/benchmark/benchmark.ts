import * as http from "http";
import * as path from "path";

import { handleCss, handleHtml, handleJs } from "./utils";
import nextV14 from "./benchmarks/nextV14";
import remixV2 from "./benchmarks/remixV2";

require("dotenv").config();

const PORT = process.env.BENCHMARK_SERVER_PORT || 3000;

const requestHandler = async (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
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
    const result = await Promise.all([nextV14(), remixV2()]);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404 Not Found");
};

const server = http.createServer((req, res) => requestHandler(req, res));
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
