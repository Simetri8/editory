import React from 'react';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import CursorHandler from '../Editor/CursorHandler';
import EventHelper from '../Mathcha/EventHelper';
import ImageViewer from '../Editor/ImageViewer';

/// xxx(1213) /*Symbol-inline-image*/

/// n.r(t)
/// var r = n(0)/*React*/;  // 3 times
/// var a = n.n(r);
/// var i = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var o = n(85)/*CursorHandler*/;  // 1 times
/// var s = n(29)/*CompositeBlock*/;  // 1 times
/// var l = n(191)/*ImageViewer2*/;  // 1 times
/// var c = n(24)/*EventHelper*/;  // 1 times
class d extends CompositeBlock {
    constructor(e) {
        super(e);
        this.onSelected = (e => {
            if (!this.getEditorInfo().isReadOnly) {
                EventHelper.setCustomInfo(e, CursorHandler.getBuilder().withHandledCursorSelected().build());
                this.props.onSelectedChanged({
                    controlled: true
                })
            };
        });
        this.onDataChanged = (e => {
            this.props.onDataChanged(e, {
                focusAcquired: !0
            })
        });
        this.containerClassName = "image-container inline no-cursor-selected no-editor"
    }
    useCustomBaseLine() {
        return !1
    }
    isInlineMode() {
        return !1
    }
    renderComponent() {
        return React.createElement(ImageViewer, {
            inline: !0,
            selectOnly: this.isSelectModeOnly(),
            width: "300",
            height: "300",
            isSelected: this.props.selected && this.props.selected.controlled,
            onSelected: this.onSelected,
            data: this.props.data,
            onDataChanged: this.onDataChanged
        })
    }
}
var SymbolInlineImage = new class extends CompositeSymbolBase {
    toModel() {
        throw new Error("Method not implemented.")
    }
    getViewComponent() {
        return d
    }
    getLatextName() {
        return "\\inline-image"
    }
    getModel(e) {
        var t = this.getModelFromStructure({},
        this.getLatextName());
        return t.align = "center",
        t.scaleOption = "width",
        t.imageSize = {
            width:
            50,
            height: 50
        },
        t.url = e && e.imageUrl ? e.imageUrl : "",
        t
    }
    getSymbolInfo() {
        return [this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName()],
            height: 25,
            selectControlled: !0,
            insertInTextModeOnly: !0,
            renderSymbol: () => React.createElement("div", {
                style: {
                    color: "gray"
                }
            },
            React.createElement("i", {
                className: "fa fa-picture-o",
                "aria-hidden": "true"
            }))
        })]
    }
    toLatex(e, t) {
        return e.url ? "bbcode" == t.textType ? "[".concat("img", "]").concat(e.url || "", "[/img]") : "\nimage[".concat(e.url || "", "]\n") : ""
    }
}

export default SymbolInlineImage