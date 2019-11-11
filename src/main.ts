export default class FrontNode {

	public params:any = {}; 
	public defined_params:any = {}; 
	public url: string = location.href; 

	constructor() {
		this.init();	
	}

	init() {
		let url_params: any = {};
		let url_params_name: string;
		let url_params_value: string;
		let url_params_string: string = location.href; 
		let url_params_index: number = url_params_string.indexOf("?");
		url_params_string = url_params_string.substr(url_params_index+1);
		let url_params_array: string[] = url_params_string.split("&"); 
		for(let i = 0; i < url_params_array.length; i++) {
			url_params_index = url_params_array[i].indexOf("=");
			if(url_params_index > 0) {
				url_params_name = url_params_array[i].substr(0,url_params_index);
				url_params_value = url_params_array[i].substr(url_params_index+1);
				url_params[url_params_name] = { value: url_params_value };
			}
		}
		this.params = url_params;
	}

	get(url: string) {
		let url_params: any = {};
		let url_params_name: string;
		let url_params_value: string;
		let url_params_string: string = url; 
		let url_params_index: number = url_params_string.indexOf("?");
		url_params_string = url_params_string.substr(url_params_index+1);
		let url_params_array: string[] = url_params_string.split("&"); 
		for(let i = 0; i < url_params_array.length; i++) {
			url_params_index = url_params_array[i].indexOf("=");
			if(url_params_index > 0) {
				url_params_name = url_params_array[i].substr(0,url_params_index);
				url_params_value = url_params_array[i].substr(url_params_index+1);
				url_params[url_params_name] = { value: url_params_value };
			}
		}
		return url_params;
	}

	when(url_params_name: string, callback: any) {
		this.defined_params[url_params_name] = {};
		this.defined_params[url_params_name].event = callback.bind(this,this.defined_params[url_params_name],this.defined_params);;	
		if(Object.keys(this.params).includes(url_params_name)) {
			this.params[url_params_name].event = callback.bind(this,this.params[url_params_name],this.params);
		} else {
			return false;
		}
	}

	at(index: number, callback: any) {
		if(index >= Object.keys(this.params).length) {
			throw Error('Cannot get params over the all existed params');
		} else {
			let url_params_name = Object.keys(this.params)[index];
			this.params[url_params_name].event = callback.bind(this,this.params[url_params_name],this.params);
		}

	}

	listen() {
		for(let i in this.params) {
			if(this.params[i].event) {
				this.params[i].event();
			}
		}
	}

}