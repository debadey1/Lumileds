// TODO: uglify, less, livereload

function gruntfile(grunt) {
  grunt.initConfig({
    eslint: {
      gruntfile: ['Gruntfile.js'],
      client: {
        src: ['client/**/*.js', '!client/build/**/*'],
        options: {
          configFile: '.eslintrc.json',
        },
      },
      server: {
        src: ['server/**/*.js'],
        options: {
          configFile: '.eslintrc.json',
        },
      },
    },
    concat: {
      options: {
        'sourceMap': false,
      },
      internal: {
        files: {
          'client/build/internal/bundle.js': [
            'client/app.module.js',
            'client/*.js',
            'client/**/*.js',
            '!client/build/**/*.js',
            '!client/static/**/*.js',
          ],
        },
      },
    },
    clean: {
      internal: ['client/build/internal/bundle.js']
    },
    watch: {
      client: {
        files: [
          'client/**/*.js',
          '!client/build/**/*.js',
        ],
        tasks: ['client-internal'],
      },
      server: {
        files: ['server/**/*.js'],
        tasks: ['server-internal'],
      },
    },
  });
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('gruntify-eslint');
  grunt.registerTask('client-external', ['clean:external', 'concat:external']);
  grunt.registerTask('client-internal', ['clean:internal', 'concat:internal']);
  grunt.registerTask('server-internal', ['eslint:server']);
  grunt.registerTask('build', ['clean:internal', 'clean:external', 'concat:internal', 'concat:external']);
  grunt.registerTask('default', ['watch:client']);
}

module.exports = gruntfile;