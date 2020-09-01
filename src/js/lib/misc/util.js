/**
 * Gets if a string is encrypted or not.
 * @param {string} str 
 * @returns {boolean} True if str is encrypted text; Otherwise false.
 * 
 * This is best guess by searching for spaces in str.
 */
export const isStringEncrypted = (str) => {
  if (str == null) {
    return false;
  }
  const strTest = str.trim();
  if (strTest.length === 0) {
    return false;
  }
  let index = strTest.indexOf(" ");
  if (index >= 0) {
    return false;
  }
  return true;
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