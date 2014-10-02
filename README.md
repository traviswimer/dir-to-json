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
	.catch( err ){
		throw err;
	};
```
