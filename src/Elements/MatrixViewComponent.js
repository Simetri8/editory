import _ from 'lodash';
import React from 'react';
import MatrixComponent from './MatrixComponent';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import TableSettingComponent from '../Tabular/TableSettingComponent';
import VComposedSymbol from './VComposedSymbol';

/// xxx(117) /*MatrixViewComponent*/

/*n.d(t, "a", function () {
    return u
});*/
/// var r = n(466)/*MatrixComponent*/;  // 1 times
/// var a = n(343)/*TableSettingComponent*/;  // 1 times
/// var i = n(0)/*React*/;  // 2 times
/// var o = n.n(i);
/// var s = n(7)/*PropUpdateHelper*/;  // 2 times
/// var l = n(2)/*lodash*/;  // 1 times
/// var c = n.n(l);
/// var d = n(249)/*VComposedSymbol*/;  // 1 times
var h = {
    "(": "open-parenthesis",
    ")": "close-parenthesis",
    "{": "open-brace",
    "}": "close-brace",
    "[": "open-bracket",
    "]": "close-bracket",
    "|": "open-vert"
};
class u extends MatrixComponent {
    constructor() {
        super(...arguments);
        this.onLayoutChange = (e => {
            this.props.onDataChanged(PropUpdateHelper.set(this.props.data, "text", e))
        });
        this.onBracketChange = (e => {
            var t = e;
            if (t) {
                t = t[0];
                var n = this.findPair(t);
                t = n ? n[0] : "("
            } else t = "";
            this.props.onDataChanged(PropUpdateHelper.set(this.props.data, "bracket", t))
        })
    }
    renderBeforeTable() {
        return this.renderOpenBracket()
    }
    renderAfterTable() {
        return this.renderCloseBracket()
    }
    findPair(e) {
        return _.find(u.bracketPairs, t => t.indexOf(e) >= 0)
    }
    renderOpenBracket() {
        if (!this.props.data.bracket) return null;
        var e = this.findPair(this.props.data.bracket),
        t = h[e[0]];
        return "|" == this.props.data.bracket && (t = "open-vert"),
        "‖" == this.props.data.bracket && (t = "open-Vert"),
        this.renderBracket(t, 1)
    }
    renderBracket(e, t) {
        return React.createElement(VComposedSymbol, {
            fixedContextHandler: this.context.fixedContextHandler,
            baseMathModeFontFamily: this.context.baseMathModeFontFamily,
            zIndex: t,
            updateOnlyOnNotifyDataChanged: !0,
            notifyData: this.props.data,
            delimiter: e,
            fontSize: this.getFontSizePixel()
        })
    }
    renderCloseBracket() {
        if (!this.props.data.bracket) return null;
        var e = this.findPair(this.props.data.bracket),
        t = h[e[1]];
        return "|" == this.props.data.bracket && (t = "close-vert"),
        "‖" == this.props.data.bracket && (t = "close-Vert"),
        this.renderBracket(t)
    }
    renderSetting() {
        if (!this.isSelectModeOnly()) {
            var e = this.props.data;
            return !this.isChildSelected() || this.isTabularDescendantSelected() || this.state.showBorderDesign ? void 0 : React.createElement(TableSettingComponent, {
                disableLayoutType: !!this.disableLayoutType,
                onLayoutChange: this.onLayoutChange,
                onRowChange: this.onRowChange,
                onColumnChange: this.onColumnChange,
                text: e.text,
                row: this.state.row,
                column: this.state.column,
                bracket: e.bracket,
                onBracketChange: this.onBracketChange,
                onShowBorderDesignChange: e => this.setState({
                    showBorderDesign: e
                })
            })
        }
    }
}
u.bracketPairs = ["()", "{}", "<>", "[]", "| |", "‖ ‖"]

export default u