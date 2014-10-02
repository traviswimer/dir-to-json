var gulp = require('gulp');
var config = require('../config');

var istanbul = require('gulp-istanbul');
var istanbulEnforcer = require('gulp-istanbul-enforcer');
var mocha = require('gulp-mocha');

gulp.task('test', function(callback) {

	var ended = false;
	function handleError(err) {
		if( err ){
			console.log(err.message);
		}
		
		if( !ended ){
			callback();
			ended = true;
		}
	}

	// Code coverage threshold options
	var enforcerOptions = {
		thresholds: {
			statements: 100,
			branches: 100,
			lines: 100,
			functions: 100
		},
		coverageDirectory: 'coverage',
		rootDirectory: config.root
	};

	gulp.src( [config.src + '/*.js', config.src + '/**/*.js'] )
		// Instrument source code
		.pipe(
			istanbul()
		)
		.on('finish', function (){
			// Load tests into mocha
			gulp.src( [config.tests + '/*_test.js', config.tests + '/**/*_test.js'] )
				.pipe(
					mocha({
						reporter: 'spec'
					})
					.on( 'error', handleError )
				)
				// Create coverage reports
				.pipe(istanbul.writeReports({
					dir: config.root + '/coverage',
					reporters: ['html', 'lcov', 'text-summary', 'json'],
					reportOpts: {
						dir: config.root + '/coverage'
					}
				}))
				// Throw error if coverage thresholds not met
				.pipe( istanbulEnforcer(enforcerOptions) )
				.on( 'error', handleError )
				.on( 'end', handleError );
		});

});