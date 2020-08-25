define(["jquery"], function ($) {
  $.fn.extend({
    lazyLoadExt: function () {
      // lazy load the images
      $(this).find('img').each(function (index) {
        let src = $(this).attr('src');
        $(this).removeAttr('src');
        $(this).attr('data-src', src);
        $(this).addClass("lozad");
      });
      return this;
    }
  });
});