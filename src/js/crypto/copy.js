function copyPlain() {
  let s = document.getElementById('plain').value;
  if (s) {
    copyToClipboard(s);
  }
}

function copyChipher() {
  let s = document.getElementById('chipher').value;
  if (s) {
    copyToClipboard(s);
  }
}

function copyUrl() {
  let s = document.getElementById('url').value;
  if (s) {
    copyToClipboard(s);
  }
}