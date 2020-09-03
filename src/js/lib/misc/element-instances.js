import {
  Element,
  InputElement,
  SelectElement,
  CheckElement,
  ButtonElement
} from "../class/element";


//#region url element
/**
 * Gets an instance that represents url element
 * @returns {InputElement}
 */
export const clUrl = () => {
  return InputElement.fromId('url');
};
//#endregion

//#region encrypted key
/**
 * Gets an instance that represents encrypted key element
 * @returns {InputElement}
 */
export const clEncKey = () => {
  return InputElement.fromId('enc_key');
};
//#endregion

//#region encrypted state
/**
 * Gets an instance that represents encrypted state element
 * @returns {InputElement}
 */
export const clEncState = () => {
  return InputElement.fromId('enc_state');
};
//#endregion

//#region Method Select Element
/**
 * Gets an instance that represents method select element
 * @returns {SelectElement}
 */
export const clMethod = () => {
  return SelectElement.fromId('method');
};
//#endregion

//#region key element
/**
 * Gets an instance that represents key element
 * @returns {InputElement}
 */
export const clKey = () => {
  return InputElement.fromId('key');
};
//#endregion

//#region plain text element
/**
 * Gets an instance that represents Plain element
 * @returns {InputElement}
 */
export const clPlain = () => {
  return InputElement.fromId('plain');
};
//#endregion

//#region chipher text element
/**
 * Gets an instance that represents chipher element
 * @returns {InputElement}
 */
export const clChipher = () => {
  return InputElement.fromId('chipher');
};
//#endregion

//#region Include Key checkbox element
/**
 * Gets an instance that represents include key checkbox element
 * @returns {CheckElement}
 */
export const clIncludeKey = () => {
  return CheckElement.fromId('chk_inckey');
};
//#endregion

//#region website text element
/**
 * Gets an instance that represents website element
 * @returns {InputElement}
 */
export const clWebsite = () => {
  return InputElement.fromId('website');
};
//#endregion

//#region name text element
/**
 * Gets an instance that represents name element
 * @returns {InputElement}
 */
export const clName = () => {
  return InputElement.fromId('name');
};
//#endregion

//#region include key checkbox element
/**
 * Gets an instance that represents include key checkbox element
 * @returns {CheckElement}
 */
export const clInculdeKey = () => {
  return CheckElement.fromId('chk_inckey');
};
//#endregion

//#region hex checkbox element
/**
 * Gets an instance that represents hex checkbox element
 * @returns {CheckElement}
 */
export const clHex = () => {
  return CheckElement.fromId('chk_hex');
};
//#endregion

//#region Found Images div Element
/**
 * Gets an instance that represents found images
 * @returns {Element}
 */
export const clImgages = () => {
  return Element.fromId('found_images');
};
//#endregion

//#region Found images Panel div element
/**
 * Gets an instance that represents Images panel
 * @returns {Element}
 */
export const clPanelImg = () => {
  return Element.fromId('found_img_pnl');
};
//#endregion

//#region found content div element
/**
 * Gets an instance that represents Content
 * @returns {Element}
 */
export const clContent = () => {
  return Element.fromId('found_content');
};
//#endregion

//#region Found Content Panel div element
/**
 * Gets an instance that represents Content panel
 * @returns {Element}
 */
export const clContentPanel = () => {
  return Element.fromId('found_content_pnl');
};
//#endregion

//#region Button Encrypt element
/**
 * Gets an instance that represents Encrypt Button
 * @returns {ButtonElement}
 */
export const clBtnEnc = () => {
  return ButtonElement.fromId('btnenc');
};
//#endregion

//#region Button Decrypt element
/**
 * Gets an instance that represents Decrypt Button
 * @returns {ButtonElement}
 */
export const clBtnDec = () => {
  return ButtonElement.fromId('btndec');
};
//#endregion

//#region Button Generate Url element
/**
 * Gets an instance that represents Generate Url Button
 * @returns {ButtonElement}
 */
export const clBtnGenUrl = () => {
  return ButtonElement.fromId('btngenq');
};
//#endregion

//#region Button swap element
/**
 * Gets an instance that represents Swap Button
 * @returns {ButtonElement}
 */
export const clBtnSwap = () => {
  return ButtonElement.fromId('btnswap');
};
//#endregion

//#region Alert div element
/**
 * Gets an instance that represents Alert Panel
 * @returns {Element}
 */
export const clAlert = () => {
  return Element.fromId('alert');
};
//#endregion