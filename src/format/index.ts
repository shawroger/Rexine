export function csvToArray(data: string): string[][] {
	const array: string[][] = [];
	const body = data.split(/[\n]/);
	const head = body[0].split(",");

	for (let i = 0; i < body.length; i++) {
		array[i] = [];
		const row = body[i].split(",");
		for (let j = 0; j < head.length; j++) {
			array[i][j] = row[j];
		}
	}

	return array;
}

export function arrayToJson(
	data: string[][],
	jsonKeys: string | string[] = "$"
): any[] {
	const result: any[] = [];
	for (let i in data) {
		result[i] = {};
		for (let j = 0; j < data[i].length; j++) {
			const id =
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

export function jsonToArray(data: string): string[][] {
	const result: string[][] = [];
	const json = JSON.parse(data);
	for (let i = 0; i < json.length; i++) {
		result[i] = [];
		for (let j = 0; j < Object.keys(json[0]).length; j++) {
			result[i][j] = Object.values(json[i])[j] as string;
		}
	}
	return result;
}

export function csvToJson(
	data: string,
	jsonKeys: string | string[] = "$"
): any[] {
	return arrayToJson(csvToArray(data), jsonKeys);
}
