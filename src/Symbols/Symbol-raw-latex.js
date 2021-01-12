import _ from 'lodash';
import React from 'react';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeScSymbolBase from '../Mathcha/CompositeScSymbolBase';
import EditArea from '../Editor/EditArea';
import EventHelper from '../Mathcha/EventHelper';
import SymbolSettingButton from '../Elements/SymbolSettingButton';

/// xxx(1371) /*Symbol-raw-latex*/

/// n.r(t)
/*n.d(t, "RawLatex", function () {
    return m
}),*/
/*n.d(t, "RawLatexSc", function () {
    return f
});*/
/// var r = n(3)/*_.assignIn*/;  // 1 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 7 times
/// var o = n.n(i);
/// var s = n(21)/*EditArea*/;  // 1 times
/// var l = n(29)/*CompositeBlock*/;  // 1 times
/// var c = n(73)/*CompositeScSymbolBase*/;  // 1 times
/// var d = n(106)/*SymbolSettingButton*/;  // 1 times
/// var h = n(24)/*EventHelper*/;  // 1 times
/// var u = n(2)/*lodash*/;  // 0 times
/// var p = n.n(u);
class m extends CompositeBlock {
    constructor(e) {
        super(e);
        this.handleRawLatexChange = (e => {
            var t = e.currentTarget.value,
            n = _.assignIn({},
            this.props.data, {
                rawLatex: t
            });
            this.props.onDataChanged(n, {
                focusAcquired: !0
            })
        });
        this.containerClassName = "raw-latex";
        this.migrateToNewStructure()
    }
    renderSettings() {
        var e = this.props.data.rawLatex;
        if (this.isDirectAndChildSelected()) return React.createElement(SymbolSettingButton, {
            smaller: !0,
            closeOnClickOutside: !0
        },
        React.createElement("x-setting", {
            class: "mt-common-dialog no-print",
            onMouseDown: EventHelper.focusAndCursorSelectAcquired,
            style: {
                position: "absolute",
                top: "100%",
                fontSize: 14,
                marginTop: 5
            }
        },
        React.createElement("div", {
            style: {
                display: "flex",
                flexDirection: "column"
            }
        },
        React.createElement("span", {
            style: {
                display: "block",
                color: "gray",
                paddingBottom: 2
            }
        },
        "Latex: "), React.createElement("textarea", {
            value: e || "",
            style: {
                flexGrow: 1,
                height: 60,
                width: 250
            },
            onChange: this.handleRawLatexChange
        }))))
    }
    renderComponent() {
        return this.migrateToNewStructure(),
        React.createElement("div", null, React.createElement(EditArea, Object.assign({},
        this.buildMetaDataFromName("rawLatexValue"), {
            borderIfEmpty: !0,
            isTextMode: !0
        })), this.renderSettings())
    }
    migrateToNewStructure() {
        if (this.props.data.elements.textValue) {
            this.props.data.elements.rawLatexValue = _.cloneDeep(this.props.data.elements.textValue);
            delete this.props.data.elements.textValue
        }
    }
}
class f extends CompositeScSymbolBase {
    constructor() {
        super()
    }
    getViewComponent() {
        return m
    }
    getLatextName() {
        return "\\raw-latex"
    }
    getSymbol() {
        return "raw-latex"
    }
    getModelMeta() {
        return {
            text: this.getLatextName(),
            elements: {
                rawLatexValue: {
                    onRemove: "all"
                }
            }
        }
    }
    toModel() {
        return this.getModel()
    }
    migrateToNewStructure(e) {
        if (e.elements.textValue) {
            e.elements.rawLatexValue = _.cloneDeep(e.elements.textValue);
            delete e.elements.textValue
        }
    }
    toLatex(e) {
        return e.rawLatex ? e.rawLatex : (this.migrateToNewStructure(e), e.elements.rawLatexValue.lines.reduce((e, t) => e + t.blocks.reduce((e, t) => e + t.text, ""), ""))
    }
    toMathml(e, t) {
        return {
            type: "mtext",
            value: this.toLatex(e)
        }
    }
}
var SymbolRawLatex = new f

export { m as RawLatex }

export { f as RawLatexSc }

export default SymbolRawLatex