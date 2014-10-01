var fs = require("fs");
var path = require('path');
var Q = require('q');

var createDirectoryObject = function( rootDir, fileName, options ){
	var deferred = Q.defer();

	var currentDir = rootDir + fileName;

	var fileInfo = {
		parent: path.relative( rootDir, path.dirname( currentDir ) ),
		path: "./" + path.relative( rootDir, currentDir ),
		name: path.basename( currentDir )
	};

	fs.stat( currentDir, function( err, stats ){
		
			console.log("++++++++++++++++++");
			console.log(currentDir);
		if( err ){
			console.log(err);
			deferred.resolve( fileInfo );
			return;
		}

		fileInfo.type = stats.isFile() ? "file" : "directory";

		if( fileInfo.type === "file" ){
			deferred.resolve( fileInfo );
			return;
		}

		fs.readdir( currentDir, function( err, files ){
		
			if( err ){
				deferred.resolve( fileInfo );
				return;
			}
			var promises = [];
			files.forEach(function( fileName ){
				promises.push( createDirectoryObject( rootDir, fileName, options ) );
			});


			Q.all( promises ).then(function(data){
				fileInfo.children = data;
				deferred.resolve( fileInfo );
			});

		});
	});

	return deferred.promise;

};

module.exports = createDirectoryObject;