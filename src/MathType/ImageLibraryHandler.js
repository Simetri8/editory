import jQuery from 'jquery';
import React from 'react';
import BaseComponent from '../Elements/BaseComponent';
import Global from '../Global';
import ImageManagerMain from '../Editor/ImageManagerMain';
import ImageServiceProp from '../Mathcha/ImageServiceProp';
import ImageViewer from '../Editor/ImageViewer';

/// xxx(1609) /*ImageLibraryHandler*/

/// var i = n(0)/*React*/;  // 1 times
/// var o = n.n(i);
/// var ye = n(5)/*sizzle*/;  // 4 times
/// var Ae = n.n(ye);
/// var ee = n(11)/*Global*/;  // 1 times
/// var pt = n(191)/*ImageViewer2*/;  // 1 times
/// var an = n(62)/*BaseComponent*/;  // 1 times
/// var Ho = n(460)/*ImageManagerMain*/;  // 1 times
/// var isp = n(204)/*ImageServiceProp*/;  // 1 times
class ImageLibraryHandler extends BaseComponent {
    constructor() {
        super(...arguments);
        this.dragEnterCounter = 0;
        this.requestImageSelection = (e, t, n) => {
            if (Global.isUploadHandleByService()) {
                ImageServiceProp.getService().requestFileUploadFromService().then((e) => {
                    t(e, n);
                });
            } else {
                this.currentSelectedImage = {
                    url: e,
                    fromLibrary: false,
                    cb: t,
                    customData: n
                };
                this.getTarget().requestRender(this);
            }
        };
        this.onUrlChanged = (e, t) => {
            if (this.currentSelectedImage) {
                this.currentSelectedImage.cb(e, t);
                this.currentSelectedImage = null;
            }
            this.getTarget().closeRender(this);
        };
        this.handleDragEnter = (e) => {
            e.preventDefault();
            if (0 === this.dragEnterCounter) {
                this.handleDragAction();
            }
            this.dragEnterCounter++;
        };
        this.handleDragLeave = (e) => {
            e.preventDefault();
            this.dragEnterCounter--;
            if (0 === this.dragEnterCounter) {
                this.handleStopDragAction();
            }
        };
        this.handleDragOver = (e) => {
            e.preventDefault();
            if (! (this.lastPosition && e.clientX === this.lastPosition.left && e.clientY === this.lastPosition.top)) {
                this.lastPosition = {
                    left: e.clientX,
                    top: e.clientY
                };
                this.getTarget().handleSelectFromPosition(e.target, this.lastPosition, false);
            }
        };
        this.handleDrop = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.handleStopDragAction();
            var t = e.dataTransfer.files;
            ImageViewer.requestFileUpload = t[0];
            this.getTarget().insertImageContainer();
        };
    }
    handleDragAction() {
        jQuery(this.getTarget().getMathTypeHtmlElement()).css("outline", "1px solid green");
        jQuery(".text-cursor").css("visibility", "visible");
    }
    handleStopDragAction() {
        this.dragEnterCounter = 0;
        jQuery(this.getTarget().getMathTypeHtmlElement()).css("outline", "");
        jQuery(".text-cursor").css("visibility", "hidden");
    }
    render() {
        if (this.currentSelectedImage) {
            var e = this.currentSelectedImage;
            return React.createElement(ImageManagerMain, {
                url: e.url,
                fromLibrary: e.fromLibrary,
                customData: e.customData,
                onCancel: () => {
                    this.currentSelectedImage = null;
                    this.getTarget().closeRender(this);
                },
                onUrlChanged: this.onUrlChanged
            });
        }
    }
}
/*n.d(t, "a", function () {
    return ImageLibraryHandler;
})*/

export default ImageLibraryHandler