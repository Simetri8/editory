import React from 'react';
import DOMHelper from './DOMHelper';
import FontList from '../Font/FontList';

/// xxx(205) /*HComposedSymbol*/

/*n.d(t, "a", function () {
    return s
});*/
/// var r = n(0)/*React*/;  // 16 times
/// var a = n.n(r);
/// var i = n(4)/*DOMHelper*/;  // 2 times
/// var o = n(48)/*FontList*/;  // 1 times
class s extends React.Component {
    constructor() {
        super(...arguments);
        this.updateComponent = (() => {
            this.props.fixedContextHandler.getRenderingContext().nextCycleIfRequired(() => {
                this.forceUpdate()
            })
        })
    }
    renderRepeat(e, t) {
        t = t || this.getFontSize();
        for (var n = DOMHelper.getElementRect(this.root).width, r = [], o = 0, s = 0; s <= n; s += t) {
            r.push(React.createElement("x-inside", {
                key: o
            },
            e));
            o++;
        }
        return r
    }
    componentWillReceiveProps() {
        this.props.fixedContextHandler.getBatchUpdater().pushToEnd(this.updateComponent, this, !0)
    }
    shouldComponentUpdate() {
        return !1
    }
    componentDidMount() {
        this.props.fixedContextHandler.getBatchUpdater().pushToEnd(this.updateComponent, this, !0)
    }
    componentWillUnmount() {
        this.willComponentUnmount = !0
    }
    renderAs3Parts() {
        var e = this.props,
        t = e.startChar,
        n = e.repeatChar,
        r = e.endChar,
        i = {
            fontSize: this.props.fontSize,
            fontFamily: FontList.mathFontFamiltyFromKey("\\mathnormal", this.props.baseMathModeFontFamily)
        };
        return React.createElement("hcomposed-symbol", {
            style: i,
            ref: e => this.root = e
        },
        t ? React.createElement("start", null, t) : null, React.createElement("x-middle", null, React.createElement("x-fixed", null, this.renderRepeat(n))), r ? React.createElement("end", null, r) : null)
    }
    getFontSize() {
        return this.props.fontSize || DOMHelper.getComputedFontSize(this.root)
    }
    renderAs5Parts() {
        var e = this.props,
        t = e.startChar,
        n = e.repeatChar,
        r = e.endChar,
        i = e.middleChar,
        o = this.getFontSize(),
        s = {
            fontSize: this.props.fontSize
        };
        return React.createElement("hcomposed-symbol", {
            style: s,
            ref: e => this.root = e
        },
        t ? React.createElement("start", null, t) : null, React.createElement("x-middle", null, React.createElement("x-fixed", null, this.renderRepeat(n, 2 * o))), React.createElement("middle-center", null, i), React.createElement("x-middle", null, React.createElement("x-fixed", null, this.renderRepeat(n, 2 * o))), r ? React.createElement("end", null, r) : null)
    }
    render() {
        if (null == this.root) {
            var e = this.props.heightChar || this.props.repeatChar;
            return React.createElement("hcomposed-symbol", {
                ref: e => this.root = e
            },
            e)
        }
        return this.props.middleChar ? this.renderAs5Parts() : this.renderAs3Parts()
    }
}

export default s