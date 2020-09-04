//#region Imports
import crypto from 'crypto';
import { removeWs, isStringEncrypted } from '../misc/util';
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
import { 
  ERR_EMPTY,
  ERR_FORMAT_BAD,
  ENC_ERR_HP,
  ENCRYPT_WRAP,
  ENC_ERR_DEC_FAIL,
  ENC_ERR_EMPTY,
  ENC_ERR_OPTION_FAIL,
  ENC_ERR_ENC_FAIL,
  ENC_STATE_NORMAL
} from '../misc/const';
if (window.CryptoJS == null) {
  window.CryptoJS = crypto;
}
//#endregion

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
const ENCRYPTED_STATE_EMPTY = 1;
const ENCRYPTED_STATE_ERR_GEN = 101;

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
    state = ENC_STATE_NORMAL;
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
  const encrypted = CryptoJS.AES.encrypt(key, window.RANDOM_INLINE_KEY);
  clEncKey().set(encrypted.toString());
};

/**
 * Get the decrypted Hidden Key value
 */
export const getKeyHidden = () => {
  const keyValue = clEncKey().get();
  const decrypted = CryptoJS.AES.decrypt(keyValue, window.RANDOM_INLINE_KEY);
  return decrypted.toString(CryptoJS.enc.Utf8);
};
//#region Encryption methods
/**
 * Encrypts plain and updates the value of cipher on the page
* @returns {boolean} True if encoding succeeded; Otherwise, false
 */
export const Encrypt = () => {
  const cChipher = clChipher();
  if (!hpTest()) {
    // honey pot test failed.
    cChipher.set('');
    clPlain().set('');
    setEncodedStateValue(ENCRYPTED_STATE_EMPTY, false);
    throw new Error(ENC_ERR_HP);
  }
  let pp = clPlain().get();
  if (pp.trim().length === 0) {
    cChipher.set('');
    setEncodedStateValue(ENCRYPTED_STATE_EMPTY, false);
    throw new Error(ENC_ERR_EMPTY);
  }

  let tp = clMethod().get();
  let kk = clKey().get();
  const encObj = encryptString(pp, kk, tp);
  validateEncrypted(encObj);

  if (encObj.str.length === 0) {
    throw new Error(ERR_EMPTY);
  }
  return encObj.str;
};


/**
 * 
 * @param {string} pp 
 * @param {string} kk 
 * @param {*} encryptor 
 */
const encryptString = (pp, kk, encryptor) => {
  let hasError = false;
  const cjs = CryptoJS; // assign to const for smaller minify file
  let fn = undefined;
  let errorCode = '';
  let strUtf8 = '';
  try {
    switch (encryptor) {
      case 'aes':
        fn = cjs.AES.encrypt;
        break;
      case '3des':
        fn = cjs.TripleDES.encrypt;
        break;
      case 'des':
        fn = cjs.DES.encrypt;
        break;
      case 'rc4':
        fn = cjs.RC4.encrypt;
        break;
      case 'rb':
        fn = cjs.Rabbit.encrypt;
        break;
      default:
        break;
    }
    if (fn === undefined) {
      errorCode = ENC_ERR_OPTION_FAIL;
      throw Error(ENC_ERR_OPTION_FAIL);
    }

    if (window.USE_PURIFY) {
      pp = DOMPurify.sanitize(pp);
    }
    const decrypted = fn(pp, kk);
    const strArray = stringBreaker(decrypted.toString(), { width: ENCRYPT_WRAP });
    strUtf8 = strArray.join('\n');
   
  } finally {
    // do noting
  }
  return { 
    str: strUtf8,
    err: {
      isError: hasError,
      errCode: errorCode
    }
  };
};

/**
 * If decObj.err is true then this method will throw an error
 * @param {{str:string, err: {isError: boolean, errCode: string}}} decObj
 * @throws ENC_ERR_DEC_FAIL error.
 */
const validateEncrypted = (decObj) => {
  if (decObj.err.isError === true) {
    let errMsg = decObj.err.errCode;
    if (errMsg === '') {
      errMsg = ENC_ERR_ENC_FAIL;
    }
    setEncodedStateValue(ENCRYPTED_STATE_ERR_GEN, false);
    throw new Error(errMsg);
  }
};
//#endregion

//#region Decrypt Methods
/**
* Decrypts the encrypted value of plain and populates the cipher field of the page
* @returns {string} True if decoding succeeded; Otherwise, false
*/
export const Decrypt = () => {
  if (!hpTest()) {
    // honey pot test failed.
    setEncodedStateValue(ENCRYPTED_STATE_EMPTY, false);
    clChipher().set('');
    clPlain().set('');
    throw new Error(ENC_ERR_HP);
  }
  let pp = clPlain().get().trim();
  if (pp.length === 0) {
    setEncodedStateValue(ENCRYPTED_STATE_EMPTY, false);
    throw new Error(ENC_ERR_EMPTY);
  }
  if (isStringEncrypted(pp) === false) {
    throw new Error(ERR_FORMAT_BAD);
  }
  let tp = clMethod().get();
  let kk = clKey().get();
  const decObj = decryptString(pp, kk, tp);
  validateDecrypted(decObj);
  if (decObj.str.length === 0) {
    throw new Error(ERR_EMPTY);
  }
  return decObj.str;
};

export const setOutEncDecResult = (str, isEnc = false) => {
  const cChipher = clChipher();
  cChipher.clear();
  cChipher.set(str);
  setEncodedStateValue(ENC_STATE_NORMAL, !isEnc);
  SetKeyHidden(null);
};

/**
 * Decrypts string and returns as a object with str and err
 * @param {string} pp Plain Text
 * @param {string} kk Key
 * 
 * {str: string, err: boolean}
 */
const decryptString = (pp, kk, decryptor) => {
  let hasError = false;
  let strUtf8 = '';
  const cjs = CryptoJS; // assign to const for smaller minify file
  const p = removeWs(pp);
  let fn = undefined;
  let errorCode = '';
  try {
    let decrypted = '';
    switch (decryptor) {
      case 'aes':
        fn = cjs.AES.decrypt;
        break;
      case '3des':
        fn = cjs.TripleDES.decrypt;
        break;
      case 'des':
        fn = cjs.DES.decrypt;
        break;
      case 'rc4':
        fn = cjs.RC4.decrypt;
        break;
      case 'rb':
        fn = cjs.Rabbit.decrypt;
        break;
      default:
        break;
    }
    if (fn === undefined) {
      errorCode = ENC_ERR_OPTION_FAIL;
      throw Error(ENC_ERR_OPTION_FAIL);
    }
    decrypted = fn(p, kk);
    strUtf8 = decrypted.toString(cjs.enc.Utf8);
    if (window.USE_PURIFY) {
      strUtf8 = DOMPurify.sanitize(strUtf8);
    }
  } catch (err) {
    hasError = true;
  }
  return {
    str: strUtf8,
    err: {
      isError: hasError,
      errCode: errorCode
    }
  };
};

/**
 * If decObj.err is true then this method will throw an error
 * @param {{str:string, err: {isError: boolean, errCode: string}}} decObj
 * @throws ENC_ERR_DEC_FAIL error.
 */
const validateDecrypted = (decObj) => {
  if (decObj.err.isError === true) {
    let errMsg = decObj.err.errCode;
    if (errMsg === '') {
      errMsg = ENC_ERR_DEC_FAIL;
    }
    setEncodedStateValue(ENCRYPTED_STATE_ERR_GEN, false);
    throw new Error(errMsg);
  }
};
//#endregion

/**
 * Gets if Method is set to a valid option
 * @returns {boolean} true if a valid option is selected; Otherwise, false
 */
export const methodIsSelected = () => {
  const str = clMethod().get();
  if (str === "" || str === 'def') {
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
