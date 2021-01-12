import { Promise } from 'bluebird';
import Api from '../Api';

/// xxx(1541) /*ImageService*/

/// n.r(t)
/// var api = n(1542)/*Api*/;  // 4 times
/// var Ne = n(30)/*blubirdjs*/;  // 1 times
/// var ke = n.n(Ne);
/*n.d(t, "a", function () {
    return ImageService
});*/
var ImageService = new class {
    uploadFile(e, t, n, r) {
        console.log("[][ImageService]", n);
        return new Promise((a, i, o) => {
            var s = new FormData;
            var l = false;
            Object.keys(n).forEach((e) => {
                s.append(e, n[e])
            });
            s.append("file", e, t);
            var c = new XMLHttpRequest;
            c.upload.addEventListener("progress", (e) => {
                if (!l) if (e.lengthComputable) {
                    console.log("progress:", e.loaded / e.total);
                    r(e.loaded / e.total)
                } else {
                    r(.5);
                    console.log("unable to compute")
                }
            },
            false);
            c.addEventListener("load", (e) => {
                var t = e.target;
                return 200 != t.status && 201 != t.status && 204 != t.status ? (console.log("ERROR: ", t.responseText), i(new Error("Upload Error,status code: " + t.status))) : (console.log("Done - " + t.responseText), a())
            },
            false);
            c.addEventListener("error", (e) => {
                return console.log("Upload failed: ", e),
                i(new Error("Upload Failed,please try again "))
            },
            false);
            c.addEventListener("abort", () => {
                return console.log("Upload cancelled"),
                i(new Error("Upload cancelled"))
            },
            false);
            c.open("POST", "https://mathcha-user-images.s3.amazonaws.com/", true);
            c.send(s);
            o(() => {
                console.log("cancel called!");
                l = true;
                c.abort()
            })
        })
    }
    requestUploadInfo(e) {
        return Api.Post("/api/images/request-upload-info", {
            fileName: e
        }).then((e) => {
            return e.json()
        })
    }
    getImageList() {
        return Api.Get("/api/images/list.json").then((e) => {
            return e.json()
        })
    }
    deleteImages(e) {
        return Api.Delete("/api/images/list", {
            imageNames: e
        })
    }
    requestFileUploadFromService(e) {
        return Api.Post("/api/images/request-image", {
            filePath: e
        }).then((e) => {
            return e.json()
        }).then((x) => {
            var e = x.JSON || x;
            return e.link
        })
    }
};

export default ImageService