import { fileDOMReader, fileReader } from "./file";
import { csvToArray, csvToJson, arrayToJson, jsonToArray } from "./format";

class Rexine {
	constructor() {}

	arrayToJson(data: string[][], jsonKeys?: string | string[]) {
		return arrayToJson(data, jsonKeys);
	}

	csvToArray(data: string) {
		return csvToArray(data);
	}

	csvToJson(data: string, jsonNames?: string | string[]) {
		return csvToJson(data, jsonNames);
	}

	jsonToArray(data: string) {
		return jsonToArray(data);
	}

	fileDOMReader(
		selector: string,
		callback: (e: ProgressEvent<FileReader>, ...args: any) => any,
		lazyRead: boolean = true
	) {
		return fileDOMReader(selector, callback, lazyRead);
	}

	fileReader(
		file: File,
		callback: (e: ProgressEvent<FileReader>, ...args: any) => any,
		lazyRead: boolean = true
	) {
		return fileReader(file, callback, lazyRead);
	}
}

export default Rexine;

export {
	Rexine,
	csvToArray,
	csvToJson,
	arrayToJson,
	jsonToArray,
	fileDOMReader,
	fileReader
};
