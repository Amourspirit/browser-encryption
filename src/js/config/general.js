// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones, 
requirejs.config({
  "baseUrl": "js/lib",
  "paths": {
    "marked-init": "marked_init",
    "inject": "inject",
    "keygen": "keygen",
    "jq-bsresponsive": "jquery.bsresponsive",
    "jq-lazyLoad": "jquery.lazyLoadExt",
    "jq-newwindow": "jquery.newwindow",
    "appdetect": "appdetect",
    jquery: "empty:",
    bootstrap: "empty:",
    "ekko-lightbox": "empty:",
    "bootstrap-detect-breakpoint": "empty:",
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