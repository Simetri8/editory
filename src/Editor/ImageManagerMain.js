import _ from 'lodash';
import { AutoSizer } from 'react-virtualized';
import { CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { createCellPositioner, Masonry } from 'react-virtualized/dist/commonjs/Masonry';
import ProgressBar from 'react-progressbar.js';
import PropTypes from 'prop-types';
import React from 'react';
import ImageDataHelper from './ImageDataHelper';
import ImageLoader from '../Mathcha/ImageLoader';
import ImageUploader from './ImageUploader';
import KeyDownEventRegisterer from '../Mathcha/KeyDownEventRegisterer';
import LoadingBackdrop from '../Elements/LoadingBackdrop';
import ModalConfirmDialog from './ModalConfirmDialog';
import ModalDialog from './ModalDialog';
import ModalDialogHelper from './ModalDialogHelper';

/// xxx(460) /*ImageManagerMain*/

/// var r = n(3)/*_.assignIn*/;  // 3 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 81 times
/// var o = n.n(i);
/// var s = n(545)/*virtualized-Masonry*/;  // 2 times
/// var l = n(546)/*virtualized-CellMeasurer*/;  // 2 times
/// var c = n(709)/*virtualized-AutoSizer*/;  // 1 times
/// var d = n(103)/*ImageLoader*/;  // 6 times
/// var h = n(187)/*ImageViewer*/;  // 3 times
/// var u = n(2)/*lodash*/;  // 5 times
/// var p = n.n(u);
/// var b = n(229)/*ImageUploader*/,  // 3 times
/// L = n(23)/*PropTypesExporter*/,  // 36 times
/// R = n.n(L);/*var M=x(711)core-js,w=n.n(M);*/
/// var z = n(341)/*react-es6-progressbar*/,  // 1 times
/// Y = n.n(z);
/// var V = n(342)/*ModalConfirmDialog*/,  // 1 times
/// j = n(88)/*ModalDialogHelper*/,  // 2 times
/// q = n(124)/*ModalDialog*/,  // 1 times
/// Q = n(340)/*LoadingBackdrop*/;  // 1 times
/// var J = n(131)/*KeyDownEventRegisterer*/;  // 2 times
/*n.d(t, "a", function () {
    return te
});*/
var Z = ModalDialogHelper.getModalDialog();
var ee = ModalDialogHelper.getModalDialog();
class m extends React.Component {
    constructor(e) {
        super(e);
        this.handleImageClick = (e, t) => {
            var n = this.props.selectedKeys;
            if (e.shiftKey || e.metaKey) {
                return _.includes(n, t.key) ? void this.props.onSelect(n.filter((e) => {
                    return e != t.key;
                })) : void this.props.onSelect(n.concat(t.key));
            }
            this.props.onSelect([t.key]);
        };
        this.cellRenderer = (e) => {
            var t = e.index;
            var n = e.key;
            var r = e.parent;
            var i = e.isScrolling;
            var s = e.style;
            var c = this.getList()[t];
            if (!c) {
                return null;
            }
            i = i;
            var u = (this.props.selectedKeys || []).indexOf(c.key) >= 0;
            var p = _.assignIn({},
            s, {
                width: 140,
                height: 140,
                padding: 5,
                background: u ? "#b8deb8" : "",
                color: u ? "black" : ""
            });
            var m = {
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                height: 100,
                background: u ? "" : "#e8e6e6"
            };
            var f = c.name.indexOf("-");
            var g = c.name.substr(f + 1);
            return React.createElement(CellMeasurer, {
                cache: this.cellMeasurerCache,
                index: t,
                key: n,
                parent: r
            },
            React.createElement("div", {
                style: p,
                onDoubleClick: this.props.onDoubleClick,
                onClick: (e) => {
                    return this.handleImageClick(e, c);
                }
            },
            React.createElement("div", {
                style: m
            },
            React.createElement("img", {
                src: ImageLoader.getThumbnailUrl(c.key, this.props.imageFolder),
                style: {
                    maxWidth: 140,
                    maxHeight: 100
                }
            }), React.createElement("div", {
                style: {
                    display: "inline-block",
                    position: "absolute",
                    right: 5,
                    bottom: 45,
                    fontSize: 10,
                    background: "#00000054",
                    color: "white",
                    paddingLeft: 2,
                    paddingRight: 2
                }
            },
            ImageDataHelper.formatBytes(c.size))), React.createElement("div", {
                style: {
                    paddingTop: 10,
                    maxHeight: 30,
                    overflow: "hidden"
                }
            },
            g)));
        };
        this.keyMapper = (e) => {
            var t = this.getList()[e];
            return t ? t.key : "n" + Math.random();
        };
        this.onResize = (e) => {
            var t = e.width;
            var n = Math.floor(t / 160);
            this.cellPositioner.reset({
                columnCount: n,
                columnWidth: 150,
                spacer: 10
            });
            this.masonryRef.recomputeCellPositions();
        };
        this.getMasonryRef = (e) => {
            this.masonryRef = e;
        };
        this.handleRemove = () => {
            this.props.onRemove(this.props.selectedKeys);
        };
        this.cellMeasurerCache = new CellMeasurerCache({
            defaultHeight: 150,
            defaultWidth: 150,
            fixedWidth: true,
            fixedHeight: true
        });
        this.cellPositioner = Object(createCellPositioner)({
            cellMeasurerCache: this.cellMeasurerCache,
            columnCount: 3,
            columnWidth: 150,
            spacer: 10
        });
    }
    getList() {
        return this.props.images || [];
    }
    renderError() {
        if (!this.props.error) {
            return null;
        }
        var e = this.props.error;
        return e.includes("Your session has expired") && (e = 'Please login to use this feature (or swith to tab "From Url")'),
        React.createElement("warning-error-region", {
            style: {
                position: "absolute",
                top: -20,
                left: "50%",
                transform: "translate(-50%,0)"
            }
        },
        React.createElement("x-error", null, React.createElement("i", {
            className: "fa fa-exclamation-triangle",
            "aria-hidden": "true"
        }), e));
    }
    renderRemoveButton() {
        var e = this.props;
        var t = e.selectedKeys;
        var n = e.images;
        return React.createElement("button", {
            disabled: !t || t.length <= 0 || !n || n.length <= 0 || this.props.isLoading,
            className: "btn-normal",
            style: {
                height: 22
            },
            onClick: this.handleRemove
        },
        React.createElement("i", {
            className: "fa fa-trash",
            "aria-hidden": "true",
            style: {
                fontSize: "1.2em",
                color: "#ce0303",
                paddingRight: 5
            }
        }), React.createElement("span", null, "Remove"));
    }
    renderRefreshButton() {
        return React.createElement("button", {
            disabled: this.props.isLoading,
            className: "btn-normal",
            style: {
                height: 22,
                marginLeft: 10,
                border: "none"
            },
            onClick: this.props.onRefresh
        },
        React.createElement("i", {
            className: "fa fa-refresh",
            "aria-hidden": "true",
            style: {
                fontSize: "1.2em",
                color: "rgb(76,175,80)"
            }
        }));
    }
    render() {
        var e = {
            height: 4,
            width: "100%",
            overflow: "hidden",
            position: "absolute",
            top: 29,
            left: 0,
            display: this.props.isLoading ? "block" : "none"
        };
        var t = this.props.selectedKeys || [];
        var n = this.props.images || [];
        var r = ImageDataHelper.formatBytes(_.sumBy(n, (e) => {
            return e.size;
        }));
        return React.createElement("div", {
            style: {
                display: "flex",
                flexGrow: 1,
                flexDirection: "column",
                position: "relative"
            }
        },
        React.createElement("div", {
            className: "thin-loader",
            style: e
        }), this.renderError(), React.createElement("div", {
            style: {
                height: 25,
                fontSize: 12,
                borderBottom: "1px solid lightgray",
                marginBottom: 15,
                display: "flex",
                alignItems: "baseline"
            }
        },
        this.renderRemoveButton(), React.createElement("div", {
            style: {
                marginLeft: 10
            }
        },
        t.length, " Selected"), React.createElement("div", {
            style: {
                flexGrow: 1,
                textAlign: "right",
                fontSize: 12
            }
        },
        n.length, " Images,Used ", React.createElement("span", {
            style: {
                color: "rgb(76,175,80)"
            }
        },
        r, " "), " (Max 50MB)"), this.renderRefreshButton()), React.createElement("div", {
            style: {
                flexGrow: 1
            }
        },
        React.createElement(AutoSizer, {
            onResize: this.onResize
        },
        (e) => {
            var t = e.height;
            var n = e.width;
            return React.createElement(Masonry, {
                style: {
                    outline: "none",
                    cursor: "default"
                },
                ref: this.getMasonryRef,
                keyMapper: this.keyMapper,
                autoHeight: false,
                cellCount: this.getList().length,
                cellMeasurerCache: this.cellMeasurerCache,
                cellPositioner: this.cellPositioner,
                cellRenderer: this.cellRenderer,
                width: n,
                height: t
            });
        })));
    }
}
var f = {
    outline: "none"
};
var g = {
    flexGrow: 1,
    margin: "0 10px 10px 10px",
    border: "1px solid lightgray",
    background: "white",
    padding: 10,
    display: "flex"
};
var y = {
    background: "#00000040",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 19999
};
var A = {
    display: "flex",
    flexDirection: "row"
};
var E = {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderLeft: "1px solid lightgray",
    borderRight: "1px solid lightgray",
    borderBottom: "1px solid lightgray",
    background: "white"
};
var v = {
    flexGrow: 1,
    textAlign: "center",
    borderLeft: "1px solid lightgray",
    borderTop: "2px solid #4CAF50",
    borderRight: "1px solid lightgray",
    lineHeight: "1.8em",
    background: "white"
};
var S = {
    flexGrow: 1,
    textAlign: "center",
    borderBottom: "1px solid lightgray",
    lineHeight: "1.8em",
    cursor: "pointer",
    borderLeft: "1px solid transparent",
    borderTop: "2px solid transparent",
    borderRight: "1px solid transparent"
};
var C = {
    flexGrow: 1,
    margin: "10px 10px 10px 0",
    display: "flex",
    flexDirection: "column"
};
var x = {
    height: 100,
    width: 170,
    margin: 10,
    border: "1px solid lightgray",
    background: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer"
};
var I = {
    display: "flex",
    flexDirection: "row"
};
var T = {
    position: "fixed",
    color: "gray",
    background: "rgb(239,238,238)",
    boxShadow: "0 0 2px black",
    display: "flex",
    flexDirection: "column",
    zIndex: 19999,
    fontSize: 13
};
var O = "undefined" == typeof document || !document || !document.createElement || "multiple" in document.createElement("input");
function D(e, t) {
    return "application/x-moz-file" === e.type || true;
}
function N(e) {
    e.preventDefault();
}
var k = {
    borderStyle: "solid",
    borderColor: "#c66",
    backgroundColor: "#eee"
};
var B = {
    opacity: .5
};
var P = {
    borderStyle: "solid",
    borderColor: "#6c6",
    backgroundColor: "#eee"
};
var F = {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: "#666",
    borderStyle: "dashed",
    borderRadius: 5
};
var H = Object.assign ||
function (e) {
    var t = 1;
    for (; t < arguments.length; t++) {
        var n = arguments[t];
        var r;
        for (r in n) {
            if (Object.prototype.hasOwnProperty.call(n, r)) {
                e[r] = n[r];
            }
        }
    }
    return e;
};
var xx = function () {
    function e(e, t) {
        var n = 0;
        for (; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || false;
            r.configurable = true;
            if ("value" in r) {
                r.writable = true;
            }
            Object.defineProperty(e, r.key, r);
        }
    }
    return function (t, n, r) {
        return n && e(t.prototype, n),
        r && e(t, r),
        t;
    };
} ();
function U(e, t) {
    var n = {};
    var r;
    for (r in e) {
        if (! (t.indexOf(r) >= 0)) {
            if (Object.prototype.hasOwnProperty.call(e, r)) {
                n[r] = e[r];
            }
        }
    }
    return n;
}
var W = function (e) {
    function t(e, n) {
        function runNow(e, t) {
            if (! (e instanceof t)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }
        runNow(this, t);
        var r = function (e, t) {
            if (!e) {
                throw new ReferenceError("this hasn't been initialised-super() hasn't been called");
            }
            return !t || "object" != typeof t && "function" != typeof t ? e : t;
        } (this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, n));
        return r.renderChildren = function (e, t, n, a) {
            return "function" == typeof e ? e(H({},
            r.state, {
                isDragActive: t,
                isDragAccept: n,
                isDragReject: a
            })) : e;
        },
        r.composeHandlers = r.composeHandlers.bind(r),
        r.onClick = r.onClick.bind(r),
        r.onDocumentDrop = r.onDocumentDrop.bind(r),
        r.onDragEnter = r.onDragEnter.bind(r),
        r.onDragLeave = r.onDragLeave.bind(r),
        r.onDragOver = r.onDragOver.bind(r),
        r.onDragStart = r.onDragStart.bind(r),
        r.onDrop = r.onDrop.bind(r),
        r.onFileDialogCancel = r.onFileDialogCancel.bind(r),
        r.onInputElementClick = r.onInputElementClick.bind(r),
        r.setRef = r.setRef.bind(r),
        r.setRefs = r.setRefs.bind(r),
        r.isFileDialogActive = false,
        r.state = {
            draggedFiles: [],
            acceptedFiles: [],
            rejectedFiles: []
        },
        r;
    }
    return function (e, t) {
        if ("function" != typeof t && null !== t) {
            throw new TypeError("Super expression must either be null or a function,not " + typeof t);
        }
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (t) {
            if (Object.setPrototypeOf) {
                Object.setPrototypeOf(e, t);
            } else {
                e.__proto__ = t;
            }
        }
    } (t, React.Component),
    xx(t, [{
        key: "componentDidMount",
        value: function () {
            var e = this.props.preventDropOnDocument;
            this.dragTargets = [];
            if (e) {
                document.addEventListener("dragover", N, false);
                document.addEventListener("drop", this.onDocumentDrop, false);
            }
            this.fileInputEl.addEventListener("click", this.onInputElementClick, false);
            window.addEventListener("focus", this.onFileDialogCancel, false);
        }
    },
    {
        key: "componentWillUnmount",
        value: function () {
            if (this.props.preventDropOnDocument) {
                document.removeEventListener("dragover", N);
                document.removeEventListener("drop", this.onDocumentDrop);
            }
            if (null != this.fileInputEl) {
                this.fileInputEl.removeEventListener("click", this.onInputElementClick, false);
            }
            window.removeEventListener("focus", this.onFileDialogCancel, false);
        }
    },
    {
        key: "composeHandlers",
        value: function (e) {
            return this.props.disabled ? null : e;
        }
    },
    {
        key: "onDocumentDrop",
        value: function (e) {
            if (! (this.node && this.node.contains(e.target))) {
                e.preventDefault();
                this.dragTargets = [];
            }
        }
    },
    {
        key: "onDragStart",
        value: function (e) {
            if (this.props.onDragStart) {
                this.props.onDragStart.call(this, e);
            }
        }
    },
    {
        key: "onDragEnter",
        value: function (e) {
            var t = this;
            e.preventDefault();
            if (-1 === this.dragTargets.indexOf(e.target)) {
                this.dragTargets.push(e.target);
            }
            Promise.resolve(this.props.getDataTransferItems(e)).then(function (e) {
                t.setState({
                    isDragActive: true,
                    draggedFiles: e
                });
            });
            if (this.props.onDragEnter) {
                this.props.onDragEnter.call(this, e);
            }
        }
    },
    {
        key: "onDragOver",
        value: function (e) {
            e.preventDefault();
            e.stopPropagation();
            try {
                e.dataTransfer.dropEffect = this.isFileDialogActive ? "none" : "copy";
            } catch(e) {}
            return this.props.onDragOver && this.props.onDragOver.call(this, e),
            false;
        }
    },
    {
        key: "onDragLeave",
        value: function (e) {
            var t = this;
            e.preventDefault();
            this.dragTargets = this.dragTargets.filter(function (n) {
                return n !== e.target && t.node.contains(n);
            });
            if (! (this.dragTargets.length > 0)) {
                this.setState({
                    isDragActive: false,
                    draggedFiles: []
                });
                if (this.props.onDragLeave) {
                    this.props.onDragLeave.call(this, e);
                }
            }
        }
    },
    {
        key: "onDrop",
        value: function (e) {
            var t = this;
            var n = this.props;
            var r = n.onDrop;
            var a = n.onDropAccepted;
            var i = n.onDropRejected;
            var o = n.multiple;
            var s = n.disablePreview;
            var l = n.accept;
            var c = n.getDataTransferItems;
            e.preventDefault();
            this.dragTargets = [];
            this.isFileDialogActive = false;
            this.draggedFiles = null;
            this.setState({
                isDragActive: false,
                draggedFiles: []
            });
            Promise.resolve(c(e)).then(function (n) {
                var c = [];
                var d = [];
                n.forEach(function (e) {
                    if (!s) {
                        try {
                            e.preview = window.URL.createObjectURL(e);
                        } catch(e) {}
                    }
                    if (D(e, l) &&
                    function (e, t, n) {
                        return e.size <= t && e.size >= n;
                    } (e, t.props.maxSize, t.props.minSize)) {
                        c.push(e);
                    } else {
                        d.push(e);
                    }
                });
                if (!o) {
                    d.push.apply(d, function (e) {
                        if (Array.isArray(e)) {
                            var t = 0;
                            var n = Array(e.length);
                            for (; t < e.length; t++) {
                                n[t] = e[t];
                            }
                            return n;
                        }
                        return Array.from(e);
                    } (c.splice(1)));
                }
                if (r) {
                    r.call(t, c, d, e);
                }
                if (d.length > 0 && i) {
                    i.call(t, d, e);
                }
                if (c.length > 0 && a) {
                    a.call(t, c, e);
                }
            });
        }
    },
    {
        key: "onClick",
        value: function (e) {
            var t = this.props;
            var n = t.onClick;
            if (!t.disableClick) {
                e.stopPropagation();
                if (n) {
                    n.call(this, e);
                }
                if (!
                function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.navigator.userAgent;
                    return function (e) {
                        return -1 !== e.indexOf("MSIE") || -1 !== e.indexOf("Trident/");
                    } (e) ||
                    function (e) {
                        return -1 !== e.indexOf("Edge/");
                    } (e);
                } ()) {
                    this.open();
                } else {
                    setTimeout(this.open.bind(this), 0);
                }
            }
        }
    },
    {
        key: "onInputElementClick",
        value: function (e) {
            e.stopPropagation();
            if (this.props.inputProps && this.props.inputProps.onClick) {
                this.props.inputProps.onClick();
            }
        }
    },
    {
        key: "onFileDialogCancel",
        value: function () {
            var e = this;
            var t = this.props.onFileDialogCancel;
            if (this.isFileDialogActive) {
                setTimeout(function () {
                    if (null != e.fileInputEl) {
                        if (!e.fileInputEl.files.length) {
                            e.isFileDialogActive = false;
                        }
                    }
                    if ("function" == typeof t) {
                        t();
                    }
                },
                300);
            }
        }
    },
    {
        key: "setRef",
        value: function (e) {
            this.node = e;
        }
    },
    {
        key: "setRefs",
        value: function (e) {
            this.fileInputEl = e;
        }
    },
    {
        key: "open",
        value: function () {
            this.isFileDialogActive = true;
            this.fileInputEl.value = null;
            this.fileInputEl.click();
        }
    },
    {
        key: "render",
        value: function () {
            var e = this.props;
            var t = e.accept;
            var n = e.acceptClassName;
            var r = e.activeClassName;
            var a = e.children;
            var i = e.disabled;
            var s = e.disabledClassName;
            var l = e.inputProps;
            var c = e.multiple;
            var d = e.name;
            var h = e.rejectClassName;
            var u = U(e, ["accept", "acceptClassName", "activeClassName", "children", "disabled", "disabledClassName", "inputProps", "multiple", "name", "rejectClassName"]);
            var p = u.acceptStyle;
            var m = u.activeStyle;
            var f = u.className;
            var g = void 0 === f ? "" : f;
            var y = u.disabledStyle;
            var A = u.rejectStyle;
            var E = u.style;
            var v = U(u, ["acceptStyle", "activeStyle", "className", "disabledStyle", "rejectStyle", "style"]);
            var S = this.state;
            var C = S.isDragActive;
            var x = S.draggedFiles;
            var I = x.length;
            var T = c || I <= 1;
            var b = I > 0 &&
            function (e, t) {
                return e.every(function (e) {
                    return D(e, t);
                });
            } (x, this.props.accept);
            var L = I > 0 && (!b || !T);
            var R = !(g || E || m || p || A || y);
            if (C && r) {
                g = g + (" " + r);
            }
            if (b && n) {
                g = g + (" " + n);
            }
            if (L && h) {
                g = g + (" " + h);
            }
            if (i && s) {
                g = g + (" " + s);
            }
            if (R) {
                E = F;
                m = P;
                p = P;
                A = k;
                y = B;
            }
            var M = H({
                position: "relative"
            },
            E);
            if (m && C) {
                M = H({},
                M, m);
            }
            if (p && b) {
                M = H({},
                M, p);
            }
            if (A && L) {
                M = H({},
                M, A);
            }
            if (y && i) {
                M = H({},
                M, y);
            }
            var w = {
                accept: t,
                disabled: i,
                type: "file",
                style: H({
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    opacity: 1e-5,
                    pointerEvents: "none"
                },
                l.style),
                multiple: O && c,
                ref: this.setRefs,
                onChange: this.onDrop,
                autoComplete: "off"
            };
            if (d && d.length) {
                w.name = d;
            }/*v.acceptedFiles;v.preventDropOnDocument;v.disablePreview;v.disableClick;v.onDropAccepted;v.onDropRejected;v.onFileDialogCancel;v.maxSize;v.minSize;v.getDataTransferItems;*/
            var N = U(v, ["acceptedFiles", "preventDropOnDocument", "disablePreview", "disableClick", "onDropAccepted", "onDropRejected", "onFileDialogCancel", "maxSize", "minSize", "getDataTransferItems"]);
            return React.createElement("div", H({
                className: g,
                style: M
            },
            N, {
                onClick: this.composeHandlers(this.onClick),
                onDragStart: this.composeHandlers(this.onDragStart),
                onDragEnter: this.composeHandlers(this.onDragEnter),
                onDragOver: this.composeHandlers(this.onDragOver),
                onDragLeave: this.composeHandlers(this.onDragLeave),
                onDrop: this.composeHandlers(this.onDrop),
                ref: this.setRef,
                "aria-disabled": i
            }), this.renderChildren(a, C, b, L), React.createElement("input", H({},
            l, w)));
        }
    }]),
    t;
} ();
var G = W;
W.propTypes = {
    accept: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    disableClick: PropTypes.bool,
    disabled: PropTypes.bool,
    disablePreview: PropTypes.bool,
    preventDropOnDocument: PropTypes.bool,
    inputProps: PropTypes.object,
    multiple: PropTypes.bool,
    name: PropTypes.string,
    maxSize: PropTypes.number,
    minSize: PropTypes.number,
    className: PropTypes.string,
    activeClassName: PropTypes.string,
    acceptClassName: PropTypes.string,
    rejectClassName: PropTypes.string,
    disabledClassName: PropTypes.string,
    style: PropTypes.object,
    activeStyle: PropTypes.object,
    acceptStyle: PropTypes.object,
    rejectStyle: PropTypes.object,
    disabledStyle: PropTypes.object,
    getDataTransferItems: PropTypes.func,
    onClick: PropTypes.func,
    onDrop: PropTypes.func,
    onDropAccepted: PropTypes.func,
    onDropRejected: PropTypes.func,
    onDragStart: PropTypes.func,
    onDragEnter: PropTypes.func,
    onDragOver: PropTypes.func,
    onDragLeave: PropTypes.func,
    onFileDialogCancel: PropTypes.func
};
W.defaultProps = {
    preventDropOnDocument: true,
    disabled: false,
    disablePreview: false,
    disableClick: false,
    inputProps: {},
    multiple: true,
    maxSize: 1 / 0,
    minSize: 0,
    getDataTransferItems: function (e) {
        var t = [];
        if (e.dataTransfer) {
            var n = e.dataTransfer;
            if (n.files && n.files.length) {
                t = n.files;
            } else {
                if (n.items && n.items.length) {
                    t = n.items;
                }
            }
        } else {
            if (e.target && e.target.files) {
                t = e.target.files;
            }
        }
        return Array.prototype.slice.call(t);
    }
};
class K extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {};
        this.onDrop = (e) => {
            console.log(e);
            var t = e[0];
            this.file = t;
            this.props.onImageSelect(t.preview);
            var n = null;
            if (t.size >= 5e6) {
                n = "File too big! (Max 5MB)";
            }
            if (t.size + this.props.totalSize > this.props.maxToltalSize) {
                n = "Exceed limit of total max size is 50MB";
            }
            this.setState({
                fileName: t.name,
                uploadDone: false,
                fileError: n
            });
        };
        this.onUpload = (e) => {
            this.setState({
                uploadInfo: {
                    progress: 0
                }
            });
            e.stopPropagation();
            e.preventDefault();
            this.lastUploadImageAction = ImageUploader.uploadImage(this.file, (e) => {
                this.setState({
                    uploadInfo: {
                        progress: e
                    }
                });
            }).then((e) => {
                this.setState({
                    uploadInfo: null,
                    uploadDone: true
                });
                this.props.onUploadDone(e);
            }).
            catch((e) => {
                this.setState({
                    uploadInfo: _.assignIn({},
                    this.state.uploadInfo, {
                        errorMessage: e.message
                    })
                });
            }).
            finally(() => {
                this.lastUploadImageAction = null;
            });
        };
        this.cancelUpload = () => {
            if (this.lastUploadImageAction) {
                this.lastUploadImageAction.cancel();
                this.lastUploadImageAction = null;
            }
            this.setState({
                uploadInfo: null
            });
        };
        this.onDragEnter = () => {
            this.setState({
                isDropActive: true
            });
        };
        this.onDragLeave = () => {
            this.setState({
                isDropActive: false
            });
        };
    }
    componentWillUnmount() {
        if (this.lastUploadImageAction) {
            this.lastUploadImageAction.cancel();
        }
    }
    renderError() {
        if (this.state.fileError) {
            return React.createElement("label", {
                style: {
                    color: "#ce0303",
                    fontSize: 12,
                    position: "absolute",
                    bottom: -6,
                    left: 10
                }
            },
            this.state.fileError, " ");
        }
    }
    render() {
        if (this.state.uploadInfo) {
            var e = null;
            return e = this.state.uploadInfo.errorMessage ? React.createElement("div", {
                style: {
                    display: "inline-block",
                    float: "right"
                }
            },
            React.createElement("button", {
                className: "btn-normal",
                style: {
                    display: "inline-block",
                    marginRight: 10
                },
                onClick: this.onUpload
            },
            "Try Again"), React.createElement("button", {
                className: "btn-normal",
                style: {
                    display: "inline-block"
                },
                onClick: () => {
                    return this.setState({
                        fileName: null,
                        uploadInfo: null
                    });
                }
            },
            "Upload another one")) : React.createElement("div", {
                style: {
                    display: "inline-block",
                    float: "right"
                }
            },
            React.createElement("button", {
                className: "btn-normal",
                style: {
                    display: "inline-block"
                },
                onClick: this.cancelUpload
            },
            "Cancel")),
            React.createElement("div", {
                style: {
                    display: "flex",
                    flexDirection: "column",
                    padding: 10
                }
            },
            React.createElement("div", {
                style: {
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "baseline",
                    paddingBottom: 5
                }
            },
            React.createElement("span", {
                style: {
                    flexGrow: 1
                }
            },
            this.state.fileName), React.createElement("span", null, Math.round(100 * this.state.uploadInfo.progress), "%")), React.createElement(ProgressBar.Line, {
                progress: this.state.uploadInfo.progress,
                text: "",
                options: {
                    strokeWidth: 1,
                    color: "rgb(76,175,80)",
                    trailColor: "lightgray"
                },
                initialAnimate: true,
                containerStyle: {
                    marginBottom: 5
                },
                containerClassName: ".progressbar"
            }), React.createElement("div", {
                style: {
                    height: "1.2em",
                    color: "#ce0303",
                    fontSize: 12
                }
            },
            this.state.uploadInfo.errorMessage, e));
        }
        var t = React.createElement("p", null, "Drop file here,or click to select file (max 5MB).");
        if (this.state.fileName) {
            t = React.createElement("div", {
                style: {
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "baseline",
                    padding: 10,
                    width: "100%"
                }
            },
            React.createElement("label", {
                style: {
                    paddingRight: 10,
                    flexGrow: 1,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    width: 0,
                    textOverflow: "ellipsis"
                }
            },
            this.state.fileName, " "), React.createElement("label", {
                style: {
                    paddingRight: 5,
                    fontSize: 12
                }
            },
            "[", ImageDataHelper.formatBytes(this.file.size), "]"), React.createElement("button", {
                className: "btn-primary btn-large",
                disabled: !!this.state.fileError,
                style: {
                    width: 80
                },
                onClick: this.onUpload
            },
            " Upload "));
        }
        if (this.state.uploadDone) {
            t = React.createElement("div", {
                style: {
                    textAlign: "center"
                }
            },
            React.createElement("div", {
                style: {
                    color: "rgb(76,175,80)"
                }
            },
            "Image has been uploaded successfully. "), React.createElement("div", null, this.state.fileName, " "));
        }
        var n = this.state.isDropActive ? "2px dashed rgb(76,175,80)" : "2px dashed lightgray";
        return React.createElement("div", {
            style: {
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
                padding: 10,
                position: "relative"
            }
        },
        React.createElement(G, {
            style: {
                border: n,
                flexGrow: 1,
                height: 35,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
            },
            onDrop: this.onDrop,
            onDragEnter: this.onDragEnter,
            onDragLeave: this.onDragLeave
        },
        t), this.renderError());
    }
}
class X extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isLoading: true
        };
    }
    renderImageLoading() {
        if (this.state.isLoading) {
            return React.createElement(LoadingBackdrop, null);
        }
    }
    render() {
        return React.createElement(Z, {
            show: true
        },
        React.createElement(ModalDialog, {
            onClick: this.props.onClose,
            show: true,
            opacity: .9,
            style: {
                background: "none",
                boxShadow: "none",
                border: "none",
                width: "calc(100%-60px)",
                height: "calc(100%-100px)",
                top: "50%",
                transform: "translate(-50%,-50%)",
                padding: 0
            },
            contentStyle: {
                width: "100%",
                height: "100%",
                display: "block",
                position: "relative"
            },
            backDrop: true,
            onClose: this.props.onClose,
            headerStyle: {
                display: "none"
            },
            footerStyle: {
                display: "block"
            },
            renderFooterContent: () => {
                return React.createElement("div", {
                    style: {
                        textAlign: "center",
                        color: "white",
                        paddingTop: 10,
                        fontSize: 13
                    }
                },
                this.props.imageName);
            },
            notifyShow: () => {}
        },
        React.createElement("img", {
            src: this.props.fullUrl,
            onLoad: () => {
                return this.setState({
                    isLoading: false
                });
            },
            onError: () => {
                return this.setState({
                    isLoading: false
                });
            },
            onMouseDown: (e) => {
                return e.stopPropagation();
            },
            onClick: (e) => {
                return e.stopPropagation();
            },
            style: {
                maxWidth: "100%",
                maxHeight: "100%",
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)"
            }
        }), this.renderImageLoading()));
    }
}
var $ = {
    key: "",
    keys: [],
    type: "from-library"
};
class te extends React.Component {
    constructor(e) {
        super(e);
        this.cacheFromUrl = {
            key: "",
            type: "from-url"
        };
        this.cacheFromLibrary = {
            key: "",
            type: "from-library"
        };
        this.onKeyDown = (e) => {
            if (27 === e.keyCode) {
                this.props.onCancel();
                e.stopOther = true;
            }
        };
        this.fetchAllImages = () => {
            this.setState({
                imageLoading: true
            });
            ImageUploader.getImageList().then((x) => {
                var e = x.JSON || x;
                this.setState({
                    images: this.sortImages(e.images.map((e) => {
                        return {
                            name: e.key,
                            key: e.key,
                            lastModified: e.lastModified,
                            size: e.size
                        };
                    })),
                    imageFolder: e.folder,
                    imageLoading: false
                });
            }).
            catch((e) => {
                return this.setState({
                    imageLoadingError: e.message,
                    imageLoading: false
                });
            });
        };
        this.urlChanged = (e) => {
            this.setNewSelectedImage({
                key: e.currentTarget.value,
                type: "from-url"
            });
        };
        this.onUploadDone = (e) => {
            var t = this.state.images.filter((t) => {
                return t.key != e.name;
            });
            this.setState({
                images: this.sortImages(t.concat({
                    name: e.name,
                    key: e.name,
                    lastModified: e.date,
                    size: e.size
                })),
                selectedImage: {
                    key: e.name,
                    keys: [e.name],
                    imageFolder: this.state.imageFolder,
                    type: "from-library"
                }
            });
        };
        this.onDropZoneImageSelect = (e) => {
            this.setNewSelectedImage({
                key: e,
                type: "temp"
            });
        };
        this.onSelectImage = (e) => {
            this.setNewSelectedImage({
                key: e[0],
                keys: e,
                imageFolder: this.state.imageFolder,
                type: "from-library"
            });
        };
        this.handleRemoveImages = (e) => {
            this.setState({
                showDeleteConfirm: true
            });
            console.log(e);
        };
        this.handleOk = () => {
            if ("temp" != this.state.selectedImage.type) {
                this.props.onUrlChanged(this.getComponentImageUr(), this.props.customData);
            }
        };
        this.handleDeleteConfirmClose = () => {
            this.setState({
                showDeleteConfirm: false
            });
        };
        this.handleDeleteConfirmOk = (e, t) => {
            ImageUploader.deleteImages(this.state.selectedImage.keys).then(() => {
                e();
                this.setState({
                    selectedImage: $,
                    images: this.state.images.filter((e) => {
                        return !_.includes(this.state.selectedImage.keys, e.key);
                    })
                });
            }).
            catch((e) => {
                var n = e.message;
                return t(n);
            });
        };
        var t = this.parseUrlToImageInfo(this.props.url);
        if ("from-library" == t.type) {
            this.cacheFromLibrary = t;
        }
        if ("from-url" == t.type) {
            this.cacheFromUrl = t;
        }
        this.state = {
            images: [],
            imageLoading: true,
            imageFolder: "",
            selectedImage: t,
            imageLoadingError: null
        };
    }
    parseUrlToImageInfo() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        if (!e) {
            return {
                key: "",
                keys: [],
                imageFolder: "",
                type: "from-library"
            };
        }
        var t = ImageLoader.parseUrlToImageInfo(e);
        return "internal" == t.type ? {
            key: t.key,
            keys: [t.key],
            imageFolder: t.imageFolder,
            type: "from-library"
        } : {
            key: e,
            type: "from-url"
        };
    }
    componentDidMount() {
        KeyDownEventRegisterer.stack(this.onKeyDown);
        var e = te.lastImagesInfo;
        if (e) {
            this.setState({
                images: e.images,
                imageFolder: e.folder,
                imageLoading: false
            });
        } else {
            this.fetchAllImages();
        }
    }
    componentWillUnmount() {
        KeyDownEventRegisterer.remove(this.onKeyDown);
    }
    sortImages(e) {
        return _.orderBy(e, ["lastModified"], ["desc"]);
    }
    setState(e, t) {
        if (e.images && (e.imageFolder || this.state.imageFolder)) {
            te.lastImagesInfo = {
                images: e.images,
                folder: e.imageFolder || this.state.imageFolder
            };
        }
        super.setState(e, t);
    }
    handleSelectImgType(e) {
        if (e) {
            this.setState({
                selectedImage: this.cacheFromLibrary
            });
        } else {
            this.setState({
                selectedImage: this.cacheFromUrl
            });
        }
    }
    setNewSelectedImage(e) {
        this.setState({
            selectedImage: e
        });
        if ("from-library" == e.type) {
            this.cacheFromLibrary = e;
        }
        if ("from-url" == e.type) {
            this.cacheFromUrl = e;
        }
    }
    renderFromUrlConfig() {
        return React.createElement("div", {
            style: {
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
                padding: 10
            }
        },
        React.createElement("label", {
            style: {
                paddingRight: 10
            }
        },
        "Url:"), React.createElement("input", {
            style: {
                flexGrow: 1,
                height: 20,
                fontSize: 12
            },
            onChange: this.urlChanged,
            type: "text",
            value: this.state.selectedImage.key
        }));
    }
    renderUploadZone() {
        return React.createElement(K, {
            maxToltalSize: 5e7,
            totalSize: _.sumBy(this.state.images, (e) => {
                return e.size;
            }),
            onUploadDone: this.onUploadDone,
            onImageSelect: this.onDropZoneImageSelect
        });
    }
    renderTabContent() {
        return this.isLibraryTab() ? this.renderUploadZone() : this.renderFromUrlConfig();
    }
    isLibraryTab() {
        return "from-library" == this.state.selectedImage.type || "temp" == this.state.selectedImage.type;
    }
    renderLibraryContainer() {
        if (this.isLibraryTab()) {
            var e = this.state.selectedImage;
            return React.createElement("div", {
                style: g
            },
            React.createElement(m, {
                onSelect: this.onSelectImage,
                onDoubleClick: () => {
                    return this.setState({
                        showFullImageView: true
                    });
                },
                onRemove: this.handleRemoveImages,
                onRefresh: this.fetchAllImages,
                isLoading: this.state.imageLoading,
                error: this.state.imageLoadingError,
                imageFolder: e.imageFolder || this.state.imageFolder,
                selectedKeys: e.keys,
                images: this.state.images
            }));
        }
    }
    getRawImageUrlOrThumbnail() {
        var e = this.state.selectedImage;
        if (!e.key) {
            return "";
        }
        switch (e.type) {
        case "from-library":
            return ImageLoader.getThumbnailUrl(e.key, e.imageFolder);
        case "from-url":
            case "temp":
            return e.key;
        }
    }
    getComponentImageUr() {
        var e = this.state.selectedImage;
        switch (e.type) {
        case "from-library":
            return ImageLoader.getComponentUrl(e.key, e.imageFolder);
        case "from-url":
            return e.key;
        case "temp":
            throw new Error("should not use this");
        }
    }
    shouldDisableOk() {
        var e = this.state.selectedImage;
        return "temp" == e.type || (!e.key || "from-url" != e.type && ( !! this.state.imageLoading || void 0));
    }
    renderConfirmDelete() {
        if (this.state.showDeleteConfirm) {
            return React.createElement(ee, {
                show: true
            },
            React.createElement(ModalConfirmDialog, {
                style: {
                    top: 190
                },
                label: React.createElement("span", null, "Do you confirm to delete selected Images,other documents my use theses images"),
                onOk: this.handleDeleteConfirmOk,
                onCancel: this.handleDeleteConfirmClose,
                onClose: this.handleDeleteConfirmClose,
                show: true
            }));
        }
    }
    renderFullImageView() {
        if (this.state.showFullImageView) {
            var e = this.state.selectedImage;
            var t = ImageLoader.getRawUrl({
                key: e.key,
                imageFolder: e.imageFolder,
                type: "from-library" == e.type ? "internal" : "external"
            });
            var n = "from-library" == e.type ? ImageLoader.getImageDisplayName(e.key) : e.key;
            return React.createElement(X, {
                fullUrl: t,
                imageName: n,
                onClose: () => {
                    return this.setState({
                        showFullImageView: false
                    });
                }
            });
        }
    }
    render() {
        var e = this.isLibraryTab();
        var t = this.getRawImageUrlOrThumbnail();
        var n = _.assignIn({},
        T, {
            bottom: e ? 80 : null
        });
        return React.createElement("div", {
            style: f,
            onDragEnter: (e) => {
                return e.stopPropagation();
            },
            onDragOver: (e) => {
                return e.stopPropagation();
            },
            onDragLeave: (e) => {
                return e.stopPropagation();
            },
            onDrop: (e) => {
                return e.stopPropagation();
            }
        },
        React.createElement("div", {
            style: y
        }), React.createElement("div", {
            style: n,
            id: "image-manager-main"
        },
        React.createElement("div", {
            style: I
        },
        React.createElement("div", {
            style: x,
            onClick: () => {
                return this.setState({
                    showFullImageView: true
                });
            }
        },
        React.createElement("img", {
            style: {
                maxWidth: "100%",
                maxHeight: "100%"
            },
            src: t
        })), React.createElement("div", {
            style: C
        },
        React.createElement("div", {
            style: A
        },
        React.createElement("div", {
            onClick: () => {
                return this.handleSelectImgType(null);
            },
            style: e ? S : v
        },
        "From Url"), React.createElement("div", {
            onClick: () => {
                return this.handleSelectImgType(true);
            },
            style: e ? v : S
        },
        "Upload and use From Library")), React.createElement("div", {
            style: E
        },
        this.renderTabContent()))), this.renderLibraryContainer(), React.createElement("div", {
            style: {
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                padding: "0px 10px 10px 10px"
            }
        },
        React.createElement("button", {
            className: "btn-normal btn-large",
            style: {
                width: 100,
                marginRight: 10
            },
            onClick: this.props.onCancel
        },
        "Cancel"), React.createElement("button", {
            className: "btn-primary btn-large",
            disabled: this.shouldDisableOk(),
            style: {
                width: 100
            },
            onClick: this.handleOk
        },
        "Ok")), this.renderConfirmDelete(), this.renderFullImageView()));
    }
}

export default te