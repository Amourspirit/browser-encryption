const keygenJS = (length, opt) => {
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

  const PWD_SYMBOLS = {
    ALPHA: 'abcdefghigjlmnopqrstuvwxyzABCDEFGHIJKLMNOPQURTUVWXYZ',
    NUM: '0123456789',
    HEX: '0123458789ABCDEF',
    SYMBOLS: '!"@#$%&/{}()[]=+?*<>,;.:-_',
    SPECIAL: '|`~^\'',
    WS: ' ',
    B64: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
    ENCRYPT_KEY: 'abcdefghigjlmnopqrstuvwxyzABCDEFGHIJKLMNOPQURTUVWXYZ0123456789!%*@/?(+$&)',
  };

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
    const strLength = str.length;
    if (strLength === 0) {
      throw new RangeError('keygenJS: Selected options will not produce a password, Select at least one option to include');
    }
    let rndA = randomIntArray(length, 0, strLength - 1);
    let pwd = '';
    rndA.forEach(i => {
      pwd += str.charAt(i);
    });
    return pwd;
  };
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
export default keygenJS;