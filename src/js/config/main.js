// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones, 
requirejs.config({
  "baseUrl": "js/lib",
  "paths": {
    main: "main",
    methods: "methods",
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