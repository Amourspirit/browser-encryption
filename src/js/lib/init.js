
import $ from 'jquery';
import initMain from './main';
import methods from './methods';
import './appdetect';
let cssJsonUrl = './json/css.json';

methods.loadCSSLinksJson(cssJsonUrl);

// $('#loading').hide();
$('#content_header').show();
$('#main_content_wrap').show();
$('#content_footer').show();
initMain();
$("#loading").fadeOut(1200, function () {
  $("#preloaded-images").hide();
});
