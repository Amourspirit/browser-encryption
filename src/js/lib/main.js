/*
 *  Main JavaScript 
 */
// let RANDOM_INLINE_KEY = '';
define([
    'jquery',
    'methods',
    'keygen',
    'inject',
    'lazy-lozad',
    'dom-purify',
    'marked',
    'bootstrap-detect-breakpoint',
    'ekko-lightbox'
], function ($, methods, keygenJS, injectHtmlJs, lozad, purify) {
    'use strict';

    if (window.lozad == null) {
        window.lozad = lozad;
    }
    // if (window.methods == null) {
    //     window.methods = methods;
    // }
    if (window.DOMPurify == null) {
        window.DOMPurify = purify;
    }

    const initCommon = () => {
        // if (!!window.performance && window.performance.navigation.type === 2) {
        //     // value 2 means "The page was accessed by navigating into the history"
        //     console.log('Reloading');
        //     window.location.reload(); // reload whole page

        // }
        // window.onpageshow = function (event) {
        //     if (event.persisted) {
        //         window.location.reload();
        //     }
        // };
        $(document).ready(function () {
  
            //methods.windowResize(bootstrapDetectBreakpoint());
            var e = document.getElementById("refreshed");
            // console.log("refreshed Value:", e.value);
            if (e.value == "no") {
                e.value = "yes";
            } else {
                e.value = "no"; 
                //location.reload();
            }
        });
         
        window.RANDOM_INLINE_KEY = keygenJS(256, {
            ekey: true
        });
        marked.setOptions({
            renderer: new marked.Renderer(),
            highlight: function (code, language) {
                // const hljs = require('highlight.js');
                const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
                return hljs.highlight(validLanguage, code).value;
            },
        });
        window.observer = lozad(); // lazy loads elements with default selector as '.lozad'
        window.observer.observe();
        if (typeof (DOMPurify) === 'function') {
            window.USE_PURIFY = true;
        } else {
            window.USE_PURIFY = false;
        }
        if (typeof (observer) === 'object') {
            window.USE_LAZY_LOAD = true;
        } else {
            window.USE_LAZY_LOAD = false;
        }

        // window.USE_LAZY_LOAD = true;
        // window.USE_PURIFY = true;
        // $("#reset").click(function(){
        //     $("#main-form")[0].reset();
        // });
        injectHtmlJs();
        // setHeader();
        //  setSignature();
        methods.selectFromQueryString();
        // setSorceCodeLink();
        // $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="tooltip"]').tooltip({
            trigger: 'hover'
        })  
        $("#chipher").on("change", function () {
            methods.uiRefresh();
        });
        $(".btn_refresh").on("click", function () {
            methods.uiRefresh();
            // clear any generate url value when buttons have been clicked
            methods.setValUrl('');
        });
        $('.collapse-links').on("click", function () {
            const el = $('.collapse-links>span.glyph-toggle');
            if (el.length > 0) {
                if ($(this).hasClass("collapsed")) {
                    el.removeClass("oi-chevron-bottom");
                    el.addClass("oi-chevron-top");
                } else {
                    el.removeClass("oi-chevron-top");
                    el.addClass("oi-chevron-bottom");
                }
            }
        });
        $('.collapse-content').on("click", function () {
            const el = $('.collapse-content>span.glyph-toggle');
            if (el.length > 0) {
                if ($(this).hasClass("collapsed")) {
                    el.removeClass("oi-chevron-bottom");
                    el.addClass("oi-chevron-top");
                } else {
                    el.removeClass("oi-chevron-top");
                    el.addClass("oi-chevron-bottom");
                }
            }
        });
        $('.collapse-imgages').on("click", function () {
            const el = $('.collapse-imgages>span.glyph-toggle');
            if (el.length > 0) {
                if ($(this).hasClass("collapsed")) {
                    el.removeClass("oi-chevron-bottom");
                    el.addClass("oi-chevron-top");
                } else {
                    el.removeClass("oi-chevron-top");
                    el.addClass("oi-chevron-bottom");
                }
            }
        });
        $('.collapse-form').on("click", function () {
            const el = $('.collapse-form>span.glyph-toggle');
            if (el.length > 0) {
                if ($(this).hasClass("collapsed")) {
                    el.removeClass("oi-chevron-bottom");
                    el.addClass("oi-chevron-top");
                } else {
                    el.removeClass("oi-chevron-top");
                    el.addClass("oi-chevron-bottom");
                }
            }
        });
        $(document).on("click", '[data-toggle="lightbox"]', function (event) {
            event.preventDefault();
            $(this).ekkoLightbox();
        });
        $('#myModal').on('shown.bs.modal', function () {
            $("#markdown").val(function () {
                return $("#plain").val();
            });
            // # Marked in browser\n\nRendered by **marked**.
            const html = marked($("#markdown").val());
            const clean = DOMPurify.sanitize(html);
            $(".marked-content").html($(clean).lazyLoadExt());
            $('#markdown').trigger('focus')
            window.observer.observe();
        })
        $('#edit_plain_md').on('click', function (event) {
            event.preventDefault();
            $("#markdown").val(function () {
                return $("#plain").val();
            });
            // # Marked in browser\n\nRendered by **marked**.
            const html = marked($("#markdown").val());
            const clean = DOMPurify.sanitize(html);
            $(".marked-content").html($(clean).lazyLoadExt());
            $('#myModal').modal('show');
            $('#markdown').trigger('focus');
            window.observer.observe();

        })
        /**
         * Bind the makrdown textarea and updated the makrked-content to reflect the makred up html version.
         */
        $('#markdown').bind('input propertychange', function () {
            // set the content of the marked-content element to the makred up value
            const html = marked($("#markdown").val());
            const clean = DOMPurify.sanitize(html);
            $(".marked-content").html($(clean).lazyLoadExt());
            window.observer.observe();
        });
        $("#modal_save_changes, #modal_save_changes_header").on("click", function (event) {
            $("#plain").val($("#markdown").val());
            $("#markdown").val('');
            $('#myModal').modal('hide');
        });
        /**
         * Monitor .makred-content and when there is a change mark all a tags to open in a new window.
         */
        $('.marked-content, #found_content').bind('DOMSubtreeModified', function (event) {
            // for found and marked up links open in a new window/tab
            // $('.marked-content a, #found_content a').each(function () {
            //     $(this).attr('target', '_blank');
            // });
            $('.marked-content, #found_content').newWindow();
            // add img-fluid bootstarp class to content where necessary
            // this stops the images from extencing beyond their container
            // $('.marked-content img, #found_content img').each(function () {
            //     $(this).addClass("img-fluid");

            // });
            $('.marked-content, #found_content').bsResponsive();
        });
        const injectFavIcon = () => {
            let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
            let pathname = window.location.pathname;
            let fav = pathname;

            fav += 'favicon.ico';
            link.type = 'image/x-icon';
            link.rel = 'shortcut icon';
            link.href = fav;
            document.getElementsByTagName('head')[0].appendChild(link);
            // let protocol = window.location.protocol;
            // let hostname = window.location.hostname;
            // let port = window.location.port;
            // let url = protocol + '//' + hostname;
            // if (port && port !== '80' && port !== '443') {
            //     url += ':' + port;
            // }
            // url += pathname;
            // let metaImage = document.querySelector("meta[property='og:image']") || document.createElement('meta');
            // metaImage.setAttribute('property', 'og:image');
            // metaImage.content = url + "img/pg_img.jpg";
            // document.getElementsByTagName('head')[0].appendChild(metaImage);
        }
        const bsSizeChange = (arg) => {
            if (arg ==  null) {
                arg = { index: 0 };
            }
            if (arg.index > 3) {
                $(".button-group").removeClass(function (index, className) {
                    return (className.match(/(^|\s)btn-group[a-z\-]+/g) || []).join(' ');
                }).addClass("btn-group-lg");
                // $(".button-group").addClass("btn-group-lg");
            } else if (arg.index === 3) {
                $(".button-group").removeClass(function (index, className) {
                    return (className.match(/(^|\s)btn-group[a-z\-]+/g) || []).join(' ');
                });
            } else if (arg.index === 2) {
                $(".button-group").removeClass(function (index, className) {
                    return (className.match(/(^|\s)btn-group[a-z\-]+/g) || []).join(' ');
                }).addClass("btn-group-sm");
            } else {
                $(".button-group").removeClass(function (index, className) {
                    return (className.match(/(^|\s)btn-group[a-z\-]+/g) || []).join(' ');
                }).addClass("btn-group-vertical").addClass("btn-group-vert-wide");
            }
        }
        $(document).on("bsSizeChanaged", function (event, arg1, arg2) {
            // console.log(event.data.foo); // "bar"
           bsSizeChange(arg2);
        });
        injectFavIcon();
        bsSizeChange(bootstrapDetectBreakpoint());
        methods.uiRefresh();
    }
    return initCommon;
});