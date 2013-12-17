/* jshint node: true */
module.exports = function(grunt) {

	// ————————————————————————————————
	// Load all grunt dependencies
	// ————————————————————————————————
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig(
	{

		// ————————————————————————————————
		// 0. Metadata
		// ————————————————————————————————
		pkg: grunt.file.readJSON('package.json'),

		// ———————————————————————————————————————
		// 1. CSS
		// ———————————————————————————————————————
		compass: {
			dist: {
				options: {
					config: 'config.rb'
				}
			}
		},

		// ———————————————————————————————————————
		// 2. Assets
		// ———————————————————————————————————————
		font: {
			all: {
				src: ['icons/source/*.svg'],
				destCss: 'scss/theme/_icon-font.scss',
				destFonts: 'fonts/icon-font.{svg,woff,eot,ttf}',
				cssFormat: 'scss',
				fontFamily: 'icon-font',
				cssRouter: function (fontpath) {
					return '../' + fontpath;
				}
			}
		},

		// SVG to PNG
		svg2png: {
			all: {
				// specify files in array format with multiple src-dest mapping
				files: [
					{ src: ['img/*.svg'], dest: 'img/temp' }
				]
			}
		},

		// Image optimisation
		imagemin: {
			build: {
				files: [{
					expand: true,
					cwd: 'img/temp/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'img/'
				}]
			}
		},

		// ———————————————————————————————————————
		// 3. Jekyll
		// ———————————————————————————————————————
		jekyll: {
			options: {
				bundleExec: true
			},
			site: {
				dest: '<%= _site %>',
				config: '_config.yml'
			}
		},

		copy: {
			css: {
				src: ["css/*"],
				dest: '_site/'
			},
			javascript: {
				src: ["js/*"],
				dest: '_site/'
			},
			images: {
				src: ["img/*"],
				dest: '_site/'
			}
		},

		// ———————————————————————————————————————
		// 4. Watch
		// ———————————————————————————————————————
		watch: {
			options: {
				livereload: true,
			},
			css: {
				files: [
					'scss/*.scss',
					'scss/*/*.scss',
					'scss/*/**/*.scss'
				],
				tasks: [
					'compass'
				]
			},
			jekyll: {
				files: [
					'*.html',
					'_posts/*.markdown',
					'_layouts/*.html',
					'_includes/*.html'
				],
				tasks: [
					'jekyll:site'
				]
			},
			copyCss: {
				files: [
					'css/*.css'
				],
				tasks: [
					'copy:css'
				]
			},
			copyJs: {
				files: [
					'js/*.js'
				],
				tasks: [
					'copy:javascript'
				]
			},
			copyImg: {
				files: [
					'img/*'
				],
				tasks: [
					'copy:images'
				]
			},
		},

		// ———————————————————————————————————————
		// 4. Notify
		// ———————————————————————————————————————
		notify: {
			build: {
				options: {
					title: 'Chopstick',
					message: 'Finished building'
				}
			}
		}
	});

	// ————————————————————————————————
	// Grunt tasks
	// ————————————————————————————————
	grunt.registerTask('default',
	[
		'compass',
		'font',
		'svg2png',
		'imagemin',
		'jekyll:site',
		'notify:build'
	]);

	grunt.registerTask('assets',
	[
		'font',
		'svg2png',
		'imagemin'
	]);

	grunt.registerTask('server',
	[
		'watch'
	]);
};
