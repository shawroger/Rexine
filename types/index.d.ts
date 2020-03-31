import { fileDOMReader, fileReader } from "./file";
import { csvToArray, csvToJson, arrayToJson, jsonToArray } from "./format";
declare class Rexine {
    constructor();
    arrayToJson(data: string[][], jsonKeys?: string | string[]): any[];
    csvToArray(data: string): string[][];
    csvToJson(data: string, jsonNames?: string | string[]): any[];
    jsonToArray(data: string): string[][];
    fileDOMReader(selector: string, callback: (e: ProgressEvent<FileReader>, ...args: any) => any, lazyRead?: boolean): void;
    fileReader(file: File, callback: (e: ProgressEvent<FileReader>, ...args: any) => any, lazyRead?: boolean): any;
}
export default Rexine;
export { Rexine, csvToArray, csvToJson, arrayToJson, jsonToArray, fileDOMReader, fileReader };
