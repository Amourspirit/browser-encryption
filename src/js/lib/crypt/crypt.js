import crypto from 'crypto';
import { removeWs } from '../misc/util';
import {
  clEncKey,
  clEncState,
  clMethod,
  clKey,
  clPlain,
  clChipher,
  clWebsite,
  clName
} from '../misc/element-instances';
import { stringBreaker } from 'string-breaker';

if (window.CryptoJS == null) {
  window.CryptoJS = crypto;
}
//#region Honey Pot

/**
 * Gets if honey pot fileds have been filled out.
 * AI's tend to fill out all fields.
 * @returns {boolean} True if non displayed fields are filled out; Otherwise, false.
 */
const hpTest = () => {
  const cWeb = clWebsite();
  const cName = clName();
  if (!cWeb.exist()) {
    return false;
  }
  if (!cName.exist()) {
    return false;
  }

  if (cWeb.get().length !== 0) {
    return false;
  }
  if (cName.get().length !== 0) {
    return false;
  }
  return true;
};
//#endregion

//#region encrypt/decrypt
export const ENCRYPTED_STATE_NORMAL = 0;
const DEFAULT_MSG = 'Please enter encryption type';
const ENCRYPT_WRAP = 67;
const ENCRYPTED_STATE_EMPTY = 1;
const ENCRYPTED_STATE_ERR_GEN = 101;
const ENCRYPTED_STATE_ERR_NO_ENC = 102;

/**
 * Sets the value of chipher readonly text area
 * @param {number} state A value of ENCODED_STATE
 * @param {boolean} validate Validate Encrypted Result if true; Otherwise ignore Encrypted state.
 * @returns {void}
 */
const setEncodedStateValue = (state, validate) => {
  const isValidateState = () => {
    let stateVal = clChipher().get();
    return stateVal.length > 0;
  };
  if (!state) {
    state = ENCRYPTED_STATE_NORMAL;
  }
  if (validate) {
    if (!isValidateState()) {
      state = ENCRYPTED_STATE_EMPTY;
    }
  }
  clEncState().set(state);
};

/**
 * Sets an encrypted value for hidden field value for the current key param.
 * If key is null or undefined then the key defaults to the visible key field value
 * @param {string|null|undefined} key
 * @returns {void}
 */
export const SetKeyHidden = (key) => {
  if (key == null) {
    key = clKey().get();
  }
  const encrypted = CryptoJS.AES.encrypt(key, RANDOM_INLINE_KEY);
  clEncKey().set(encrypted.toString());
};

/**
 * Get the decrypted Hidden Key value
 */
export const getKeyHidden = () => {
  const keyValue = clEncKey().get();
  const decrypted = CryptoJS.AES.decrypt(keyValue, RANDOM_INLINE_KEY);
  return decrypted.toString(CryptoJS.enc.Utf8);
};

/**
 * Encrypts plain and updates the value of cipher on the page
* @returns {boolean} True if encoding succeeded; Otherwise, false
 */
export const Encrypt = () => {
  const cChipher = clChipher();
  if (!hpTest()) {
    // honey pot test failed.
    cChipher.set('');
    setEncodedStateValue(ENCRYPTED_STATE_EMPTY, false);
    return false;
  }
  let pp = clPlain().get();
  if (pp.length === 0) {
    cChipher.set('');
    setEncodedStateValue(ENCRYPTED_STATE_EMPTY, false);
    return false;
  }
  // const clean = DOMPurify.sanitize(html);
  if (window.USE_PURIFY) {
    pp = DOMPurify.sanitize(pp);
  }
  let tp = clMethod().get();
  let kk = clKey().get();
  let encrypted = null;
  let strArray = null;
  let success = false;
  const cJs = CryptoJS; // assign to const for smaller minify file
  try {
    switch (tp) {
      case 'aes':
        encrypted = cJs.AES.encrypt(pp, kk);
        strArray = stringBreaker(encrypted.toString(), { width: ENCRYPT_WRAP });
        cChipher.set(strArray.join('\n'));
        success = true;
        break;
      case '3des':
        encrypted = cJs.DES.encrypt(pp, kk);
        strArray = stringBreaker(encrypted.toString(), { width: ENCRYPT_WRAP });
        cChipher.set(strArray.join('\n'));
        success = true;
        break;
      case 'des':
        encrypted = cJs.TripleDES.encrypt(pp, kk);
        strArray = stringBreaker(encrypted.toString(), { width: ENCRYPT_WRAP });
        cChipher.set(strArray.join('\n'));
        success = true;
        break;
      case 'rc4':
        encrypted = cJs.RC4.encrypt(pp, kk);
        strArray = stringBreaker(encrypted.toString(), { width: ENCRYPT_WRAP });
        cChipher.set(strArray.join('\n'));
        success = true;
        break;
      case 'rb':
        encrypted = cJs.Rabbit.encrypt(pp, kk);
        strArray = stringBreaker(encrypted.toString(), { width: ENCRYPT_WRAP });
        cChipher.set(strArray.join('\n'));
        success = true;
        break;
      default:
        // case def
        cChipher.set(DEFAULT_MSG);
        setEncodedStateValue(ENCRYPTED_STATE_ERR_NO_ENC, false);
        break;
    }
  } catch (error) {
    cChipher.set('Error occurred: Encryption failed...');
    setEncodedStateValue(ENCRYPTED_STATE_ERR_GEN, false);
  }
  if (success === true) {
    setEncodedStateValue(ENCRYPTED_STATE_NORMAL, true);
    SetKeyHidden(null);
  }
  return success;
};

/**
* Decrypts the encrypted value of plain and populates the cipher field of the page
* @returns {boolean} True if decoding succeeded; Otherwise, false
*/
export const Decrypt = () => {
  const cChipher = clChipher();
  if (!hpTest()) {
    // honey pot test failed.
    cChipher.set('');
    setEncodedStateValue(ENCRYPTED_STATE_EMPTY, false);
    return false;
  }
  let pp = clPlain().get();
  if (pp.length === 0) {
    cChipher.set('');
    setEncodedStateValue(ENCRYPTED_STATE_EMPTY, false);
    return false;
  }
  let tp = clMethod().get();
  let kk = clKey().get();
  let decrypted = null;
  let success = false;
  let strUtf8 = null;
  const cJs = CryptoJS; // assign to const for smaller minify file
  try {
    switch (tp) {
      case '3des':
        decrypted = cJs.DES.decrypt(removeWs(pp), kk);
        strUtf8 = decrypted.toString(CryptoJS.enc.Utf8);
        if (window.USE_PURIFY) {
          strUtf8 = DOMPurify.sanitize(strUtf8);
        }
        cChipher.set(strUtf8);
        success = true;
        break;
      case 'des':
        decrypted = cJs.TripleDES.decrypt(removeWs(pp), kk);
        strUtf8 = decrypted.toString(CryptoJS.enc.Utf8);
        if (window.USE_PURIFY) {
          strUtf8 = DOMPurify.sanitize(strUtf8);
        }
        cChipher.set(strUtf8);
        success = true;
        break;
      case 'aes':
        decrypted = cJs.AES.decrypt(removeWs(pp), kk);
        strUtf8 = decrypted.toString(CryptoJS.enc.Utf8);
        if (window.USE_PURIFY) {
          strUtf8 = DOMPurify.sanitize(strUtf8);
        }
        cChipher.set(strUtf8);
        success = true;
        break;
      case 'rc4':
        decrypted = cJs.RC4.decrypt(removeWs(pp), kk);
        strUtf8 = decrypted.toString(CryptoJS.enc.Utf8);
        if (window.USE_PURIFY) {
          strUtf8 = DOMPurify.sanitize(strUtf8);
        }
        cChipher.set(strUtf8);
        success = true;
        break;
      case 'rb':
        decrypted = cJs.Rabbit.decrypt(removeWs(pp), kk);
        strUtf8 = decrypted.toString(CryptoJS.enc.Utf8);
        if (window.USE_PURIFY) {
          strUtf8 = DOMPurify.sanitize(strUtf8);
        }
        cChipher.set(strUtf8);
        success = true;
        break;
      default:
        // case def
        cChipher.set(DEFAULT_MSG);
        setEncodedStateValue(ENCRYPTED_STATE_ERR_NO_ENC, false);
        break;
    }
  } catch (error) {
    cChipher.set('Error occurred: Decryption failed...');
    setEncodedStateValue(ENCRYPTED_STATE_ERR_GEN, false);
  }
  if (success === true) {
    setEncodedStateValue(ENCRYPTED_STATE_NORMAL, true);
    SetKeyHidden(null);
  }
  return success;
};

//#endregion
/**
 * Gets if Method is set to a valid option
 * @returns {boolean} true if a valid option is selected; Otherwise, false
 */
export const methodIsSelected = () => {
  const str = clMethod().get();
  if(str === "" || str === 'def') {
    return false;
  }
  return true;
};

//#region region HASH functions
const SHA1 = () => {
  let pp = clPlain().get();
  let hash1 = CryptoJS.SHA1(pp);
  clChipher().set(hash1.toString(CryptoJS.enc.Hex));
};
const MD = () => {
  let pp = clPlain().get();
  let hash = CryptoJS.MD5(pp);
  clChipher().set(hash.toString(CryptoJS.enc.Hex));
};

const SHA3 = () => {
  let pp = clPlain().get();
  let hash2 = CryptoJS.SHA3(pp, { outputLength: 224 });
  clChipher().set(hash2.toString(CryptoJS.enc.Hex));
};
//#endregion

/**
* Swaps the values of plain input and chipher value
*/
export const Swap = () => {
  const cPlain = clPlain();
  const cChipher = clChipher();
  let src = cPlain.get();
  let dst = cChipher.get();

  cChipher.set(src);
  cPlain.set(dst);
  setEncodedStateValue(null, true);
};
