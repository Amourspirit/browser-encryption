//#region  imports
import $ from 'jquery';
import './jq.ext.js';
import keygenJS from './keygen';
import DOMPurify from 'dom-purify';
import lozad from 'lozad';
import methods from './methods';
import injectHtmlJs from './inject';
import marked from 'marked';
import {
    ERR_EMPTY,
    ERR_FORMAT_BAD,
    ENC_ERR_HP,
    ENC_ERR_DEC_FAIL,
    ENC_ERR_ENC_FAIL,
    ENC_ERR_EMPTY,
    ENC_ERR_OPTION_FAIL
} from './misc/const';
import {
    clUrl,
    clBtnEnc,
    clBtnDec,
    clBtnSwap,
    clBtnGenUrl,
    clKey,
    clChipher,
    clPlain,
    clIncludeKey,
    getClGenBitKey,
    clKeyGenSection
} from './misc/element-instances';
import {
    Encrypt as enc,
    Decrypt as dec,
    setOutEncDecResult
} from './crypt/crypt';
import './short/shorten';
import './ui/inputEvents';
//#endregion

// const $ = jQuery;

const initCommon = () => {
    //#region Window Globals
    if (window.lozad == null) {
        window.lozad = lozad;
    }

    if (window.DOMPurify == null) {
        window.DOMPurify = DOMPurify;
    }
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
    //#endregion
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

    /**
     * Gets a url for an assec from the 
     * @param {string} key 
     */
    const getMappedUrl = (key) => {
        let result = '';
        $.ajax({
            url: 'assets/ajax/map.json',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            async: false,
            cache: true,
            customKey: key
        }).done(function (data) {
            result = data[this.customKey];
        })
            .fail(function () {
                // console.log("error");
            })
            .always(function () {
                // console.log("complete");
            });
            return result;
    };
    /**
     * Collapes the keygen_section button area
     */
    const collapsButtenArea = () => {
        $(clKeyGenSection().el).collapse("hide");
    };
    const initJqMethods = () => {

        //#region Clipboard
        $("#copy-plain").on("click", function (e) {
            e.preventDefault();
            if (clPlain().get() === '') {
                $.getJSON(getMappedUrl('t_clip2'), function (data) {
                    $.toast(data);
                });
            } else {
                methods.copyPlain();
                $.getJSON(getMappedUrl('t_clip1'), function (data) {
                    $.toast(data);
                });
            }
        });

        $("#copy-url").on("click",function (e) {
            e.preventDefault();
            if (clUrl().get() === '') {
                $.getJSON(getMappedUrl('t_clip2'), function (data) {
                    $.toast(data);
                });
            } else {
                methods.copyUrl();
                $.getJSON(getMappedUrl('t_clip1'), function (data) {
                    $.toast(data);
                });
            }
        });

        $("#copy-key").on("click", function (e) {
            e.preventDefault();
            if (clKey().get() === '') {
                $.getJSON(getMappedUrl('t_clip2'), function (data) {
                    $.toast(data);
                });
            } else {
                methods.copyKey();
                $.getJSON(getMappedUrl('t_clip1'), function (data) {
                    $.toast(data);
                });
            }
        });

        $("#copy-out").on("click", function (e) {
            e.preventDefault();
            if (clChipher().get() === '') {
                $.getJSON(getMappedUrl('t_clip2'), function (data) {
                    $.toast(data);
                });
            } else {
                methods.copyChipher();
                $.getJSON(getMappedUrl('t_clip1'), function (data) {
                    $.toast(data);
                });
            }
        });
        //#endregion

        //#region Button Group Generate Keys
        $(getClGenBitKey(64).el).on("click", function () {
            methods.processKeygen(64);
            collapsButtenArea();
        });
        $(getClGenBitKey(128).el).on("click", function () {
            methods.processKeygen(128);
            collapsButtenArea();
        });
        $(getClGenBitKey(256).el).on("click",function () {
            methods.processKeygen(256);
            collapsButtenArea();
        });
        $(getClGenBitKey(512).el).on("click", function () {
            methods.processKeygen(512);
            collapsButtenArea();
        });
        $(getClGenBitKey(1024).el).on("click", function () {
            methods.processKeygen(1024);
            collapsButtenArea();
        });
        $(getClGenBitKey(2048).el).on("click", function () {
            methods.processKeygen(2048);
            collapsButtenArea();
        });
        $(getClGenBitKey(4096).el).on("click",function () {
            methods.processKeygen(4096);
            collapsButtenArea();
        });
        //#endregion

        //#region  Misc jQuery
        // $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="tooltip"]').tooltip({
            trigger: 'hover'
        });
        $("#chipher").on("change", function () {
            methods.uiRefresh();
        });
        $("#btn_manual").on("click", function (params) {
            const $this = $('#user_manual');
            if ($this.data('cload') === undefined || $this.data("cload") === false) {
                $this.load(getMappedUrl('h_uman'), function () {
                    $this.data('cload', true);
                    $this.collapse('toggle');
                });
            } else {
                $this.collapse('toggle');
            }
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
            const html = marked.marked($("#markdown").val());
            const clean = DOMPurify.sanitize(html);
            $(".marked-content").html($(clean).lazyLoadExt().bsResponsive().newWindow());
            $('#markdown').trigger('focus');
            window.observer.observe();
        });
        $('#edit_plain_md').on('click', function (event) {
            event.preventDefault();
            $("#markdown").val(function () {
                return $("#plain").val();
            });
            // # Marked in browser\n\nRendered by **marked**.
            const html = marked.marked($("#markdown").val());
            const clean = DOMPurify.sanitize(html);
            $(".marked-content").html($(clean).lazyLoadExt().bsResponsive().newWindow());
            $('#myModal').modal('show');
            $('#markdown').trigger('focus');
            window.observer.observe();

        });

        /**
    * Bind the makrdown textarea and updated the makrked-content to reflect the makred up html version.
    */
        $('#markdown').on('change keyup paste input', function () {
            // set the content of the marked-content element to the makred up value
            const html = marked.marked($("#markdown").val());
            const clean = DOMPurify.sanitize(html);
            $(".marked-content").html($(clean).lazyLoadExt().bsResponsive().newWindow());
            window.observer.observe();
        });
        $("#modal_save_changes, #modal_save_changes_header").on("click", function (event) {
            $("#plain").val($("#markdown").val()).trigger('change');
            $("#markdown").val('').trigger('change');
            $('#myModal').modal('hide');
        });

        $(window).on('resize', function () {
            methods.windowResize();
        });
        $(document).on("bsSizeChanaged", function (event, arg1, arg2) {
            bsSizeChange(arg2);
        });

        /**
     * Monitor .makred-content and when there is a change mark all a tags to open in a new window.
     */
 
        //#endregion

    };

    /**
     * Prevents elemet from having a double click.
     * @param {string|HTMLElement} selector if string must be conplete selector such as #mybtn or .copy-btns
     */
    const jqPrevendDbClick = (selector) => {
        $(selector).on('dblclick', function (e) {
            /*  Prevents default behaviour and bubbling  */
            e.preventDefault();
            e.stopPropagation();
            return;
        });
    };
    const scrollToElement = (jqSelector) => {
        var target = $(jqSelector);
        if (target.length && target.is(":visible")) {
            $('html,body').animate({
                scrollTop: target.offset().top
            }, 1000);
            return false;
        }
    };
    const contentEncrypt = () => {
        const cBtnEnc = clBtnEnc();
        if (cBtnEnc.exist() === false) {
            return;
        }
        const $this = $(cBtnEnc.el);
        $this.on("click", function () {
            try {
                clChipher().clear();
                setOutEncDecResult(enc(), false);
                if (clKey().get() === "") {
                    $.getJSON(getMappedUrl("t_e_miss"), function (data) {
                        $.toast(data);
                    });
                }
            } catch (err) {
                const errMsg = err.message;
                switch (errMsg) {
                    case ENC_ERR_EMPTY:
                        $.getJSON(getMappedUrl("t_e_p_e"), function (data) {
                            $.toast(data);
                        });
                        break;
                    case ENC_ERR_OPTION_FAIL:
                        $.getJSON(getMappedUrl("t_m_no"), function (data) {
                            $.toast(data);
                        });
                        break;
                    case ENC_ERR_ENC_FAIL:
                    case ERR_EMPTY:
                        $.getJSON(getMappedUrl("t_e_e"), function (data) {
                            $.toast(data);
                        });
                        break;
                    case ENC_ERR_HP:
                    default:
                        break;
                }
                methods.uiRefresh();
            }
        });
    };

    const contentDecrypt = () => {
        const cBtnDec = clBtnDec();
        if (cBtnDec.exist() === false) {
            return;
        }
        $(cBtnDec.el).on("click", function () {
            try {
                clChipher().clear();
                setOutEncDecResult(dec(), true);
                scrollToElement("#card_content");
            } catch (err) {
                const errMsg = err.message;
                switch (errMsg) {
                    case ENC_ERR_EMPTY:
                        $.getJSON(getMappedUrl("t_d_p_no"), function (data) {
                            $.toast(data);
                        });
                        break;
                    case ENC_ERR_OPTION_FAIL:
                        $.getJSON(getMappedUrl("t_m_n_s"), function (data) {
                            $.toast(data);
                        });
                        break;
                    case ENC_ERR_DEC_FAIL:
                        const cKey = clKey();
                        if (cKey.get() === "") {
                            $.getJSON(getMappedUrl("t_k_m"), function (data) {
                                $.toast(data);
                            });
                            break;
                        }
                        // CryptJS had a issue, likley a bad key
                        $.getJSON(getMappedUrl("t_d_ge"), function (data) {
                            $.toast(data);
                        });
                        break;
                    case ERR_FORMAT_BAD:
                        // the input contained bad char such as space
                        $.getJSON(getMappedUrl("t_d_ne"), function (data) {
                            $.toast(data);
                        });
                        break;
                    case ERR_EMPTY:
                        $.getJSON(getMappedUrl("t_d_nr"), function (data) {
                            $.toast(data);
                        });
                        break;
                    case ENC_ERR_HP:
                    default:
                        break;
                }
            }
        });
    };
    const contentDecryptScroll = () => {
        const cBtnDec = clBtnDec();
        if (cBtnDec.exist() === false) {
            return;
        }
        $(cBtnDec.el).on("click", function () {
            scrollToElement("#card_content");
        });
    };
    const contentSwap = () => {
        const cBtnSwap = clBtnSwap();
        if (cBtnSwap.exist() === false) {
            return;
        }
        $(cBtnSwap.el).on("click", function () {
            methods.swap();
        });
    };
    const buttonsRefresh = () => {
        $(".btn_refresh").on("click", function () {
            methods.uiRefresh();
            // clear any generate url value when buttons have been clicked
            $(clUrl().el).val('').trigger('change');
        });
    };
    const buttonGenUrlOnclick = () => {
        const cBtnGenUrl = clBtnGenUrl();
        if (cBtnGenUrl.exist() === false) {
            return;
        }
        $(cBtnGenUrl.el).on("click", function () {
            if (methods.isChipherEnc() === false) {
                $.getJSON(getMappedUrl("t_lne"), function (data) {
                    $.toast(data);
                });
                return;
            }

            if (clIncludeKey().get() === true) {
                $.getJSON(getMappedUrl("t_lik"), function (data) {
                    $.toast(data);
                });
            }
            methods.genQuery();
        });
    };
    //The following is depreciated $(document).ready(function () {
    $(function () {
        //methods.windowResize(bootstrapDetectBreakpoint());
        var e = document.getElementById("refreshed");
        // console.log("refreshed Value:", e.value);
        if (e.value == "no") {
            e.value = "yes";
        } else {
            e.value = "no";
            //location.reload();
        }
        contentEncrypt();
        contentDecrypt();
        contentSwap();
        buttonsRefresh();
        buttonGenUrlOnclick();
        // contentDecryptScroll must come afte buttonsRefresh for event order
        contentDecryptScroll();
        methods.windowResize();
        methods.uiRefresh();
        initJqMethods();
        jqPrevendDbClick('.copy_icon');
        jqPrevendDbClick('button');
        // console.log(getMappedUrl('t_clip1'));
    });


    window.RANDOM_INLINE_KEY = keygenJS.gen(256, {
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

    const injectFavIcon = () => {
        let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        let fav = location.pathname.substr(0, location.pathname.lastIndexOf('/'));
        fav += '/favicon.ico';
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
    };

    const bsSizeChange = (arg) => {
        if (arg == null) {
            arg = { index: 1 };
        }
        if (arg.index > 3) { // xl
            $(".button-group").removeClass(function (index, className) {
                return (className.match(/(^|\s)btn-group[a-z\-]+/g) || []).join(' ');
            }).addClass("btn-group-lg");
            // $(".button-group").addClass("btn-group-lg");
        } else if (arg.index === 3) { // lg
            $(".button-group").removeClass(function (index, className) {
                return (className.match(/(^|\s)btn-group[a-z\-]+/g) || []).join(' ');
            });
        } else if (arg.index === 2) { // md
            $(".button-group").removeClass(function (index, className) {
                return (className.match(/(^|\s)btn-group[a-z\-]+/g) || []).join(' ');
            }).addClass("btn-group-sm");
        } else { // sm, xs
            $(".button-group").removeClass(function (index, className) {
                return (className.match(/(^|\s)btn-group[a-z\-]+/g) || []).join(' ');
            }).addClass("btn-group-vertical").addClass("btn-group-vert-wide");
        }
    };

    injectFavIcon();

};
export default initCommon;
