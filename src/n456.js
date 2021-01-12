
/// xxx(456) /*n456*/

/*n.d(t, "a", function () {
    return r
});*/
/*n.d(t, "b", function () {
    return a
});*/
class r {
    constructor(e, t) {
        this.key = e;
        this.defaultData = t
    }
    get() {
        return a.getByKey(this.key) || this.defaultData
    }
    set(e) {
        return a.setValueByKey(this.key, e),
        new r(this.key, this.defaultData)
    }
}
var a = new class {
    constructor() {
        this.itemsToRequest = [];
        this.sendRequest = () => {
            if (this.input) {
                var e = this.input;
                var t = e.setSettingFunc;
                var n = e.documentId;
                this.itemsToRequest.forEach((e) => {
                    t(n, e.key, e.value)
                });
                this.itemsToRequest = []
            }
        };
        setInterval(this.sendRequest, 5E3)
    }
    setActiveDocument(e) {
        this.input = e
    }
    getByKey(e) {
        if (this.input) {
            var t = this.input.settings;
            return t && t[e] ? t[e] : null
        }
    }
    addItemToRequest(e, t) {
        var n = this.itemsToRequest.find((t) => {
            return t.key === e
        });
        if (n) n.value = t;
        else this.itemsToRequest.push({
            key: e,
            value: t
        })
    }
    setValueByKey(e, t) {
        var n = this.input.settings;
        if (null == n) {
            n = {
                [e] : t
            };
            this.input.settings = n
        } else n[e] = t;
        this.addItemToRequest(e, t)
    }
}

export { a as n456B }

export default r