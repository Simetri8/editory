import _ from 'lodash';
import { Promise } from 'bluebird';
import FileSaver from 'file-saver';
import jQuery from 'jquery';
import JSZip from 'jszip';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ColorHelper from './Mathcha/ColorHelper';
import DocumentDownloader from './DocumentDownloader';
import FontCssData from './Font/FontCssData';
import GuidGenerator from './GuidGenerator';
import MathGlobal from './MathGlobal';
import MathmlElementGenerator from './Mathcha/MathmlElementGenerator';
import MathmlGenerator from './Mathcha/MathmlGenerator';
import ModelFontAnalyzer from './ModelFontAnalyzer';
import TextUtils from './Editor/TextUtils';
import VectorFontLoader from './Font/VectorFontLoader';

/// xxx(1580) /*HtmlExporter*/

/// var k = n(0)/*React*/;  // 9 times
/// var B = n.n(k);
/// var Ne = n(30)/*blubirdjs*/;  // 4 times
/// var ke = n.n(Ne);
/// var Pe = n(3);  // 1 times
/// var Fe = n.n(Pe);
/// var or = n(36)/*TextUtils*/;  // 1 times
/// var Ut = n(2)/*lodash*/;  // 1 times
/// var Wt = n.n(Ut);
/// var Pa = n(28)/*MathGlobal*/;  // 1 times
/// var gi = n(5)/*sizzle*/;  // 51 times
/// var yi = n.n(gi);
/// var Di = n(459)/*jszip*/;  // 1 times
/// var Ni = n.n(Di);
/// var ki = n(168)/*FileSaver*/;  // 1 times
/// var Bi = n.n(ki);
/// var vs = n(25)/*ColorHelper*/;  // 2 times
/// var Hs = n(155)/*ReactDOM-server-exp*/;  // 4 times
/// var _s = n(751)/*FontCssData*/;  // 1 times
/// var Us = n.n(_s);
/// var Ws = n(293)/*MathmlElementGenerator*/;  // 1 times
/// var Gs = n(294)/*MathmlGenerator*/;  // 1 times
/// var Ys = n(449)/*VectorFontLoader*/;  // 1 times
/// var modelFontAnalyzer = n(1556)/*ModelFontAnalyzer*/;  // 1 times
/// var documentDownloader = n(1563)/*DocumentDownloader*/;  // 1 times
/// var guidGenerator = n(1564)/*GuidGenerator*/;  // 1 times
var HtmlGenerator = new class {
    generate(e, t, n) {
        this.handleMathRootComponents(e, t);
        this.handleSections(t);
        this.handleListItem(t);
        this.handleLinks(t);
        this.handleMathTag(t);
        this.handleTableOfContent(t);
        this.ZSpecification(e, t);
        this.handleFixedWidthForUnderlineSection(e, t, n);
    }
    handleFixedWidthForUnderlineSection(e, t, n) {
        if (!n) {
            var r = [];
            var a = "composite-block.underline-section-symbol";
            jQuery(e).find(a).each((e, t) => {
                r.push(t.getBoundingClientRect().width);
            });
            jQuery(t).find(a).each((e, t) => {
                jQuery(t).css("width", "".concat(r[e], "px"));
            });
        }
    }
    ZSpecification(e, t) {
        var n = [];
        var r = "composite-block.z-schema-symbol";
        jQuery(e).find(r).each((e, t) => {
            n.push(this.generateForRootMathElement(t));
        });
        var a = ColorHelper.getMathTypeBackgroundColor(e);
        jQuery(t).find(r).each((e, t) => {
            jQuery(t).css("background", "transparent");
            jQuery(t).find(">.role-name-section>.role-name-content>edit-area").css("background", a);
            var r = n[e];
            if (r.mathml) {
                jQuery(t).children().attr("aria-hidden", "true");
                t.appendChild(jQuery(r.container).get(0));
                jQuery(t).attr("data-mathml", r.mathml);
            }
        });
    }
    handleTableOfContent(e) {
        jQuery(e).find("x-line.root.section").each((e, t) => {
            jQuery(t).attr("id", jQuery(t).attr("data-line-id"));
        });
        jQuery(e).find("composite-block.table-of-content").each((e, t) => {
            jQuery(t).find(">toc-wrapper>edit-area>x-line").each((e, t) => {
                return this.processTocLine(t);
            });
        });
    }
    processTocLine(e) {
        var t = jQuery(e).find(">.prefix-block>span").attr("data-line-id");
        jQuery(e).children().css("cursor", "pointer");
        jQuery(e).css("cursor", "pointer");
        var n = jQuery("<a/>").attr("href", "#".concat(t)).css("color", "inherit").css("text-decoration", "inherit").html(jQuery(e).html());
        e.innerHTML = n.get(0).outerHTML;
    }
    handleMathTag(e) {
        jQuery(e).find("tag-ref-name.tag-ref-name").each((e, t) => {
            var n = jQuery(t).attr("ref-tag-id");
            this.innerTextToAnchor(t, "#".concat(n), {
                newPage: false
            });
        });
    }
    innerTextToAnchor(e, t, n) {
        var r = jQuery("<a/>").attr("href", t).css("color", "inherit").css("text-decoration", "inherit").text(jQuery(e).text());
        if (n.newPage) {
            r.attr("target", "_blank");
        }
        e.innerHTML = r.get(0).outerHTML;
    }
    handleLinks(e) {
        jQuery(e).find("x-block.role-hyper-link").each((e, t) => {
            var n = jQuery(t).attr("data-hyper-link-url");
            this.innerTextToAnchor(t, n, {
                newPage: true
            });
        });
    }
    handleSections(e) {
        jQuery(e).find("x-line.root.section").each((e, t) => {
            var n = 1;
            if (jQuery(t).hasClass("sindent-0")) {
                n = 1;
            }
            if (jQuery(t).hasClass("sindent-1")) {
                n = 2;
            }
            if (jQuery(t).hasClass("sindent-2")) {
                n = 3;
            }
            jQuery(t).attr("role", "heading");
            jQuery(t).attr("aria-level", n);
        });
    }
    handleListItem(e) {
        jQuery(e).find("x-line.root.list-item").each((e, t) => {
            var n = 1;
            if (jQuery(t).hasClass("indent-0")) {
                n = 1;
            }
            if (jQuery(t).hasClass("indent-1")) {
                n = 2;
            }
            if (jQuery(t).hasClass("indent-2")) {
                n = 3;
            }
            jQuery(t).attr("role", "listitem");
            jQuery(t).attr("aria-level", n);
        });
    }
    handleMathRootComponents(e, t) {
        var n = [];
        var r = "composite-block.math-container-symbol,composite-block.align-symbol,composite-block.gather-symbol";
        jQuery(e).find(r).each((e, t) => {
            n.push(this.generateForRootMathElement(t));
        });
        jQuery(t).find(r).each((e, t) => {
            var r = n[e];
            if (r.mathml) {
                jQuery(t).children().first().attr("aria-hidden", "true");
                t.appendChild(jQuery(r.container).get(0));
                jQuery(t).attr("data-mathml", r.mathml);
            }
        });
    }
    generateForRootMathElement(e) {
        var t = new MathmlElementGenerator({
            screenReader: true
        });
        var n = e.reactInstance.getModel();
        var r = t.generateMath(n);
        var a = MathmlGenerator.generate(r);
        return {
            container: Object(ReactDOMServer.renderToStaticMarkup)(a.mathmlContainer),
            mathml: Object(ReactDOMServer.renderToStaticMarkup)(a.mathml)
        };
    }
};
var imagesPath = "image-resources";
var HtmlExporter = new class {
    run(e) {
        var t = e.mathTypeElement;
        if (e = _.assignIn({},
        e, {
            mathTypeElement: e.mathTypeElement.cloneNode(true)
        }), this.removeNoPrintElements(e.mathTypeElement), e.forTest) {
            return this.runForTest(t, e);
        }
        var n = false;
        return new Promise((r, a) => {
            try {
                var i = new JSZip;
                this.loadFontsAndCss(e.model).then((e) => {
                    _.values(e).forEach((e) => {
                        i.file(e.relativeUrl, e.data);
                    });
                }).then(() => {
                    return this.downloadAndModifyAllImages(e.mathTypeElement).then((e) => {
                        e.forEach((e) => {
                            if (e.failed) {
                                n = true;
                            } else {
                                i.file("".concat(imagesPath, "/").concat(e.generatedId), e.data);
                            }
                        });
                    });
                }).then(() => {
                    HtmlGenerator.generate(t, e.mathTypeElement, !!e.documentWidth);
                    var n = this.exportMathType(e.mathTypeElement, e.documentWidth);
                    var r = ColorHelper.getMathTypeBackgroundColor(t);
                    var a = this.wrapInHtmlPage(r, n, e.documentName, e.styles);
                    i.file("index.html", a);
                }).then(() => {
                    i.generateAsync({
                        type: "blob"
                    }).then((e) => {
                        FileSaver.saveAs(e, "online-document.zip");
                    }).
                    catch((e) => {
                        console.error(e);
                        a(e);
                    });
                }).then(() => {
                    r({
                        message: n ? "Some of Images could not download" : void 0
                    });
                }).
                catch((e) => {
                    console.error(e);
                    a(e);
                });
            } catch(e) {
                console.error(e);
                a(e);
            }
        });
    }
    runForTest(e, t) {
        try {
            HtmlGenerator.generate(e, t.mathTypeElement, !!t.documentWidth);
            var n = this.exportMathType(t.mathTypeElement, t.documentWidth);
            return Promise.resolve({
                message: "",
                clonedMathType: n
            });
        } catch(e) {
            Promise.reject(e);
        }
    }
    getUrlInfo(e) {
        var t;
        var n;
        return "img" == e.tagName.toLowerCase() && (t = jQuery(e).attr("src"), n = e.src),
        "image" == e.tagName.toLowerCase() && (n = t = jQuery(e).attr("xlink:href")),
        MathGlobal.isElectronEnv() && t.startsWith("data-resources/") && (n = t),
        {
            originalUrl: t,
            absoluteUrl: n
        };
    }
    setNewUrl(e, t) {
        if ("img" == e.tagName.toLowerCase()) {
            jQuery(e).attr("src", "".concat(imagesPath, "/").concat(t));
        }
        if ("image" == e.tagName.toLowerCase()) {
            jQuery(e).attr("xlink:href", "".concat(imagesPath, "/").concat(t));
        }
    }
    downloadAndModifyAllImages(e) {
        var t = [];
        return Promise.map(jQuery(e).find("img,image").toArray(), (e) => {
            var n = this.getUrlInfo(e);
            var r = n.originalUrl;
            var a = n.absoluteUrl;
            var i = t.find((e) => {
                return e.absoluteUrl === a;
            });
            if (!i) {
                var o = this.detectImageExtension(r);
                var s = GuidGenerator.next();
                return o && (s = s + ".".concat(o)),
                this.setNewUrl(e, s),
                DocumentDownloader.download(a).then((e) => {
                    t.push({
                        failed: false,
                        data: e,
                        extension: o,
                        generatedId: s,
                        absoluteUrl: a,
                        originalUrl: r
                    });
                }).
                catch(() => {
                    t.push({
                        failed: true,
                        data: null,
                        extension: o,
                        generatedId: s,
                        absoluteUrl: a,
                        originalUrl: r
                    });
                });
            }
            this.setNewUrl(e, i.generatedId);
        },
        {
            concurrency: 5
        }).then(() => {
            return t;
        });
    }
    detectImageExtension(e) {
        var t = e.split(".").pop().toLowerCase();
        switch (t) {
        case "png":
            case "jpeg":
            case "jpg":
            case "gif":
            case "bmp":
            case "tiff":
            return t;
        }
        return null;
    }
    removeNoPrintElements(e) {
        jQuery(e).find(".no-print").remove();
    }
    loadFontsAndCss(e) {
        var t = ModelFontAnalyzer.analyze(e, e.pageSettings);
        return VectorFontLoader.loadFontsData(t);
    }
    exportMathType(e, t) {
        var n = jQuery(e).find(">math-edit-container").get(0).outerHTML;
        var r = {
            display: "block",
            margin: "auto"
        };
        if (t) {
            r.width = t;
        }
        var a = " math-type-for-print ";
        if (jQuery(e).hasClass("dark-mode")) {
            a = a + " dark-mode ";
        }
        var i = React.createElement("editor-container", {
            style: r
        },
        React.createElement("math-type", {
            style: {
                userSelect: "text"
            },
            class: a,
            dangerouslySetInnerHTML: {
                __html: n
            }
        }));
        return Object(ReactDOMServer.renderToStaticMarkup)(i);
    }
    getFontCss() {
        return FontCssData.replace(/\/fonts\//g, "fonts/");
    }
    removeBetween(e, t, n) {
        for (;;) {
            var r = e.indexOf(t);
            if (r < 0) {
                break;
            }
            var a = e.indexOf(n, r + n.length);
            if (! (r >= 0 && a >= 0)) {
                break;
            }
            e = TextUtils.normalPslice(e, r, a + n.length - r, "");
        }
        return e;
    }
    getStylesHtml(e) {
        return e.map((e) => {
            var t = e;
            return t = this.removeBetween(t, "/**start-ignore-save-as-html*/", "/**end-ignore-save-as-html*/"),
            t = this.removeBetween(t, ".ReactVirtualized", "}");
        });
    }
    wrapInHtmlPage(e, t, n, r) {
        var a = React.createElement("html", {
            style: {
                overflow: "auto",
                height: "auto",
                width: "auto"
            }
        },
        React.createElement("head", null, React.createElement("title", null, n), React.createElement("meta", {
            httpEquiv: "Content-Type",
            content: "text/html;charset=utf-8"
        }), React.createElement("style", {
            dangerouslySetInnerHTML: {
                __html: this.getFontCss()
            }
        }), this.getStylesHtml(r).map((e) => {
            return React.createElement("style", {
                key: Math.random(),
                dangerouslySetInnerHTML: {
                    __html: e
                }
            });
        })), React.createElement("body", {
            style: {
                overflow: "auto",
                background: e,
                width: "auto",
                height: "auto"
            },
            dangerouslySetInnerHTML: {
                __html: t
            }
        }));
        return "<!doctype html>".concat(Object(ReactDOMServer.renderToStaticMarkup)(a));
    }
};
/*n.d(t, "a", function () {
    return HtmlExporter;
});*/

export default HtmlExporter