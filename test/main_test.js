var expect = require("chai").expect;
var sinon = require("sinon");
var Q = require('q');

var rewire = require("rewire");

var main = rewire('../src/main');

describe("main", function(){

	beforeEach(function(){
		// Make sure createDirectoryObject is empty by default
		main.__set__( 'createDirectoryObject', function(){} );
	});

	describe("path", function(){

		it("should callback error if not provided", function( done ){
			main( null, function( err, data ){
				expect( err ).to.not.be.undefined;
				done();
			});
		});

		it("should reject promise if not provided", function( done ){
			main( null )
			.catch( function( err ){
				done();
			});
		});

	});

	describe("directory object", function(){

		it("should error if creation failed", function( done ){

			var cdoStub = sinon.stub().returns( Q.reject( new Error() ));
			main.__set__( 'createDirectoryObject', cdoStub );

			main( "./fakePath", function( err, data ){
				expect( err ).to.not.be.undefined;
				done();
			});
		});

		it("should reject promise if creation failed", function( done ){
			var cdoStub = sinon.stub().returns( Q.reject( new Error() ));
			main.__set__( 'createDirectoryObject', cdoStub );

			main( "./fakePath" )
			.catch( function( err ){
				done();
			});
		});

		it("should callback with object if creation succeeded", function( done ){

			var cdoStub = sinon.stub().returns( Q.resolve( {} ));
			main.__set__( 'createDirectoryObject', cdoStub );

			main( "./fakePath", function( err, data ){
				expect( err ).to.be.null;
				expect( data ).to.not.be.undefined;
				done();
			});
		});

		it("should resolve promise if creation succeeded", function( done ){

			var cdoStub = sinon.stub().returns( Q.resolve( {} ));
			main.__set__( 'createDirectoryObject', cdoStub );

			main( "./fakePath" )
			.then( function( obj ){
				done();
			});
		});

	});

});