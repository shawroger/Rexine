(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.app = factory());
}(this, function () { 'use strict';

	var FrontNode = (function () {
	    function FrontNode() {
	        this.params = {};
	        this.defined_params = {};
	        this.url = location.href;
	        this.init();
	    }
	    FrontNode.prototype.init = function () {
	        var url_params = {};
	        var url_params_name;
	        var url_params_value;
	        var url_params_string = location.href;
	        var url_params_index = url_params_string.indexOf("?");
	        url_params_string = url_params_string.substr(url_params_index + 1);
	        var url_params_array = url_params_string.split("&");
	        for (var i = 0; i < url_params_array.length; i++) {
	            url_params_index = url_params_array[i].indexOf("=");
	            if (url_params_index > 0) {
	                url_params_name = url_params_array[i].substr(0, url_params_index);
	                url_params_value = url_params_array[i].substr(url_params_index + 1);
	                url_params[url_params_name] = { value: url_params_value };
	            }
	        }
	        this.params = url_params;
	    };
	    FrontNode.prototype.get = function (url) {
	        var url_params = {};
	        var url_params_name;
	        var url_params_value;
	        var url_params_string = url;
	        var url_params_index = url_params_string.indexOf("?");
	        url_params_string = url_params_string.substr(url_params_index + 1);
	        var url_params_array = url_params_string.split("&");
	        for (var i = 0; i < url_params_array.length; i++) {
	            url_params_index = url_params_array[i].indexOf("=");
	            if (url_params_index > 0) {
	                url_params_name = url_params_array[i].substr(0, url_params_index);
	                url_params_value = url_params_array[i].substr(url_params_index + 1);
	                url_params[url_params_name] = { value: url_params_value };
	            }
	        }
	        return url_params;
	    };
	    FrontNode.prototype.when = function (url_params_name, callback) {
	        this.defined_params[url_params_name] = {};
	        this.defined_params[url_params_name].event = callback.bind(this, this.defined_params[url_params_name], this.defined_params);
	        if (Object.keys(this.params).includes(url_params_name)) {
	            this.params[url_params_name].event = callback.bind(this, this.params[url_params_name], this.params);
	        }
	        else {
	            return false;
	        }
	    };
	    FrontNode.prototype.at = function (index, callback) {
	        if (index >= Object.keys(this.params).length) {
	            throw Error('Cannot get params over the all existed params');
	        }
	        else {
	            var url_params_name = Object.keys(this.params)[index];
	            this.params[url_params_name].event = callback.bind(this, this.params[url_params_name], this.params);
	        }
	    };
	    FrontNode.prototype.listen = function () {
	        for (var i in this.params) {
	            if (this.params[i].event) {
	                this.params[i].event();
	            }
	        }
	    };
	    return FrontNode;
	}());

	return FrontNode;

}));
