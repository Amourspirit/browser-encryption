//#region Imports
import {
  Element,
  InputElement,
  SelectElement,
  CheckElement,
  ButtonElement
} from "../class/element";
//#endregion Imports

//#region Main Elements

//#region   Method Select Element
/**
 * Gets an instance that represents method select element  
 * This is the Select Algorithm
 * @returns {SelectElement}
 */
export const clMethod = () => {
  return SelectElement.fromId('method');
};
  //#endregion

//#region   key element
/**
 * Gets an instance that represents key element  
 * This is the key for encrypting and decrypting
 * @returns {InputElement}
 */
export const clKey = () => {
  return InputElement.fromId('key');
};
//#endregion

//#region   plain text element
/**
 * Gets an instance that represents Plain element  
 * This is the main input text area where encrypted an decrypt text is entered
 * @returns {InputElement}
 */
export const clPlain = () => {
  return InputElement.fromId('plain');
};
//#endregion

//#region   chipher text element
/**
 * Gets an instance that represents chipher element  
 * This is the readonly textarea where results of Plain input sendt when encrpted or decrypted
 * @returns {InputElement}
 */
export const clChipher = () => {
  return InputElement.fromId('chipher');
};
//#endregion

//#endregion Main Elements

//#region Generate Key

//#region   hex checkbox element
/**
 * Gets an instance that represents hex checkbox element  
 * Checkbox used in key generation.  
 * Sets is generated key should be a hex value or not
 * @returns {CheckElement}
 */
export const clHex = () => {
  return CheckElement.fromId('chk_hex');
};
//#endregion

//#region   Get instance of Generate Key Button
/**
 * Gets a button element whithin the generate key section.
 * @param {number} bit one of the following numbers 128, 266, 512, 1024, 2046, 4096
 * @return {ButtonElement} instance
 */
export const getClGenBitKey = (bit) => {
  const sel = 'btn_' + bit.toString() + 'bit';
  return ButtonElement.fromId(sel);
};
//#endregion Get instance of Generate Key Button

//#region   Generate Key Div container
/**
 * Gets an instance that represents the keygen div section  
 * @returns {Element}
 */
export const clKeyGenSection = () => {
  return Element.fromId('keygen_section');
};
//#endregion 

//#endregion Generate Key

//#region Generate URL
//#region   url element
/**
 * Gets an instance that represents url element  
 * This is the generated url text area that is readonly
 * 
 * @returns {InputElement}
 */
export const clUrl = () => {
  return InputElement.fromId('url');
};
//#endregion

//#region   Include Key checkbox element
/**
 * Gets an instance that represents include key checkbox element  
 * This is the checkbox that determines if the key should be included when generating a url
 * @returns {CheckElement}
 */
export const clIncludeKey = () => {
  return CheckElement.fromId('chk_inckey');
};
//#endregion

//#region Button Generate Url element
/**
 * Gets an instance that represents Generate Url Button  
 * This button when clicked generates a url from content
 * @returns {ButtonElement}
 */
export const clBtnGenUrl = () => {
  return ButtonElement.fromId('btngenq');
};
//#endregion
//#endregion Generate URL

//#region Hidden Elements
//#region   encrypted state
/**
 * Gets an instance that represents encrypted state element  
 * Hidden Element
 * @returns {InputElement}
 */
export const clEncState = () => {
  return InputElement.fromId('enc_state');
};
//#endregion

//#region   encrypted key
/**
 * Gets an instance that represents encrypted key element  
 * Hidden Element
 * @returns {InputElement}
 */
export const clEncKey = () => {
  return InputElement.fromId('enc_key');
};
//#endregion
//#endregion Hidden Elements

//#region Honey Pot
//#region   website text element
/**
 * Gets an instance that represents website element  
 * Fake Honey Potment input
 * @returns {InputElement}
 */
export const clWebsite = () => {
  return InputElement.fromId('website');
};
//#endregion

//#region name text element
/**
 * Gets an instance that represents name element  
 * Fake honey pot element
 * @returns {InputElement}
 */
export const clName = () => {
  return InputElement.fromId('name');
};
//#endregion
//#endregion Honey Pot

//#region Gallery
//#region   Found images Card div element
/**
 * Gets an instance that represents Images card Main Body section  
 * Div that represents that represents the main body of Card body for gallery
 * @returns {Element}
 */
export const clPanelImg = () => {
  return Element.fromId('found_img_pnl');
};
//#endregion

//#region   Found Images div Element
/**
 * Gets an instance that represents found images  
 * Found images div.  
 * This is where content is injected when images are found
 * @returns {Element}
 */
export const clImgages = () => {
  return Element.fromId('found_images');
};
//#endregion
//#endregion Gallery

//#region Found Content
//#region   found content div element
/**
 * Gets an instance that represents Content  
 * Found images div.
 * This is where content is injected when content is found.
 * This is usually displayd when output contains text that is not encrypted.
 * @returns {Element}
 */
export const clContent = () => {
  return Element.fromId('found_content');
};
//#endregion

//#region   Found Content Panel div element
/**
 * Gets an instance that represents Found content card Main Body section
 * Div that represents that represents the main body of Card body for found content
 * @returns {Element}
 */
export const clContentPanel = () => {
  return Element.fromId('found_content_pnl');
};
//#endregion
//#endregion  Found Content

//#region Buttons -- Encrypt, Decrypt, Swap

//#region   Button Encrypt element
/**
 * Gets an instance that represents Encrypt Button  
 * This button when clicked encryptes content
 * @returns {ButtonElement}
 */
export const clBtnEnc = () => {
  return ButtonElement.fromId('btnenc');
};
//#endregion

//#region   Button Decrypt element
/**
 * Gets an instance that represents Decrypt Button  
 * This button when clicked decrypts encrypted text
 * @returns {ButtonElement}
 */
export const clBtnDec = () => {
  return ButtonElement.fromId('btndec');
};
//#endregion

//#region   Button swap element
/**
 * Gets an instance that represents Swap Button  
 * This button when clicked swaps the plain text and the output area
 * @returns {ButtonElement}
 */
export const clBtnSwap = () => {
  return ButtonElement.fromId('btnswap');
};
//#endregion
//#endregion

//#region Messages
//#region   Alert div element
/**
 * Gets an instance that represents Alert div  
 * This is the div where alerts are injected that are bs4  
 * @returns {Element}
 */
export const clAlert = () => {
  return Element.fromId('alert');
};
//#endregion
//#endregion Messages

