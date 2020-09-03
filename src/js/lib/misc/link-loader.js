
import { getBreakPoints } from '../bs/bs';
// https://stackoverflow.com/questions/24923479/can-es6s-module-loader-also-load-assets-html-css

const getLink = (linkinfo, breakPoints) => {
  const link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = linkinfo.link;
  if (linkinfo.integrity) {
    const integrity = document.createAttribute("integrity");
    integrity.value = linkinfo.integrity;
    link.setAttributeNode(integrity);
  }
  if (linkinfo.crossorigin) {
    const crossorigin = document.createAttribute("crossorigin");
    crossorigin.value = linkinfo.crossorigin;
    link.setAttributeNode(crossorigin);
  }
  
  if ('media' in linkinfo && typeof linkinfo.media === 'string') {
    let mediaVal = '';
    if (linkinfo.media in breakPoints) {
      mediaVal = `all and (min-width:${breakPoints[linkinfo.media]})`;
    } else {
      mediaVal = linkinfo.media;
    }
    if (mediaVal.length > 0) {
      const attrMedia = document.createAttribute("media");
      attrMedia.value = mediaVal;
      link.setAttributeNode(attrMedia);
    }
  }
  return link;
};

/**
* Injects css links into the header of the document.
* @param {Array} cssObj Array of objects where each element in the array is the following format:
* {link: "./mycss.css", integrity: null, crossorigin: null}
*/
export const loadCSSLinks = (cssObj) => {
  const breakPoints = getBreakPoints();
  cssObj.map(linkinfo => {
    const link = getLink(linkinfo, breakPoints);
    document.getElementsByTagName("head")[0].appendChild(link);
  });
};

/**
 * Loads css links by reading json from url and loading the link data into the header of the page.
 * @param {string} jsonUrl URL to Json data
 */
export const loadCSSJson = (jsonUrl) => {
  fetch(jsonUrl)
    .then(res => res.json())
    .then((out) => {
      //console.log('Output: ', out);
      loadCSSLinks(out.imports);
    }).catch(/* err => console.error(err) */);
};

export const loadScriptsData = (data) => {
  if (data.imports.header) {
    loadJsLinks(data.imports.header);
  }
  if (data.imports.body) {
    loadJsLinks(data.imports.body, "body");
  }
};


export const loadCssData = (data) => {
  loadCSSLinks(data.imports);
};
/**
 * Loads css links by reading json from url and loading the link data into the header of the page.
 * @param {string} jsonUrl URL to Json data
 */
export const loadJsJson = (jsonUrl) => {
  if (out.imports.header) {
    loadJsLinks(out.imports.header);
  }
  if (out.imports.body) {
    loadJsLinks(out.imports.body, "body");
  }
  loadCSSLinks(out.imports);
  fetch(jsonUrl)
    .then(res => res.json())
    .then((out) => {
      //console.log('Output: ', out);
      if (out.imports.header) {
        loadJsLinks(out.imports.header);
      }
      if (out.imports.body) {
        loadJsLinks(out.imports.body, "body");
      }
      loadCSSLinks(out.imports);
    }).catch(/* err => console.error(err) */);
};

/**
* Injects script links into the header of the document.
* @param {Array} jsObj Array of objects where each element in the array is the following format:
* @param {string} [tag=head] Location to add such as head (default) or body
*
* {link: "./myjs.js", integrity: null, crossorigin: null}
*/
export const loadJsLinks = (jsObj, tag = "head") => {
  /**
* Load a css file into header of document.
* @param {string} linkinfo
*/
  const loadJs = (linkinfo) => {
    
    var link = document.createElement("script");
    link.src = linkinfo.link;
    if ('integrity' in linkinfo
      && typeof linkinfo.integrity === 'string'
      && linkinfo.integrity.length > 0) {
      const attrIntegrity = document.createAttribute("integrity");
      attrIntegrity.value = linkinfo.integrity;
      link.setAttributeNode(attrIntegrity);
    }
    if ('crossorigin' in linkinfo
      && typeof linkinfo.crossorigin === 'string'
      && linkinfo.crossorigin.length > 0) {
      const attrCrossorigin = document.createAttribute("crossorigin");
      attrCrossorigin.value = linkinfo.crossorigin;
      link.setAttributeNode(attrCrossorigin);
    }
   
    document.getElementsByTagName(tag)[0].appendChild(link);
  };
  jsObj.forEach(li => {
    loadJs(li);
  });
};