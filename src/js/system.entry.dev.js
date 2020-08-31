(function () {
  System.baseURL = "/";
  async function loadScripts() {
    await System.import("jquery");
    await System.import("bootstrap");
    const marked = await System.import("marked");
    window.marked = marked.default;
    const highlight = await System.import("highlight");
    if (window.hljs == null) {
      window.hljs = highlight;
    }
    await System.import("highlight-ahk");
    await System.import("highlight-vbscript");
    await System.import("highlight-vim");
    await System.import("bowser");
    // await System.import("strBreak");
    await System.import("main");
    await System.import("ekko-lightbox");
  }

  async function main() {
    await loadScripts();
    //console.log('Done loading scripts in order');
  }

  main();


}());