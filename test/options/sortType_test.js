var expect = require("chai").expect;
var sinon = require("sinon");
var Q = require('q');

var rewire = require("rewire");

var sortType = rewire('../../src/options/sortType');

describe("sortType", function(){

	it("should return array with directories listed before files", function(){
		var disorderedArray = [
			{type: "file"},
			{type: "directory"},
			{type: "file"},
			{type: "directory"},
			{type: "file"},
			{type: "directory"},
			{type: "file"},
			{type: "directory"}
		];

		var orderedArray = sortType( disorderedArray );

		orderedArray.forEach( function( item, index ){
			if( index < 4 ){
				expect( item.type ).to.equal("directory");
			}else{
				expect( item.type ).to.equal("file");
			}
		});
	});

});