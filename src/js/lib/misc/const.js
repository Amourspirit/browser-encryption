//#region Error Codes
/**
 * Used for errors with the result was empty
 * @type {string}
 * @const
 */
export const ERR_EMPTY = 'E_1000';
/**
 * Used for errors with the result a bad format
 * @type {string}
 * @const
 */
export const ERR_FORMAT_BAD = 'E_1100';
//#endregion

//#region Encryption specific
/**
 * This is a special constant.  
 * It determinst the wrap for he encrypted results that willl be displayd in the output.
 * @type {number}
 * @const
 */
export const ENCRYPT_WRAP = 67;
/**
 * Used for errors related to honey pot
 * @type {string}
 * @const
 */
export const ENC_ERR_HP = 'E_100';
/**
 * Used for errors related to decryption failing
 * @type {string}
 * @const
 */
export const ENC_ERR_DEC_FAIL = 'E_201';
/**
 * Used for errors related to encryption empty vales
 * @type {string}
 * @const
 */
export const ENC_ERR_EMPTY = 'E_202';
/**
 * Used for errors related to encryptons / decryption failing due to no valid option sucha as AES or 3DES
 * @type {string}
 * @const
 */
export const ENC_ERR_OPTION_FAIL = 'E_203';
/**
 * Used for errors related to encryption failing
 * @type {string}
 * @const
 */
export const ENC_ERR_ENC_FAIL = 'E_210';
export const ENC_STATE_NORMAL = 0;
//#endregion