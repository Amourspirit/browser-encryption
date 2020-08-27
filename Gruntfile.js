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
      dirs: ['scratch', 'site'],
      scratch: ['scratch']
    },

    tslint: {
      options: {
        configuration: 'tslint.json'
      },
      plugin: ['src/**/*.ts']
    },

    shell: {
      start: 'npm run  lite',
      dev: 'npm run dev'
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
      img: {
        expand: true,
        cwd: 'src/img/',
        src: '**/*',
        dest: 'site/img/',
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
              match: /<script\s+src="([a-z/]+?)require\.js">/g,
              replacement: '<script src="$1require.min.js">'
            },
            {
              match: /"\.\/js\/commonlocal"/g,
              replacement: '"./js/common.min"'
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
            },
            {
              match: '[base]',
              replacement: function () {
                return packageData._site_base;
              },
            },
            {
              match: '[ogimage]',
              replacement: function () {
                return packageData._og_image;
              },
            },
            {
              match: '[metaname]',
              replacement: function () {
                return packageData._meta_generator;
              },
            },
            {
              match: '[version]',
              replacement: function () {
                return packageData.version;
              },
            },
            {
              match: '[source]',
              replacement: function () {
                return packageData.homepage;
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
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'site/css/main.min.css': [
            'src/css/main.css',
            'src/css/bs-oth.css',
            'src/css/sm.css',
            'src/css/md.css',
            'src/css/lg.css',
            'src/css/xl.css'
          ]
        }
      }
    },
    terser: {
      mainscript: {
        options: {
        },
        files: {
          'site/js/lib/main.min.js': [
            'src/js/lib/main.js',
            'scratch/js/lib/html/inject.js',
            'src/js/lib/copy.js',
            'src/js/lib/clip.js'
          ],
          'site/js/lib/mainscript.min.js': ['src/js/lib/mainscript.js'],
          'site/js/lib/download.min.js': ['src/js/lib/download.js'],
          'site/js/lib/down.min.js': ['src/js/lib/down.js'],
          'site/js/lib/enc/keygen.min.js': ['src/js/lib/enc/keygen.js']
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
      },
      common: {
        options: {
        },
        files: {
          'site/js/common.min.js': ['src/js/common.js']
          // 'site/js/clip.min.js': ['src/js/clip.js']
        }
      },
      init: {
        options: {
        },
        files: {
          'site/js/lib/init.min.js': ['src/js/lib/init.js']
          // 'site/js/clip.min.js': ['src/js/clip.js']
        }
      },
      main: {
        options: {
        },
        files: {
          'site/js/lib/main.min.js': ['scratch/js/lib/main.js']
          // 'site/js/clip.min.js': ['src/js/clip.js']
        }
      },
      gen: {
        options: {
        },
        files: {
          'site/js/lib/gen.min.js': ['scratch/js/lib/gen.js']
          // 'site/js/clip.min.js': ['src/js/clip.js']
        }
      },
      require_js: {
        options: {
        },
        files: {
          'site/js/lib/require.min.js': ['src/js/lib/require.js']
          // 'site/js/clip.min.js': ['src/js/clip.js']
        }
      },
    },
    requirejs: {
      compile_general: {
        options: {
          optimize: "none",
          baseUrl: "src/js/lib",
          mainConfigFile: "src/js/config/general.js",
          // name: "path/to/almond", /* assumes a production build using almond, if you don't use almond, you
          // need to set the "includes" or "modules" option instead of name */
          include: [
            "marked-init",
            "inject",
            "keygen",
            "jq-bsresponsive",
            "jq-lazyLoad",
            "jq-newwindow",
            "appdetect"
          ],
          out: "scratch/js/lib/gen.js"
        }
      },
      compile_main: {
        options: {
          optimize: "none",
          baseUrl: "src/js/lib",
          mainConfigFile: "src/js/config/main.js",
          // name: "path/to/almond", /* assumes a production build using almond, if you don't use almond, you
          // need to set the "includes" or "modules" option instead of name */
          include: [
            "main",
            "methods",
          ],
          out: "scratch/js/lib/main.js"
        }
      }
    }
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
  grunt.loadNpmTasks('grunt-contrib-requirejs');
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
  grunt.registerTask('dev', [
    'shell:dev'
  ]);
  grunt.registerTask('start', [
    'shell:start'
  ]);
  
  grunt.registerTask('rmain', [
    'clean:dirs',
    'requirejs:compile_main',
    'requirejs:compile_general',
    'terser:main',
    'terser:init',
    'terser:gen'
  ]);
  grunt.registerTask('build', [
    'clean:dirs',
    'copy:ico',
    'copy:img',
    'replace:html',
    'htmllint:all',
    'minifyHtml:dist',
    'cssmin',
    //'uglify',
    'requirejs:compile_main',
    'requirejs:compile_general',
    'terser:main',
    'terser:init',
    'terser:gen',
    'terser:common',
    'terser:require_js'
  ]);
};
