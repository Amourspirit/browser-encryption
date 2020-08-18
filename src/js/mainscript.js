const DEFAULT_MSG='Please enter encryption type';
const ENCRYPT_WRAP=67;
const ENCRYPTED_STATE={
    NORMAL: 0,
    EMPTY: 1,
    ERR_NO_ENC: 102,
    ERR_GEN: 101
}
//#region encrypt/decrypt
/**
 * Encrypts plain and updates the value of cipher on the page
 */
const enc = () => {
    if (!hpTest()) {
        // honey pot test failed.
        setValChipher('');
        setValEncState(ENCRYPTED_STATE.EMPTY, false);
        return;
    }
    let pp = getValPlain();
    if (pp.length === 0) {
        setValChipher('');
        setValEncState(ENCRYPTED_STATE.EMPTY, false);
        return;
    }
    let tp = getValMethod();
    let kk = getValKey();
    let encrypted = null;
    let strArray = null;
    let success = false;
    try {
        switch (tp) {
            case 'aes':
                encrypted = CryptoJS.AES.encrypt(pp, kk);
                strArray = strBreaker(encrypted.toString(), { width: ENCRYPT_WRAP });
                setValChipher(strArray.join('\n'));
                success = true;
                break;
            case '3des':
                encrypted = CryptoJS.DES.encrypt(pp, kk);
                strArray = strBreaker(encrypted.toString(), { width: ENCRYPT_WRAP });
                setValChipher(strArray.join('\n'));
                success = true;
                break;
            case 'des':
                encrypted = CryptoJS.TripleDES.encrypt(pp, kk);
                strArray = strBreaker(encrypted.toString(), { width: ENCRYPT_WRAP });
                setValChipher(strArray.join('\n'));
                success = true;
                break;
            case 'rc4':
                encrypted = CryptoJS.RC4.encrypt(pp, kk);
                strArray = strBreaker(encrypted.toString(), { width: ENCRYPT_WRAP });
                setValChipher(strArray.join('\n'));
                success = true;
                break;
            case 'rb':
                encrypted = CryptoJS.Rabbit.encrypt(pp, kk);
                strArray = strBreaker(encrypted.toString(), { width: ENCRYPT_WRAP });
                setValChipher(strArray.join('\n'));
                success = true;
                break;
            default:
                // case def
                setValChipher(DEFAULT_MSG);
                setValEncState(ENCRYPTED_STATE.ERR_NO_ENC, false);
                break;
        }
    } catch (error) {
        setValChipher('Error occurred: Encryption failed...');
        setValEncState(ENCRYPTED_STATE.ERR_GEN, false);
    }
    if (success === true) {
        setValEncState(ENCRYPTED_STATE.NORMAL, true);
        setKeyHidden(null);
    }
}

/**
 * Decrypts the encrypted value of plain and populates the cipher field of the page
 */
const dec = () => {
    if (!hpTest()) {
        // honey pot test failed.
        setValChipher('');
        setValEncState(ENCRYPTED_STATE.EMPTY, false);
        return;
    }
    let pp = getValPlain();
    if (pp.length === 0) {
        setValChipher('');
        setValEncState(ENCRYPTED_STATE.EMPTY, false);
        return;
    }
    let tp = getValMethod();
    let kk = getValKey();
    let decrypted=null;
    let success = false;
    try {
        switch (tp) {
            case '3des':
                decrypted = CryptoJS.DES.decrypt(removeWs(pp), kk);
                setValChipher((decrypted.toString(CryptoJS.enc.Utf8)));
                success = true;
                break;
            case 'des':
                decrypted = CryptoJS.TripleDES.decrypt(removeWs(pp), kk);
                setValChipher((decrypted.toString(CryptoJS.enc.Utf8)));
                success = true;
                break;
            case 'aes':
                decrypted = CryptoJS.AES.decrypt(removeWs(pp), kk);
                setValChipher((decrypted.toString(CryptoJS.enc.Utf8)));
                success = true;
                break;
            case 'rc4':
                decrypted = CryptoJS.RC4.decrypt(removeWs(pp), kk);
                setValChipher((decrypted.toString(CryptoJS.enc.Utf8)));
                success = true;
                break;
            case 'rb':
                decrypted = CryptoJS.Rabbit.decrypt(removeWs(pp), kk);
                setValChipher((decrypted.toString(CryptoJS.enc.Utf8)));
                success = true;
                break;
            default:
                // case def
                setValChipher(DEFAULT_MSG);
                setValEncState(ENCRYPTED_STATE.ERR_NO_ENC, false);
                break;
        }
    } catch (error) {
        setValChipher('Error occurred: Decryption failed...');
        setValEncState(ENCRYPTED_STATE.ERR_GEN, false);
    }
    if (success === true) {
        setValEncState(ENCRYPTED_STATE.NORMAL, true);
        setKeyHidden(null);
    }
}
//#endregion

//#region region HASH functions
const sha1 = () => {
    let pp = getValPlain();
    let hash1 = CryptoJS.SHA1(pp);
    setValChipher(hash1.toString(CryptoJS.enc.Hex));
}
const md = () => {
    let pp = getValPlain();
    let hash = CryptoJS.MD5(pp);
    setValChipher(hash.toString(CryptoJS.enc.Hex));
}

const sha3 = () => {
    let pp = getValPlain();
    let hash2 = CryptoJS.SHA3(pp, {outputLength: 224})
    setValChipher(hash2.toString(CryptoJS.enc.Hex));
}
//#endregion

//#region read query string
/**
 * Reads values from query stringand populates values
 */
const selectFromQueryString = () => {
    /**
 * Gets the value from query string and populates plain input
 */
    const getPlainFromQuery = () => {
        let val = getParameterByName('val', null);
        if (!val) return;
        // do not replace + with spaces in this case when using decodeURIComponent
        setValPlain(val);
    }
    /**
 * Gets the value from query string and populates plain input
 */
    const getKeyFromQuery = () => {
        let key = getParameterByName('key', null);
        if (!key) return;
        // do not replace + with spaces in this case when using decodeURIComponent
        setValKey(key);
        setKeyHidden(key);
    }
    /**
 * Gets the enc value from query string and set the Algorithm option
 */
    const selectEncFromQuery = () => {
        let enc = getParameterByName('enc', null);
        if (!enc) return;
        enc = enc.toLowerCase();
        switch (enc) {
            case 'aes':
                setValMethod('aes');
                break;
            case '3des':
                setValMethod('3des');
                break;
            case 'des':
                setValMethod('des');
                break;
            case 'rc4':
                setValMethod('rc4');
                break;
            case 'rb':
                setValMethod('rb');
                break;
            default:
                setValMethod('def');
                break;
        }
    }
    selectEncFromQuery();
    getPlainFromQuery();
    getKeyFromQuery();
}
//#endregion

//#region Generate query string
/**
 * Generates a querystring of the current url, path, Encryption type, and results
 */
const genQuery = () => {
    const includeKey = () => {
        let checkedValue = document.getElementById('chk_inckey').checked;
        if (checkedValue) {
            return true;
        }
        return false;
    }
    let url = getUrlPath();
    url += '?enc=' + getValMethod();
    url += '&val=' + encodeURIComponent(getValChipher());
    if(includeKey()) {
        url += '&key=' + encodeURIComponent(getKeyHidden());
    }
    setValUrl(url);
}
/**
 * Gets the Protocol, hostname, port and path of current page.
 * Port is excluded if 80 or 443
 * @returns {string} Url with path (no query string)
 */
const getUrlPath = () => {
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
const getUrlCurrent = () => {
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
//#region Honey Pot

/**
 * Gets if honey pot fileds have been filled out.
 * AI's tend to fill out all fields.
 * @returns {boolean} True if non displayed fields are filled out; Otherwise, false.
 */
const hpTest = () => {
    let websiteEl = document.getElementById('website');
    if (!websiteEl) {
        return false;
    }
    let nameEl = document.getElementById('name');
    if (!nameEl) {
        return false;
    }
    let websiteValue = websiteEl.value;
    if (websiteValue.length !== 0) {
        return false;
    }
    let nameValue = nameEl.value;
    if (nameValue.length !== 0) {
        return false;
    }
    return true;
}
//#endregion

//#region Get / Set Elements
/**
 * Gets the value of chipher readonl text area
 * @returns {string} value of cipher text area.
 */
const getValEncState = () => {
    let el = document.getElementById("enc_state");
    return el.value;
}
/**
 * Sets the value of chipher readonly text area
 * @param {number} state A value of ENCODED_STATE
 * @param {boolean} validate Validate Encrypted Result if true; Otherwise ignore Encrypted state.
 */
const setValEncState = (state, validate) => {
    const _isValidateState = () => {
        let stateVal = getValChipher();
        return stateVal.length > 0;
    }
    if (!state) {
        state = ENCRYPTED_STATE.NORMAL;
    }
    if (validate) {
        if (! _isValidateState()) {
            state = ENCRYPTED_STATE.EMPTY;
        }
    }
    let el = document.getElementById("enc_state");
    el.value = state;
}
/**
 * Returns a boolean value if encrypted stated is valid.
 * Basically does result contain an encrypted string.
 */
const isValidEncState =() => {
    let el = document.getElementById("enc_state");
    if (! el) return false;
    let val = el.value;
    return val == 0;
}
/**
 * Gets the value of chipher readonl text area
 * @returns {string} value of cipher text area.
 */
const getValChipher = () => {
    let el = getElChipher();
    return el.value;
}
/**
 * Sets the value of chipher readonly text area
 * @param {string} str 
 */
const setValChipher = (str) => {
    let el = getElChipher();
    el.value = str;
}
/**
 * Gets the chipher text area element
 * @returns {HTMLHtmlElement} text area element
 */
const getElChipher = () => {
    return document.getElementById("chipher");
}
/**
 * Gets the value of plain text area
 * @returns {string} value of cipher text area.
 */
const getValPlain = () => {
    let el = getElPlain();
    return el.value;
}
/**
 * Sets the value of plain text area
 * @param {string} str 
 */
const setValPlain = (str) => {
    let el = getElPlain();
    el.value = str;
}
/**
 * Gets the plain text area element
 * @returns {HTMLHtmlElement} text area element
 */
const getElPlain = () => {
    return document.getElementById("plain");
}
/**
 * Gets the value of key input
 * @returns {string} value of cipher text area.
 */
const getValKey = () => {
    let el = getElKey();
    return el.value;
}
/**
 * Sets the value of key input
 * @param {string} str 
 */
const setValKey = (str) => {
    let el = getElKey();
    el.value = str;
}
/**
 * Gets the key input element
 * @returns {HTMLHtmlElement} text area element
 */
const getElKey = () => {
    return document.getElementById("key");
}
/**
 * Gets the value of method select element
 * @returns {string} value of cipher text area.
 */
const getValMethod = () => {
    return document.getElementById("method").value;
}
/**
 * Sets the value of method select element
 * @param {string} str 
 */
const setValMethod = (str) => {
    selectElement("method", str);
}
/**
 * Gets the value of url text area
 * @returns {string} value of cipher text area.
 */
const getValUrl = () => {
    let el = getElUrl();
    return el.value;
}
/**
 * Sets the value of url text area
 * @param {string} str 
 */
const setValUrl = (str) => {
    let el = getElUrl();
    el.value = str;
}
/**
 * Gets the url text area element
 * @returns {HTMLHtmlElement} text area element
 */
const getElUrl= () => {
    return document.getElementById("url");
}

//#endregion

//#region hidden key
/**
 * Sets an encrypted value for hidden field value for the current key param.
 * If key is null or undefined then the key defaults to the visible key field value
 * @param {string|null|undefined} key 
 */
const setKeyHidden = (key) => {
    if (key == null) {
        key = getValKey();
    }
    let encrypted = CryptoJS.AES.encrypt(key, RANDOM_INLINE_KEY);
    setValEncKey(encrypted.toString());
}
/**
 * Get the decrypted Hidden Key value
 */
const getKeyHidden = () => {
    let keyValue = getValEncKey();
    let decrypted = CryptoJS.AES.decrypt(keyValue, RANDOM_INLINE_KEY);
    return decrypted.toString(CryptoJS.enc.Utf8);
}
/**
 * Gets the value of hidden field enc_key
 * @returns {string} value of cipher text area.
 */
const getValEncKey = () => {
    let el = getElEncKey();
    return el.value;
}
/**
 * Sets the value of hidden field enc_key
 * @param {string} str 
 */
const setValEncKey = (str) => {
    let el = getElEncKey();
    el.value = str;
}
/**
 * Gets the hidden field enc_key element
 * @returns {HTMLHtmlElement} text area element
 */
const getElEncKey = () => {
    return document.getElementById("enc_key");
}
//#endregion

/**
 * Toggles the key field between password and text
 */
const togglePassword =() => {
    let  elKey = getElKey();
    if (elKey.type === "password") {
        elKey.type = "text";
    } else {
        elKey.type = "password";
    }
}

/**
 * Swaps the values of plain input and chipher value
 */
const swap = () => {
    let src = getValPlain();
    let dst = getValChipher();
    setValChipher(src);
    setValPlain(dst);
    setValEncState(null, true);
}


//#region Util Functions
/**
 * Set the selected value of a select element
 * @param {string} id the unique id of element
 * @param {string} valueToSelect the value to select
 */
const selectElement = (id, valueToSelect) => {
    let element = document.getElementById(id);
    element.value = valueToSelect;
}
/**
 * Removes spaces and new line characters from a string 
 * @param {string} str the value to remove white spaces from
 * 
 * @returns {string} with white space removed
 */
const removeWs = (str) => {
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
const getParameterByName = (name, url) => {
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
const uiRefresh =() => {
    const foundImgagesElId ='found_images';
    const foundLinksElId = 'found_links';
    const foundPanelImageElId = 'found_img_pnl';
    const foundPanelLinksElId = 'found_links_pnl';
    const thumbnailRowCount = 3;
    const create = (htmlStr) => {
        let frag = document.createDocumentFragment(),
            temp = document.createElement('div');
        temp.innerHTML = htmlStr;
        while (temp.firstChild) {
            frag.appendChild(temp.firstChild);
        }
        return frag;
    }
    /**
     * Process decrypted text for links and display links on page.
     * @param {string} str Decrypted text
     * @param {HTMLHtmlElement} el element that links will be appended
     * @returns {boolean} True if links are found and processed; Otherwise, false.
     */
    const processLinks = (str, el) => {
        // regex here captures spaces but sometimes spaces are in querystinrg
        let reUrl = /http(s)?:\/\/.(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b(.(?!\.jpg|\.png|\.gif|\.jpeg$))+$/gm;
        let resUrl = str.match(reUrl);
        el.innerHTML = '';
        let strMatchHtml = '';
        let retval = false;
        const panelSel = '#' + foundPanelLinksElId;
        if (resUrl) {
            strMatchHtml = '<ul>';
            resUrl.forEach(m => {
                strMatchHtml += '<li><a href="' + m + '" target="_blank">' + m + '</a></li>';
            });
            strMatchHtml += '</ul>';
            // match a url
            el.appendChild(create(strMatchHtml));
            // expand the area
            $(panelSel).collapse("show");
            retval = true;
        } else {
            $(panelSel).collapse("hide");
        }
        return retval;
    }
    /**
     * Add a single Image to element el
     * @param {HTMLHtmlElement} el the element to add image to
     * @param {string} url the url of the image to add.
     */
    const processImageSingle = (el, url) => {
        let strMatchHtml = '<a href="' + url + '" target="_blank">';
        strMatchHtml += '<img src="' + url + '" class="img-responsive center-block" alt="image">';
        strMatchHtml += '</a>'
        el.appendChild(create(strMatchHtml));
    }
    const procssImageMultiple = (el, matches) => {
        if (thumbnailRowCount > 12) {
            throw new Error('rowcount can not be greater than 12');
        }
        if (12 % thumbnailRowCount > 0) {
            throw new Error('rowcount must divide into 12 evenly');
        }
        let cellsPerRow = thumbnailRowCount;
        const useLazyLoad = typeof (observer) === 'object';
       
        if (matches.length < thumbnailRowCount && 12 % matches.length  === 0) {
            cellsPerRow = matches.length;
        }
        let rowInt = 12 / cellsPerRow;

        const createImageCell = (url) => {
            let html = '<div class="col-md-' + rowInt + '">';
            html += '<div class="thumbnail">';
            html += '<a href="' + url + '" target="_blank">';
            html += createImageHtml(url);
            html += '</a></div></div>';
            return html;
        }
        const createImageHtml = (url) => {
            let html = '<img ';
            if (useLazyLoad) {
                html += 'class="lozad" data-src="' + url + '"';
            } else {
                html += 'src="' + url + '"';
            }
            html += ' alt="" style="width:100%" />';
            return html;
        }
        const createEmptyCell = () => {
            let html = '<div class="col-md-' + rowInt + '"></div>';
            return html;
        }
        let j = 0;
        let quotient = Math.floor(matches.length / cellsPerRow);
        let remainder = matches.length % cellsPerRow;
        let rowCount = quotient;
        if (remainder > 0) {
            // add an extra row to handle odd number of images
            rowCount += cellsPerRow;
        }
        let html = '';
        // let rows = '';
        matches.forEach(m => {
            j ++;
            if (j === 1) {
                // create a new row
                html = '<div class="row">';
            }
            html += createImageCell(m);
            if (j === cellsPerRow) {
                j = 0;
                // row is complete close and add to el
                html += '</div>';
                // rows += html;
                el.appendChild(create(html));
            }
        });
        if (remainder > 0) {
            const emptyLoops = cellsPerRow - remainder;
            // add additional cells and close row
            for (let k = 0; k < emptyLoops; k++) {
                html += createEmptyCell();
            }
            html += '</div>';
            // rows += html;
            el.appendChild(create(html));
        }
        if (useLazyLoad) {
            observer.observe();
        }
    }
    /**
     * Process decrypted text for images and display links on page.
     * @param {string} str Decrypted text
     * @param {HTMLHtmlElement} el element that images will be appended
     * @returns {boolean} True if images are found and processed; Otherwise, false.
     */
    const processImages= (str, el) => {
        let reImage = /(https?:\/\/(?:[0-9A-Za-z\-]+\.)+[a-z]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|a?png|webp|svg))/gm;
        let resImg = str.match(reImage);
        el.innerHTML = '';
        let strMatchHtml = '';
        let retval = false;
        const panelSel = '#' + foundPanelImageElId;
        if (resImg) {
            if (resImg.length > 1) {
                procssImageMultiple(el, resImg);
            } else {
                processImageSingle(el, resImg[0]);
            }
            // expand the area
            $(panelSel).collapse("show");
            retval = true;
        } else {
            $(panelSel).collapse("hide");
        }
        return retval;
    }
    
    /**
     * Process Decrtypted value of chipher text area
     */
    const uiChiperVal = () => {
        let isValid = (getValEncState() == ENCRYPTED_STATE.NORMAL);
        let str = getValChipher();
        const linkEl = document.getElementById(foundLinksElId);
        const imgEl = document.getElementById(foundImgagesElId);
        const panelSelLinks = '#' + foundPanelLinksElId;
        const panelSelImages = '#' + foundPanelImageElId;
        if (isValid && str) {
            document.getElementById('row_url').style.display = 'block';
            document.getElementById('row_chipher_btn').style.display = 'block';
            processLinks(str, linkEl);
            processImages(str, imgEl);
        } else {
            document.getElementById('row_url').style.display = 'none';
            document.getElementById('row_chipher_btn').style.display = 'none';
            linkEl.innerHTML = '';
            imgEl.innerHTML = '';
            $(panelSelLinks).collapse("hide");
            $(panelSelImages).collapse("hide");
        }
    }
    
    uiChiperVal();
}
//#endregion

//#region Generate Key
const processKeygen = (length) => {
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
        }
        if (hex) {
            opt.hex = true;
        } else {
            opt.ekey = true;
        }
        return keygenJS(length, opt);
    }
    let checkedValue = document.getElementById('chk_hex').checked;
    let len = length / 8;
    let bHex = false;
    if(checkedValue) {
        len += len;
        bHex = true;
    }
    setValKey(generateEncKey(len, bHex));
}

//#endregion