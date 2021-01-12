import classNames from 'classnames';
import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import CompositeBlock from '../Mathcha/CompositeBlock';
import CompositeSymbolBase from '../Mathcha/CompositeSymbolBase';
import Global from '../Global';
import TimerHelper from '../Mathcha/TimerHelper';

/// xxx(1375) /*Symbol-page-break*/

/// n.r(t)
/// var r = n(29)/*CompositeBlock*/;  // 1 times
/// var a = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var i = n(0)/*React*/;  // 3 times
/// var o = n.n(i);
/// var s = n(11)/*Global*/;  // 1 times
/// var l = n(5)/*sizzle*/;  // 1 times
/// var c = n.n(l);
/// var d = n(16)/*ReactDOM*/;  // 1 times
/// var h = n.n(d);
/// var u = n(19)/*TimerHelper*/;  // 1 times
/// var p = n(14)/*classnames*/;  // 1 times
/// var m = n.n(p);
class f extends CompositeBlock {
    constructor() {
        super(...arguments);
        this.state = {}
    }
    getClassName() {
        return classNames(super.getClassName(), "print-remove-background", "role-page-break-block")
    }
    componentDidMount() {
        super.componentDidMount();
        TimerHelper.waitALitteWhile(() => {
            this.unmounted || jQuery(ReactDOM.findDOMNode(this)).closest("composite-block.table-symbol").length > 0 && this.setState({
                insideTable: !0
            })
        })
    }
    componentWillUnmount() {
        this.unmounted = !0
    }
    renderComponent() {
        return this.state.insideTable ? React.createElement("span", {
            className: "no-print",
            style: {
                fontSize: "0.8em",
                color: "red"
            }
        },
        "Page Break not supported in Table") : Global.isSafari() ? React.createElement("span", {
            className: "no-print",
            style: {
                fontSize: "0.8em",
                color: "red"
            }
        },
        "Page Break not supported in Safari") : React.createElement("span", {
            className: "no-print",
            style: {
                fontSize: "0.8em",
                color: "gray"
            }
        },
        "Page Break")
    }
    getCompositeBlockStyle() {
        return {
            background: "rgba(8,8,8,0.2)",
            height: "1.2em",
            display: "block",
            textAlign: "center",
            fontFamily: "Arial"
        }
    }
}
var SymbolPageBreak = new class extends CompositeSymbolBase {
    getViewComponent() {
        return f
    }
    getLatextName() {
        return "\\page-break"
    }
    getSymbol() {
        return "Page Break"
    }
    getModelMeta() {
        return {
            text:
            this.getLatextName(),
            elements: {}
        }
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            insertInTextModeOnly: !0,
            type: "composite",
            names: [this.getLatextName()],
            symbol: this.getSymbol()
        })
    }
    toModel(e, t, n) {
        return this.getModel()
    }
    toLatex(e, t, n) {
        return ""
    }
}

export default SymbolPageBreak