var expect = require("chai").expect;
var sinon = require("sinon");
var Q = require('q');

var rewire = require("rewire");

var createDirectoryObject = rewire('../src/createDirectoryObject');

describe("createDirectoryObject", function(){

	beforeEach(function(){
		// Make sure fs methods are always empty by default
		createDirectoryObject.__set__( 'stat', function( currentDir ){} );
		createDirectoryObject.__set__( 'readdir', function( currentDir ){} );
	});

	describe("file", function(){

		it("should resolve with no children", function( done ){

			var statStub = sinon.stub().returns( Q.resolve({
				isFile: function(){
					return true;
				}
			}));

			createDirectoryObject.__set__( 'stat', statStub );

			var path = "./fakeFile.txt";
			createDirectoryObject( path, "" ).then( function( data ){
				expect( data.children ).to.be.undefined;
				done();
			});
		});

	});

	describe("directory", function(){

		it("should resolve with children", function( done ){

			var path = "./fakeDir";
			var files = [
				"fakeFile1",
				"fakeFile2",
				"fakeFile3"
			];

			var statStub = sinon.stub();
			statStub.onCall(0).returns( Q.resolve({
				isFile: function(){
					return false;
				}
			}));

			statStub.returns( Q.resolve({
				isFile: function(){
					return true;
				}
			}));

			var readdirStub = sinon.stub().returns( Q.resolve( files ));

			createDirectoryObject.__set__( 'stat', statStub );
			createDirectoryObject.__set__( 'readdir', readdirStub );

			createDirectoryObject( path, "" ).then( function( data ){
				expect( data.children ).to.be.defined;
				done();
			});
		});

	});
});