const DEFAULT_MSG='Please enter encryption type';
const ENCRYPT_WRAP=67;
const ENCRYPTED_STATE={
    NORMAL: 0,
    EMPTY: 1,
    ERR_NO_ENC: 102,
    ERR_GEN: 101
}
/**
 * See : https://github.com/cure53/DOMPurify
 */
// const USE_PURIFY = typeof (DOMPurify) === 'function';
// const USE_LAZY_LOAD = typeof (observer) === 'object';
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
    // const clean = DOMPurify.sanitize(html);
    if (window.USE_PURIFY) {
        pp = DOMPurify.sanitize(pp);
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
    let decrypted = null;
    let success = false;
    let strUtf8 = null;
    try {
        switch (tp) {
            case '3des':
                decrypted = CryptoJS.DES.decrypt(removeWs(pp), kk);
                strUtf8 = decrypted.toString(CryptoJS.enc.Utf8);
                if (window.USE_PURIFY) {
                    strUtf8 = DOMPurify.sanitize(strUtf8);
                }
                setValChipher(strUtf8);
                success = true;
                break;
            case 'des':
                decrypted = CryptoJS.TripleDES.decrypt(removeWs(pp), kk);
                strUtf8 = decrypted.toString(CryptoJS.enc.Utf8);
                if (window.USE_PURIFY) {
                    strUtf8 = DOMPurify.sanitize(strUtf8);
                }
                setValChipher(strUtf8);
                success = true;
                break;
            case 'aes':
                decrypted = CryptoJS.AES.decrypt(removeWs(pp), kk);
                strUtf8 = decrypted.toString(CryptoJS.enc.Utf8);
                if (window.USE_PURIFY) {
                    strUtf8 = DOMPurify.sanitize(strUtf8);
                }
                setValChipher(strUtf8);
                success = true;
                break;
            case 'rc4':
                decrypted = CryptoJS.RC4.decrypt(removeWs(pp), kk);
                strUtf8 = decrypted.toString(CryptoJS.enc.Utf8);
                if (window.USE_PURIFY) {
                    strUtf8 = DOMPurify.sanitize(strUtf8);
                }
                setValChipher(strUtf8);
                success = true;
                break;
            case 'rb':
                decrypted = CryptoJS.Rabbit.decrypt(removeWs(pp), kk);
                strUtf8 = decrypted.toString(CryptoJS.enc.Utf8);
                if (window.USE_PURIFY) {
                    strUtf8 = DOMPurify.sanitize(strUtf8);
                }
                setValChipher(strUtf8);
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
    let encodedStr = encodeURIComponent(getValChipher());
    // replace brackets ( and ) wiht %28 and %29 respectivly.
    // this is not absoultly necessary but links such as markdonw does not link () in links.
    encodedStr = encodedStr.replace(/\(/g,'%28')
        .replace(/\)/g,'%29');
    url += '&val=' + encodedStr
    if(includeKey()) {
        let keyStr = encodeURIComponent(getKeyHidden());
        keyStr = keyStr.replace(/\(/g, '%28')
            .replace(/\)/g, '%29');
        url += '&key=' + keyStr;
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
    const foundPanelImageElId = 'found_img_pnl';
    const foundContentContentElId ="found_content";
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
               
        if (matches.length < thumbnailRowCount && 12 % matches.length  === 0) {
            cellsPerRow = matches.length;
        }
        let rowInt = 12 / cellsPerRow;

        const createImageCellBs4 = (url) => {
            let html = '<div class="col-md-' + rowInt + '">';
            html += '<a href="' + url + '" data-toggle="lightbox" data-gallery="gallery">';
            html += createImageHtmlBs4(url);
            html += '</a></div>';
            return html;
        }
        const createImageHtmlBs4 = (url) => {
            let html = '<img ';
            if (window.USE_LAZY_LOAD) {
                html += 'class="lozad" data-src="' + url + '"';
            } else {
                html += 'src="' + url + '"';
            }
            html += ' alt="" class="img-fluid rounded" alt="" style="width:100%"/>';
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
                html = '<div class="row" style="margin: 15px;">';
            }
            html += createImageCellBs4(m);
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
        if (window.USE_LAZY_LOAD) {
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
        // let reImage = /(https?:\/\/(?:[0-9A-Za-z\-]+\.)+[a-z]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|a?png|webp|svg))/gm;
        // let reImage = /((?:https?\:\/\/)(?:[a-zA-Z]{1}(?:[\w\-]+\.)+(?:[\w]{2,5}))(?:\:[\d]{1,5})?\/(?:[^\s\/]+\/)*(?:[^\s]+\.(?:jpe?g|gif|png))(?:\?\w+=\w+(?:&\w+=\w+)*)?)/gm;
        let reImage = /(?:https?\:\/\/)([a-zA-Z0-9][a-zA-Z0-9-_]*\.)*[a-zA-Z0-9]*[a-zA-Z0-9-_]*[[a-zA-Z0-9]+\/(?:[^\s\/]+\/)*(?:[^\s]+\.(?:jpe?g|gif|png|webp|svg|apng))(?:\?\w+=\w+(?:&\w+=\w+)*)?/gm;
        let resImg = str.match(reImage);
        el.innerHTML = '';
        let retval = false;
        const panelSel = '#' + foundPanelImageElId;
        if (resImg) {
            if (resImg.length > 1) {
                procssImageMultiple(el, resImg);
            } else {
                processImageSingle(el, resImg[0]);
            }
            // expand the area
            $(".card-img").show();
            $(panelSel).collapse("show");
            retval = true;
        } else {
            $(panelSel).collapse("hide");
            $(".card-img").hide();
        }
        return retval;
    }
    
    /**
     * Process Decrtypted value of chipher text area
     */
    const uiChiperVal = () => {
        let isValid = (getValEncState() == ENCRYPTED_STATE.NORMAL);
        let str = getValChipher();
        const imgEl = document.getElementById(foundImgagesElId);
        const panelSelImages = '#' + foundPanelImageElId;
        if (isValid && str) {
            $("#row_url").show();
            $("#row_chipher_btn").show();
            processImages(str, imgEl);
        } else {
            $("#row_url").hide();
            $("#row_chipher_btn").hide();
            imgEl.innerHTML = '';
            $(panelSelImages).collapse("hide");
        }
    }
    const processContent = () => {
        let isValid = (getValEncState() == ENCRYPTED_STATE.NORMAL);
        let str = getValChipher();
        const contentEl = document.getElementById(foundContentContentElId);
        contentEl.innerHTML = '';
        if (isValid && str) {
            let html = marked(str);
            if (window.USE_PURIFY) {
                html = DOMPurify.sanitize(html);
            }
            // set links to open in new window.
            // html = $(html).newWindow().html();
            if (window.USE_LAZY_LOAD ){
                //html = $(html).bsResponsive().html();
                let ll = $(html).lazyLoadExt();
                $(contentEl).append(ll);
            } else {
                contentEl.innerHTML = html;
            }
            
            $(".card-content").show();
            $("#found_content_pnl").collapse("show");
            if (window.USE_LAZY_LOAD) {
                window.observer.observe();
            }
        } else {
            contentEl.innerHTML = '';
            $("#found_content_pnl").collapse("hide");
            $(".card-content").hide();
            
        }
    }
    uiChiperVal();
    processContent();
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
const windowResize =(obj) => {
    // console.log('Bootstarp Changed: ', obj);
    window.BS_SIZE_INDEX = obj.index;
    // console.log('window.BS_SIZE_INDEX: ', window.BS_SIZE_INDEX);
    // console.log('window.BS_SIZE_INDEX_PRV: ', window.BS_SIZE_INDEX_PRV);
    if (!window.BS_SIZE_INDEX_PRV) {
        window.BS_SIZE_INDEX_PRV = window.BS_SIZE_INDEX;
        $(document).trigger("bsSizeChanaged", [window.BS_SIZE_INDEX, obj]);
    }
    if (window.BS_SIZE_INDEX !== window.BS_SIZE_INDEX_PRV) {
        // console.log('Bootstarp Changed: ', obj);
        $(document).trigger("bsSizeChanaged", [window.BS_SIZE_INDEX, obj]);
        window.BS_SIZE_INDEX_PRV = window.BS_SIZE_INDEX;
    }
}
//#endregion