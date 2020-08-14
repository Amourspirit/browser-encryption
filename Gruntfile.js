(function () {
  "use strict";
  // Define your library strictly...
})();
module.exports = function (grunt) {
  var isWin = process.platform === "win32";
  var nodeMajor = _getNodeMajor();
  var packageData = grunt.file.readJSON('package.json');
  // #region Functions
  function _getNodeMajor() {
    // https://www.regexpal.com/?fam=108819
    var s = process.version;
    var major = s.replace(/v?(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)/, '$1');
    return parseInt(major, 10);
  }
  function bumpVerson(segment) {
    var file = 'package.json';
    var jpkg = grunt.file.readJSON(file);
    var verRegex = /(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)/;
    var verStr = jpkg.version;
    var major = parseInt(verStr.replace(verRegex, '$1'), 10);
    var minor = parseInt(verStr.replace(verRegex, '$2'), 10);
    var build = parseInt(verStr.replace(verRegex, '$3'), 10);
    var save = false;
    if (segment === 'build') {
      build++;
      save = true;
    } else if (segment === 'minor') {
      minor++;
      build = 0;
      save = true;
    } else if (segment === 'major') {
      major++;
      minor = 0;
      build = 0;
      save = true;
    }
    if (save === true) {
      var newVer = major + '.' + minor + '.' + build;
      jpkg.version = newVer;
      grunt.file.write(file, JSON.stringify(jpkg, null, 2));
      return newVer;
    } else {
      return verStr;
    }
  }
  // #endregion
  // #region grunt init config
  grunt.initConfig({
    clean: {
      dirs: ['scratch', 'site']
    },

    tslint: {
      options: {
        configuration: 'tslint.json'
      },
      plugin: ['src/**/*.ts']
    },

    shell: {
      start: 'npx lite-server --baseDir=\'site\' --port 10001',
      startsrc: 'npx lite-server --baseDir=\'src\' --port 10002'
    },

    remove_comments: {
      js: {
        options: {
          multiline: true, // Whether to remove multi-line block comments
          singleline: true, // Whether to remove the comment of a single line.
          keepSpecialComments: false, // Whether to keep special comments, like: /*! !*/
          linein: true, // Whether to remove a line-in comment that exists in the line of code, it can be interpreted as a single-line comment in the line of code with /* or //.
          isCssLinein: false // Whether the file currently being processed is a CSS file
        },
        cwd: 'scratch/tasks/',
        src: '**/*.js',
        expand: true,
        dest: 'scratch/nc/'
      },
    },

    copy: {
      js: {
        src: 'src/js/clip.js',
        dest: 'site/js/clip.min.js',
      },
      ico: {
        expand: true,
        cwd: 'src/',
        src: '**/*.ico',
        dest: 'site/',
      }
    },
    htmllint: {
      all: ['scratch/**/*.html']
    },
    replace: {
      html: {
        options: {
          patterns: [
            {
              match: /^\s*<!--\s+#REMOVE_BLOCK\s+-->.*?<!--\s+#END_REMOVE_BLOCK\s+-->\s*\n/gms,
              replacement: ''
            },
            {
              match: / type="text\/javascript"/g,
              replacement: ''
            },
            {
              match: / src="js\/([0-9a-zA-Z-_]*)\.js"/g,
              replacement: ' src="js/$1.min.js"'
            },
            {
              match: / src="js\/crypto\/([0-9a-zA-Z-_]*)\.js"/g,
              replacement: ' src="js/crypto/$1.min.js"'
            },
            {
              match: / href="css\/([0-9a-zA-Z-_]*)\.css"/g,
              replacement: ' href="css/$1.min.css"'
            },
            {
              match: '[pdate]',
              replacement: function () {
                var d = new Date();
                var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                var y = d.getFullYear();
                var m = months[d.getMonth()];
                var day = d.getDate();
                return m + ' ' + day.toString() + ', ' + y.toString();
              },
            },
            {
              match: 'EncryptTools',
              replacement: function () {
                return packageData._site_title;
              },
            },
            {
              match: 'description',
              replacement: function () {
                return packageData.description;
              },
            },
            {
              match: '[title]',
              replacement: function () {
                return packageData._title;
              },
            }
          ]
        },
        files: [
          { expand: true, flatten: true, src: ['src/index.html'], dest: 'scratch/' }
        ]
      }
    },
    minifyHtml: {
       dist: {
        files: {
          'site/index.html': 'scratch/index.html'
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: ['*.css', '!*.min.css'],
          dest: 'site/css',
          ext: '.min.css'
        }]
      }
    },

    terser: {
      mainscript: {
        options: {
        },
        files: {
          'site/js/main.min.js': [
            'src/js/main.js',
            'src/js/blog_signature.js',
            'src/js/blog_header.js',
            'src/js/blog_footer.js',
            'src/js/crypto/copy.js',
            'src/js/clip.js'
          ],
          'site/js/mainscript.min.js': ['src/js/mainscript.js'],
          'site/js/crypto/download.min.js': ['src/js/crypto/download.js'],
          'site/js/crypto/down.min.js': ['src/js/crypto/down.js']
          // 'site/js/clip.min.js': ['src/js/clip.js']
        }
      },
      custom_options: {
        options: {
          separator: ': ',
          punctuation: ' !!!'
        },
        files: {
          'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123']
        }
      }
    },
  });
  // #endregion
  // Actually load this plugin's task(s).
  // In future versions of this plugin can most likley load past version of the this plugin.
  // That is it should be possible to use older version of this plugin as a dev dependacy and
  // then use the older version of the plugin to do replcements in the outputted *.d.ts files

  // #region grunt require and load npm task
  // Load all task at once
  // https://github.com/sindresorhus/load-grunt-tasks
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-html');
  grunt.loadNpmTasks('grunt-replace');
  grunt.registerTask('default', ['minifyHtml']);
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-terser');
  // #endregion
  grunt.registerTask('default', [
    // 'build'
    'build'
  ]);
  grunt.registerTask('ver', function () {
    grunt.log.writeln('output from task ver');
    grunt.log.writeln("BUILD_VERSION:" + BUILD_VERSION);
    grunt.log.writeln("packageData.version:" + packageData.version);
  });
  grunt.registerTask('startsrc', [
    'shell:startsrc'
  ]);
  grunt.registerTask('start', [
    'shell:start'
  ]);
  grunt.registerTask('build', [
    'clean:dirs',
    'copy:ico',
    // 'copy:js',
    'replace:html',
    'htmllint:all',
    'minifyHtml:dist',
    'cssmin',
    //'uglify',
    'terser:mainscript'
  ]);
};
