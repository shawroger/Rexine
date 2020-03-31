# Rexine

A light js lib to get data from csv files

一个简单的获取 **CSV** 文件数据的 `JavaScript` 库。

> 采用 `TypeScript` 编写，类型支持良好

> 最新版本：`V2.3.0`

# 入门

`Rexine` 是一个轻型的文件数据读取 **JavaScript** 库

对于一些内容可公开的数据库，`Rexine` 可以让您摆脱后台的困扰，进行数据检索和展示操作

# 快速上手

`Rexine` 的操作十分简单，支持 **CSV** 格式，支持同步/异步操作，所有数据转变成二维数组

所有数据二维数组化是 `Rexine` 的设计思路，接下来我们模拟在浏览器中引入 `Rexine` 的操作方法

`Rexine` 对于所有由 `EXCEL` 导出的 **CSV** 文件，都可以直接以二维数组或 `JSON` 形式输出

## 安装模块

```bash
npm install rexine --save
```

也可以直接在浏览器内引入

```HTML
<script type="text/javascript" src="/dist/bundle.js"></script>
```

# 基本教程

## 格式函数

`Rexine`提供了个可以直接调用的方法，可以在任何适合的场合进行格式转化的操作

### csvToArray

`csvToArray` 方法接收一个 `String` 类型的量，该字符串需要符合 **csv** 格式，返回一个二维数组

### arrayToJson

`arrayToJson` 方法接收一个二维数组，返回其`json`形式

### jsonToArray

`jsonToArray` 方法接收一个 `json` 类型的量，返回一个二维数组

## 文件操作

### fileReader

`Rexine` 提供了 `fileReader` 方法，接受一个 `File` 对象。

```js
Rexine.fileReader(file, e => {}, true);

/*
 * file 是一个 File 类型的参数
 * e 指向获得的数据
 * 末参数判断是否自动执行，默认为 true
 */
```

### fileDOMReader

`Rexine` 还提供了 `fileDOMReader` 方法，接受一个 `input[type="file"] `的DOM 对象。

```html
<input type="file" id="file" />
<script type="text/javascript">
	Rexine.fileDOMReader("#file", e => {}, true);

	/*
	 * e指向获得的数据
	 * 第三个参数若为true将自动执行read(data)
	 * 第三个参数默认为true
	 */
</script>
```
