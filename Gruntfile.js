
module.exports = function(grunt){

	grunt.initConfig({

		watch: {
			tests: {
				files: [
					'src/**/*',
					'test/**/*_test.js'
				],
				tasks: ["test"]
			}
		},

		mochaTest: {
			test: {
				options: {
					reporter: 'spec'
				},
				src: ['test/**/*_test.js']
			}
		}

	});

	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['test', 'watch']);
	grunt.registerTask('test', ['mochaTest']);

};