var fs = require("fs");
var path = require('path');
var Q = require('q');
var stat = Q.denodeify( fs.stat.bind(fs) );
var readdir = Q.denodeify( fs.readdir.bind(fs) );

var createDirectoryObject = function( rootDir, fileName, options ){
	var deferred = Q.defer();

	var currentDir = path.normalize( rootDir + '/' + fileName );

	var fileInfo = {
		parent: path.relative( rootDir, path.dirname( currentDir ) ),
		path: path.relative( "./" + rootDir, currentDir ),
		name: path.basename( currentDir )
	};

	stat( currentDir )
	.then( function( stats ){

		// Check if file or directory
		fileInfo.type = stats.isFile() ? "file" : "directory";

		if( fileInfo.type === "file" ){
			deferred.resolve( fileInfo );
			throw new Error("Not a directory");
		}

		return currentDir;

	})
	.then( readdir )
	.then(function( files ){

		// Recursively examine directory's children
		var promises = [];
		files.forEach(function( fileName ){
			promises.push( createDirectoryObject( rootDir, fileName, options ) );
		});

		// Wait for all children to complete before resolving main promise
		Q.all( promises ).then(function(data){
			fileInfo.children = data;
			deferred.resolve( fileInfo );
		});

	})
	.catch(function( err ){
		// Main promise should always resolve
		deferred.resolve( fileInfo );
	});

	return deferred.promise;

};

module.exports = createDirectoryObject;