import React from 'react';

/// xxx(33) /*ItemRemoveSelected*/

/// var r = n(0)/*React*/;  // 16 times
/// var a = n.n(r);
var ItemRemoveSelected = new class {
    constructor() {
        this.cache = {}
    }
    getRemoveItem(e) {
        return React.createElement("x-item", {
            style: {
                outline: "none",
                color: "gray",
                cursor: "pointer",
                border: "1px solid transparent",
                position: "relative",
                height: "23px",
                display: "block",
                width: "30px",
                marginLeft: 0,
                padding: 0
            },
            title: "Remove Selected Item",
            class: "remove",
            onMouseDown: e
        },
        React.createElement("svg", {
            style: {
                width: "100%",
                height: "100%"
            },
            viewBox: "-100 -100 1200 1200"
        },
        React.createElement("path", {
            fill: "indianred",
            d: "M500,990C229.5,990,10,770.5,10,500S229.5,10,500,10s490,219.5,490,490S770.5,990,500,990z M500,152.9c-191.4,0-347.1,155.7-347.1,347.1c0,191.4,155.7,347.1,347.1,347.1c191.4,0,347.1-155.7,347.1-347.1C847.1,308.6,691.4,152.9,500,152.9z M616.8,709.9c-8.3,8.3-21.1,8.3-29.3,0L500,622.5l-87.4,87.4c-8.3,8.3-21.1,8.3-29.3,0l-93.2-93.2c-8.3-8.3-8.3-21.1,0-29.3l87.4-87.4l-87.4-87.4c-8.3-8.3-8.3-21.1,0-29.3l93.2-93.2c8.3-8.3,21.1-8.3,29.3,0l87.4,87.4l87.4-87.4c8.3-8.3,21.1-8.3,29.3,0l93.2,93.2c8.3,8.3,8.3,21.1,0,29.3L622.5,500l87.4,87.4c8.3,8.3,8.3,21.1,0,29.3L616.8,709.9z"
        })))
    }
    getRotationSvgIcon(e) {
        return this.cachable("rotation-icon", () => React.createElement("g", {
            style: {
                fill: "orange",
                strokeWidth: 1,
                stroke: "white"
            }
        },
        React.createElement("circle", {
            cx: e,
            cy: e,
            r: e
        })))
    }
    separator1() {
        return this.cachable("separator1", () => React.createElement("relative-separator", {
            key: "1"
        },
        React.createElement("x-bar", null)))
    }
    separator() {
        return this.cachable("separator", () => React.createElement("relative-separator", null, React.createElement("x-bar", null)))
    }
    svgNumberIcon() {
        var e = {
            stroke: "none",
            fontSize: 10,
            fontWeight: "bold",
            fill: "black",
            fontFamily: "Asana-Math,Asana"
        };
        return React.createElement("svg", {
            style: {
                stroke: "gray",
                fill: "none",
                strokeWidth: 1
            }
        },
        React.createElement("text", {
            style: e,
            x: "6",
            y: "10"
        },
        "1"), React.createElement("text", {
            style: e,
            x: "13",
            y: "10"
        },
        "2"), React.createElement("path", {
            style: {
                transform: "translate(0px,8px)"
            },
            d: "M2,7 L20,7 M8,4 L8,10  M16,4 L16,10"
        }))
    }
    svgAxisIcon() {
        return React.createElement("svg", null, React.createElement("path", {
            style: {
                stroke: "gray",
                transform: "translate(1px,10px)"
            },
            d: "M2,7 L20,7 M4,5 L4,9 M8,5 L8,9 M12,5 L12,9 M16,5 L16,9"
        }), React.createElement("path", {
            style: {
                stroke: "gray",
                transform: "rotate(-270deg) translate(1px,-12px)"
            },
            d: "M2,7 L20,7 M4,5 L4,9 M8,5 L8,9 M12,5 L12,9 M16,5 L16,9"
        }))
    }
    cachable(e, t) {
        return this.cache[e] || (this.cache[e] = t()),
        this.cache[e]
    }
}

export default ItemRemoveSelected