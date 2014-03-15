mountFolder = (connect, dir) ->
  connect.static(require('path').resolve(dir))

config =
  cssmin:
    compress:
      files:
        'css/backbone-comments.css': [
          'css/normalize.css'
          'css/main.css'
        ]
      options:
        keepSpecialComments: 0

  requirejs:
    compile:
      options:
        mainConfigFile: 'app/config.js'
        name: 'config'
        out: 'app/backbone-comments.js'
        optimize: 'uglify2'
        wrap: false
        preserveLicenseComments: false
        almond: true

  connect:
    options:
      port: 5000,
      # change this to '0.0.0.0' to access the server from outside
      hostname: 'localhost'
    server:
      options:
        middleware: (connect) =>
          return [
            mountFolder(connect, '.')
          ]

module.exports = (grunt) ->

  grunt.initConfig( config )

  grunt.loadNpmTasks('grunt-requirejs')
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-contrib-connect')

  grunt.registerTask('server', [
    'connect:server:keepalive'
  ])

  grunt.registerTask('default', [
    'requirejs'
    'cssmin'
  ])
