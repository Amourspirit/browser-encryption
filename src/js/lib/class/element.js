
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
   * Hides the element ( display: none )
   */
  hide() {
    this._el.style.display = "none";
  }
  /**
   * Shows the element
   */
  show() {
    this._el.style.display = "";
  }

  /**
  * Appends child html string
  * @param {string} htmlString Html string to append as child
  */
  appendHtml(htmlString) {
    this._el.appendChild(BasicElement.createHtmlFrag(htmlString));
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
  static createHtmlFrag (htmlStr) {
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
 * Class that has a few helper methods for working with html elements
 * Use with normal inline elements such as p, span, div etc
 */
export class Element extends BasicElement {
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
   * @returns {Element}
   */
  static fromId(id) {
    const el = document.getElementById(id);
    return new Element(el);
  }

}
//#endregion
//#region   InputElement Class
/**
 * Class that has a few helper methods for working with text html elements
 */
export class InputElement extends BasicElement {
  /**
   * 
   * @param {InputElement} el
   */
  constructor(el) {
    super(el);
  }

  /**
   * Gets value ( value attribute )
   * @returns {string} element value
   */
  get() {
    return this._el.value;
  }

  /**
   * Sets value ( value attribute )
   * @param {string} value
   */
  set(value) {
    this._el.value = value.toString();
  }
  /**
   * Clears value ( value attribute )
   */
  clear() {
    this.set('');
  }
  /**
   * Static method to create class instance from id
   * @param {string} id the id of the element to load
   * @returns {InputElement}
   */
  static fromId(id) {
    const el = document.getElementById(id);
    return new InputElement(el);
  }

}
//#endregion
//#region   SelectElement Class
/**
 * Class that has a few helper methods for working with text html elements
 */
export class SelectElement extends InputElement {
  /**
   * 
   * @param {InputElement} el
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
//#region   InputElement Class
/**
 * Class that has a few helper methods for working with text html elements
 */
export class ButtonElement extends BasicElement {
  /**
   * 
   * @param {InputElement} el
   */
  constructor(el) {
    super(el);
  }

  /**
   * Gets value of the button ( value attribute )
   * @returns {string} element value
   */
  get() {
    return this._el.getAttribute("value");
  }

  /**
   * Sets value of the button ( value attribute )
   * @param {string} value
   */
  set(value) {
    this._el.setAttribute("value", value.toString());
  }
  /**
   * Clears Value of button ( value attribute )
   */
  clear() {
    this.set('');
  }
  /**
   * Sets the text or Html of the button
   * @param {string} value 
   */
  setHtml(value) {
    const val = value.toString();
    // setting value differs in different browser
    // setting innerHTML fails on some older browsers if it is set more than once
    while (this._el.firstChild) {
      this._el.removeChild(this._el.lastChild);
    }
    this._el.appendChild(BasicElement.createHtmlFrag(val));
  }
  /**
   * Gets the button inner html
   */
  getHtml() {
    return this._el.innerHTML;
  }
  /**
   * Sets the disabled state of the button
   * @param {boolean} value
   */
  set disabled(value) {
    this._el.disabled = value;
  }
  /**
   * Gets if the button is disabled
   * @returns {boolean}
   */
  get disabled() {
    if(this._el.disable) {
      return false;
    }
    return true;
  }
  
  /**
   * Static method to create class instance from id
   * @param {string} id the id of the element to load
   * @returns {ButtonElement}
   */
  static fromId(id) {
    const el = document.getElementById(id);
    return new ButtonElement(el);
  }

}
//#endregion

//#endregion