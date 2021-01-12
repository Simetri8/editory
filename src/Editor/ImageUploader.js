import { Promise } from 'bluebird';
import Pica from 'pica';
import ImageServiceProp from '../Mathcha/ImageServiceProp';

/// xxx(229) /*ImageUploader*/

/// var r = n(710)/*pica*/;  // 1 times
/// var a = n.n(r);
/// var i = n(30)/*blubirdjs*/;  // 2 times
/// var o = n.n(i);
var s = Pica();
var l = new class {
    constructor() {
        this.blobToFile = ((e, t) => new File([e], t, {
            type: "image/jpeg"
        }))
    }
    resize(e) {
        return this.readToCanvas(e).then(t => {
            var n = document.createElement("canvas");
            return n.width = 150,
            n.height = t.height * n.width / t.width,
            s.resize(t, n, {
                alpha: !0
            }).then(e => s.toBlob(e, "image/png", .9)).then(t => (console.log("result: ", t), this.blobToFile(t, e.name.replace(/\.png/g, ".jpg"))))
        })
    }
    readToCanvas(e) {
        var t = new Image;
        return new Promise((n, r) => {
            t.onload = (() => {
                n(t)
            });
            t.onerror = (() => {
                r(new Error("Not an image!"))
            });
            t.src = window.URL.createObjectURL(e)
        })
    }
}
/// c = n(204)/*ImageServiceProp*/;  // 1 times
var ImageUploader = new class {
    uploadImage(e, t) {
        var n, r = !1,
        a = 0;
        return l.resize(e).then(t => (a = e.size + t.size, n = t, this.getService().requestUploadInfo(e.name))).then(x => {
            var i = x.JSON || x;
            var s = i.imagePolicy,
            l = i.thumbnailPolicy,
            c = i.newFileName,
            d = i.folderName;
            return Promise.all([this.getService().uploadFile(n, c, l, e => {
                r || t(e * n.size / a)
            }), this.getService().uploadFile(e, c, s, n => {
                r || t(n * e.size / a)
            })]).then(() => ({
                name: c,
                size: e.size,
                date: (new Date).getTime(),
                folderName: d
            }))
        }).
        catch(e => {
            throw r = !0,
            e
        })
    }
    getImageList() {
        return this.getService().getImageList()
    }
    deleteImages(e) {
        return this.getService().deleteImages(e)
    }
    getService() {
        return ImageServiceProp.getService()
    }
}

export default ImageUploader