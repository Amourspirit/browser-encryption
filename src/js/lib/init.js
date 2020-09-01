
import $ from 'jquery';
import { loadCSSJson } from './misc/link-loader';
import initMain from './main';
import './appdetect';
let cssJsonUrl = './json/css.json';

loadCSSJson(cssJsonUrl);

// $('#loading').hide();
$('#content_header').show();
$('#main_content_wrap').show();
$('#content_footer').show();
initMain();
$("#loading").fadeOut(1200, function () {
  $("#preloaded-images").hide();
});
