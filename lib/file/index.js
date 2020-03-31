export function fileReader(file, callback, lazyRead) {
    if (lazyRead === void 0) { lazyRead = true; }
    var fileReader = new FileReader();
    fileReader.readAsText(file, "UTF-8");
    fileReader.onload = function (e) {
        if (!lazyRead) {
            return function () { return callback(e); };
        }
        if (callback) {
            callback(e);
        }
    };
}
export function fileDOMReader(selector, callback, lazyRead) {
    if (lazyRead === void 0) { lazyRead = true; }
    var fileSelector = document.querySelector(selector);
    fileSelector.onchange = function () {
        if (fileSelector.files[0]) {
            fileReader(fileSelector.files[0], callback, lazyRead);
        }
        else {
            console.warn("missing file content");
        }
    };
}
//# sourceMappingURL=index.js.map