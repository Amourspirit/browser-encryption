import $ from 'jquery';
import appdetect from './appdetect';
import { getUrlPath } from './misc/url';

const injectHtmlJs = () => {
  const create = (htmlStr) => {
    let frag = document.createDocumentFragment(),
      temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
      frag.appendChild(temp.firstChild);
    }
    return frag;
  };
  const sp = '&nbsp';
  const setHeader = () => {
    let x = document.getElementById("content_header");
    if (x != null) {

      let html = '\
<div id="header_wrap" class="outer">\
<header class="inner container">\
<h1 id="project_title"><a href="' + getUrlPath() + '">' + blog_title + '</a></h1>\
<h2 id="project_tagline">Client Side Encryption and Decryption</h2>\
</header>\
</div>';
      let fragment = create(html);
      x.appendChild(fragment);
    }
  };

  const setSorceCodeLink = () => {
    let x = document.getElementById("source_code");
    if (x != null) {
      let fragment = create('<a href="' + x.innerText + '" target="_blank">View Source Code</a>');
      x.innerHTML = '';
      x.appendChild(fragment);
      x.style.display = 'block';
    }
  };

  const setSignature = () => {
    let x = document.getElementById("signature");
    if (x != null) {
      let fragment = create('<p>' + publication_date + '</p>');
      x.appendChild(fragment);
    }
  };

  const setOtherOnline = () => {
    let x = document.getElementById("oth_online_tools");
    if (x != null) {
      x.innerHTML = '';
      const othOnlineEncryption = create('<a href="https://emn178.github.io/online-tools/index.html" target="blank">Other online encryption tools</a>');
      x.appendChild(othOnlineEncryption);
      x.appendChild(create('<br>'));
      const gitMarkDownEdit = create('<a href="https://jbt.github.io/markdown-editor/" target="blank">Markdown Editor</a>');
      x.appendChild(gitMarkDownEdit);
    }
  };

  const injectHoneyPot = () => {
    let x = document.getElementById("hp");
    if (x != null) {
      let website = create('<input id="website" name="website" type="text" value=""/>');
      let name = create('<input id="name" name="name" type="text" value=""/>');
      x.appendChild(website);
      x.appendChild(name);
    }
  };

  const injectEncryptionButtons = () => {
    let el = document.getElementById("btn_enc_cell");
    if (!el) {
      return;
    }
    let btnSwap = create('<button id="btnswap" class="button btn_refresh btn-success" data-toggle="tooltip" title="Swap Text and Results"><span class="oi oi-loop-square"></span> Swap</button>');
    let btnDecode = create('<button id="btndec" class="button btn_refresh btn-danger" data-toggle="tooltip" title="Decrypt Text"><span class="oi oi-lock-unlocked"></span> Decrypt</button>');
    let btnEncode = create('<button id="btnenc" class="button btn_refresh btn-primary" data-toggle="tooltip" title="Encrypt Text"><span class="oi oi-lock-locked"></span> Encrypt</button>');
    el.appendChild(btnSwap);
    el.appendChild(create(sp));
    el.appendChild(btnDecode);
    el.appendChild(create(sp));
    el.appendChild(btnEncode);
  };

  if (appdetect.isFacebookApp()) {
    let $this = $("#alert");
    $this.append('<div>Facebook app browser is not supported! Break out of app to use this page!</div>');
    $this.addClass("alert-danger").fadeIn('slow');
  } else if (appdetect.isWebview()) {
    let $this = $("#alert");
    $this.append('<div>Webview browsers is not supported! Break out of your current app to use this page!</div>');
    $this.addClass("alert-danger").fadeIn('slow');
  } else {
    injectEncryptionButtons();
  }
  setHeader();
  setSorceCodeLink();
  setSignature();
  setOtherOnline();
  injectHoneyPot();
};

export default injectHtmlJs;
