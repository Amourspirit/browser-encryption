
/*
 *  Main JavaScript 
 */

$(document).ready(function(){
    // $("#reset").click(function(){
    //     $("#main-form")[0].reset();
    // });
    setHeader();
    setSignature();
    setFooter();
    selectFromQueryString();
    $('[data-toggle="tooltip"]').tooltip();
    $("#chipher").on("change", function () {
        uiRefresh();
    }); 
    $(".btn_refresh").on("click", function () {
        uiRefresh();
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
})();