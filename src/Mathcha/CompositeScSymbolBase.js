import CompositeSymbolBase from './CompositeSymbolBase';
import CreateEditorObject from '../Elements/CreateEditorObject';
import DiagramIdHelper from '../Elements/DiagramIdHelper';

/// xxx(73) /*CompositeScSymbolBase*/

/*n.d(t, "a", function () {
    return o
});*/
/// var r = n(27)/*CompositeSymbolBase*/;  // 1 times
/// var a = n(6)/*DiagramIdHelper*/;  // 1 times
/// var i = n(13)/*CreateEditorObject*/;  // 2 times
class o extends CompositeSymbolBase {
    getModelMeta() {
        return {
            text: this.getLatextName(),
            keyInsertOnSelection: "value",
            elements: {
                value: {
                    onRemove: "all"
                }
            }
        }
    }
    getSymbolInfo() {
        return this.fillSymbolInfo({
            type: "composite",
            names: [this.getLatextName()],
            symbol: this.getSymbol()
        })
    }
    toModel(e, t, n) {
        if (this.isFlatten) {
            if (null == n || 0 === n.length) return {
                id: DiagramIdHelper.nextId(),
                text: ""
            };
            if (n && 1 === n.length) return n[0].blocks
        }
        var r = this.getModel();
        return null == n || 0 === n.length ? r.elements.value = CreateEditorObject.createEmptyEditor() : r.elements.value = CreateEditorObject.createEditorWith(n),
        r
    }
    toLatex(e, t, n) {
        return "".concat(this.getLatextName(), "{").concat(n.toLatexFromEditor(e.elements.value, t), "}")
    }
}

export default o