
//#region Classes
//#region   BasicElement Class
/**
 * Class that has a few helper methods for working with basic html elements
 */
export class BasicElement {
  /**
   * creates a new instace of class from using el
   * @param {HTMLElement} el 
   */
  constructor(el) {
    this._el = el;
  }
  get el() {
    return this._el;
  }
  /**
   * Gets inner html
   * @returns {string}
   */
  get() {
    return this._el.innerHTML;
  }

  /**
   * Sets inner html
   * @param {string} value
   */
  set(value) {
    this._el.innerHTML = value;
  }
  /**
   * Clears inner html of element
   */
  clear() {
    this._el.innerHTML = '';
  }

/**
 * Gets is the element exist on the page
 * @returns {boolean} true if element exist; Otherwise, false
 */
  exist() {
    if (this._el == null) {
      return false;
    }
    return true;
  }

  /**
  * Appends child html string
  * @param {string} htmlString Html string to append as child
  */
  appendHtml(htmlString) {
    this._el.appendChild(BasicElement.createHtmlFragment(htmlString));
  }

  /**
   * Static method to create class instance from id
   * @param {string} id the id of the element to load
   * @returns {BasicElement}
   */
  static fromId (id) {
    const el = document.getElementById(id);
    return new BasicElement(el);
  }


  /**
   * Creates an html fragment from html
   * @param {string} htmlStr string to of html
   * @returns {DocumentFragment}
   */
  static createHtmlFragment (htmlStr) {
    let frag = document.createDocumentFragment(),
      temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
      frag.appendChild(temp.firstChild);
    }
    return frag;
  }
}
//#endregion
//#region   DivElement Class
/**
 * Class that has a few helper methods for working with div html elements
 */
export class DivElement extends BasicElement {
  /**
   * 
   * @param {HTMLDivElement} el 
   */
  constructor(el) {
    super(el);
  }

  /**
   * Static method to create class instance from id
   * @param {string} id the id of the element to load
   * @returns {DivElement}
   */
  static fromId(id) {
    const el = document.getElementById(id);
    return new DivElement(el);
  }

}
//#endregion
//#region   TextElement Class
/**
 * Class that has a few helper methods for working with text html elements
 */
export class TextElement extends BasicElement {
  /**
   * 
   * @param {TextElement} el
   */
  constructor(el) {
    super(el);
  }

  /**
   * Gets value
   * @returns {string} element value
   */
  get() {
    return this._el.value;
  }

  /**
   * Sets value
   * @param {string} value
   */
  set(value) {
    this._el.value = value;
  }
  /**
   * Clears inner html of element
   */
  clear() {
    this._el.value = '';
  }
  /**
   * Static method to create class instance from id
   * @param {string} id the id of the element to load
   * @returns {TextElement}
   */
  static fromId(id) {
    const el = document.getElementById(id);
    return new TextElement(el);
  }

}
//#endregion
//#region   SelectElement Class
/**
 * Class that has a few helper methods for working with text html elements
 */
export class SelectElement extends TextElement {
  /**
   * 
   * @param {TextElement} el
   */
  constructor(el) {
    super(el);
  }

  /**
   * Static method to create class instance from id
   * @param {string} id the id of the element to load
   * @returns {SelectElement}
   */
  static fromId(id) {
    const el = document.getElementById(id);
    return new SelectElement(el);
  }

}
//#endregion
//#region   CheckElement Class
/**
 * Class that has a few helper methods for working with checkbox html elements
 */
export class CheckElement extends BasicElement {
  /**
   * 
   * @param {CheckElement} el
   */
  constructor(el) {
    super(el);
  }

  /**
   * Gets checked state of checkbox
   * @returns {boolean}
   */
  get() {
    const checkedValue = this._el.checked;
    if (checkedValue) {
      return true;
    }
    return false;
  }

  /**
   * Sets checked state
   * @param {boolean} value
   */
  set(value) {
    if (value) {
      this._el.checked = true;
    } else {
      this._el.checked = false;
    }
  }
  /**
   * Clears the checkbox. State will be un-checked
   */
  clear() {
    this.set(false);
  }
  /**
  * Inherited from BasicElement. Does nothing here
  * @param {string} htmlString
  */
  appendHtml(htmlString) {
    return;
  }

  /**
   * Static method to create class instance from id
   * @param {string} id the id of the element to load
   * @returns {SelectElement}
   */
  static fromId(id) {
    const el = document.getElementById(id);
    return new CheckElement(el);
  }

}
//#endregion
//#endregion
