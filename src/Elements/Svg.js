import React from 'react';
import ReactDOM from 'react-dom';
import DOMHelper from './DOMHelper';
import Geometry from '../Geometry/Geometry';

/// xxx(82) /*Svg*/

/*n.d(t, "a", function () {
    return c
});*/
/// var r = n(0)/*React*/;  // 4 times
/// var a = n.n(r);
/// var i = n(16)/*ReactDOM*/;  // 1 times
/// var o = n.n(i);
/// var s = n(4)/*DOMHelper*/;  // 2 times
/// var l = n(1)/*Geometry*/;  // 1 times
class c extends React.Component {
    constructor() {
        super(...arguments);
        this.cache = {};
        this.updateComponent = (() => {
            this.props.fixedContextHandler.getRenderingContext().nextCycleIfRequired(() => {
                var e = Geometry.scaleRect(DOMHelper.getElementRect(this.rootElement), this.getReverseScale()),
                t = DOMHelper.getComputedFontSize(this.rootElement);
                var ok = this.cache.width === e.width && this.cache.height === e.height && this.cache.fontSize === t && this.cache.changedData === this.props.changedData && this.cache.className === this.props.className;
                if (!ok) {
                    this.cache = {
                        width: e.width,
                        height: e.height,
                        fontSize: t,
                        className: this.props.className,
                        changedData: this.props.changedData
                    };
                    this.forceUpdate()
                }
            })
        })
    }
    componentWillUnmount() {
        this.willComponentUnmount = !0
    }
    componentWillReceiveProps() {
        this.props.fixedContextHandler.getBatchUpdater().pushToEnd(this.updateComponent, this, !0)
    }
    shouldComponentUpdate(e) {
        return e.className != this.props.className || !!e.dimensionChangedInStyle && e.style != this.props.style
    }
    componentDidMount() {
        this.rootElement = ReactDOM.findDOMNode(this);
        this.props.fixedContextHandler.getBatchUpdater().pushToEnd(this.updateComponent, this, !0)
    }
    getReverseScale() {
        return this.props.getReverseScale ? this.props.getReverseScale() : 1
    }
    renderInsideSvg() {
        return this.props.renderSvg(this.cache.width, this.cache.height, this.cache.fontSize)
    }
    renderSvg() {
        if (this.rootElement) return React.createElement("svg", null, this.renderInsideSvg())
    }
    render() {
        return this.rootElement ? React.createElement("svg", {
            style: this.props.style,
            className: this.props.className
        },
        this.renderInsideSvg()) : React.createElement("svg", {
            style: this.props.style,
            className: this.props.className
        })
    }
}

export default c