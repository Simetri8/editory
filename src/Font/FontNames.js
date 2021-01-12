
/// xxx(114) /*FontNames*/

/*n.d(t, "a", function () {
    return r
}),*/
/*n.d(t, "c", function () {
    return a
}),*/
/*n.d(t, "d", function () {
    return i
}),*/
/*n.d(t, "b", function () {
    return o
});*/
var r = {
    "cmun-serif": "Computer Modern Serif",
    "cmun-sans": "Computer Modern Sans",
    "cmun-typewriter": "Computer Modern Typewriter",
    pcr: "pcr",
    helvet: "helvet",
    ptm: "ptm",
    Asana: "Asana",
    LatinModern: "LatinModern"
};
function a(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
        bold: !1,
        italic: !1
    };
    return t && (t.bold || t.italic) ? t.bold && t.italic ? "".concat(e, "-Bold-Italic") : t.bold ? "".concat(e, "-Bold") : t.italic ? "".concat(e, "-Italic") : e : e
}
function i(e, t) {
    return t ? "".concat(e, "-").concat(t) : e
}
var o = {
    [i("Asana")] : "/fonts/Asana-Math.otf",
    [i("Asana", "Math")] : "/fonts/Asana-math-mode.otf",
    [i("Asana", "Mathbb")] : "/fonts/types-generated/Asana-mathbb.otf",
    [i("Asana", "Mathit")] : "/fonts/types-generated/Asana-mathit.otf",
    [i("Asana", "Mathcal")] : "/fonts/types-generated/Asana-mathcal.otf",
    [i("Asana", "Mathscr")] : "/fonts/types-generated/Asana-mathscr.otf",
    [i("Asana", "Mathfrak")] : "/fonts/types-generated/Asana-mathfrak.otf",
    [i("Asana", "Mathsf")] : "/fonts/types-generated/Asana-mathsf.otf",
    [i("Asana", "Mathtt")] : "/fonts/types-generated/Asana-mathtt.otf",
    [i("Asana", "Mathrm")] : "/fonts/types-generated/Asana-mathrm.otf",
    [a("Computer Modern Serif")] : "/fonts/others-text-mode/computer-modern/Serif/cmunrm.otf",
    [a("Computer Modern Serif", {
        bold: !0
    })] : "/fonts/others-text-mode/computer-modern/Serif/cmunbx.otf",
    [a("Computer Modern Serif", {
        italic: !0
    })] : "/fonts/others-text-mode/computer-modern/Serif/cmunti.otf",
    [a("Computer Modern Serif", {
        bold: !0,
        italic: !0
    })] : "/fonts/others-text-mode/computer-modern/Serif/cmunbi.otf",
    [a("Computer Modern Sans")] : "/fonts/others-text-mode/computer-modern/Sans/cmunss.otf",
    [a("Computer Modern Sans", {
        bold: !0
    })] : "/fonts/others-text-mode/computer-modern/Sans/cmunsx.otf",
    [a("Computer Modern Sans", {
        italic: !0
    })] : "/fonts/others-text-mode/computer-modern/Sans/cmunsi.otf",
    [a("Computer Modern Sans", {
        bold: !0,
        italic: !0
    })] : "/fonts/others-text-mode/computer-modern/Sans/cmunso.otf",
    [a("Computer Modern Typewriter")] : "/fonts/others-text-mode/computer-modern/Typewriter/cmuntt.otf",
    [a("Computer Modern Typewriter", {
        bold: !0
    })] : "/fonts/others-text-mode/computer-modern/Typewriter/cmuntb.otf",
    [a("Computer Modern Typewriter", {
        italic: !0
    })] : "/fonts/others-text-mode/computer-modern/Typewriter/cmunit.otf",
    [a("Computer Modern Typewriter", {
        bold: !0,
        italic: !0
    })] : "/fonts/others-text-mode/computer-modern/Typewriter/cmuntx.otf",
    [i("LatinModern")] : "/fonts/latinmodern-math.otf",
    [i("LatinModern", "Math")] : "/fonts/latinmodern-math-mode.otf",
    [i("LatinModern", "Mathbb")] : "/fonts/types-generated/latinmodern-mathbb.otf",
    [i("LatinModern", "Mathit")] : "/fonts/types-generated/latinmodern-mathit.otf",
    [i("LatinModern", "Mathcal")] : "/fonts/types-generated/latinmodern-mathcal.otf",
    [i("LatinModern", "Mathscr")] : "/fonts/types-generated/Asana-mathscr.otf",
    [i("LatinModern", "Mathfrak")] : "/fonts/types-generated/latinmodern-mathfrak.otf",
    [i("LatinModern", "Mathsf")] : "/fonts/types-generated/latinmodern-mathsf.otf",
    [i("LatinModern", "Mathtt")] : "/fonts/types-generated/latinmodern-mathtt.otf",
    [i("LatinModern", "Mathrm")] : "/fonts/types-generated/latinmodern-mathrm.otf"
}

export { a as FontNamesC }

export { i as FontNamesD }

export { o as FontNamesB }

export default r