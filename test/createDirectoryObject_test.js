var expect = require("chai").expect;
var sinon = require("sinon");
var Q = require('q');

var rewire = require("rewire");

var createDirectoryObject = rewire('../src/createDirectoryObject');

describe("createDirectoryObject", function(){

	beforeEach(function(){
		// Make sure fs methods are always empty by default
		createDirectoryObject.__set__( 'stat', function( currentDir ){} );
	});

	it("should not have children if file", function( done ){

		var statStub = sinon.stub().returns( Q.resolve({
			isFile: function(){
				return true;
			}
		}));

		createDirectoryObject.__set__( 'stat', statStub );

		var path = "./fakeFile.txt";
		createDirectoryObject( path, "" ).then( function( data ){
			expect( data.childrend ).to.be.undefined;
			done();
		});
	});
});