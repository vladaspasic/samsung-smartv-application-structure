 var fs = require('fs');

module.exports = function(grunt) {

	var pkg = grunt.file.readJSON('package.json');

	grunt.initConfig({
		pkg: pkg,
		concat: {
			options: {
				separator: '\n'
			},
			dist: {
				src: ['javascript/deps/*.js', 'javascript/modules/*.js', '!javascript/modules/App.js', '!javascript/main.js', 'javascript/modules/App.js'],
				dest: 'javascript/dist/app.js'
			},
		},
		uglify: {
			options: {
				preserveComments: false,
				banner: '/*! <%= pkg.name %> */\n'
			},
			my_target: {
				files: {
					'javascript/dist/app.min.js': ['javascript/dist/app.js']
				}
			}
		},
		compress: {
			main: {
				options: {
					archive: 'archive/archive.zip'
				},
				files: [
					{src: [
						'*',
						'!*.zip',
						'!*.json',
						'!Gruntfile.js',
						'!javascript/',
						'javascript/dist/*',
						'css/*'
					], dest: '/', filter: 'isFile'}
				]
			}
		},
		watch: {
			scripts: {
				files: ['javascript/**/*'],
				tasks: ['compile'],
					options: {
						spawn: false
				},
			}
		},
		xmlpoke: {
			options: {
				replacements: [{
					xpath: ['/rsp/list/widget/title', '/rsp/list/widget/@id'],
					value: pkg.name
				}, {
					xpath: '/rsp/list/widget/description',
					value: pkg.description
				}, {
					xpath: '/rsp/list/widget/compression/@size',
					value: function() {
						var stats = fs.statSync('archive/archive.zip');

						return '' + stats.size;
					}
				}]
			},
			files: {
				src: ['widgetlist_template.xml'],
				dest: 'archive/widgetlist.xml'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-xmlpoke');

	grunt.registerTask('default', ['watch']);

	grunt.registerTask('compile', ['concat', 'uglify']);

	grunt.registerTask('build', ['concat', 'uglify', 'compress', 'xmlpoke']);

	//grunt.registerTask('widgetlist', ['xmlpoke']);
};
