import handleFile from "./handleFile";

import { ServerResponse } from "http";
function handleHtml(res:ServerResponse, filePath:string) {
    handleFile(res, filePath, "text/css");
}

export default handleHtml