module.exports = function (grunt) {
    var config = {
            pkg: grunt.file.readJSON('package.json'),
            jshint: {
                all: [
                    'src/*.js',
                    'src/adapters/*.js',
                    'src/laws/*.js'
                ]
            },
            nodeunit: {
                all: [
                    'test/*.js',
                    'test/adapters/*.js',
                    'test/laws/*.js'
                ]
            }
        };

    grunt.initConfig(config);
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.registerTask('default', ['jshint', 'nodeunit']);
};