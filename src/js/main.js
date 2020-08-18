
/*
 *  Main JavaScript 
 */
// let RANDOM_INLINE_KEY = '';

$(document).ready(function(){
    window.RANDOM_INLINE_KEY = keygenJS(256, { ekey: true });
    window.observer = lozad(); // lazy loads elements with default selector as '.lozad'
    window.observer.observe();
    // $("#reset").click(function(){
    //     $("#main-form")[0].reset();
    // });
    injectHtmlJs();
    // setHeader();
    //  setSignature();
    selectFromQueryString();
    // setSorceCodeLink();
    $('[data-toggle="tooltip"]').tooltip();
    $("#chipher").on("change", function () {
        uiRefresh();
    }); 
    $(".btn_refresh").on("click", function () {
        uiRefresh();
        // clear any generate url value when buttons have been clicked
        setValUrl('');
    }); 
    $('.collapse-links').on("click", function() {
        let el = $('.collapse-links>span.glyph-toggle');
        if (el.length > 0) {
            if ($(this).hasClass("collapsed")) {
                el.removeClass("glyphicon-chevron-down");
                el.addClass("glyphicon-chevron-up");
            } else {
                el.removeClass("glyphicon-chevron-up");
                el.addClass("glyphicon-chevron-down");
            }
        }
    });
    $('.collapse-imgages').on("click", function () {
        let el = $('.collapse-imgages>span.glyph-toggle');
        if (el.length > 0) {
            if ($(this).hasClass("collapsed")) {
                el.removeClass("glyphicon-chevron-down");
                el.addClass("glyphicon-chevron-up");
            } else {
                el.removeClass("glyphicon-chevron-up");
                el.addClass("glyphicon-chevron-down");
            }
        }
    });
    $('.collapse-form').on("click", function () {
        let el = $('.collapse-form>span.glyph-toggle');
        if (el.length > 0) {
            if ($(this).hasClass("collapsed")) {
                el.removeClass("glyphicon-chevron-down");
                el.addClass("glyphicon-chevron-up");
            } else {
                el.removeClass("glyphicon-chevron-up");
                el.addClass("glyphicon-chevron-down");
            }
        }
    });
    uiRefresh();
});

(function () {
    let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    let pathname = window.location.pathname;
    let fav = pathname;
    
    fav += 'favicon.ico';
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = fav;
    document.getElementsByTagName('head')[0].appendChild(link);

    // let protocol = window.location.protocol;
    // let hostname = window.location.hostname;
    // let port = window.location.port;
    // let url = protocol + '//' + hostname;
    // if (port && port !== '80' && port !== '443') {
    //     url += ':' + port;
    // }
    // url += pathname;
    // let metaImage = document.querySelector("meta[property='og:image']") || document.createElement('meta');
    // metaImage.setAttribute('property', 'og:image');
    // metaImage.content = url + "img/pg_img.jpg";
    // document.getElementsByTagName('head')[0].appendChild(metaImage);
})();