import $ from 'jquery';
import {
  clUrl,
  clBtnShort
} from '../misc/element-instances';
(function () {
  const cBtnShort = clBtnShort();
  $(cBtnShort.el).hide();
  $(cBtnShort.el).on("click", function() {
    const url = clUrl().get();
    if (url.length === 0) {
      return;
    }
    const enc = encodeURIComponent(url);
    window.open('https://tinyurl.com/api-create.php?url=' + enc);
  });
  $(clUrl().el).on('change keyup paste input textarea', function () {
    const url = clUrl().get();
    if (url) {
      $(cBtnShort.el).show();
    } else {
      $(cBtnShort.el).hide();
    }
  });
}());