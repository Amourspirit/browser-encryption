function copyToClipboard(text) {
  const listener = function (ev) {
    ev.preventDefault();
    ev.clipboardData.setData('text/plain', text);
  };
  document.addEventListener('copy', listener);
  document.execCommand('copy');
  document.removeEventListener('copy', listener);
}

function copyRichText(text) {
  const listener = function (ev) {
    ev.preventDefault();
    ev.clipboardData.setData('text/html', text);
    ev.clipboardData.setData('text/plain', text);
  };
  document.addEventListener('copy', listener);
  document.execCommand('copy');
  document.removeEventListener('copy', listener);
}