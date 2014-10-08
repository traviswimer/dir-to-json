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
				expect( data.children.length ).to.equal( files.length );
				done();
			});
		});


		it("should produce a tree across multiple levels", function( done ){

			var path = "fakeDir";
			var files1 = [
				"fakeDir",
				"fakeDir",
				"fakeFile",
				"fakeFile"
			];
			var files2 = [
				"fakeDir",
				"fakeFile"
			];
			var files3 = [
				"fakeFile",
				"fakeFile"
			];

			var statStub = sinon.stub();
			statStub
				.onCall(0)
				.returns( Q.resolve({
					isFile: function(){
						return false;
					}
				}))
				.onCall(1)
				.returns( Q.resolve({
					isFile: function(){
						return false;
					}
				}))
				.onCall(2)
				.returns( Q.resolve({
					isFile: function(){
						return false;
					}
				}))
				.onCall(5)
				.returns( Q.resolve({
					isFile: function(){
						return false;
					}
				}));

			statStub.returns( Q.resolve({
				isFile: function(){
					return true;
				}
			}));

			var readdirStub = sinon.stub();

			readdirStub
				.onCall(0)
				.returns( Q.resolve( files1 ) )
				.onCall(1)
				.returns( Q.resolve( files2 ) )
				.onCall(2)
				.returns( Q.resolve( files3 ) );

			createDirectoryObject.__set__( 'stat', statStub );
			createDirectoryObject.__set__( 'readdir', readdirStub );

			createDirectoryObject( path, "" ).then( function( tree ){
				expect( tree.children.length ).to.equal( files1.length );

				var subDir1 = tree.children[0];
				var subDir2 = tree.children[1];

				expect( subDir1.children.length ).to.equal( files2.length );
				expect( subDir2.children.length ).to.equal( files3.length );

				var subSubDir = subDir1.children[0];
				expect( subSubDir.children.length ).to.equal( 0 );
				
				done();
			});
		});

	});


	describe("fs errors", function(){

		it("should still resolve when stat error", function( done ){

			var path = "./fakeDir";
			var files = [
				"fakeFile1",
				"fakeFile2",
				"fakeFile3"
			];

			var statStub = sinon.stub();
			statStub.returns( Q.reject( new Error() ));

			createDirectoryObject.__set__( 'stat', statStub );

			createDirectoryObject( path, "" ).then( function( data ){
				done();
			});
		});


		it("should still resolve when readdir error", function( done ){

			var path = "./fakeDir";

			var statStub = sinon.stub();
			statStub.onCall(0).returns( Q.resolve({
				isFile: function(){
					return false;
				}
			}));

			var readdirStub = sinon.stub();
			readdirStub.returns( Q.reject( new Error() ) );

			createDirectoryObject.__set__( 'stat', statStub );
			createDirectoryObject.__set__( 'readdir', readdirStub );

			createDirectoryObject( path, "" ).then( function( data ){
				done();
			});
		});

	});


	describe("options", function(){

		var path = "./fakeDir";
		var files = [
			"fakeFile",
			"fakeDir",
			"fakeFile",
			"fakeDir"
		];
		var options;
		var statStub;
		var readdirStub;

		beforeEach(function(){
			statStub = sinon.stub();
			statStub
				.onCall(0)
				.returns( Q.resolve({
					isFile: function(){
						return false;
					}
				}))
				.onCall(2)
				.returns( Q.resolve({
					isFile: function(){
						return false;
					}
				}))
				.onCall(4)
				.returns( Q.resolve({
					isFile: function(){
						return false;
					}
				}));

			statStub.returns( Q.resolve({
				isFile: function(){
					return true;
				}
			}));

			readdirStub = sinon.stub();
			readdirStub.returns( Q.resolve( files ) );

			createDirectoryObject.__set__( 'stat', statStub );
			createDirectoryObject.__set__( 'readdir', readdirStub );
		});

		it("should sort by type if sortType is true", function( done ){

			options = {
				sortType: true
			};

			createDirectoryObject( path, "", options ).then( function( data ){
				data.children.forEach( function( item, index ){
					if( index < 2 ){
						expect( item.type ).to.equal("directory");
					}else{
						expect( item.type ).to.equal("file");
					}
				});
				done();
			});
		});

		it("should not sort by type if sortType is false", function( done ){

			options = {
				sortType: false
			};

			createDirectoryObject( path, "", options ).then( function( data ){
				data.children.forEach( function( item, index ){
					if( index === 1 || index === 3 ){
						expect( item.type ).to.equal("directory");
					}else{
						expect( item.type ).to.equal("file");
					}
				});
				done();
			});
		});

	});


});