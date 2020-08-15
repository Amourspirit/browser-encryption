function setHeader() {
    var x = document.getElementById("content_header");
    if (x != null) {
        var html = '\
<div id="header_wrap" class="outer">\
<header class="inner container">\
<h1 id="project_title">'  + blog_title + '</h1>\
<h2><a id="project_tagline" href="#">\
Client Side Encryption and Decryption\
</a></h2>\
</header>\
</div>';
        x.innerHTML = html;
    }
}