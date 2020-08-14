const DEFAULT_MSG='Please enter encryption type';
const ENCRYPT_WRAP=76;

// encryption function
function enc() {

    let tp = document.getElementById('method').value;
    let kk = document.getElementById("key").value;
    let pp = document.getElementById("plain").value;
    let encrypted = null;
    let strArray = null;
    switch (tp) {

        case 'def':
            document.getElementById("chipher").value = DEFAULT_MSG;
            break;
        case 'aes':
            encrypted = CryptoJS.AES.encrypt(pp, kk);
            strArray = strBreaker(encrypted.toString(), { width: ENCRYPT_WRAP });
            document.getElementById("chipher").value = strArray.join('\n');
            break;
        case 'des':

            encrypted = CryptoJS.TripleDES.encrypt(pp, kk);
            strArray = strBreaker(encrypted.toString(), { width: ENCRYPT_WRAP });
            document.getElementById("chipher").value = strArray.join('\n');
            break;
        case 'rc4':
            encrypted = CryptoJS.RC4.encrypt(pp, kk);
            strArray = strBreaker(encrypted.toString(), { width: ENCRYPT_WRAP });
            document.getElementById("chipher").value = strArray.join('\n');
            break;
        case 'rb':
            encrypted = CryptoJS.Rabbit.encrypt(pp, kk);
            strArray = strBreaker(encrypted.toString(), { width: ENCRYPT_WRAP });
            document.getElementById("chipher").value = strArray.join('\n');
            break;
        default:
            break;
    }

}

// decryption function

function dec() {
    let tp = document.getElementById('method').value;
    let kk = document.getElementById("key").value;
    let pp = document.getElementById("plain").value;
    let decrypted=null;
    switch (tp) {

        case 'def':
            document.getElementById("chipher").value = DEFAULT_MSG;
            break;
        case 'des':
            decrypted = CryptoJS.TripleDES.decrypt(removeWs(pp), kk);
            document.getElementById("chipher").value = (decrypted.toString(CryptoJS.enc.Utf8));
            break;
        case 'aes':
            decrypted = CryptoJS.AES.decrypt(removeWs(pp), kk);
            document.getElementById("chipher").value = (decrypted.toString(CryptoJS.enc.Utf8));
            break;
        case 'rc4':
            decrypted = CryptoJS.RC4.decrypt(removeWs(pp), kk);
            document.getElementById("chipher").value = (decrypted.toString(CryptoJS.enc.Utf8));
            break;
        case 'rb':
            decrypted = CryptoJS.Rabbit.decrypt(removeWs(pp), kk);
            document.getElementById("chipher").value = (decrypted.toString(CryptoJS.enc.Utf8));
            break;
        default:
            break;
    }
}

// HASH functions
function sha1() {
    let pp = document.getElementById("plain").value;
    let hash1 = CryptoJS.SHA1(pp);
    document.getElementById("chipher").value = hash1.toString(CryptoJS.enc.Hex);
}
function md() {
    let pp = document.getElementById("plain").value;
    let hash = CryptoJS.MD5(pp);
    document.getElementById("chipher").value = hash.toString(CryptoJS.enc.Hex);
}

function sha3() {
    let pp = document.getElementById("plain").value;
    let hash2 = CryptoJS.SHA3(pp, {outputLength: 224})
    document.getElementById("chipher").value = hash2.toString(CryptoJS.enc.Hex);
}
// Util Functions
function removeWs(str) {
    let retval = str.replace(/\r?\n|\r/g, '')
        .replace(/\s+/g, '');
    return retval;
}