
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
    $("#chipher").on("change", function () {
        uiRefresh();
    }); 
    $(".btn_refresh").on("click", function () {
        uiRefresh();
    }); 
    uiRefresh();
});
