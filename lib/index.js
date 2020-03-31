import { fileDOMReader, fileReader } from "./file";
import { csvToArray, csvToJson, arrayToJson, jsonToArray } from "./format";
var Rexine = (function () {
    function Rexine() {
    }
    Rexine.prototype.arrayToJson = function (data, jsonKeys) {
        return arrayToJson(data, jsonKeys);
    };
    Rexine.prototype.csvToArray = function (data) {
        return csvToArray(data);
    };
    Rexine.prototype.csvToJson = function (data, jsonNames) {
        return csvToJson(data, jsonNames);
    };
    Rexine.prototype.jsonToArray = function (data) {
        return jsonToArray(data);
    };
    Rexine.prototype.fileDOMReader = function (selector, callback, lazyRead) {
        if (lazyRead === void 0) { lazyRead = true; }
        return fileDOMReader(selector, callback, lazyRead);
    };
    Rexine.prototype.fileReader = function (file, callback, lazyRead) {
        if (lazyRead === void 0) { lazyRead = true; }
        return fileReader(file, callback, lazyRead);
    };
    return Rexine;
}());
export default Rexine;
export { Rexine, csvToArray, csvToJson, arrayToJson, jsonToArray, fileDOMReader, fileReader };
//# sourceMappingURL=index.js.map