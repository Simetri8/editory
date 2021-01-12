
/// xxx(1575) /*PrintHelper*/

var bs = [{
    cssSize: "letter",
    width: 8.5,
    height: 11
},
{
    cssSize: "ledger",
    width: 11,
    height: 17
},
{
    cssSize: "legal",
    width: 8.5,
    height: 14
},
{
    cssSize: "A3",
    width: 11.69,
    height: 16.54
},
{
    cssSize: "A4",
    width: 8.27,
    height: 11.69
},
{
    cssSize: "A5",
    width: 5.83,
    height: 8.27
},
{
    cssSize: "B4",
    width: 9.84,
    height: 13.9
},
{
    cssSize: "B5",
    width: 6.93,
    height: 9.84
}];
var Ls = new class {
    print(e, t, n) {
        this.setupCssPrint(e, t, n);
        window.print();
    }
    setupCssPrint(e, t, n) {
        var r = this.pageSizeToPageSizeCSS(e, t, n);
        this.setPrintStyle(r);
    }
    pageSizeToPageSizeCSS(e, t, n) {
        var r = bs.find((n) => {
            return n.width === e && n.height === t;
        });
        return r ? "".concat(r.cssSize, " ").concat(n) : "".concat(e, "in ").concat(t, "in ").concat(n);
    }
    setPrintStyle(e) {
        var t = document.getElementById("print-style");
        if (t) {
            t.innerHTML = this.printInfoToCssText(e);
        } else {
            var n = document.createElement("style");
            n.id = "print-style";
            n.type = "text/css";
            n.innerHTML = this.printInfoToCssText(e);
            document.getElementsByTagName("head")[0].appendChild(n);
        }
    }
    printInfoToCssText(e) {
        return "\n@page{\nsize:".concat(e, ";\n}\n");
    }
};
/*n.d(t, "a", function () {
    return Ls;
});*/

export default Ls