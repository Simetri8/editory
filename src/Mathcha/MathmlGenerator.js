import React from 'react';

/// xxx(294) /*MathmlGenerator*/

/// var r = n(0)/*React*/;  // 27 times
/// var a = n.n(r)/*;var i=xx(213);void 0===i.properties.zz&&i.injection.injectDOMPropertyConfig({isCustomAttribute:e=>"columnalign"==e||"xmlns"==e||"columnwidth"==e||"columnspacing"==e||"rowspacing"==e||"accent"==e||"accentunder"==e||"scriptlevel"==e||"largeop"==e||"movablelimit"==e||"form"==e||"fence"==e||"separator"==e||"crossout"==e||"notation"==e||"maxsize"==e||"minsize"==e||"symmetric"==e||"stretchy"==e||"rowlines"==e||"columnlines"==e||"mathvariant"==e||"displaystyle"==e||"mathcolor"==e||"rowalign"==e||"framespacing"==e||"display"==e})*/;
var MathmlGenerator = new class {
    generate(e) {
        var t = React.createElement("math", {
            display: e.display,
            xmlns: "http://www.w3.org/1998/Math/MathML"
        },
        this.generateElements(e.elements));
        return {
            mathmlContainer: React.createElement("span", {
                role: "presentation",
                style: {
                    width: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    clip: "rect(1px,1px,1px,1px)",
                    height: 1,
                    padding: "1px 0 0 0!important",
                    overflow: "hidden",
                    userSelect: "none"
                }
            },
            t),
            mathml: t
        }
    }
    generateElements(e) {
        return e.map((e, t) => this.generateElement(e, t))
    }
    buildMo(e, t) {
        return React.createElement("mo", {
            key: t,
            form: e.form,
            fence: e.fence,
            separator: e.separator,
            accent: e.accent,
            largeop: e.largeop,
            movablelimit: e.movablelimit,
            maxsize: e.maxsize,
            minsize: e.minsize,
            stretchy: e.stretchy,
            mathvariant: e.mathvariant,
            symmetric: e.symmetric
        },
        this.generateElementOrString(e.value, 0))
    }
    renderTable(e, t) {
        return React.createElement("mtable", {
            key: t,
            columnwidth: e.columnwidth,
            width: e.width,
            columnspacing: e.columnspacing,
            rowspacing: e.rowspacing,
            rowlines: e.rowlines,
            columnlines: e.columnlines,
            rowalign: e.rowalign,
            framespacing: e.framespacing,
            columnalign: e.columnalign
        },
        e.rows.map((e, t) => this.renderTableRow(e, t)))
    }
    renderTableRow(e, t) {
        return React.createElement("mtr", {
            key: t
        },
        e.cells.map((e, t) => React.createElement("mtd", {
            key: t,
            columnalign: e.columnalign
        },
        this.generateElement(e.element, 0))))
    }
    generateElementOrString(e, t) {
        return "string" == typeof e ? e : this.generateElement(e, t)
    }
    generateElement(e, t) {
        if (null == e) return React.createElement("mi", {
            key: t
        });
        var n = this.innerGenerateElement(e, t);
        return e.mathcolor && (n = React.cloneElement(n, {
            mathcolor: e.mathcolor
        })),
        n
    }
    innerGenerateElement(e, t) {
        if (null == e) return React.createElement("mi", {
            key: t
        });
        switch (e.type) {
        case "mtable":
            return this.renderTable(e, t);
        case "mi":
            return React.createElement("mi", {
                mathvariant: e.mathvariant,
                key: t
            },
            this.generateElementOrString(e.value, 0));
        case "mo":
            return this.buildMo(e, t);
        case "mn":
            return React.createElement("mn", {
                mathvariant: e.mathvariant,
                key: t
            },
            this.generateElementOrString(e.value, 0));
        case "mspace":
            return e.width ? React.createElement("mspace", {
                is: !0,
                width: e.width,
                key: t
            }) : React.createElement("mspace", {
                is: !0,
                width: "".concat(.22 * e.count, "em"),
                key: t
            });
        case "mrow":
            return React.createElement("mrow", {
                key: t
            },
            e.elements.map((e, t) => this.generateElement(e, t)));
        case "msqrt":
            return React.createElement("msqrt", {
                key: t
            },
            this.generateElement(e.base, 0));
        case "mroot":
            return React.createElement("mroot", {
                key: t
            },
            this.generateElement(e.base, 0), this.generateElement(e.index, 1));
        case "mfrac":
            return React.createElement("mfrac", {
                key: t
            },
            this.generateElement(e.numerator, 0), this.generateElement(e.denominator, 1));
        case "msub":
            return React.createElement("msub", {
                key: t
            },
            this.generateElement(e.base, 0), this.generateElement(e.subscript, 1));
        case "msup":
            return React.createElement("msup", {
                key: t
            },
            this.generateElement(e.base, 0), this.generateElement(e.superscript, 1));
        case "msubsup":
            return React.createElement("msubsup", {
                key: t
            },
            this.generateElement(e.base, 0), this.generateElement(e.subscript, 1), this.generateElement(e.superscript, 2));
        case "mover":
            return React.createElement("mover", {
                key: t,
                accent: e.accent
            },
            this.generateElement(e.base, 0), this.generateElement(e.overscript, 1));
        case "munder":
            return React.createElement("munder", {
                key: t,
                accent: e.accent
            },
            this.generateElement(e.base, 0), this.generateElement(e.underscript, 1));
        case "munderover":
            return React.createElement("munderover", {
                key: t,
                accent: e.accent,
                accentunder: e.accentunder
            },
            this.generateElement(e.base, 0), this.generateElement(e.underscript, 1), this.generateElement(e.overscript, 2));
        case "mstyle":
            return React.createElement("mstyle", {
                key: t,
                scriptlevel: e.scriptlevel,
                displaystyle: e.displaystyle
            },
            this.generateElement(e.element, 0));
        case "menclose":
            return React.createElement("menclose", {
                key: t,
                notation: e.notation
            },
            this.generateElement(e.element, 0));
        case "mtext":
            return React.createElement("mtext", {
                key: t
            },
            this.generateElementOrString(e.value, 0));
        case "none":
            return React.createElement("none", {
                key: t
            });
        case "empty":
            return null
        }
        throw new Error("element not supported")
    }
}

export default MathmlGenerator