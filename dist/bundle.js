(function(global, factory) {
	typeof exports === "object" && typeof module !== "undefined"
		? factory(exports)
		: typeof define === "function" && define.amd
		? define(["exports"], factory)
		: ((global = global || self), factory((global.Rexine = {})));
})(this, function(exports) {
	"use strict";

	function fileReader(file, callback, lazyRead) {
		if (lazyRead === void 0) {
			lazyRead = true;
		}

		var fileReader = new FileReader();
		fileReader.readAsText(file, "UTF-8");

		fileReader.onload = function(e) {
			if (!lazyRead) {
				return function() {
					return callback(e);
				};
			}

			if (callback) {
				callback(e);
			}
		};
	}
	function fileDOMReader(selector, callback, lazyRead) {
		if (lazyRead === void 0) {
			lazyRead = true;
		}

		var fileSelector = document.querySelector(selector);

		fileSelector.onchange = function() {
			if (fileSelector.files[0]) {
				fileReader(fileSelector.files[0], callback, lazyRead);
			} else {
				console.warn("missing file content");
			}
		};
	}

	function csvToArray(data) {
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
	function arrayToJson(data, jsonKeys) {
		if (jsonKeys === void 0) {
			jsonKeys = "$";
		}

		var result = [];

		for (var i in data) {
			result[i] = {};

			for (var j = 0; j < data[i].length; j++) {
				var id =
					typeof jsonKeys === "string"
						? jsonKeys + j.toString()
						: jsonKeys.length >= j + 1
						? jsonKeys[j]
						: "$" + j.toString();
				result[i][id] = data[i][j];
			}
		}

		return result;
	}
	function jsonToArray(data) {
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
	function csvToJson(data, jsonKeys) {
		if (jsonKeys === void 0) {
			jsonKeys = "$";
		}

		return arrayToJson(csvToArray(data), jsonKeys);
	}

	var Rexine = (function() {
		function Rexine() {}

		Rexine.prototype.arrayToJson = function(data, jsonKeys) {
			return arrayToJson(data, jsonKeys);
		};

		Rexine.prototype.csvToArray = function(data) {
			return csvToArray(data);
		};

		Rexine.prototype.csvToJson = function(data, jsonNames) {
			return csvToJson(data, jsonNames);
		};

		Rexine.prototype.jsonToArray = function(data) {
			return jsonToArray(data);
		};

		Rexine.prototype.fileDOMReader = function(selector, callback, lazyRead) {
			if (lazyRead === void 0) {
				lazyRead = true;
			}

			return fileDOMReader(selector, callback, lazyRead);
		};

		Rexine.prototype.fileReader = function(file, callback, lazyRead) {
			if (lazyRead === void 0) {
				lazyRead = true;
			}

			return fileReader(file, callback, lazyRead);
		};

		return Rexine;
	})();

	exports.Rexine = Rexine;
	exports.arrayToJson = arrayToJson;
	exports.csvToArray = csvToArray;
	exports.csvToJson = csvToJson;
	exports.default = Rexine;
	exports.fileDOMReader = fileDOMReader;
	exports.fileReader = fileReader;
	exports.jsonToArray = jsonToArray;

	Object.defineProperty(exports, "__esModule", { value: true });
});
