/**
 * Copies text to clipboard
 * @param {string} text The text to place on the clipboard
 */
export const copyToClip = (text) => {
  const listener = (ev) => {
    ev.preventDefault();
    ev.clipboardData.setData('text/plain', text);
  };
  document.addEventListener('copy', listener);
  document.execCommand('copy');
  document.removeEventListener('copy', listener);
};

/**
 * Copies rich text to clipboard
 * @param {string} text the rich text string to place on the clipboard
 */
export const copyRichClip = (text) => {
  const listener = (ev) => {
    ev.preventDefault();
    ev.clipboardData.setData('text/html', text);
    ev.clipboardData.setData('text/plain', text);
  };
  document.addEventListener('copy', listener);
  document.execCommand('copy');
  document.removeEventListener('copy', listener);
};