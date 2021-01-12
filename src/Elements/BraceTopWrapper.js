import React from 'react';
import ReactDOM from 'react-dom';
import ArrayHelper from '../Mathcha/ArrayHelper';
import BracketHelper from '../Editor/BracketHelper';
import DOMHelper from './DOMHelper';

/// xxx(254) /*BraceTopWrapper*/

function d(e, t, n) {
    var r = [];
    var i = 0;
    var o = 0;
    for (; o <= t; o = o + e) {
        r.push(React.createElement("middle-inside", {
            key: i
        },
        n));
        i++
    }
    return r
}
/*n.d(t, "a", function () {
    return h
});*/
/// var r = n(0)/*React*/;  // 12 times
/// var a = n.n(r);
/// var i = n(16)/*ReactDOM*/;  // 1 times
/// var o = n.n(i);
/// var s = n(43)/*ArrayHelper*/;  // 1 times
/// var l = n(152)/*BracketHelper*/;  // 2 times
/// var c = n(4)/*DOMHelper*/;  // 1 times
class h extends React.Component {
    shouldComponentUpdate(e) {
        return !ArrayHelper.areEqualShallow(this.props, e)
    }
    componentDidUpdate() {
        if (this.props.setParentHeight) {
            var e = ReactDOM.findDOMNode(this);
            this.props.setParentHeight(DOMHelper.getComputedStyleAsNumber(e, "height"))
        }
    }
    render() {
        var e = this.props;
        var t = e.isNormal;
        var n = e.width;
        var r = e.isReverse;
        var i = e.fontSize;
        if (t || BracketHelper.shouldUseSingleBracket(n, i)) return r ? React.createElement("brace-top-wrapper", {
            style: {
                height: "0.4em"
            }
        },
        "\u23e6") : React.createElement("brace-top-wrapper", {
            style: {
                height: "0.4em"
            }
        },
        "\u23e5");
        var o = BracketHelper.fontSizeEmByHeight(n, i, "open-brace");
        var s = o * i;
        var c = {
            fontSize: o + "em",
            width: Math.round(n) / s + "em",
            height: "0.55em"
        };
        var h = "\u23dc";
        var u = "\u23df";
        var p = "\u23dd";
        var m = "\u23de";
        return r && (h = "\u23e0", u = "\u23e3", p = "\u23e1", m = "\u23e2"),
        React.createElement("brace-top-wrapper", {
            style: c
        },
        React.createElement("x-first", null, h), React.createElement("middle-wrapper", null, React.createElement("x-fixed", null, d(o * i, n / 2, u))), React.createElement("x-middle", null, p), React.createElement("middle-wrapper", null, React.createElement("x-fixed", null, d(o * i, n / 2, u))), React.createElement("x-last", null, m))
    }
}

export default h