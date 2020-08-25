define(["jquery"], function ($) {
  $.fn.extend({
    bsResponsive: function () {
      // lazy load the images
      $(this).find('img').each(function (index) {
        $(this).addClass("img-fluid");
      });
      return this;
    }
  });
});