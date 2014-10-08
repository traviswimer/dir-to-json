# dir-to-json [![Build Status](https://travis-ci.org/traviswimer/dir-to-json.png?branch=master)](https://travis-ci.org/traviswimer/dir-to-json)

> Asynchronously convert directory tree structure into a javascript object.

## Getting Started

Install with NPM:

```shell
npm install dir-to-json --save
```

Use in your project like this:

```javascript
var dirToJson = require('dir-to-json');

dirToJson( "./path/to/my/dir", function( err, dirTree ){
	if( err ){
		throw err;
	}else{
		console.log( dirTree );
	}
});


// If you prefer, you can also use promises
dirToJson( "./path/to/my/dir" )
	.then( function( dirTree ){
		console.log( dirTree );
	})
	.catch( function( err ){
		throw err;
	});
```

## API

`dirToJson( path [, options ] [, callback ] )`

### path
* type: string
* description: Path to the directory you would like to obtain a tree object from.

### options *(optional)*
* type: object
* description: Allows output to be customized.
* Accepted properties:
	* **sortType** *boolean* (Default: `true`) - If `true`, directories will be listed before files in all `children` arrays. If `false`, array contents will be listed in the order which they are returned from `fs.readdir()`.

### callback( err, directoryTree ) *(optional)*
* type: function
* description: Callback function
	* err - Error object on fail. `null` on success.
	* directoryTree - Object containing heirarchical directory data.

## Structure of output

```javascript
{
	"parent": "..",
	"path": "",
	"name": "coverage",
	"type": "directory",
	"children": [{
		"parent": "",
		"path": "coverage-final.json",
		"name": "coverage-final.json",
		"type": "file"
	}, {
		"parent": "",
		"path": "index.html",
		"name": "index.html",
		"type": "file"
	}, {
		"parent": "",
		"path": "lcov-report",
		"name": "lcov-report",
		"type": "directory",
		"children": [{
			"parent": "lcov-report",
			"path": "lcov-report/index.html",
			"name": "index.html",
			"type": "file"
		}, {
			"parent": "lcov-report",
			"path": "lcov-report/prettify.css",
			"name": "prettify.css",
			"type": "file"
		}, {
			"parent": "lcov-report",
			"path": "lcov-report/prettify.js",
			"name": "prettify.js",
			"type": "file"
		}, {
			"parent": "lcov-report",
			"path": "lcov-report/src",
			"name": "src",
			"type": "directory",
			"children": [{
				"parent": "lcov-report/src",
				"path": "lcov-report/src/createDirectoryObject.js.html",
				"name": "createDirectoryObject.js.html",
				"type": "file"
			}, {
				"parent": "lcov-report/src",
				"path": "lcov-report/src/index.html",
				"name": "index.html",
				"type": "file"
			}, {
				"parent": "lcov-report/src",
				"path": "lcov-report/src/main.js.html",
				"name": "main.js.html",
				"type": "file"
			}]
		}]
	}, {
		"parent": "",
		"path": "lcov.info",
		"name": "lcov.info",
		"type": "file"
	}, {
		"parent": "",
		"path": "prettify.css",
		"name": "prettify.css",
		"type": "file"
	}, {
		"parent": "",
		"path": "prettify.js",
		"name": "prettify.js",
		"type": "file"
	}, {
		"parent": "",
		"path": "src",
		"name": "src",
		"type": "directory",
		"children": [{
			"parent": "src",
			"path": "src/createDirectoryObject.js.html",
			"name": "createDirectoryObject.js.html",
			"type": "file"
		}, {
			"parent": "src",
			"path": "src/index.html",
			"name": "index.html",
			"type": "file"
		}, {
			"parent": "src",
			"path": "src/main.js.html",
			"name": "main.js.html",
			"type": "file"
		}]
	}]
}
```