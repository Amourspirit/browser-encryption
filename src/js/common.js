// Place third party dependencies in the lib folder
//
// Configure loading modules from the lib directory,
// except 'app' ones, 
requirejs.config({
  "baseUrl": "js/lib",
  "paths": {
    // "app": "../app",
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
    // https://github.com/darcyclarke/Detect.js
    // "detect": "https://cdnjs.cloudflare.com/ajax/libs/Detect.js/2.2.2/detect.min",
    "crypto": ["https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min", "enc/crypto-js.min"],
    "init": "init.min",
    "marked-init": "gen.min",
    "inject": "gen.min",
    "keygen": "gen.min",
    "main": "main.min",
    "methods": "main.min",
    "jq-bsresponsive": "gen.min",
    "jq-lazyLoad": "gen.min",
    "jq-newwindow": "gen.min",
    "appdetect": "gen.min"
    
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
  if (window.hljs == null) {
    window.hljs = hl;
  }

});