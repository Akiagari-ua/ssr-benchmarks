import fs from "fs";

import { ServerResponse } from "http";

function handleFile(
  res: ServerResponse,
  filePath: string,
  contentType: string
) {
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    }
  });
}

export default handleFile;
