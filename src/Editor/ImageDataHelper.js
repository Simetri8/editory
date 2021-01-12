import jQuery from 'jquery';

/// xxx(187) /*ImageDataHelper*/

/// var r = n(5)/*sizzle*/;  // 1 times
/// var a = n.n(r);
var ImageDataHelper = {
    formatBytes: (e, t) => {
        if (0 === e) return "0 Bytes";
        var n = t || 2,
        r = Math.floor(Math.log(e) / Math.log(1024));
        return parseFloat((e / Math.pow(1024, r)).toFixed(n)) + " " + ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][r]
    },
    getImageSize: e => new Promise((t, n) => {
        var r = new Image;
        r.onload = (() => {
            t({
                width: r.naturalWidth,
                height: r.naturalHeight
            })
        });
        r.onerror = (() => {
            n()
        });
        r.src = e
    }),
    getImageBase64: (e, t) => new Promise((n, r) => {
        var i = e.width.baseVal.value,
        o = e.height.baseVal.value,
        s = new Image;
        s.setAttribute("crossOrigin", "Anonymous");
        s.onload = (() => {
            try {
                var e = document.createElement("canvas");
                e.width = i * t;
                e.height = o * t;
                e.style.width = "".concat(i, "px");
                e.style.height = "".concat(o, "px");
                console.log("canvas width", e.width);
                console.log("canvas height", e.height);
                e.getContext("2d").drawImage(s, 0, 0, i * t, o * t);
                var a = e.toDataURL("image/png");
                n(a)
            } catch(e) {
                r(e)
            }
        });
        s.onerror = (e => {
            r(e)
        });
        var l = jQuery(e).attr("xlink:href") || "";
        l.startsWith("data-resources/") ? s.src = l : s.src = "https://resources-proxy.mathcha.io/" + l
    })
}

export default ImageDataHelper