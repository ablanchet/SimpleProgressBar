module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> \n<%= pkg.version %> \n<%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/jquery.simpleprogressbar.js',
        dest: 'build/jquery.simpleprogressbar-<%= pkg.version %>.min.js'
      }
    },
	karma: {
	  unit: {
		configFile: 'karma.conf.js',
		autoWatch: false,
		singleRun: true,
		reporters: ['progress','coverage'],
		preprocessors: {
		  'src/*.js': ['coverage']
		},
		coverageReporter: {
		  type : 'html',
		  dir : 'build/coverage/'
		},
	  }
	},
	jshint: {
		src: 'src/**/*.js',
		tests: 'tests/**/*.js',
		all: ['src', 'tests']
	  }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['karma','jshint:all','uglify']);

};