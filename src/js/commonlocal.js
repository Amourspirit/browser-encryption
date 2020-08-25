// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones, 
requirejs.config({
  "baseUrl": "js/lib",
  "paths": {
    "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min",
    // "popper": "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min",
    // "bootstrap": "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min",
    "bootstrap": "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.bundle.min",
    "ekko-lightbox": "https://cdnjs.cloudflare.com/ajax/libs/ekko-lightbox/5.3.0/ekko-lightbox.min",
    "bootstrap-detect-breakpoint": "https://cdn.jsdelivr.net/npm/bootstrap-detect-breakpoint/src/bootstrap-detect-breakpoint",
    "marked": "https://cdn.jsdelivr.net/npm/marked/marked.min",
    "highlight": "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/highlight.min",
    "highlight-ahk": "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/languages/autohotkey.min",
    "highlight-vbscript": "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/languages/vbscript.min",
    "highlight-vim": "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/languages/vim.min",
    "dom-purify": "https://cdn.jsdelivr.net/gh/cure53/DOMPurify/dist/purify.min",
    "lazy-lozad": "https://cdn.jsdelivr.net/npm/lozad/dist/lozad.min",
    //"detect": "https://cdnjs.cloudflare.com/ajax/libs/Detect.js/2.2.2/detect.min",
    "crypto": ["https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min", "enc/crypto-js.min"],
    "init": "initlocal",
    "inject": "inject",
    "keygen": "keygen",
    "main": "main",
    "methods": "methods",
    "marked-init": "marked_init",
    "jq-bsresponsive": "jquery.bsresponsive",
    "jq-lazyLoad": "jquery.lazyLoadExt",
    "jq-newwindow":"jquery.newwindow",
    "appdetect": "appdetect"
    // https://github.com/darcyclarke/Detect.js
   
    },
  "shim": {
    // "bootstrap": ['jquery', 'popper']
    "bootstrap": ['jquery']
  }
});
define([
  'highlight'
], function (hl, detect) {
  'use strict';
  if(window.hljs == null) {
    window.hljs = hl;
  }
    
});