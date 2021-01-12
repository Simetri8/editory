import _ from 'lodash';
import classNames from 'classnames';
import jQuery from 'jquery';
import ProgressBar from 'react-progressbar.js';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { IsNumberB } from '../Mathcha/IsNumber';
import AccessibilityDialog from './AccessibilityDialog';
import CursorHandler from './CursorHandler';
import DOMHelper from '../Elements/DOMHelper';
import EventHelper from '../Mathcha/EventHelper';
import Global from '../Global';
import ImageLoader from '../Mathcha/ImageLoader';
import ImageManagerMain from './ImageManagerMain';
import ImageServiceProp from '../Mathcha/ImageServiceProp';
import ImageUploader from './ImageUploader';
import LoadingBackdrop from '../Elements/LoadingBackdrop';
import MobileTabletClasses from '../Mathcha/MobileTabletClasses';
import MouseDownEventAddRemove from './MouseDownEventAddRemove';
import MovingHandler from './MovingHandler';
import PrintSettingsMarginInput from '../Document/PrintSettingsMarginInput';
import PropUpdateHelper from '../Mathcha/PropUpdateHelper';
import SymbolSettingButton from '../Elements/SymbolSettingButton';

/// xxx(191) /*ImageViewer2*/

/// var r = n(3)/*_.assignIn*/;  // 11 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 62 times
/// var o = n.n(i);
/// var s = n(5)/*sizzle*/;  // 3 times
/// var l = n.n(s);
/// var c = n(14)/*classnames*/;  // 3 times
/// var d = n.n(c);
/// var h = n(16)/*ReactDOM*/;  // 1 times
/// var u = n.n(h);
/// var p = n(23)/*PropTypesExporter*/;  // 4 times
/// var m = n.n(p);
/// var f = n(24)/*EventHelper*/;  // 7 times
/// var g = n(7)/*PropUpdateHelper*/;  // 3 times
/// var y = n(4)/*DOMHelper*/;  // 1 times
/// var A = n(85)/*CursorHandler*/;  // 3 times
/// var E = n(106)/*SymbolSettingButton*/;  // 1 times
/// var C = n(195)/*PrintSettingsMarginInput*/;  // 1 times
/// var I = n(339)/*AccessibilityDialog*/;  // 1 times
/// var L = n(340)/*LoadingBackdrop*/;  // 1 times
/// var R = n(103)/*ImageLoader*/;  // 4 times
/// var M = n(460)/*ImageManagerMain*/;  // 1 times
/// var w = n(11)/*Global*/;  // 3 times
/// var O = n(179)/*IsNumber*/;  // 3 times
/// var D = n(76)/*MobileTabletClasses*/;  // 1 times
/// var N = n(60)/*MouseDownEventAddRemove*/;  // 8 times
/// var H = n(57)/*MovingHandler*/;  // 1 times
/// var zz = n(341)/*react-es6-progressbar*/;  // 1 times
/// var U = n.n(zz);
/// var W = n(229)/*ImageUploader*/;  // 1 times
/// var z = n(204)/*ImageServiceProp*/;  // 1 times
/*n.d(t, "a", function () {
    return V
});*/
var v = (e) => {
    var t = e.iconClass;
    var n = e.selected;
    var r = e.onSelect;
    var a = classNames(t, "settings__item", {
        selected: n
    });
    return React.createElement("i", {
        className: a,
        style: {
            fontSize: 16,
            padding: 3,
            margin: "3px 1px 1px 1px",
            display: "inline-block",
            height: 16
        },
        onClick: r
    });
};
var S = (e) => {
    var t = e.label;
    var n = e.width;
    var r = e.major;
    var a = {
        fontSize: 12,
        padding: r ? 3 : "3px 0",
        margin: r ? "3px 1px 1px 1px" : "3px 0 1px 0",
        fontWeight: r ? "bold" : void 0,
        display: "inline-block",
        height: 16,
        border: "1px solid transparent",
        textAlign: "left",
        width: n,
        verticalAlign: "top" == e.vAlign ? "top" : "baseline"
    };
    return React.createElement("span", {
        style: a
    },
    t);
};
var x = (e) => {
    var t = e.value;
    var n = e.min;
    var r = e.max;
    var a = e.decimals;
    var i = e.disableSlider;
    var s = e.onValueChanged;
    var l = void 0 === s ? () => {} : s;
    var c = {
        fontSize: 12,
        padding: 3,
        margin: "3px 1px 1px 1px",
        display: "inline-block",
        height: 16,
        width: e.width
    };
    return React.createElement(PrintSettingsMarginInput, {
        disableSlider: i,
        style: c,
        value: t,
        min: n,
        max: r,
        decimals: a,
        onValueChanging: (e) => {
            l(e);
        },
        onValueChanged: (e) => {
            l(e);
        }
    });
};
class T extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            src: this.props.src
        };
        this.getBulbRef = (e) => {
            this.bulb = e;
        };
        this.handleAccessibilityChange = (e) => {
            this.props.onAccessibilityChange(e);
            this.setState({
                showAccessibility: false
            });
        };
    }
    setPosition(e, t) {
        if (this.bulb) {
            this.bulb.setPosition(e, t);
        }
    }
    isExpandedDetail() {
        return this.bulb && this.bulb.isExpandedDetail();
    }
    collapseDetailView() {
        this.bulb.collapseDetailView();
    }
    render() {
        var e = null;
        if (!this.props.inline) {
            e = React.createElement("div", {
                style: {
                    textAlign: "left",
                    padding: "0 4px",
                    height: 30
                }
            },
            React.createElement(S, {
                vAlign: "top",
                major: true,
                label: "Align:",
                width: 40
            }), React.createElement(v, {
                key: "1",
                selected: "left" === this.props.align,
                iconClass: "fa fa-align-left",
                onSelect: () => {
                    this.props.onAlignChanged("left");
                }
            }), React.createElement(v, {
                key: "2",
                selected: "center" === this.props.align,
                iconClass: "fa fa-align-center",
                onSelect: () => {
                    this.props.onAlignChanged("center");
                }
            }), React.createElement(v, {
                key: "3",
                selected: "right" === this.props.align,
                iconClass: "fa fa-align-right",
                onSelect: () => {
                    this.props.onAlignChanged("right");
                }
            }));
        }
        var t = _.assignIn({},
        b, {
            top: this.props.inline ? -97 : -127
        });
        return React.createElement(SymbolSettingButton, {
            manuallyUpdate: true,
            onExpandDetail: this.props.onExpandDetail,
            childPositionByBulbOriginalPos: true,
            ref: this.getBulbRef,
            style: {
                position: "absolute",
                left: -20,
                top: -28
            }
        },
        React.createElement("x-detail", {
            class: "mt-common-dialog",
            onMouseDown: (e) => {
                return e.stopPropagation();
            },
            style: t,
            onDoubleClick: EventHelper.onDoubleClickStopPropagation
        },
        React.createElement("div", {
            style: {
                textAlign: "left",
                padding: "0 4px",
                height: 30,
                width: 140
            }
        },
        React.createElement(S, {
            major: true,
            label: "Width:",
            width: 40
        }), React.createElement(x, {
            width: 25,
            min: 1,
            max: 1e4,
            disableSlider: true,
            value: this.props.size.width,
            onValueChanged: this.props.onWidthChanged,
            onMouseDown: (e) => {
                EventHelper.setCustomInfo(e, CursorHandler.getBuilder().withFocusAcquired().withHandledCursorSelected().build());
            }
        }), React.createElement(S, {
            label: "px",
            width: 20
        })), React.createElement("div", {
            style: {
                textAlign: "left",
                padding: "0 4px",
                height: 30
            }
        },
        React.createElement(S, {
            major: true,
            label: "Height:",
            width: 40
        }), React.createElement(x, {
            width: 25,
            min: 1,
            max: 1e4,
            disableSlider: true,
            value: this.props.size.height,
            onValueChanged: this.props.onHeightChanged,
            onMouseDown: (e) => {
                EventHelper.setCustomInfo(e, CursorHandler.getBuilder().withFocusAcquired().withHandledCursorSelected().build());
            }
        }), React.createElement(S, {
            label: "px",
            width: 20
        })), this.renderLock(), e, React.createElement("div", {
            style: {
                borderTop: "1px solid lightgray"
            }
        },
        React.createElement("button", {
            style: {
                margin: 5
            },
            onClick: () => {
                return this.setState({
                    showAccessibility: true
                });
            },
            className: "btn-normal"
        },
        "Configure Accessibility")), this.renderAccessibility()));
    }
    toggleScaleOption() {
        var e = this.props.scaleOption;
        if (e && "width" != e && "height" != e) {
            this.props.onScaleOptionChanged("width");
        } else {
            this.props.onScaleOptionChanged("both");
        }
    }
    renderAccessibility() {
        if (this.state.showAccessibility) {
            return React.createElement(AccessibilityDialog, {
                info: this.props.accessibility,
                onOk: this.handleAccessibilityChange,
                onClose: () => {
                    return this.setState({
                        showAccessibility: false
                    });
                }
            });
        }
    }
    renderLock() {
        var e = this.props.scaleOption;
        return e && "width" != e && "height" != e ? React.createElement("div", {
            style: {
                position: "absolute",
                right: 10,
                top: 0,
                height: 60
            }
        },
        React.createElement("svg", {
            onMouseDown: () => {
                return this.toggleScaleOption();
            },
            className: "settings__item",
            style: {
                width: 13,
                height: 13,
                position: "absolute",
                top: 22,
                right: -4,
                padding: 3
            },
            viewBox: "0 0 576 512"
        },
        React.createElement("path", {
            d: "M423.5 0C339.5.3 272 69.5 272 153.5V224H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48h-48v-71.1c0-39.6 31.7-72.5 71.3-72.9 40-.4 72.7 32.1 72.7 72v80c0 13.3 10.7 24 24 24h32c13.3 0 24-10.7 24-24v-80C576 68 507.5-.3 423.5 0z"
        }))) : React.createElement("div", {
            style: {
                position: "absolute",
                right: 10,
                top: 0,
                height: 60
            }
        },
        React.createElement("div", {
            style: {
                width: 5,
                height: 20,
                position: "absolute",
                top: 15,
                right: 20,
                borderTop: "1px solid gray",
                borderRight: "1px solid gray"
            }
        }), React.createElement("div", {
            style: {
                width: 5,
                height: 20,
                position: "absolute",
                bottom: 12,
                right: 20,
                borderBottom: "1px solid gray",
                borderRight: "1px solid gray"
            }
        }), React.createElement("svg", {
            onMouseDown: () => {
                return this.toggleScaleOption();
            },
            className: "settings__item selected",
            style: {
                width: 13,
                height: 13,
                position: "absolute",
                top: 22,
                right: -4,
                padding: 3
            },
            viewBox: "0 0 448 512"
        },
        React.createElement("path", {
            d: "M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"
        })));
    }
}
T.contextTypes = {
    requestImageSelection: PropTypes.any
};
var b = {
    display: "flex",
    flexDirection: "column",
    top: -70,
    left: 0,
    padding: 0,
    fontSize: 11,
    color: "gray",
    textAlign: "center",
    lineHeight: "18px",
    position: "absolute"
};
class k extends React.Component {
    constructor() {
        super(...arguments);
        this.getRefGhostViewer = (e) => {
            if (Global.isMobileOrTablet()) {
                if (e) {
                    var t = EventHelper.getFalsePassiveObject();
                    e.addEventListener("touchstart", this.touchStartPreventDefault, t);
                } else {
                    if (this.viewer) {
                        this.viewer.removeEventListener("touchstart", this.touchStartPreventDefault);
                    }
                }
            }
            this.viewer = e;
        };
    }
    touchStartPreventDefault(e) {
        e.preventDefault();
    }
    getBoxClass(e) {
        var t = false;
        return "width" == this.props.scaleOption ? t = "rightmiddle" != e && "leftmiddle" != e : "height" == this.props.scaleOption && (t = "topmiddle" != e && "bottommiddle" != e),
        MobileTabletClasses.addMobileTabletClssIfRequired(classNames("resize-box", {
            hide: t || this.props.selectOnly
        }));
    }
    getRect() {
        return this.viewer.getBoundingClientRect();
    }
    render() {
        var e;
        var t = this.props;
        var n = t.isResized;
        var r = t.scaleOption;
        e = this.props.isResized ? {
            display: "block",
            position: "absolute",
            top: this.props.rect.top,
            left: this.props.rect.left,
            width: this.props.rect.width,
            height: this.props.rect.height
        } : {
            display: "block",
            width: "100%",
            height: "100%",
            marginLeft: -1,
            marginTop: -1
        };
        var a = null;
        if (n) {
            var i = "Width:".concat(Object(IsNumberB)(this.props.rect.width, 0), " px");
            if ("both" == r) {
                i = "".concat(Object(IsNumberB)(this.props.rect.width, 0), " x ").concat(Object(IsNumberB)(this.props.rect.height, 0));
            }
            a = React.createElement("div", {
                style: {
                    position: "absolute",
                    background: "rgba(255,255,255,0.8)",
                    top: 10,
                    right: 10,
                    color: "gray",
                    fontSize: 12
                }
            },
            i);
        }
        return React.createElement("div", {
            ref: this.getRefGhostViewer,
            className: "no-print",
            onMouseDown: (e) => {
                e.preventDefault();
                e.stopPropagation();
            },
            style: e
        },
        a, React.createElement("div", {
            className: "ghost-viewer"
        }), React.createElement(MouseDownEventAddRemove, {
            onTouchOrMouseDown: (e) => {
                this.props.onBoxMouseDown(e, "topleft");
            }
        },
        React.createElement("top-left", {
            class: this.getBoxClass("topleft")
        })), React.createElement(MouseDownEventAddRemove, {
            onTouchOrMouseDown: (e) => {
                this.props.onBoxMouseDown(e, "topright");
            }
        },
        React.createElement("top-right", {
            class: this.getBoxClass("topright")
        })), React.createElement(MouseDownEventAddRemove, {
            onTouchOrMouseDown: (e) => {
                this.props.onBoxMouseDown(e, "topmiddle");
            }
        },
        React.createElement("top-middle", {
            class: this.getBoxClass("topmiddle")
        })), React.createElement(MouseDownEventAddRemove, {
            onTouchOrMouseDown: (e) => {
                this.props.onBoxMouseDown(e, "leftmiddle");
            }
        },
        React.createElement("left-middle", {
            class: this.getBoxClass("leftmiddle")
        })), React.createElement(MouseDownEventAddRemove, {
            onTouchOrMouseDown: (e) => {
                this.props.onBoxMouseDown(e, "rightmiddle");
            }
        },
        React.createElement("right-middle", {
            class: this.getBoxClass("rightmiddle")
        })), React.createElement(MouseDownEventAddRemove, {
            onTouchOrMouseDown: (e) => {
                this.props.onBoxMouseDown(e, "bottomleft");
            }
        },
        React.createElement("bottom-left", {
            class: this.getBoxClass("bottomleft")
        })), React.createElement(MouseDownEventAddRemove, {
            onTouchOrMouseDown: (e) => {
                this.props.onBoxMouseDown(e, "bottomright");
            }
        },
        React.createElement("bottom-right", {
            class: this.getBoxClass("bottomright")
        })), React.createElement(MouseDownEventAddRemove, {
            onTouchOrMouseDown: (e) => {
                this.props.onBoxMouseDown(e, "bottommiddle");
            }
        },
        React.createElement("bottom-middle", {
            class: this.getBoxClass("bottommiddle")
        })));
    }
}
function B(e, t, n) {
    return t.bottom - e - n.top;
}
function P(e, t, n) {
    return t.right - e - n.left;
}
var F = (e, t, n, r) => {
    switch (e) {
    case "bottomright":
        return {
            width: Math.max(t.left - n.left, 5),
            height: Math.max(t.top - n.top, 5)
        };
    case "topright":
        return {
            width: a = Math.max(t.left - n.left, 5),
            height: i = Math.max(n.bottom - t.top, 5),
            top: B(i, n, r)
        };
    case "bottomleft":
        return {
            width: a = Math.max(n.right - t.left, 5),
            height: i = Math.max(t.top - n.top, 5),
            left: P(a, n, r)
        };
    case "topleft":
        return {
            width: a = Math.max(n.right - t.left, 5),
            height: i = Math.max(n.bottom - t.top, 5),
            top: B(i, n, r),
            left: P(a, n, r)
        };
    case "rightmiddle":
        return {
            width: a = Math.max(t.left - n.left, 5)
        };
    case "topmiddle":
        return {
            height: i = Math.max(n.bottom - t.top, 5),
            top: B(i, n, r)
        };
    case "leftmiddle":
        var a;
        return {
            width: a = Math.max(n.right - t.left, 5),
            left: P(a, n, r)
        };
    case "bottommiddle":
        var i;
        return {
            height: i = Math.max(t.top - n.top, 5)
        };
    }
};
class G extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            progress: 0
        };
    }
    componentDidMount() {
        this.lastUploadImageAction = ImageUploader.uploadImage(this.props.file, (e) => {
            this.setState({
                progress: e
            });
        }).then((e) => {
            var t = e.name;
            var n = e.folderName;
            this.props.onUploadDone(ImageLoader.getComponentUrl(t, n));
        }).
        catch(() => {
            this.props.onUploadFailed();
        }).
        finally(() => {
            this.lastUploadImageAction = null;
        });
    }
    componentWillUnmount() {
        if (this.lastUploadImageAction) {
            this.lastUploadImageAction.cancel();
        }
    }
    render() {
        return React.createElement(ProgressBar.Circle, {
            progress: this.state.progress,
            text: Math.round(100 * this.state.progress) + "%",
            options: {
                strokeWidth: 10,
                color: "rgb(76,175,80)",
                trailColor: "lightgray",
                text: {
                    autoStyleContainer: false
                }
            },
            initialAnimate: true,
            containerStyle: {
                position: "absolute",
                width: 50,
                height: 50,
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
                maxWidth: "100%",
                maxHeight: "100%",
                fontSize: 12
            },
            containerClassName: ".progressbar"
        });
    }
}
var Y = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
var K = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#e8e8e8" d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z"/></svg>';
class V extends React.Component {
    constructor(e) {
        super(e);
        this.componentMounted = false;
        this.movingHandler = new MovingHandler;
        this.onBoxMouseDown = (e, t) => {
            this.setState({
                isResized: true
            });
            this.baseRect = this.ghostViewer.getRect();
            this.imageContentRect = this.imageContent.getBoundingClientRect();
            this.movingHandler.setBaseElement(ReactDOM.findDOMNode(this));
            this.movingHandler.mouseDown(e, t);
        };
        this.handleWithChanged = (e) => {
            var t = this.props.data;
            if ("both" == this.props.data.scaleOption) {
                return this.props.onDataChanged(_.assignIn({},
                t, {
                    imageSize: _.assignIn({},
                    t.imageSize, {
                        width: e
                    })
                }));
            }
            var n = this.getImageNaturalSize();
            var r = e * n.height / n.width;
            this.props.onDataChanged(_.assignIn({},
            t, {
                imageSize: {
                    width: e,
                    height: r
                }
            }));
        };
        this.handleHeightChanged = (e) => {
            var t = this.props.data;
            if ("both" == this.props.data.scaleOption) {
                return this.props.onDataChanged(_.assignIn({},
                t, {
                    imageSize: _.assignIn({},
                    t.imageSize, {
                        height: e
                    })
                }));
            }
            var n = this.getImageNaturalSize();
            var r = e * n.width / n.height;
            this.props.onDataChanged(_.assignIn({},
            t, {
                imageSize: {
                    width: r,
                    height: e
                }
            }));
        };
        this.handleScaleOptions = (e, t) => {
            var n = this.getGhostViewSize();
            var r = this.getImageNaturalSize();
            var i = n.width;
            var o = n.height;
            switch (e) {
            case "height":
                i = o * r.width / r.height;
                break;
            case "width":
                o = i * r.height / r.width;
            }
            if (t) {
                console.log("overwrite history!!!");
                var s = this.props.data;
                var l = s.imageSize || {
                    width: 0,
                    height: 0
                };
                if (! (s.scaleOption === e && l.width === i && l.height === o)) {
                    s.scaleOption = e;
                    s.imageSize = {
                        width: i,
                        height: o
                    };
                    this.forceUpdate();
                    this.context.notifyDataChanged();
                }
            } else {
                var c = PropUpdateHelper.set(this.props.data, "scaleOption", e);
                this.props.onDataChanged(_.assignIn({},
                c, {
                    imageSize: {
                        width: i,
                        height: o
                    }
                }));
            }
        };
        this.onMouseMove = (e, t, n, r, i) => {
            if (this.state.isResized) {
                var o = EventHelper.getLeftTopFromEvent(r);
                var s = F(n.customData, o, this.baseRect, this.imageContentRect);
                this.setState({
                    ghostViewerRectangle: _.assignIn({},
                    this.getGhostViewSize(), s)
                });
            }
        };
        this.getGhostViewRef = (e) => {
            this.ghostViewer = e;
        };
        this.setAlignments = (e) => {
            this.props.onDataChanged(PropUpdateHelper.set(this.props.data, "align", e));
        };
        this.handleSetImageUrl = (e, t) => {
            if (t) {
                var n = this.props.data.url;
                return this.props.data.url = e,
                this.isUrlChanged(e, n) && this.setState({
                    isLoading: true
                }),
                void this.context.notifyDataChanged();
            }
            this.props.onDataChanged(PropUpdateHelper.set(this.props.data, "url", e));
        };
        this.getImageSettings = (e) => {
            this.imageSettingsRef = e;
        };
        this.getChangeButtonSettings = (e) => {
            this.changeButtonRef = e;
        };
        this.onImageExpandDetail = () => {
            this.jqueryShowChangeImageButton(false);
        };
        this.onRequestImageLibrary = () => {
            this.context.requestImageSelection(this.props.data.url, this.handleSetImageUrl);
        };
        this.handleAccessibilityChange = (e) => {
            this.props.onDataChanged(_.assignIn({},
            this.props.data, {
                accessibility: e
            }));
        };
        this.handleImageLoaded = () => {
            this.setState({
                isLoading: false
            });
            if (this.componentMounted) {
                console.log("image with component mounted");
                this.handleScaleOptions(this.props.data.scaleOption, true);
            }
            console.log("image loaded");
        };
        this.handleImageError = (e) => {
            console.log(e.nativeEvent);
            this.setState({
                isLoading: false
            });
            console.log("image error");
        };
        this.handleMouseDown = (e) => {
            if (!EventHelper.getCustomEventInfo(e)) {
                EventHelper.setCustomInfo(e, CursorHandler.getBuilder().withHandledCursorSelected().build());
            }
            if (this.imageSettingsRef && this.imageSettingsRef.isExpandedDetail()) {
                this.imageSettingsRef.collapseDetailView();
                this.jqueryShowChangeImageButton(true);
            }
        };
        this.getImageRef = (e) => {
            this.imageRef = e;
        };
        this.handleUploadDone = (e) => {
            ImageManagerMain.lastImagesInfo = null;
            this.handleSetImageUrl(e, true);
            this.setState({
                uploadFile: null
            });
        };
        this.handleUploadFailed = () => {
            this.setState({
                uploadFile: null
            });
            console.log("upload failed");
            this.context.showMessage("Upload Image Failed!", "error");
        };
        this.state = {
            isLoading: true,
            isResized: false
        };
        this.movingHandler.onMoving = this.onMouseMove;
        this.movingHandler.onMoved = () => {
            this.handleScaleOptions(this.props.data.scaleOption);
            this.setState({
                isResized: false,
                ghostViewerRectangle: null
            });
        };
    }
    getImageSizeDefault() {
        return {
            width: parseInt(this.props.width, 10),
            height: parseInt(this.props.height, 10)
        };
    }
    componentWillReceiveProps(e) {
        if (this.isUrlChanged(e.data.url, this.props.data.url)) {
            this.setState({
                isLoading: true
            });
        }
    }
    componentDidMount() {
        if (this.componentMounted = true, this.calculateSettingsPosition(), V.requestFileUpload) {
            if (Global.isUploadHandleByService()) {
                var e = V.requestFileUpload.path;
                ImageServiceProp.getService().requestFileUploadFromService(e).then((e) => {
                    this.handleSetImageUrl(e, true);
                });
                console.log(e);
            } else {
                this.setState({
                    uploadFile: V.requestFileUpload
                });
            }
            V.requestFileUpload = null;
        }
    }
    componentDidUpdate() {
        this.calculateSettingsPosition();
    }
    calculateSettingsPosition() {
        if (this.props.isSelected && this.imageSettingsRef) {
            var e = DOMHelper.findRectElementToElement(this.imageContent, this.imageContainer);
            this.imageSettingsRef.setPosition(e.left - 25, e.top - 29);
            if (this.changeButtonRef) {
                jQuery(this.changeButtonRef).css("left", e.left - 25 + 25);
                jQuery(this.changeButtonRef).css("top", e.top - 29);
            }
        }
    }
    getImageSizeFromProp() {
        return this.props.data.imageSize ? this.props.data.imageSize : this.getImageSizeDefault();
    }
    getGhostViewSize() {
        return this.state.ghostViewerRectangle || this.getWidthHeightFromProps();
    }
    renderGhostViewer() {
        if (this.props.isSelected) {
            return React.createElement(k, {
                ref: this.getGhostViewRef,
                rect: this.getGhostViewSize(),
                isResized: this.state.isResized,
                scaleOption: this.props.data.scaleOption,
                selectOnly: this.props.selectOnly,
                onBoxMouseDown: this.onBoxMouseDown
            });
        }
    }
    isUrlChanged(e, t) {
        return ImageLoader.getComponentUrlToRawUrl(e) != ImageLoader.getComponentUrlToRawUrl(t);
    }
    renderLoadingOverlay() {
        if (this.state.isLoading) {
            return React.createElement(LoadingBackdrop, {
                onSelected: this.props.onSelected
            });
        }
    }
    jqueryShowChangeImageButton(e) {
        jQuery(this.changeButtonRef).css("display", e ? "block" : "none");
    }
    renderBulb() {
        if (this.props.selectOnly) {
            return null;
        }
        if (!this.props.isSelected) {
            return null;
        }
        var e = this.props.data;
        var t = e.url;
        var n = e.align;
        var r = e.scaleOption;
        var a = e.accessibility;
        var i = [React.createElement(T, {
            key: "1",
            size: this.getWidthHeightFromProps(),
            onExpandDetail: this.onImageExpandDetail,
            ref: this.getImageSettings,
            accessibility: a,
            onAccessibilityChange: this.handleAccessibilityChange,
            inline: this.props.inline,
            src: t,
            align: n,
            scaleOption: r,
            onWidthChanged: this.handleWithChanged,
            onHeightChanged: this.handleHeightChanged,
            onImageUrlChanged: this.handleSetImageUrl,
            onAlignChanged: this.setAlignments,
            onScaleOptionChanged: this.handleScaleOptions
        })];
        return Global.allowToChangeImage() && i.push(React.createElement("button", {
            key: "2",
            className: "btn-normal btn-large no-print",
            style: {
                position: "absolute",
                left: 100,
                top: -48,
                background: "#f7f7f7",
                width: 100
            },
            onClick: this.onRequestImageLibrary,
            ref: this.getChangeButtonSettings
        },
        " Change Image ")),
        i;
    }
    getWidthHeightFromProps() {
        return this.props.data.imageSize ? {
            width: this.props.data.imageSize.width,
            height: this.props.data.imageSize.height
        } : {
            width: 50,
            height: 50
        };
    }
    getImageUrl() {
        return this.state.uploadFile ? Y : this.props.data.url ? ImageLoader.getComponentUrlToRawUrl(this.props.data.url) : K;
    }
    getImageNaturalSize() {
        return this.imageRef && this.imageRef.naturalHeight && this.imageRef.naturalWidth ? {
            width: this.imageRef.naturalWidth,
            height: this.imageRef.naturalHeight
        } : this.getImageSizeFromProp();
    }
    renderInlineUpload() {
        if (this.state.uploadFile) {
            return React.createElement(G, {
                file: this.state.uploadFile,
                onUploadDone: this.handleUploadDone,
                onUploadFailed: this.handleUploadFailed
            });
        }
    }
    render() {
        var e = this.getImageUrl();
        var t = classNames({
            inline: this.props.inline
        });
        var n = _.assignIn({},
        this.getWidthHeightFromProps(), {
            position: "relative"
        });
        var r = this.props.data.accessibility || {};
        return React.createElement("image-viewer", {
            class: t,
            onMouseDown: this.handleMouseDown
        },
        React.createElement("image-container", {
            class: this.props.data.align,
            ref: (e) => {
                return this.imageContainer = e;
            }
        },
        React.createElement("div", {
            className: "image-content",
            ref: (e) => {
                this.imageContent = e;
            },
            style: n
        },
        React.createElement("img", {
            title: r.title,
            alt: r.description,
            ref: this.getImageRef,
            src: e,
            style: {
                width: "100%",
                height: "100%"
            },
            onLoad: this.handleImageLoaded,
            onError: this.handleImageError,
            onMouseDown: (e) => {
                this.props.onSelected(e);
            }
        }), this.renderGhostViewer(), this.renderLoadingOverlay()), this.renderBulb(), this.renderInlineUpload()));
    }
}
V.contextTypes = {
    requestImageSelection: PropTypes.any,
    showMessage: PropTypes.any,
    notifyDataChanged: PropTypes.any
};
V.requestFileUpload = null

export default V