
import $ from 'jquery';
import { loadCssData, loadScriptsData } from './misc/link-loader';
import initMain from './main';
import './appdetect';
import jsData from '../../json/js.json';
import cssData from '../../json/css.json';

loadCssData(cssData);
loadScriptsData(jsData);

// $('#loading').hide();
$('#content_header').show();
$('#main_content_wrap').show();
$('#content_footer').show();
initMain();
$("#loading").fadeOut(1200, function () {
  $("#preloaded-images").hide();
});
