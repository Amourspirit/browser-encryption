
define(["jquery", "methods", "main"], function ($, methods, main) {
  //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
  // startup here
  methods.loadCSSLinks([
    { link: "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css", integrity: null, crossorigin: null },
    { link: "https://cdnjs.cloudflare.com/ajax/libs/ekko-lightbox/5.3.0/ekko-lightbox.css", integrity: null, crossorigin: "anonymous" },
    {
      link: "https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/font/css/open-iconic-bootstrap.min.css",
      integrity: "sha256-BJ/G+e+y7bQdrYkS2RBTyNfBHpA9IuGaPmf9htub5MQ=", crossorigin: "anonymous"
    },
    { link: "//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/styles/default.min.css", integrity: null, crossorigin: null },
    { link: "css/bs-oth.css", integrity: null, crossorigin: null },
    { link: "css/main.css", integrity: null, crossorigin: null },
    { link: "css/sm.css", integrity: null, crossorigin: null },
    { link: "css/md.css", integrity: null, crossorigin: null },
    { link: "css/lg.css", integrity: null, crossorigin: null },
    { link: "css/xl.css", integrity: null, crossorigin: null }
  ]);

  // initCommon();
  // $('#loading').hide();
  $('#content_header').show();
  $('#main_content_wrap').show();
  $('#content_footer').show();
  main();
  $("#loading").fadeOut(1200, function () {
    $("#preloaded-images").hide();
  });
});
