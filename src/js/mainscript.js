const DEFAULT_MSG='Please enter encryption type';
const ENCRYPT_WRAP=67;
//#region encrypt/decrypt
/**
 * Encrypts plain and updates the value of cipher on the page
 */
function enc() {

    let tp = getMethodVal();
    let kk = getKeyVal();
    let pp = getPlainVal();
    let encrypted = null;
    let strArray = null;
    try {
        switch (tp) {

            case 'def':
                setChipherVal(DEFAULT_MSG);
                break;
            case 'aes':
                encrypted = CryptoJS.AES.encrypt(pp, kk);
                strArray = strBreaker(encrypted.toString(), { width: ENCRYPT_WRAP });
                setChipherVal(strArray.join('\n'));
                break;
            case '3des':
                encrypted = CryptoJS.DES.encrypt(pp, kk);
                strArray = strBreaker(encrypted.toString(), { width: ENCRYPT_WRAP });
                setChipherVal(strArray.join('\n'));
                break;
            case 'des':
                encrypted = CryptoJS.TripleDES.encrypt(pp, kk);
                strArray = strBreaker(encrypted.toString(), { width: ENCRYPT_WRAP });
                setChipherVal(strArray.join('\n'));
                break;
            case 'rc4':
                encrypted = CryptoJS.RC4.encrypt(pp, kk);
                strArray = strBreaker(encrypted.toString(), { width: ENCRYPT_WRAP });
                setChipherVal(strArray.join('\n'));
                break;
            case 'rb':
                encrypted = CryptoJS.Rabbit.encrypt(pp, kk);
                strArray = strBreaker(encrypted.toString(), { width: ENCRYPT_WRAP });
                setChipherVal(strArray.join('\n'));
                break;
            default:
                break;
        }
    } catch (error) {
        setChipherVal('Error occurred: Encryption failed...');
    }
    

}

/**
 * Decrypts the encrypted value of plain and populates the cipher field of the page
 */
function dec() {
    let tp = getMethodVal();
    let kk = getKeyVal();
    let pp = getPlainVal();
    let decrypted=null;
    try {
        switch (tp) {

            case 'def':
                setChipherVal(DEFAULT_MSG);
                break;
            case '3des':
                decrypted = CryptoJS.DES.decrypt(removeWs(pp), kk);
                setChipherVal((decrypted.toString(CryptoJS.enc.Utf8)));
                break;
            case 'des':
                decrypted = CryptoJS.TripleDES.decrypt(removeWs(pp), kk);
                setChipherVal((decrypted.toString(CryptoJS.enc.Utf8)));
                break;
            case 'aes':
                decrypted = CryptoJS.AES.decrypt(removeWs(pp), kk);
                setChipherVal((decrypted.toString(CryptoJS.enc.Utf8)));
                break;
            case 'rc4':
                decrypted = CryptoJS.RC4.decrypt(removeWs(pp), kk);
                setChipherVal((decrypted.toString(CryptoJS.enc.Utf8)));
                break;
            case 'rb':
                decrypted = CryptoJS.Rabbit.decrypt(removeWs(pp), kk);
                setChipherVal((decrypted.toString(CryptoJS.enc.Utf8)));
                break;
            default:
                break;
        }
    } catch (error) {
        setChipherVal('Error occurred: Decryption failed...');
    }
    
}
//#endregion

//#region region HASH functions
function sha1() {
    let pp = getPlainVal();
    let hash1 = CryptoJS.SHA1(pp);
    setChipherVal(hash1.toString(CryptoJS.enc.Hex));
}
function md() {
    let pp = getPlainVal();
    let hash = CryptoJS.MD5(pp);
    setChipherVal(hash.toString(CryptoJS.enc.Hex));
}

function sha3() {
    let pp = getPlainVal();
    let hash2 = CryptoJS.SHA3(pp, {outputLength: 224})
    setChipherVal(hash2.toString(CryptoJS.enc.Hex));
}
//#endregion

//#region read query string
/**
 * Reads values from query stringand populates values
 */
function selectFromQueryString() {
    selectEncFromQuery();
    getPlainFromQuery();
}
/**
 * Gets the value from query string and populates plain input
 */
function getPlainFromQuery() {
    let val = getParameterByName('val', null);
    if (!val) return;
    // do not replace + with spaces in this case when using decodeURIComponent
    setPlainVal(decodeURIComponent(val));
}
/**
 * Gets the enc value from query string and set the Algorithm option
 */
function selectEncFromQuery() {
    let enc = getParameterByName('enc', null);
    if (!enc) return;
    enc = enc.toLowerCase();
    switch (enc) {
        case 'aes':
            setMethodVal('aes');
            break;
        case '3des':
            setMethodVal('3des');
            break;
        case 'des':
            setMethodVal('des');
            break;
        case 'rc4':
            setMethodVal('rc4');
            break;
        case 'rb':
            setMethodVal('rb');
            break;
        default:
            setMethodVal('def');
            break;
    }
}
//#endregion

//#region Generate query string
/**
 * Generates a querystring of the current url, path, Encryption type, and results
 */
function genQuery() {
    let url = getUrlPath();
    url += '?enc=' + getMethodVal();
    url += '&val=' + encodeURIComponent(getChipherVal());
    setUrlVal(url);
}
/**
 * Gets the Protocol, hostname, port and path of current page.
 * Port is excluded if 80 or 443
 * @returns {string} Url with path (no query string)
 */
function getUrlPath() {
    // <protocol>//<hostname>:<port>/<pathname><search><hash>
    let pathname = window.location.pathname;
    let url = getUrlCurrent();
    if (pathname) {
        url += pathname;
    }
    return url;
}
/**
 * Gets the Protocol, hostname and port.
 * Port is excluded if 80 or 443
 * @returns {string} Url (no path or query string)
 */
function getUrlCurrent() {
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
}
//#endregion

//#region Get / Set Elements
/**
 * Gets the value of chipher readonl text area
 * @returns {string} value of cipher text area.
 */
function getChipherVal() {
    let el = getChipherEl();
    return el.value;
}
/**
 * Sets the value of chipher readonly text area
 * @param {string} str 
 */
function setChipherVal(str) {
    let el = getChipherEl();
    el.value = str;
}
/**
 * Gets the chipher text area element
 * @returns {HTMLHtmlElement} text area element
 */
function getChipherEl() {
    return document.getElementById("chipher");
}
/**
 * Gets the value of plain text area
 * @returns {string} value of cipher text area.
 */
function getPlainVal() {
    let el = getPlainEl();
    return el.value;
}
/**
 * Sets the value of plain text area
 * @param {string} str 
 */
function setPlainVal(str) {
    let el = getPlainEl();
    el.value = str;
}
/**
 * Gets the plain text area element
 * @returns {HTMLHtmlElement} text area element
 */
function getPlainEl() {
    return document.getElementById("plain");
}
/**
 * Gets the value of key input
 * @returns {string} value of cipher text area.
 */
function getKeyVal() {
    let el = getKeyEl();
    return el.value;
}
/**
 * Sets the value of key input
 * @param {string} str 
 */
function setKeyVal(str) {
    let el = getKeyEl();
    el.value = str;
}
/**
 * Gets the key input element
 * @returns {HTMLHtmlElement} text area element
 */
function getKeyEl() {
    return document.getElementById("key");
}
/**
 * Gets the value of method select element
 * @returns {string} value of cipher text area.
 */
function getMethodVal() {
    return document.getElementById("method").value;
}
/**
 * Sets the value of method select element
 * @param {string} str 
 */
function setMethodVal(str) {
    selectElement("method", str);
}


/**
 * Gets the value of url text area
 * @returns {string} value of cipher text area.
 */
function getUrlVal() {
    let el = getUrlEl();
    return el.value;
}
/**
 * Sets the value of url text area
 * @param {string} str 
 */
function setUrlVal(str) {
    let el = getUrlEl();
    el.value = str;
}
/**
 * Gets the url text area element
 * @returns {HTMLHtmlElement} text area element
 */
function getUrlEl() {
    return document.getElementById("url");
}
//#endregion

/**
 * Toggles the key field between password and text
 */
function togglePassword() {
    let  elKey = getKeyEl();
    if (elKey.type === "password") {
        elKey.type = "text";
    } else {
        elKey.type = "password";
    }
}

/**
 * Swaps the values of plain input and chipher value
 */
function swap() {
    let src = getPlainVal();
    let dst = getChipherVal();
    setChipherVal(src);
    setPlainVal(dst);
}


//#region Util Functions
/**
 * Set the selected value of a select element
 * @param {string} id the unique id of element
 * @param {string} valueToSelect the value to select
 */
function selectElement(id, valueToSelect) {
    let element = document.getElementById(id);
    element.value = valueToSelect;
}
/**
 * Removes spaces and new line characters from a string 
 * @param {string} str the value to remove white spaces from
 * 
 * @returns {string} with white space removed
 */
function removeWs(str) {
    let retval = str.replace(/\r?\n|\r/g, '')
        .replace(/\s+/g, '');
    return retval;
}

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
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
//#endregion

//#region UI
function uiRefresh() {
    uiChiperVal();
}
function uiChiperVal() {
    let str = getChipherVal();
    if (str) {
        document.getElementById('row_url').style.display = 'block';
        document.getElementById('row_chipher_btn').style.display = 'block';
    }
    else
    {
        document.getElementById('row_url').style.display = 'none';
        document.getElementById('row_chipher_btn').style.display = 'none';
    }
}
function uiBtnDl() {

}
//#endregion