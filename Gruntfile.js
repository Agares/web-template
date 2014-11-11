module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: {
					'dist/assets/css/screen.css': 'src/sass/screen.scss'
				}
			}
		},
		ts: {
			dist: {
				src: ['src/ts/**.ts'],
				outDir: 'build/assets/js',
				options: {
					module: 'commonjs'
				}
			}
		},
		browserify: {
			dist: {
				files: {
					'dist/assets/js/app.js': 'build/assets/js/app.js'
				}
			}
		},
		copy: {
			'html': {
				src: 'src/html/**',
				dest: 'build/'
			},
			'img': {
				src: 'src/img/**',
				dest: 'build/assets/img/'
			}
		},
		watch: {
			css: {
				files: 'src/sass/**',
				tasks: ['sass']
			},
			ts: {
				files: 'src/ts/**',
				tasks: ['ts', 'browserify']
			},
			html: {
				files: 'src/html/**',
				tasks: ['copy:html']
			},
			img: {
				files: 'src/img/**',
				tasks: ['copy:img']
			}
		}
	});

	grunt.loadNpmTasks('grunt-ts');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('build', ['copy', 'sass', 'ts', 'browserify']);
	grunt.registerTask('default', ['build', 'watch']);
}