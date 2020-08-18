const injectHtmlJs = () => {
  const create = (htmlStr) => {
    let frag = document.createDocumentFragment(),
      temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
      frag.appendChild(temp.firstChild);
    }
    return frag;
  }
  const sp = '&nbsp';
  const setHeader = () => {
    let x = document.getElementById("content_header");
    if (x != null) {
      let html = '\
<div id="header_wrap" class="outer">\
<header class="inner container">\
<h1 id="project_title">'  + blog_title + '</h1>\
<h2><a id="project_tagline" href="#">\
Client Side Encryption and Decryption\
</a></h2>\
</header>\
</div>';
      let fragment = create(html);
      x.appendChild(fragment);
    }
  }

  const setSorceCodeLink = () => {
    let x = document.getElementById("source_code");
    if (x != null) {
      let fragment = create('<a href="@@[source]" target="_blank">View Source Code</a>');
      x.appendChild(fragment);
    }
  }

  const setSignature = () => {
    let x = document.getElementById("signature");
    if (x != null) {
      let fragment = create('<p>' + publication_date + '</p>');
      x.appendChild(fragment);
    }
  }

  const setOtherOnline = () => {
    let x = document.getElementById("oth_online_tools");
    if (x != null) {
      let fragment = create('<a href="https://emn178.github.io/online-tools/index.html" target="blank">Other online encryption tools</a>');
      x.appendChild(fragment);
    }
  }
  
  const injectHoneyPot =() => {
    let x = document.getElementById("hp");
    if (x != null) {
      let website = create('<input id="website" name="website" type="text" value=""/>');
      let name = create('<input id="name" name="name" type="text" value=""/>');
      x.appendChild(website);
      x.appendChild(name);
    }
  }

  const injectEncryptionButtons = () => {
    let el = document.getElementById("btn_enc_cell");
    let btnSwap = create('<button id="btnswap" class="button btn_refresh btn-success" onclick="swap();" data-toggle="tooltip" title="Swap Text and Results"><span class="glyphicon glyphicon-sort"></span> Swap</button>');
    let btnDecode = create('<button id="btndec" class="button btn_refresh btn-success" onclick="dec();" data-toggle="tooltip" title="Decrypt Text"><span class="glyphicon glyphicon-transfer"></span> Decrypt</button>');
    let btnEncode = create('<button id="btnenc" class="button btn_refresh btn-success" onclick="enc();" data-toggle="tooltip" title="Encrypt Text"><span class="glyphicon glyphicon-lock"></span> Encrypt</button>');
    el.appendChild(btnSwap);
    el.appendChild(create(sp));
    el.appendChild(btnDecode);
    el.appendChild(create(sp));
    el.appendChild(btnEncode);
  }
  
  injectEncryptionButtons();
  setHeader();
  setSorceCodeLink();
  setSignature();
  setOtherOnline();
  injectHoneyPot();
}