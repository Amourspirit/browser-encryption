import {
  DivElement,
  TextElement,
  SelectElement,
  CheckElement
} from "../class/element";


//#region url element
/**
 * Gets an instance that represents url element
 * @returns {TextElement}
 */
export const clUrl = () => {
  return TextElement.fromId('url');
};
//#endregion

//#region encrypted key
/**
 * Gets an instance that represents encrypted key element
 * @returns {TextElement}
 */
export const clEncKey = () => {
  return TextElement.fromId('enc_key');
};
//#endregion

//#region encrypted state
/**
 * Gets an instance that represents encrypted state element
 * @returns {TextElement}
 */
export const clEncState = () => {
  return TextElement.fromId('enc_state');
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
 * @returns {TextElement}
 */
export const clKey = () => {
  return TextElement.fromId('key');
};
//#endregion

//#region plain text element
/**
 * Gets an instance that represents Plain element
 * @returns {TextElement}
 */
export const clPlain = () => {
  return TextElement.fromId('plain');
};
//#endregion

//#region chipher text element
/**
 * Gets an instance that represents chipher element
 * @returns {TextElement}
 */
export const clChipher = () => {
  return TextElement.fromId('chipher');
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
 * @returns {TextElement}
 */
export const clWebsite = () => {
  return TextElement.fromId('website');
};
//#endregion

//#region name text element
/**
 * Gets an instance that represents name element
 * @returns {TextElement}
 */
export const clName = () => {
  return TextElement.fromId('name');
};
//#endregion

//#region include key checkbox element
/**
 * Gets an instance that represents include key checkbox element
 * @returns {TextElement}
 */
export const clInculdeKey = () => {
  return checked.fromId('chk_inckey');
};
//#endregion

//#region Found Images div Element
/**
 * Gets an instance that represents found images
 * @returns {DivElement}
 */
export const clImgages = () => {
  return DivElement.fromId('found_images');
};
//#endregion

//#region Found images Panel div element
/**
 * Gets an instance that represents Images panel
 * @returns {DivElement}
 */
export const clPanelImg = () => {
  return DivElement.fromId('found_img_pnl');
};
//#endregion

//#region found content div element
/**
 * Gets an instance that represents Content
 * @returns {DivElement}
 */
export const clContent = () => {
  return DivElement.fromId('found_content');
};
//#endregion

//#region Found Content Panel div element
/**
 * Gets an instance that represents Content panel
 * @returns {DivElement}
 */
export const clContentPanel = () => {
  return DivElement.fromId('found_content_pnl');
};
//#endregion
