module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
      
      combine: {
        files: {
          'style/css/main.v0.1.css': ['style/css/src/*.css']
        }
      }      

    },
    concat : {
      // Specify some options, usually specific to each plugin.
      options : {
        // Specifies string to be inserted between concatenated files.
        separator : ' '
      },
      basic :{
        //For mobile devices
        src: ['style/js/global.js','style/js/base.js','style/js/mobile/*.js'],
        dest: 'style/release/script.mobile.v0.1.js',
      },
      extras:{
        src: ['style/js/global.js','style/js/base.js','style/js/desktop/*.js'],
        dest: 'style/release/script.desktop.v0.1.js',
      }
    }, 
    uglify: {
        options: { }, //Add options here 
        my_target: {
          files: {
            'style/release/script.mobile.v0.1.min.js': ['style/release/script.mobile.v0.1.js'],
            'style/release/script.desktop.v0.1.min.js': ['style/release/script.desktop.v0.1.js']
          }
        }
    },
    watch : {
      scripts : {
        files : ['style/css/src/*.css','style/js/src/*.js','style/js/mobile/*.js','style/js/desktop/*.js'],
        tasks : [ 'run' ],
        options : {
          spawn : false,
        },
      }
    }


  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('run', ['cssmin','concat','uglify'] );
  grunt.registerTask('listen', [ 'watch' ]);


};
