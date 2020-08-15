
/*
 *  Main JavaScript 
 */

$(document).ready(function(){
    // $("#reset").click(function(){
    //     $("#main-form")[0].reset();
    // });
    setHeader();
    setSignature();
    selectFromQueryString();
    setSorceCodeLink();
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