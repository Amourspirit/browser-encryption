import {
  clImgages,
  clPanelImg,
  clContent,
  clContentPanel,
  clChipher,
  clEncState
} from './element-instances';
import { Element } from '../class/element';
import { ENCRYPTED_STATE_NORMAL } from '../crypt/crypt';
import { isStringEncrypted } from './util';
//#region UI
/**
 * Refresh the Page elements and converts text from markdown to html.
 * Creates a photo gallery if text contains images.
 * @returns {void}
 * 
 */
export const RefreshUi = () => {
  let lzy = (window.USE_LAZY_LOAD != null);
  let observe = null;
  if(lzy === true) {
    observe = window.observer.observe;
  }

  let isValidContent = (clEncState().get() == ENCRYPTED_STATE_NORMAL);
  const strCv = clChipher().get();
  isValidContent = isValidContent && (!isStringEncrypted(strCv));

  const thumbnailRowCount = 3;
  const changeStateCardImg = (state) => {
    const panelEl = clPanelImg().el;
    if (state === 'show') {
      $(".card-img").show();
      $(panelEl).collapse("show");
    } else {
      $(panelEl).collapse("hide");
      $(".card-img").hide();
    }
  };
  const changeStateCardContent = (state) => {
    const panelEl = clContentPanel().el;
    if (state === 'show') {
      $(".card-content").show();
      $(panelEl).collapse("show");
    } else {
      $(panelEl).collapse("hide");
      $(".card-content").hide();

    }
  };

  const createImageHtmlBs4 = (url) => {
    let html = '<img ';
    if (window.USE_LAZY_LOAD) {
      html += 'class="lozad gen-image" data-src="' + url + '"';
    } else {
      html += 'class="gen-image" src="' + url + '"';
    }
    html += ' alt="" class="img-fluid rounded" alt="" style="width:100%"/>';
    return html;
  };
  const createImageCellBs4 = (url, col) => {

    let html = '<div class="col-md-' + col + '">';
    html += '<a href="' + url + '" data-toggle="lightbox" data-gallery="gallery">';
    html += createImageHtmlBs4(url);
    html += '</a></div>';
    return html;
  };
  /**
   * Add a single Image to element el
   * @param {Element} dv the element to add image to
   * @param {string} url the url of the image to add.
   */
  const processImageSingle = (dv, url) => {
    // margin top right bottom left
    let html = '<div class="row" style="margin: 0.938rem -1.125rem 0.938rem -1.125rem;">';
    html += createImageCellBs4(url, 12);
    html += '</div>';
    dv.appendHtml(html);
    // elFoundImages.appendHtml(html, dv);
  };
  /**
   * Process multiple images
   * @param {Element} dv 
   * @param {Array} matches 
   */
  const procssImageMultiple = (dv, matches) => {
    // filter matches to only display unique images.
    const unique = matches.filter((v, i, a) => a.indexOf(v) === i);
    if (thumbnailRowCount > 12) {
      throw new Error('rowcount can not be greater than 12');
    }
    if (12 % thumbnailRowCount > 0) {
      throw new Error('rowcount must divide into 12 evenly');
    }
    let cellsPerRow = thumbnailRowCount;

    if (unique.length < thumbnailRowCount && 12 % unique.length === 0) {
      cellsPerRow = unique.length;
    }
    let rowInt = 12 / cellsPerRow;



    const createEmptyCell = () => {
      let html = '<div class="col-md-' + rowInt + '"></div>';
      return html;
    };
    let j = 0;
    let quotient = Math.floor(unique.length / cellsPerRow);
    let remainder = unique.length % cellsPerRow;
    let rowCount = quotient;
    if (remainder > 0) {
      // add an extra row to handle odd number of images
      rowCount += cellsPerRow;
    }
    let html = '';
    // let rows = '';
    unique.forEach(m => {
      j++;
      if (j === 1) {
        // create a new row
        html = '<div class="row" style="margin: 0.938rem -0.938rem 0.938rem -0.938rem;">';
      }
      html += createImageCellBs4(m, rowInt);
      if (j === cellsPerRow) {
        j = 0;
        // row is complete close and add to el
        html += '</div>';
        // rows += html;
        dv.appendHtml(html);
        //elFoundImages.appendHtml(html, dv);
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
      dv.appendHtml(html);
      // elFoundImages.appendHtml(html, dv);
    }
    if (lzy === true) {
      observe();
    }
  };
  /**
   * Process decrypted text for images and display links on page.
   * @param {string} str Decrypted text
   * @param {Element} de element that images will be appended
   * @returns {boolean} True if images are found and processed; Otherwise, false.
   */
  const processImages = (str, de) => {
    // let reImage = /(https?:\/\/(?:[0-9A-Za-z\-]+\.)+[a-z]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|a?png|webp|svg))/gm;
    // let reImage = /((?:https?\:\/\/)(?:[a-zA-Z]{1}(?:[\w\-]+\.)+(?:[\w]{2,5}))(?:\:[\d]{1,5})?\/(?:[^\s\/]+\/)*(?:[^\s]+\.(?:jpe?g|gif|png))(?:\?\w+=\w+(?:&\w+=\w+)*)?)/gm;
    let reImage = /(?:https?\:\/\/)([a-zA-Z0-9][a-zA-Z0-9-_]*\.)*[a-zA-Z0-9]*[a-zA-Z0-9-_]*[[a-zA-Z0-9]+\/(?:[^\s\/]+\/)*(?:[^\s]+\.(?:jpe?g|gif|png|webp|svg|apng))(?:\?\w+=\w+(?:&\w+=\w+)*)?/gm;
    let resImg = str.match(reImage);
    de.clear();
    // elFoundImages.clear(de);
    let retval = false;

    if (resImg) {
      if (resImg.length > 1) {
        procssImageMultiple(de, resImg);
      } else {
        processImageSingle(de, resImg[0]);
      }
      // expand the area
      changeStateCardImg("show");
      retval = true;
    } else {
      changeStateCardImg("hide");
    }
    return retval;
  };


  /**
   * Process Decrtypted value of chipher text area
   */
  const uiChiperVal = () => {
    let isValid = (clEncState().get() == ENCRYPTED_STATE_NORMAL);
    let str = clChipher().get();
    
    // const panelSelImages = '#' + foundPanelImageElId;
    const dv = clImgages();
    if (isValid && str) {
      $("#row_url").show();
      $("#row_chipher_btn").show();
      if (processImages(str, dv) && lzy === true) {
        observe();
      }
    } else {
      $("#row_url").hide();
      $("#row_chipher_btn").hide();
      dv.clear();
      $(clPanelImg().el).collapse("hide");
    }
  };
  const processContent = () => {
    const cPanel = clContent();
    cPanel.clear();
    let str = strCv;
    if (isValidContent) {
      let html = marked(str);
      if (window.USE_PURIFY) {
        html = DOMPurify.sanitize(html);
      }
      // set links to open in new window.
      // html = $(html).newWindow().html();
      if (window.USE_LAZY_LOAD) {
        //html = $(html).bsResponsive().html();
        let ll = $(html).lazyLoadExt().bsResponsive().newWindow();
        $(cPanel.el).append(ll);
      } else {
        $(cPanel.el).append($(html).bsResponsive().newWindow());
      }
      changeStateCardContent("show");
      if (lzy === true) {
        observe();
      }
    } else {
      changeStateCardContent("hide");
    }
  };
  uiChiperVal();
  processContent();
};

//#endregion
