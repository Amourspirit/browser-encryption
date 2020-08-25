// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones, 
requirejs.config({
  "baseUrl": "js/lib",
  "paths": {
    // "app": "../app",
    "jq-bsresponsive": "jquery.bsresponsive",
    "jq-lazyLoad": "jquery.lazyLoadExt",
    "jq-newwindow": "jquery.newwindow",
    jquery: "empty:"
  }
});