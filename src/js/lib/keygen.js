
/**
 * @typedef  KeygenJsOptions
 * @type {{alpha: boolean,num: boolean,symbols: boolean,special: boolean,hex: boolean,ws: boolean, b64: boolean,ekey: boolean}}
 */

const KeygenJS = {};
/**
 * 
 * @param {number} length 
 * @param {KeygenJsOptions} [opt] various optons used to generat the key with
 * @param {boolean} [opt.alpha=] if trun alpha Upper and lower case characters will be included
 * @param {boolean} [opt.num=true] if true thne numbers 0-9 will be include
 * @param {boolean} [opt.symbols=false] if true then includes symbols  `!"@#$%&/{}()[]=+?*<>,;.:-_`
 * @param {boolean} [opt.hex=false] if true then includes hex symbol `0-9` and `A-F`
 * @param {boolan} [opt.ws=false] if true then includes space characters
 * @param {boolean} [opt.b64=false] if true then includes base 64 accepted characters
 * @param {boolean} [opt.ekey=false] if true then includes characters for encryption specific
 * @returns {string} a key in string format
 */
const keygenJS = (length, opt=null) => {
  if (typeof length !== 'number') {
    throw new TypeError('keygenJS: length parmeter must be of type number');
  }
  if (length < 1) {
    throw new Error('keygenJS: length must be a postivie number greater then 0');
  }
  /**
  * Return values in the range of [0, 1)
  */
  const randomFloat = () => {
    let crypto = window.crypto || window.msCrypto;
    const int = crypto.getRandomValues(new Uint32Array(1))[0];
    return int / 2 ** 32;
  };

  /**
   * Return integers in the range of [min, max)
   *
   */
  const randomInt = (min, max) => {
    if (min > max) {
      throw new RangeError('randomInt: min cannot be greater then max');
    }
    const range = (max - min) + 1;
    if (range < 0) {
      throw new RangeError('randomInt: min and max must be greater than 0');
    }
    return Math.floor(randomFloat() * range + min);
  };

  /**
   * Generate an array of integers in the range of [min, max).
   */
  const randomIntArray = (length, min, max) => {
    return new Array(length).fill(0).map(() => randomInt(min, max));
  };


/**
 * Various string constants used in build string for generating passwords
* @typedef PWD_SYMBOLS_TYPE
* @type {PWD_SYMBOLS}
* @param {string} ALPHA Upper and lower case character from `a-z`
* @param {string} ALPHA_UPPER Upper cals characters `A-Z`
* @param {string} ALPHA_LOWER Lower cals characters `a-z`
* @param {string} NUM numbers from `0-9`
* @param {string} HEX numbers from `0-9` and letters `A-F`
* @param {string} SYMBOLS characters: `!"@#$%&/{}()[]=+?*<>,;.:-_`
* @param {string} SPECIAL characters `|`~^'`
* @param {string} WS White space character
* @param {string} B64 ALPHA symboles and `+/`
* @param {string} ENCRYPT_KEY ALPHA, NUM and `!%*@/?(+$&)`
* @const
*/
  const PWD_SYMBOLS = {
    ALPHA: '',
    ALPHA_UPPER: 'ABCDEFGHIJKLMNOPQURTUVWXYZ',
    ALPHA_LOWER: 'abcdefghigjlmnopqrstuvwxyz',
    NUM: '0123456789',
    HEX: '',
    SYMBOLS: '!"@#$%&/{}()[]=+?*<>,;.:-_',
    SPECIAL: '|`~^\'',
    WS: ' ',
    B64: '',
    ENCRYPT_KEY: '',
  };
  PWD_SYMBOLS.ALPHA = PWD_SYMBOLS.ALPHA_LOWER + PWD_SYMBOLS.ALPHA_UPPER;
  PWD_SYMBOLS.HEX = PWD_SYMBOLS.NUM + 'ACBDEF';
  PWD_SYMBOLS.b64 = PWD_SYMBOLS.ALPHA + PWD_SYMBOLS.NUM + '+/';
  PWD_SYMBOLS.ENCRYPT_KEY = PWD_SYMBOLS.ALPHA + PWD_SYMBOLS.NUM + '!%*@/?(+$&)';

  // * @param {Object} PWD_SYMBOLS Object that contains string to mix and match for password generation.

//@type {{ALPHA: string, ALPHA_UPPER: string, ALPHA_LOWER: string, NUM: string, HEX: string, SYMBOLS: string, SPECIAL: string, WS, string, B64: string,ENCRYPT_KEY, string }}


  /**
   * 
   * @param {number} length 
   * @param {KeygenJsOptions} opt
  
   */
  const randomPassword = (length, opt) => {
    let str = '';
    if (opt.alpha) {
      str += PWD_SYMBOLS.ALPHA;
    }
    if (opt.num) {
      str += PWD_SYMBOLS.NUM;
    }
    if (opt.symbols) {
      str += PWD_SYMBOLS.SYMBOLS;
    }
    if (opt.special) {
      str += PWD_SYMBOLS.SPECIAL;
    }
    if (opt.hex) {
      str += PWD_SYMBOLS.HEX;
    }
    if (opt.ws) {
      str += PWD_SYMBOLS.WS;
    }
    if (opt.b64) {
      str += PWD_SYMBOLS.B64;
    }
    if (opt.ekey) {
      str += PWD_SYMBOLS.ENCRYPT_KEY;
    }
        
    if (str.length === 0) {
      throw new RangeError('keygenJS: Selected options will not produce a password, Select at least one option to include');
    }
    // get the unique characters only from str.
    var unique = str.split('').filter(function (item, i, ar) { return ar.indexOf(item) === i; }).join('');
    const strLength = unique.length;

    let rndA = randomIntArray(length, 0, strLength - 1);
    let pwd = '';
    rndA.forEach(i => {
      pwd += unique.charAt(i);
    });
    return pwd;
  };
  /**
   * 
   * @param {KeygenJsOptions} defaultOptions 
   * @param {KeygenJsOptions} options 
   * @returns {KeygenJsOptions} result will merge options with defaultOptons with options overriding defaults
   */
  const getOptions = (defaultOptions, options) => {
    if (options === null || options === undefined ||
      typeof options === 'function') {
      return defaultOptions;
    }
    if (typeof options === 'boolean') {
      defaultOptions = Object.assign({}, defaultOptions);
      defaultOptions.hex = options;
      defaultOptions.num = false;
      defaultOptions.alpha = false;
      defaultOptions.symbols = false;
      defaultOptions.special = false;
      defaultOptions.ws = false;
      options = defaultOptions;
      return options;
    }
    if (options.alpha === undefined) {
      options.alpha = defaultOptions.alpha;
    }
    if (options.num === undefined) {
      options.num = defaultOptions.num;
    }
    if (options.symbols === undefined) {
      options.symbols = defaultOptions.symbols;
    }
    if (options.special === undefined) {
      options.special = defaultOptions.special;
    }
    if (options.hex === undefined) {
      options.hex = defaultOptions.hex;
    }
    if (options.ws === undefined) {
      options.ws = defaultOptions.ws;
    }
    if (options.b64 === undefined) {
      options.b64 = defaultOptions.b64;
    }
    if (options.ekey === undefined) {
      options.ekey = defaultOptions.ekey;
    }
    return options;
  };
  /**
   * @type {KeygenJsOptions}
   */
  const params = getOptions({
    alpha: true,
    num: true,
    symbols: false,
    special: false,
    hex: false,
    ws: false,
    b64: false,
    ekey: false
  }, opt);
  return randomPassword(length, params);
};

/**
 * Generates an ecryptoin key
 * @param {number} length The length of the key output
 * @param {boolean} [hex = false] If true value will be up out in hex; Otherwise, regurlar encryption values
 */
const generateEncryptionKey = (length, hex=false) => {
  /**
   * @type {KeygenJsOptions}
  * @param { KeygenJsOptions} opt -the options
  * @param { boolean } opt.alpha determins is alpha characters are to be used.
   */
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
KeygenJS.gen =keygenJS;
KeygenJS.genEncryptionKey = generateEncryptionKey;
export default KeygenJS;