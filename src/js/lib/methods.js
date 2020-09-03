import $ from 'jquery';
import keygenJS from './keygen';
import { detectBreak } from './bs/bs';
import { copyToClip, copyRichClip } from './clip/clip';
import { isStringEncrypted } from './misc/util';
import {
  getParameterByName,
  getUrlPath
} from './misc/url';

import {
  clKey,
  clPlain,
  clChipher,
  clUrl,
  clMethod,
  clIncludeKey,
  clHex
} from './misc/element-instances';
import {
  Swap,
  SetKeyHidden,
  getKeyHidden
} from './crypt/crypt';

import { RefreshUi } from './misc/ui';


// const stringBreaker = strBreak.stringBreaker;
const methods = {};

//#region encrypt/decrypt

/**
* Gets if Contents of Plain is encrypted text
* @returns {boolean} True if Plain is encrypted text; Otherwise false.
*/
methods.isPlainEnc = () => {
  return isStringEncrypted(clPlain().get());
};
/**
* Gets if Contents of Chipher is encrypted text
* @returns {boolean} True if Plain is encrypted text; Otherwise false.
*/
methods.isChipherEnc = () => {
  return isStringEncrypted(clChipher().get());
};
//#endregion

//#region read query string
/**
 * Reads values from query stringand populates values
 */
methods.selectFromQueryString = () => {
  /**
* Gets the value from query string and populates plain input
*/
  const getPlainFromQuery = () => {
    let val = getParameterByName('val', null);
    if (!val) return;
    // do not replace + with spaces in this case when using decodeURIComponent
    clPlain().set(val);
  };
  /**
* Gets the value from query string and populates plain input
*/
  const getKeyFromQuery = () => {
    let key = getParameterByName('key', null);
    if (!key) return;
    // do not replace + with spaces in this case when using decodeURIComponent
    clKey().set(key);
    SetKeyHidden(key);
  };
  /**
* Gets the enc value from query string and set the Algorithm option
*/
  const selectEncFromQuery = () => {
    let enc = getParameterByName('enc', null);
    const cMethod = clMethod();
    if (!enc) return;
    enc = enc.toLowerCase();
    switch (enc) {
      case 'aes':
        cMethod.set('aes');
        break;
      case '3des':
        cMethod.set('3des');
        break;
      case 'des':
        cMethod.set('des');
        break;
      case 'rc4':
        cMethod.set('rc4');
        break;
      case 'rb':
        cMethod.set('rb');
        break;
      default:
        cMethod.set('def');
        break;
    }
  };
  clChipher().set('');
  selectEncFromQuery();
  getPlainFromQuery();
  getKeyFromQuery();
};
//#endregion

//#region Generate query string
/**
 * Generates a querystring of the current url, path, Encryption type, and results
 */
methods.genQuery = () => {
  const includeKey = () => {
    if (clIncludeKey().get()) {
      return true;
    }
    return false;
  };
  let url = getUrlPath();
  url += '?enc=' + clMethod().get();
  let encodedStr = encodeURIComponent(clChipher().get());
  // replace brackets ( and ) wiht %28 and %29 respectivly.
  // this is not absoultly necessary but links such as markdonw does not link () in links.
  encodedStr = encodedStr.replace(/\(/g, '%28')
    .replace(/\)/g, '%29');
  url += '&val=' + encodedStr;
  if (includeKey()) {
    let keyStr = encodeURIComponent(getKeyHidden());
    keyStr = keyStr.replace(/\(/g, '%28')
      .replace(/\)/g, '%29');
    url += '&key=' + keyStr;
  }
  clUrl().set(url);
};

//#endregion



//#region Misc
/**
 * Toggles the key field between password and text
 */
methods.togglePassword = () => {
  let key = clKey().el;
  if (key.type === "password") {
    key.type = "text";
  } else {
    key.type = "password";
  }
};

/**
* Swaps the values of plain input and chipher value
*/
methods.swap = Swap;
//#endregion


//#region UI
/**
 * Refresh the Page elements and converts text from markdown to html.
 * Creates a photo gallery if text contains images.
 * @returns {void}
 * 
 */
methods.uiRefresh = RefreshUi;

//#endregion

//#region Generate Key
methods.processKeygen = (length) => {
  const generateEncKey = (length, hex) => {
    const opt = {
      alpha: false,
      num: false,
      symbols: false,
      special: false,
      hex: false,
      ws: false,
      b64: false,
      ekey: false
    };
    if (hex) {
      opt.hex = true;
    } else {
      opt.ekey = true;
    }
    return keygenJS(length, opt);
  };
  let len = length / 8;
  let bHex = false;
  if (clHex().get()) {
    len += len;
    bHex = true;
  }
  clKey().set(generateEncKey(len, bHex));
};
/**
 * Function that fires when there is a resize event of the browser window
 * Raises bsSizeChanaged event when bootstrap size is changed
 * @param {object} obj Contains name and index
 * 
 * obj.index can contain one the following values
 * 0, 1, 2, 3, 4
 * 
 * obj.name can contain one of the following values
 * xs, sm, md, lg, xl
 */
methods.windowResize = () => {
  const obj = detectBreak(); //methods.bsDetectBreakpoint();
  window.BS_SIZE_INDEX = obj.index;
  if (!window.BS_SIZE_INDEX_PRV) {
    window.BS_SIZE_INDEX_PRV = window.BS_SIZE_INDEX;
    $(document).trigger("bsSizeChanaged", [window.BS_SIZE_INDEX, obj]);
  }
  if (window.BS_SIZE_INDEX !== window.BS_SIZE_INDEX_PRV) {
    $(document).trigger("bsSizeChanaged", [window.BS_SIZE_INDEX, obj]);
    window.BS_SIZE_INDEX_PRV = window.BS_SIZE_INDEX;
  }
};
//#endregion

methods.download = (filename, cipher) => {
  const elHtml = document.getElementById(cipher).innerHTML;
  const link = document.createElement('a');

  link.setAttribute('download', filename);
  link.setAttribute('href', 'data:' + ';charset=utf-8,' + encodeURIComponent(elHtml));
  link.click();
};

methods.doDL = () => {
  const dataUrl = (data) => { return "data:x-application/text," + escape(data); };
  window.open(dataUrl(clChipher().get()));
};

//#region Clipboard
methods.copyToClipboard = copyToClip;

methods.copyRichText = copyRichClip;

methods.copyPlain = () => {
  let s = clPlain().get();
  if (s) {
    copyToClip(s);
  }
};

methods.copyChipher = () => {
  let s = clChipher().get();
  if (s) {
    copyToClip(s);
  }
};

methods.copyUrl = () => {
  let s = clUrl().get();
  if (s) {
    copyToClip(s);
  }
};

methods.copyKey = () => {
  let s = clKey().get();
  if (s) {
    copyToClip(s);
  }
};
//#endregion
if (window.methods == null) {
  window.methods = methods;
}
export default methods;