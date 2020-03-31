export function csvToArray(data) {
    var array = [];
    var body = data.split(/[\n]/);
    var head = body[0].split(",");
    for (var i = 0; i < body.length; i++) {
        array[i] = [];
        var row = body[i].split(",");
        for (var j = 0; j < head.length; j++) {
            array[i][j] = row[j];
        }
    }
    return array;
}
export function arrayToJson(data, jsonKeys) {
    if (jsonKeys === void 0) { jsonKeys = "$"; }
    var result = [];
    for (var i in data) {
        result[i] = {};
        for (var j = 0; j < data[i].length; j++) {
            var id = typeof jsonKeys === "string"
                ? jsonKeys + j.toString()
                : jsonKeys.length >= j + 1
                    ? jsonKeys[j]
                    : "$" + j.toString();
            result[i][id] = data[i][j];
        }
    }
    return result;
}
export function jsonToArray(data) {
    var result = [];
    var json = JSON.parse(data);
    for (var i = 0; i < json.length; i++) {
        result[i] = [];
        for (var j = 0; j < Object.keys(json[0]).length; j++) {
            result[i][j] = Object.values(json[i])[j];
        }
    }
    return result;
}
export function csvToJson(data, jsonKeys) {
    if (jsonKeys === void 0) { jsonKeys = "$"; }
    return arrayToJson(csvToArray(data), jsonKeys);
}
//# sourceMappingURL=index.js.map