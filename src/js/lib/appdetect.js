define([
], function() {
  'use strict';

  const appdetect = {};

    const getUserAgent = () => {
      let ua = navigator.userAgent || navigator.vendor || window.opera;
      return ua;
    }
    appdetect.isFacebookApp =() => {
      const ua = getUserAgent();
      return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
    }
   
    return appdetect;

});
