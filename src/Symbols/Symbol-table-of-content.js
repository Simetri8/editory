import _ from 'lodash';
import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import CreateEditorObject from '../Elements/CreateEditorObject';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import EditArea from '../Editor/EditArea';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import ScrollTo from '../Mathcha/ScrollTo';
import StyleHelper from '../Mathcha/StyleHelper';

/// xxx(1229) /*Symbol-table-of-content*/

function E(e, t) {
    var n = _.filter(t.lines, (e) => {
        return "section" == StyleHelper.getLineStyle(e, "listType")
    }).map((e) => {
        var t = CreateEditorObject.createComposite("\\prefix-block");
        return t.prefixText = e.___prefixText,
        t.lineId = e.id,
        PropUpdateHelper.update(e, {
            blocks: PropUpdateHelper.insert(e.blocks, 0, t),
            id: DiagramIdHelper.nextId()
        })
    });
    return PropUpdateHelper.set(e, "tableOfContent.lines", n)
}
/// n.r(t)
/*n.d(t, "TableOfContent", function () {
    return v
});*/
/// var r = n(0)/*React*/;  // 5 times
/// var a = n.n(r);
/// var i = n(16)/*ReactDOM*/;  // 4 times
/// var o = n.n(i);
/// var s = n(5)/*sizzle*/;  // 7 times
/// var l = n.n(s);
/// var c = n(2)/*lodash*/;  // 1 times
/// var d = n.n(c);
/// var h = n(21)/*EditArea*/;  // 1 times
/// var u = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var p = n(29)/*CompositeBlock*/;  // 1 times
/// var m = n(7)/*PropUpdateHelper*/;  // 3 times
/// var f = n(18)/*StyleHelper*/;  // 1 times
/// var g = n(6)/*DiagramIdHelper*/;  // 2 times
/// var y = n(107)/*ScrollTo*/;  // 2 times
/// var A = n(13)/*CreateEditorObject*/;  // 1 times
class v extends CompositeBlock {
    constructor() {
        super(...arguments);
        this.isRefreshing = false;
        this.containerClassName = "table-of-content";
        this.refresh = (e) => {
            if (e.stopPropagation(), e.preventDefault(), !this.isRefreshing) {
                var t = ReactDOM.findDOMNode(this);
                jQuery(t).find(">toc-wrapper").css("opacity", .5);
                this.isRefreshing = true;
                setTimeout(() => {
                    var e = jQuery(t).closest("edit-area.root-editor").get(0).reactInstance.getModel();
                    var n = E(this.props.data, e);
                    this.props.onDataChanged(n, {
                        focusAcquired: true,
                        preventScroll: true
                    });
                    jQuery(t).find(">toc-wrapper").css("opacity", 1);
                    this.isRefreshing = false
                },
                200)
            }
        };
        this.handleLineMouseDown = (e) => {
            if (e.preventDefault(), e.stopPropagation(), "X-LINE" != e.target.tagName) {
                var t = e.currentTarget;
                var n = jQuery(t).find(">.prefix-block>span").attr("data-line-id");
                var r = ReactDOM.findDOMNode(this);
                var a = jQuery(r).closest("edit-area.root-editor").find(">area-container>x-line[data-line-id='".concat(n, "']"));
                if (0 != a.length) {
                    var i = ScrollTo.getScrollSelectorFromContext(this.context);
                    ScrollTo.scrollToElement(i, a, {
                        duration: 500,
                        offsetToTop: 20
                    })
                }
            }
        }
    }
    shouldComponentUpdate(e) {
        return e.data != this.props.data
    }
    componentDidMount() {
        this.addMouseDownHandler()
    }
    componentWillUnmount() {
        this.removeMouseDownHandler()
    }
    componentDidUpdate() {
        this.removeMouseDownHandler();
        this.addMouseDownHandler()
    }
    addMouseDownHandler() {
        var e = ReactDOM.findDOMNode(this);
        jQuery(e).find(">toc-wrapper>edit-area>x-line").on("mousedown", this.handleLineMouseDown)
    }
    removeMouseDownHandler() {
        var e = ReactDOM.findDOMNode(this);
        jQuery(e).find(">toc-wrapper>edit-area>x-line").off("mousedown", this.handleLineMouseDown)
    }
    nop() {}
    renderComponent() {
        var e = React.createElement(EditArea, {
            key: "1",
            className: "edit-area",
            data: this.props.data.tableOfContent,
            id: this.props.data.tableOfContent.id,
            keyName: "tableOfContent",
            fontSize: this.getFontSize(),
            noAreaContainer: true,
            renderAsPlainText: true,
            inTableOfContent: true,
            onDataChanged: this.nop,
            onSelectedChanged: this.nop
        });
        if (this.props.data.tableOfContent.lines.length <= 0) e = React.createElement("div", {
            key: "1"
        },
        "No Content");
        var t = React.createElement("toc-refresh", {
            style: S,
            className: "no-print",
            key: "2",
            onMouseDown: this.refresh
        },
        React.createElement("i", {
            className: "fa fa-refresh",
            "aria-hidden": "true"
        }));
        return this.isSelectModeOnly() && (t = null),
        React.createElement("toc-wrapper", null, e, t)
    }
}
var S = {
    position: "absolute",
    left: -15,
    top: 0,
    backgroundColor: "#f7f7f7",
    color: "gray",
    fontSize: "1em",
    cursor: "pointer",
    zIndex: 999,
    padding: "0.3em",
    paddingTop: "0.1em",
    paddingBottom: "0.1em"
};
var SymbolTableOfContent = new class extends CompositeSymbolBase {
    toModel() {
        throw new Error("Method not implemented.");
    }
    getModel(e) {
        var t = (e = e || {
            names:
            [],
            editorModel: null,
            editor: null
        }).editorModel;
        var n = super.getModel(e);
        return n.tableOfContent = {
            id: DiagramIdHelper.nextId(),
            lines: []
        },
        e.editor ? n = E(n, t) : n
    }
    getModelMeta() {
        return {
            text: this.getLatextName(),
            elements: {}
        }
    }
    getViewComponent() {
        return v
    }
    getLatextName() {
        return "\\table-of-content"
    }
    getSymbol() {
        return "Table Of Content"
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName()],
            symbol: this.getSymbol(),
            insertInTextModeOnly: true,
            renderSymbol: () => {
                return "Table of Content"
            }
        })
    }
    toLatex() {
        return "Table of Content"
    }
}

export { v as TableOfContent }

export default SymbolTableOfContent