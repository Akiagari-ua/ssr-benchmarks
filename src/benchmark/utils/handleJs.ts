import handleFile from "./handleFile";
import { ServerResponse } from "http";

function handleHtml(res: ServerResponse, filePath: string) {
  handleFile(res, filePath, "application/javascript");
}

export default handleHtml;
