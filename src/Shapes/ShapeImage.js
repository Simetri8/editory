import _ from 'lodash';
import jQuery from 'jquery';
import React from 'react';
import Geometry from '../Geometry/Geometry';
import Global from '../Global';
import ImageDataHelper from '../Editor/ImageDataHelper';
import ImageLoader from '../Mathcha/ImageLoader';
import LoadingIcon from '../Elements/LoadingIcon';
import ShapeBase from './ShapeBase';
import ShapeBaseB from './ShapeBaseB';
import ShapeBaseC from './ShapeBaseC';
import ShapeUtil from './ShapeUtil';
import TransformHelper from '../Editor/TransformHelper';

/// xxx(1536) /*ShapeImage*/

function rn(e) {
    var t = e.data;
    var n = t.p1;
    var r = t.p2;
    var a = n.y;
    var i = r.y;
    var o = n.x;
    var s = r.x;
    return ShapeUtil.pointsTransformed(e.data, [{
        x: o,
        y: a
    },
    {
        x: s,
        y: a
    },
    {
        x: s,
        y: i
    },
    {
        x: o,
        y: i
    },
    {
        x: o,
        y: a
    }])
}
/// var Jt = n(103)/*ImageLoader*/;  // 2 times
/// var n187 = n(187)/*ImageViewer*/;  // 1 times
/// var en = n(447)/*LoadingIcon*/;  // 1 times
/// var tn = n(11)/*Global*/;  // 3 times
/// var f = n(3);  // 1 times
/// var g = n.n(f);
/// var shapeBaseC = n(1530)/*ShapeBaseC*/;  // 1 times
/// var shapeBaseB = n(1531)/*ShapeBaseB*/;  // 1 times
/// var S = n(0)/*React*/;  // 10 times
/// var C = n.n(S);
/// var y = n(9)/*ShapeBase*/;  // 1 times
/// var A = n(8)/*ShapeUtil*/;  // 1 times
/// var o = n(1)/*Geometry*/;  // 6 times
/// var U = n(5)/*sizzle*/;  // 4 times
/// var W = n.n(U);
/// var Y = n(70)/*TransformHelper*/;  // 2 times
/*n.d(t, "a", function () {
    return rn
});*/
/*n.d(t, "b", function () {
    return ShapeImage
});*/
class nn extends ShapeBase {
    constructor() {
        super(...arguments);
        this.state = {
            isLoading: this.getLoadable()
        };
        this.handleImageLoaded = () => {
            var e = this.shape().data;
            ImageDataHelper.getImageSize(ImageLoader.getComponentUrlToRawUrl(e.url)).then((e) => {
                console.log("loaded");
                this.orgSize = e;
                this.shape().___size = e;
                this.setState({
                    isLoading: false,
                    isError: false
                })
            }).
            catch(() => {
                this.setState({
                    isLoading: false,
                    isError: true
                })
            })
        };
        this.handleImageError = () => {
            this.setState({
                isLoading: false,
                isError: true
            })
        };
        this.handleRef = (e) => {
            return this.imageRef = e
        }
    }
    getLoadable() {
        return !Global.isSafari()
    }
    shouldComponentUpdate(e, t) {
        return this.state.isLoading != t.isLoading || this.state.isError != t.isError || super.shouldComponentUpdate(e, t)
    }
    componentWillReceiveProps(e) {
        if (this.props.shape.data.url != e.shape.data.url) this.setState({
            isLoading: this.getLoadable()
        })
    }
    componentDidMount() {
        if (!Global.isSafari()) {
            jQuery(this.imageRef).on("load", this.handleImageLoaded);
            jQuery(this.imageRef).on("error", this.handleImageError)
        }
    }
    componentWillUnmount() {
        if (!Global.isSafari()) {
            jQuery(this.imageRef).off("load", this.handleImageLoaded);
            jQuery(this.imageRef).off("error", this.handleImageError)
        }
    }
    renderLoading() {
        if (this.state.isLoading || this.state.isError) {
            var e = this.shape().data;
            var t = Geometry.getCenterPoint(e);
            var n = e.p1;
            var r = e.rotation;
            var a = e.skewX;
            var i = e.flipX;
            var s = Geometry.rectWidthHeight(e);
            var l = s.width;
            var c = s.height;
            var d = (new TransformHelper).orgin(t.x, t.y).rotate(r).skew(a, 0).scale(i ? -1 : 1, 1);
            if (this.state.isError) {
                var h = "translate(".concat(l / 2 - 15, "px,").concat(c / 2 - 10, "px) scale(0.05,0.05)");
                return React.createElement("g", {
                    style: {
                        transform: d.translate(n.x, n.y).toCssStyle()
                    }
                },
                React.createElement("rect", {
                    fill: "rgba(0,0,0,0.35)",
                    stroke: "none",
                    x: 0,
                    y: 0,
                    width: l,
                    height: c
                }), React.createElement("g", {
                    style: {
                        transform: h
                    }
                },
                React.createElement("path", {
                    fill: "red",
                    stroke: "none",
                    d: "M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"
                })))
            }
            return this.state.isLoading ? React.createElement("g", {
                style: {
                    transform: d.translate(n.x, n.y).toCssStyle()
                }
            },
            React.createElement(LoadingIcon, {
                width: l,
                height: c
            })) : void 0
        }
    }
    render() {
        var e = this.shape().data;
        var t = e.p1;
        var n = e.rotation;
        var r = e.skewX;
        var a = e.flipX;
        var i = Geometry.rectWidthHeight(e);
        var s = i.width;
        var l = i.height;
        var c = Geometry.getCenterPoint(e);
        var d = {
            transform: (new TransformHelper).orgin(c.x, c.y).rotate(n).skew(r, 0).scale(a ? -1 : 1, 1).toCssStyle()
        };
        var h = ImageLoader.getComponentUrlToRawUrl(e.url);
        return this.shape().___size = this.orgSize,
        React.createElement("g", {
            className: this.props.className,
            onMouseDown: this.props.onMouseDown,
            onTouchStart: this.props.onMouseDown
        },
        this.getTransparentOnlyNoFill("M".concat(t.x, ",").concat(t.y, " L").concat(t.x + s, ",").concat(t.y, " L").concat(t.x + s, ",").concat(t.y + l, " L").concat(t.x, ",").concat(t.y + l, " Z")), React.createElement("image", {
            ref: this.handleRef,
            style: d,
            x: t.x,
            y: t.y,
            width: s,
            height: l,
            preserveAspectRatio: "none",
            xlinkHref: h
        }), this.renderLoading())
    }
}
class an extends ShapeBaseC {}
var ShapeImage = new class extends ShapeBaseB {
    getIcon() {
        return {
            caption: "",
            component: React.createElement("svg", {
                style: {
                    width: 23,
                    height: 20,
                    position: "relative"
                },
                key: this.getType()
            },
            React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(1px,0px)"
                },
                d: " M10.1,4.6 L16.3,10 L10.1,15.4 L3.9,10 Z"
            }))
        }
    }
    styleSupports() {
        return ["rotation", "skewX"]
    }
    createShape(e) {
        return super.createShape(_.assignIn({},
        e, {
            shapeWidth: e.shapeWidth || 70,
            shapeHeight: e.shapeHeight || 70
        }))
    }
    getComponent() {
        return nn
    }
    getType() {
        return "image"
    }
    getSettingsComponent() {
        return an
    }
    getBreakdownInfoWhenInvalidCache(e) {
        return {
            data: Geometry.pointsToLines(rn(e))
        }
    }
    getSnapablePoints(e) {
        return rn(e)
    }
    getBoundingRect(e) {
        var t = rn(e);
        return Geometry.getBoundingRectFromPoints(t)
    }
}

export { ShapeImage as ShapeImageB }

export default rn