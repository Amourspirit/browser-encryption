define(["jquery"], function ($) {
  $.fn.extend({
    newWindow: function () {
      // lazy load the images
      $(this).find('a').each(function (index) {
        $(this).attr("target", "_blank");
      });
      return this;
    }
  });
});