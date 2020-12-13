module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        banner:
            '/*!\n' +
            ' * Counter items for Bootstrap by @jacintogl82\n' +
            ' * https://github.com/jacintogl82/js-modules\n' +
            ' *\n' +
            ' * License: https://github.com/jacintogl82/js-modules/blob/master/LICENSE\n' +
            ' */',

	    less: {
		    dist: {
			    files: {
				    'dist/conoce-counter.css': 'counter.less'
			    }
		    }
	    },
	    babel: {
		    options: {
			    sourceMap: true,
			    modules: 'ignore'
		    },
		    dist: {
			    files: {
				    'dist/conoce-counter.js': 'counter.js',
			    }
		    }
	    },
        uglify: {
	        options: {
		        sourceMap: true,
	        },
            js: {
                files: {
                    'dist/conoce-counter.min.js': 'dist/conoce-counter.js'
                }
            }
        },
	    postcss: {
		    options: {
			    map: true,
			    processors: [
				    require('autoprefixer')({
					    browsers: ['last 2 versions']
				    }),
					require('cssnano')()
			    ]
		    },
		    dist: {
			    src: 'dist/*.css'
		    }
	    },
	    stamp: {
		    options: {
			    banner: '<%= banner %>\n+function ($) {\n',
			    footer: '\n}(jQuery);'
		    },
		    lightbox: {
			    files: {
				    src: ['dist/conoce-counter.js', 'dist/conoce-counter.min.js']
			    }
		    }
	    },
        watch: {
            babel: {
                files: ['conoce-counter.js', 'conoce-counter.less'],
                tasks: ['dev']
            }
        }
    });

	grunt.loadNpmTasks('grunt-stamp');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-postcss');

    grunt.registerTask('dev', ['babel', 'less']);
    grunt.registerTask('dist', ['babel', 'less', 'stamp', 'postcss:dist', 'uglify']);
    grunt.registerTask('default', ['dist']);
};