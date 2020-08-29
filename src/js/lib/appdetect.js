// import * as bowser from './bowser.min.js';
import bowser from "bowser"

const appdetect = {};

/**
* Gets the user agent string
* @returns {string} useragent string
*/
const getUserAgent = () => {
  let ua = navigator.userAgent || navigator.vendor || window.opera;
  return ua;
}
const parser = bowser.getParser(getUserAgent());
const result = parser.getResult();


/**
 * User Agent string in lower case
 */
const USER_AGENT = getUserAgent().toLowerCase();

/**
 * Gets is the current useragent repeorts as IOS
 * @returns {boolean} true if is IOS; Otherwise false
 */
const isIos = () => {
  return /iphone|ipod|ipad/.test(USER_AGENT);
}


const IOS_BROWSER = isIos();


/**
 * Gets is the current user agent repeorts as Android
 * @returns {boolean} true if is android; Otherwise false.
 */
const isAndroid = () => {
  return USER_AGENT.indexOf("android") > -1;
}

const ANDROID_BROWSER = isAndroid();

/**
 * Gets is the this is a  IOS Browser
 * @returns {boolean} If not IOS or is IOS Webview returns false; Only returns true if user agent matches ios browser
 */
const isIosWebView = () => {
  if (IOS_BROWSER === false) {
    return false;
  }
  // let result = false;
  // if (/safari/.test(USER_AGENT)) {
  //   // web browser
  //   result = false;
  // } else {
  //   // webview
  //   result = true;
  // };

  // result = result && USER_AGENT.match(/\(ip.*applewebkit(?!.*(version|crios))/);
  // return result;
  return USER_AGENT.match(/\(ip.*applewebkit(?!.*(version|crios))/);
}

const isAndoridWebView = () => {
  if (ANDROID_BROWSER === false) {
    return false;
  }
  return USER_AGENT.match(/android.*applewebkit(?=.*version)/)
}
/**
 * Gets is User agent matches facebook
 * @returns {boolean} True if user agent matches factbook; Otherwise, false.
 */
appdetect.isFacebookApp = () => {
  return (USER_AGENT.indexOf("fban") > -1) || (USER_AGENT.indexOf("fbav") > -1);
}

/**
 * Gets is Web veiw is detected
 * @returns {boolean} True if webview is detected; Otherwise false;
 */
appdetect.isWebview = () => {
  let result = isIosWebView();
  result = result || isAndoridWebView();
  return result;
}

export default appdetect;
