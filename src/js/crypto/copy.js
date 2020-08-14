function copyPlain() {
  var s = document.getElementById('plain').value;
  if (s) {
    copyToClipboard(s);
  }
}

function copyChipher() {
  var s = document.getElementById('chipher').value;
  if (s) {
    copyToClipboard(s);
  }
}