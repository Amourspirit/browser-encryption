(function () {
  "use strict";
  // Define your library strictly...
})();
module.exports = function (grunt) {
  // const systemJSLoader = require('rollup-plugin-systemjs-loader/dist/index.js');
  const systemJSLoader = require('rollup-plugin-systemjs-loader');
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

  // #endregion
  // #region grunt init config
  grunt.initConfig({
    env: {
      options: {
        //Shared Options Hash
      },
      dev: {
        NODE_ENV: 'development',
        DEST: 'dev',
        DEV_FILE: '.dev',
        MIN: ''
      },
      build: {
        NODE_ENV: 'production',
        DEST: 'site',
        DEV_FILE: '',
        MIN: '.min'
      }
    },
    clean: {
      dirs: ['scratch', '<%= DEST %>'],
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
      startd: 'npm run startd',
      roll: 'npx rollup -c'
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
      assets_ajax: {
        expand: true,
        cwd: 'src/assets/ajax/',
        src: '**/*',
        dest: '<%= DEST %>/assets/ajax/',
      },
      lib: {
        expand: true,
        cwd: 'src/js/lib/',
        src: '**/*.js',
        dest: 'scratch/out/js/lib/',
      },
       img: {
        expand: true,
        cwd: 'src/assets/img/',
        src: '**/*',
        dest: '<%= DEST %>/assets/img/',
      },
      ico: {
        expand: true,
        cwd: 'src/',
        src: '**/*.ico',
        dest: '<%= DEST %>/',
      },
      json: {
        src: 'src/assets/json/importmap<%= DEV_FILE %>.json',
        dest: '<%= DEST %>/assets/json/importmap.json',
      },
      json_css: {
        src: 'src/assets/json/embed/css<%= DEV_FILE %>.json',
        dest: 'scratch/out/json/css.json',
      },
      json_js: {
        src: 'src/assets/json/embed/js.json',
        dest: 'scratch/out/json/js.json',
      },
      dev_js_entry: {
        src: 'src/js/system.entry<%= DEV_FILE %>.js',
        dest: '<%= DEST %>/assets/js/system.entry.js',
      },
      dev_js_mod: {
        src: 'scratch/js/lib/nomodule/main.js',
        dest: '<%= DEST %>/assets/js/lib/main.js',
      },
      dev_css: {
        expand: true,
        cwd: 'src/assets/css/',
        src: '**/*',
        dest: '<%= DEST %>/assets/css/',
      }
    },
    htmllint: {
      options: {
        ignore: [
          'Bad value “systemjs-importmap” for attribute “type” on element “script”: Subtype missing.',
      'A “script” element with a “src” attribute must not have a “type” attribute whose value is anything other than the empty string, a JavaScript MIME type, or “module”.'
    ]
      },
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
      },
      html_dev: {
        options: {
          patterns: [
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
          { expand: true, flatten: true, src: ['src/index.html'], dest: 'dev/' }
        ]
      }
    },
    minifyHtml: {
       dist: {
        files: {
          '<%= DEST %>/index.html': 'scratch/index.html'
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
          '<%= DEST %>/assets/css/main.min.css': [
            'src/assets/css/main.css',
            'src/assets/css/bs-oth.css',
            'src/assets/css/sm.css',
            'src/assets/css/md.css',
            'src/assets/css/lg.css',
            'src/assets/css/xl.css'
          ]
        }
      }
    },
    terser: {
      mainscript: {
        options: {
        },
        files: {
          '<%= DEST %>/assets/js/lib/main.min.js': ['scratch/js/lib/nomodule/main.js'],
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
          '<%= DEST %>/js/common.min.js': ['src/js/common.js']
          // '<%= DEST %>/js/clip.min.js': ['src/js/clip.js']
        }
      },
      entry: {
        options: {
        },
        files: {
          '<%= DEST %>/assets/js/system.entry.js': ['src/js/system.entry.js']
          // '<%= DEST %>/js/clip.min.js': ['src/js/clip.js']
        }
      },
      main: {
        options: {
        },
        files: {
          '<%= DEST %>/js/lib/main.min.js': ['scratch/js/lib/main.js']
          // '<%= DEST %>/js/clip.min.js': ['src/js/clip.js']
        }
      },
      gen: {
        options: {
        },
        files: {
          '<%= DEST %>/js/lib/gen.min.js': ['scratch/js/lib/gen.js']
          // '<%= DEST %>/js/clip.min.js': ['src/js/clip.js']
        }
      },
      require_js: {
        options: {
        },
        files: {
          '<%= DEST %>/js/lib/require.min.js': ['src/js/lib/require.js']
          // '<%= DEST %>/js/clip.min.js': ['src/js/clip.js']
        }
      },
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
  //grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-env');

  // #endregion
  grunt.registerTask('loadconst', 'Load constants', function () {
    grunt.config('DEST', process.env.DEST);
    grunt.config('DEV_FILE', process.env.DEV_FILE);
    grunt.config('MIN', process.env.MIN);
  });
  grunt.registerTask('default', [
    // 'build'
    'build'
  ]);
  grunt.registerTask('ver', function () {
    grunt.log.writeln('output from task ver');
    grunt.log.writeln("BUILD_VERSION:" + BUILD_VERSION);
    grunt.log.writeln("packageData.version:" + packageData.version);
  });


  grunt.registerTask('start', [
    'shell:start'
  ]);
  grunt.registerTask('envtest', function () {
    grunt.log.writeln('output from task envtest');
    grunt.log.writeln("DEST:" + process.env.DEST);
  });
  
  grunt.registerTask('build', [
    'env:build',
    'loadconst',
    'clean:dirs',
    'copy:lib',
    'copy:json_css',
    'copy:json_js',
    'shell:roll',
    'copy:ico',
    'copy:img',
    'copy:json',
    'copy:assets_ajax',
    'replace:html',
    'htmllint:all',
    'minifyHtml:dist',
    'cssmin',
    'terser:mainscript',
    'terser:entry'
  ]);
  grunt.registerTask('dev', [
    'env:dev',
    'loadconst',
    'clean:dirs',
    'copy:lib',
    'copy:json_css',
    'copy:json_js',
    'shell:roll',
    'copy:ico',
    'copy:img',
    'copy:json',
    'copy:dev_js_entry',
    'copy:dev_js_mod',
    'copy:dev_css',
    'copy:assets_ajax',
    'replace:html_dev'
  ]);
  grunt.registerTask('startd', [
    'env:dev',
    'loadconst',
    'shell:startd'
  ]);
  grunt.registerTask('devs', [
    'dev',
    'startd'
  ]);
};
