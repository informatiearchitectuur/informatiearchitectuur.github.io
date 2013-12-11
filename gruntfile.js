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
		// 2. Jekyll
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
		// 3. Watch
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
		'jekyll:site',
		'notify:build'
	]);

	grunt.registerTask('server',
	[
		'watch'
	]);
};
