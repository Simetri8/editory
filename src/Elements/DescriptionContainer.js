import React from 'react';

/// xxx(451) /*DescriptionContainer*/

/// var r = n(0)/*React*/;  // 7 times
/// var a = n.n(r);
var DescriptionContainer = (e) => {
    var t = e.item;
    var n = e.showLatex;
    var r = null;
    var l = null;
    if (t.hasExpanded) r = React.createElement("span", null, "Press ", React.createElement("b", {
        style: i
    },
    "Shift"), " to expand boxes");
    if (t.shortcut) {
        var c = t.hasExpanded ? "," : "";
        l = React.createElement("span", null, c, " Shortcut ", React.createElement("b", {
            style: o
        },
        t.shortcut.char))
    }
    var d = t.description || "";
    if (d && (r || l)) d = "," + d;
    if (n) d = "Name:" + t.names[0] + "," + d;
    return React.createElement("description-container", {
        style: s
    },
    React.createElement("description-text", null, r, l, React.createElement("span", null, d)))
};
var i = {
    background: "white",
    fontWeight: "normal",
    display: "inline-block",
    color: "color",
    border: "1px solid lightgray",
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 3,
    boxShadow: "1px 1px 0px #e8e5e5"
};
var o = {
    background: "white",
    fontWeight: "normal",
    display: "inline-block",
    color: "color",
    border: "1px solid lightgray",
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 3,
    boxShadow: "1px 1px 0px #e8e5e5"
};
var s = {
    whiteSpace: "normal",
    fontFamily: "Asana",
    display: "block",
    background: "rgb(247,247,247)",
    padding: "3px",
    boxShadow: "rgb(224,221,221) 1px 1px 1px 0px",
    border: "1px solid #dedcdc",
    marginTop: "2px",
    color: "gray"
}

export default DescriptionContainer