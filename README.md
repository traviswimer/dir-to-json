# dir-to-json ![Tests](https://github.com/traviswimer/dir-to-json/actions/workflows/node.js.yml/badge.svg)

> Asynchronously convert directory tree structure into a JavaScript object.

## Getting Started

### Install

**Yarn:**

```shell
yarn add dir-to-json
```

**NPM:**

```shell
npm install dir-to-json --save
```

### Usage

```javascript
import dirToJson from "dir-to-json";

dirToJson("./path/to/my/dir", { sortType: true })
	.then(function (dirTree) {
		console.log(dirTree);
	})
	.catch(function (err) {
		throw err;
	});
```

#### Callback syntax

The callback syntax has been split into another module in version `1.0.0`. If you would still like to use it, just change your import to `dir-to-json/callback`:

```javascript
import dirToJson from "dir-to-json/callback";

dirToJson("./path/to/my/dir", function (err, dirTree) {
	if (err) {
		throw err;
	} else {
		console.log(dirTree);
	}
});
```

### Requirements

- NodeJS version 14 or higher

> Since Version 1.0.0 of `dir-to-json`, the lowest supported version of NodeJS is `14`. If you are using an older version of Node, try installing `dir-to-json@0.0.3`

## API

`dirToJson( path [, options ] [, callback ] )`

### path

- type: string
- description: Path to the directory you would like to obtain a tree object from.

### options _(optional)_

- type: object
- description: Allows output to be customized.
- Accepted properties:
  - **sortType** _boolean_ (Default: `true`) - If `true`, directories will be listed before files in all `children` arrays. If `false`, array contents will be listed in the order which they are returned from `fs.readdir()`.

### callback( err, directoryTree ) _(optional)_

- type: function
- description: Callback function
  - err - Error object on fail. `null` on success.
  - directoryTree - Object containing heirarchical directory data.

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

## Project Links

- [NPM](https://www.npmjs.com/package/dir-to-json)
- [GitHub](https://github.com/traviswimer/dir-to-json)

## Author

#### Travis Wimer

- <a href="https://traviswimer.com/developer-portfolio" title="React Native, React, NodeJS, UI/UX Developer" target="_blank">Developer Portfolio</a>
- <a href="https://traviswimer.com/blog" title="React Native, React, NodeJS, UI/UX Blog" target="_blank">My Blog</a>
- <a href="https://traviswimer.com/developer-portfolio/dir-to-json" title="dir-to-json | Travis Wimer" target="_blank">Dir-To-Json Portfolio Page</a>

## License

MIT. Copyright © 2022 Travis Wimer
