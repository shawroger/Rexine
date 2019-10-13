export default class RexineService {

  public name: string = 'rexine';
  public VERSION: string = '2.0.1';
  public IS_TS: boolean = true;
  public IF_REPORT: boolean = true;
  public TRIM: boolean = false;
  public random: any = { name: 'rexine', digit: 3 };
  public JSON_INDEX: string = 'DATA';
  public JSON_INDEX_ARRAY: string[] = [];


  public data: an;
  public array: any;
  public json: any;
  public arrange: any;
  public transArray: any;
  public height: any;
  public width: any;
  public reset: any;
  public initArray: any;


  log(message: string) {
    if (this.IF_REPORT) {
      console.log(message);
    }
  }

  csv(data: any): any {
    let array: string[][] = [];
    let body = data.split(/[\n]/);
    let head = body[0].split(",");
    let width: number = head.length;
    let height: number = body.length;

    for (let i = 0; i < height; i++) {
      array[i] = [];
    }

    for (let i = 0; i < height; i++) {
      let row = body[i].split(",");
      for (let j = 0; j < width; j++) {
        array[i][j] = row[j];
      }
    }
    return array;
  }



  arrayToJson(data: any) {
    let json = '[';
    for (let i = 0; i < data.length; i++) {
      json = json + "{\n";
      for (let j = 0; j < data[0].length; j++) {
        json = json + '"';
        if (this.JSON_INDEX_ARRAY.length >= data[0].length) {
          json = json + this.JSON_INDEX_ARRAY[j];
        } else {
          json = json + this.JSON_INDEX + j;
        }
        if (this.TRIM && j >= data[0].length - 1 && i < data.length - 1) {
          json = json + '":"' + data[i][j].substr(0, data[i][j].length - 1) + '"';
        } else {
          json = json + '":"' + data[i][j] + '"';
        }
        if (j < data[0].length - 1) {
          json = json + ',';
        }
        json = json + "\n";
      }
      json = json + '}';
      if (i < data.length - 1) {
        json = json + ',' + "\n";
      }
    }
    json = json + ']';
    json = JSON.parse(json);
    return json;
  }


  jsonToArray(_json: any) {
    let json = JSON.parse(_json);
    let cross: string[][] = [];

    for (let i = 0; i < json.length; i++) {
      for (let j = 0; j < (<any>Object).keys(json[0]).length; j++) {
        cross[i][j] = (<any>Object).values(json[i])[j];
      }
    }
    return cross;
  }


  read(data: any) {

    this.log("Rexine is running successfully");

    this.data = data;
    this.array = this.csv(data);
    this.init(this.array);

  }

  init(array: any) {

    this.json = this.arrayToJson(array);
    this.arrange = [];
    this.transArray = [];
    this.height = array.length;
    this.width = (array[0]).length;

    if (this.JSON_INDEX_ARRAY.length < this.width) {
      let _JSON_INDEX_ARRAY = [];
      for (let i = 0; i < this.width; i++) {
        let JSON_INDEX_FILL = this.JSON_INDEX + i;
        _JSON_INDEX_ARRAY.push(JSON_INDEX_FILL);
      }
      this.JSON_INDEX_ARRAY = _JSON_INDEX_ARRAY;
    }

    for (let i = 0; i < this.height; i++) {
      this.arrange[i] = i;
    }
    for (let i = 0; i < this.width; i++) {
      this.transArray[i] = [];
    }
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.transArray[j][i] = array[i][j];
      }
    }

  }

  seek(array: any): any {

    let SEEK = {};
    let RESULT = [];

    for (let i in array) {
      if (array[i]) {
        SEEK[this.JSON_INDEX_ARRAY[i]] = array[i];
      }
    }
    for (let i in this.json) {
      let GET_JSON_ITEM = this.json[i];
      for (let j in SEEK) {
        if (GET_JSON_ITEM[j] !== SEEK[j]) {
          continue;
        }
        (<any>Object).assign(GET_JSON_ITEM, { row: i });
        RESULT.push(GET_JSON_ITEM);
      }
    }

    return RESULT;
  }

  sort(method: any) {

    let SORT = [];
    let SORTED_ARR = [];
    let UNSORTED_ARR = [];
    this.initArray = this.array;
    this.reset = () => {
      this.array = this.initArray;
      this.init(this.array);
    };
    for (let i in this.array) {
      SORTED_ARR[i] = method.call(this, this.array[i]);
    }
    for (let i in SORTED_ARR) {
      UNSORTED_ARR[i] = SORTED_ARR[i];
    }
    SORTED_ARR.sort();
    for (let i in SORTED_ARR) {
      for (let j in UNSORTED_ARR) {
        if (UNSORTED_ARR[j] === SORTED_ARR[i]) {
          SORT.push(this.array[j]);
          UNSORTED_ARR[j] = '%_@_$_undefined_$_@_%';
        }
      }
    }
    this.array = SORT;
    this.init(SORT);
  }
  
  file(selector: any, callback: any, READ: boolean = true) {
    let fileSelector = document.querySelector(selector);
    fileSelector.onchange = () => {
      if (fileSelector.files[0]) {
        this.rawFile(fileSelector.files[0]);
      } else {
        console.warn('missing file content');
      }
    }
  }


  rawFile(files: any, callback?: any, READ: boolean = true) {
    let fileReader = new FileReader();
    fileReader.readAsText(files, "UTF-8");
    fileReader.onload = (e: any) => {
      if (READ) {
        this.read(e.target.result);
      }
      if (callback) {
        callback.call(this, this, e, e.target.result);
      }

    }
  }

  get(Url: string, callback: any) {

    if (Url === undefined) {
      this.log("You need to get an availble address first.");
      return false;
    }

    if (this.random) {
      let rand_name = this.random.name;
      let rand_value = Math.floor(Math.pow(10, (parseInt(this.random.digit) + 1)) * Math.random());

      Url = Url + '?' + rand_name + '=' + rand_value;
    }
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        this.read(xmlhttp.responseText);
        if (callback) {
          callback.call(this, this);
        }
      }
    }
    xmlhttp.open("GET", Url, true);
    xmlhttp.send();

  }

}
