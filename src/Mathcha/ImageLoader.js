import Global from '../Global';

/// xxx(103) /*ImageLoader*/

/// var r = n(11)/*Global*/;  // 2 times
var ImageLoader = new class {
    getThumbnailUrl(e, t) {
        return Global.isTestEnv() ? "thumbnails/".concat(e) : "https://mathcha-user-images.s3.amazonaws.com/".concat(t, "/thumbnails/").concat(e)
    }
    getComponentUrl(e, t) {
        return "mc://".concat(t, "/contents/").concat(e)
    }
    getComponentUrlToRawUrl(e) {
        return Global.isTestEnv() ? "images/".concat(e.substr(5)) : e.startsWith("mc://") ? "https://mathcha-user-images.s3.amazonaws.com/".concat(e.substr(5)) : e
    }
    getRawUrl(e) {
        switch (e.type) {
        case "external":
            return e.key;
        case "internal":
            return "https://mathcha-user-images.s3.amazonaws.com/".concat(e.imageFolder, "/contents/").concat(e.key)
        }
    }
    getImageDisplayName(e) {
        var t = e.indexOf("-");
        return e.substr(t + 1)
    }
    parseUrlToImageInfo() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        if (e.startsWith("mc://")) {
            var t = e.indexOf("/", "mc://users/".length + 1),
            n = e.substring(5, t),
            r = e.substr(t + "/contents/".length);
            return {
                key: r,
                imageFolder: n,
                imageDisplayName: this.getImageDisplayName(r),
                type: "internal"
            }
        }
        return {
            key: e,
            imageDisplayName: e,
            type: "external"
        }
    }
}

export default ImageLoader