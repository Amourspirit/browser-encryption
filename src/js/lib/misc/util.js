import { stringBreaker, splitByOpt } from 'string-breaker';
/**
 * Gets if a string is encrypted or not.
 * @param {string} str the string to test
 * @returns {boolean} True if str is encrypted text; Otherwise false.
 * 
 * This is a specific test. If str contains any char ( other than new line) it will fail test.
 */
export const isStringEncrypted = (str) => {
  if (str == null) {
    return false;
  }
  const strTest = str.trim();
  if (strTest.length === 0) {
    return false;
  }
  const strArr = stringBreaker(strTest, { splitOpt: splitByOpt.line });
  const regx = /^[a-zA-Z0-9+/=]+$/;
  let regexFailed = false;
  for (let i = 0; i < strArr.length; i++) {
    const ln = strArr[i];
    if (regx.test(ln) === false) {
      regexFailed = true;
      break;
    }
  }
  return !regexFailed;
};

/**
 * Removes spaces and new line characters from a string 
 * @param {string} str the value to remove white spaces from
 * 
 * @returns {string} with white space removed
 */
export const removeWs = (str) => {
  let retval = str.replace(/\r?\n|\r/g, '')
    .replace(/\s+/g, '');
  return retval;
};