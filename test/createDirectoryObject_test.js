var expect = require("chai").expect;
var rewire = require("rewire");

var createDirectoryObject = rewire('../src/createDirectoryObject');

describe("createDirectoryObject", function(){

	it("should ", function( done ){
		var path = "./test/";
		createDirectoryObject( path, "" ).then( function( data ){
			console.log(data);
			done();
		});
	});
});