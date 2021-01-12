import jQuery from 'jquery';
import FontProcessor from '../Font/FontProcessor';

/// xxx(244) /*ExportHandlerForTest*/

/// var r = n(5)/*sizzle*/;  // 5 times
/// var a = n.n(r);
/// var i = n(121)/*FontProcessor*/;  // 4 times
var ExportHandlerForTest = new class {
    handleMathExportForTest(e) {
        var t = jQuery(this.requestTestContainer());
        FontProcessor.exportPng(e, {
            padding: 2,
            transparent: false,
            bgColor: "white"
        }).then((e) => {
            var n = FontProcessor.blobToCanvas(e);
            t.append(n)
        })
    }
    handleDiagramExportForTest(e) {
        var t = jQuery(this.requestTestContainer({
            width: 660,
            height: 700
        }));
        FontProcessor.exportDiagramPng(e, {
            padding: 2,
            transparent: false,
            bgColor: "white"
        }).then((e) => {
            var n = FontProcessor.blobToCanvas(e);
            t.append(n)
        })
    }
    requestTestContainer() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        var t = jQuery(".target-test");
        if (0 === t.length) t = jQuery("<div></div>").appendTo("editor-container").addClass("target-test").css("position", "fixed").css("bottom", "100px").css("right", "100px").css("background", "white").css("z-index", "999999999");
        if (e.width) t.css("width", "".concat(e.width, "px"));
        if (e.height) t.css("height", "".concat(e.height, "px"));
        t.children().remove();
        return t.get(0)
    }
    clearTestContainer() {
        jQuery(".target-test").remove()
    }
}

export default ExportHandlerForTest