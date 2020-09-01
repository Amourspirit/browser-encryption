
/**
 * Gets a value from
 * @param {string} name is the name of the parameter to get from querytring 
 * @param {string} url is the optional url that contains the querystring.
 * Defaults to the browsers url.
 * 
 * @returns {string} value of the name value pair in the querystring.
 * If url is not valid then returns null.
 * If no value is found then return empty string
 */
export const getParameterByName = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

/**
 * Gets the Protocol, hostname, port and path of current page.
 * Port is excluded if 80 or 443
 * @returns {string} Url with path (no query string)
 */
export const getUrlPath = () => {
  // <protocol>//<hostname>:<port>/<pathname><search><hash>
  let pathname = window.location.pathname;
  let url = getUrlCurrent();
  if (pathname) {
    url += pathname;
  }
  return url;
};

/**
 * Gets the Protocol, hostname and port.
 * Port is excluded if 80 or 443
 * @returns {string} Url (no path or query string)
 */
export const getUrlCurrent = () => {
  // https://stackoverflow.com/questions/1034621/get-the-current-url-with-javascript
  // <protocol>//<hostname>:<port>/<pathname><search><hash>
  let protocol = window.location.protocol;
  let hostname = window.location.hostname;
  let port = window.location.port;
  let url = protocol + '//' + hostname;
  if (port && port !== '80' && port !== '443') {
    url += ':' + port;
  }
  return url;
};