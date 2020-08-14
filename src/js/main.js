
/**
 *  Main JavaScript 
 */

// Clear Function

$(document).ready(function(){
    $("#reset").click(function(){
        $("#main-form")[0].reset();
    });
    setHeader();
    setSignature();
    setFooter();
});

function togglePassword() {
    var x = document.getElementById("key");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function swap() {
    var src = document.getElementById("plain");
    var dst = document.getElementById("chipher");
    var tmp = src.value;
    src.value = dst.value;
    dst.value = tmp;
}