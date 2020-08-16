const injectHtmlJs = () => {
  const setHeader = () => {
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

  const setSorceCodeLink = () => {
    var x = document.getElementById("source_code");
    if (x != null) {
      var html = '<a href="@@[source]" target="_blank">View Source Code</a>';
      x.innerHTML = html;
    }
  }

  const setSignature = () => {
    var x = document.getElementById("signature");
    if (x != null) {
      var sig = '<p>' + publication_date + '</p>';
      x.innerHTML = sig;
    }
  }

  const setOtherOnline = () => {
    var x = document.getElementById("oth_online_tools");
    if (x != null) {
      var html = '<a href="https://emn178.github.io/online-tools/index.html" target="blank">Other online encryption tools</a>';
      x.innerHTML = html;
    }
  }

  setHeader();
  setSorceCodeLink();
  setSignature();
  setOtherOnline();
}