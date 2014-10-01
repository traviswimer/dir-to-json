var fs = require("fs");
var createDirectoryObject = require("./createDirectoryObject");

module.exports = function( path, options, callback ){

	if( typeof path !== "string" ){
		callback( new Error("Path parameter must be a string") );
		return;
	}

	if( typeof options === "function" ){
		callback = options;
	}

	if( typeof callback !== "function" ){
		callback( new Error("A callback function must be provided") );
		return;
	}

	createDirectoryObject( path, path, options, function( err, obj ){
		callback( err, obj, JSON.stringify(obj) );
	});

};