import $ from 'jquery';
import plugin from './jqplugin.js';
/**
 * jQuery Plugin finds child elements in element param and adds a class
 */
class bsResponsive {
  /**
   * 
   * @param {Element} element this element will find all child elemets matching options.query. 
   * @param {object} options Default: {query: 'img', class: 'img-fluid'}
   */
  constructor(element, options) {
    const $element = $(element);
    $element.find(options.query).each(function (index, value) {
      $(value).addClass(options.class);
    });

  }
}
bsResponsive.DEFAULTS = {
  class: 'img-fluid',
  query: 'img'
};

/**
 * JQuery plugin, finds child elements in element param, removes src and replaces it with data-src. Adds a class for layzy loading
 */
class lazyLoadExt {
  /**
   * 
   * @param {Element} element this element will find all child elemets matching options.query.
   * @param {Object} options Default {class: 'lozad', query: 'img'}
   */
  constructor(element, options) {
    const $element = $(element);
    $element.find(options.query).each(function (index, value) {
      const $el = $(value);
      let src = $el.attr('src');
      $el.removeAttr('src');
      $el.attr('data-src', src);
      $el.addClass(options.class);
    });
  }
}
lazyLoadExt.DEFAULTS = {
  query: 'img',
  class: 'lozad',
};

/**
 * JQuery plugin that finds child elements within element and applies and attribute and a value.
 */
class newWindow {
  /**
   * 
   * @param {Element} element this element will find all child elemets matching options.query.
   * @param {*} options Default: {query: 'a', attr: 'target', value: '_blank'}
   */
  constructor(element, options) {
    const $element = $(element);
    $element.find(options.query).each(function (index, value) {
      $(value).attr(options.attr, options.value);
    });
  }
}

newWindow.DEFAULTS = {
  query: 'a',
  attr: 'target',
  value: '_blank'
};

plugin('bsResponsive', bsResponsive);
plugin('lazyLoadExt', lazyLoadExt);
plugin('newWindow', newWindow);
