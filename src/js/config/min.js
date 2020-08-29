// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones, 
requirejs.config({
  "baseUrl": "js/lib",
  "paths": {
    "strBreak": "string.breaker.min",
    "bowser": "bowser.min",
    "marked-init": "empty:",
    "inject": "empty:",
    "keygen": "empty:",
    "jq-bsresponsive": "empty:",
    "jq-lazyLoad": "empty:",
    "jq-newwindow": "empty:",
    "appdetect": "empty:",
    main: "empty:",
    methods: "empty:",
    jquery: "empty:",
    bootstrap: "empty:",
    "ekko-lightbox": "empty:",
    marked: "empty:",
    highlight: "empty:",
    "highlight-ahk": "empty:",
    "highlight-vbscript": "empty:",
    "highlight-vim": "empty:",
    "dom-purify": "empty:",
    "lazy-lozad": "empty:",
    detect: "empty:",
    crypto: "empty:"
  }
});