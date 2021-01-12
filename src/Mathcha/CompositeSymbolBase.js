import _ from 'lodash';
import CreateEditorObject from '../Elements/CreateEditorObject';
import DiagramIdHelper from '../Elements/DiagramIdHelper';
import TextUtils from '../Editor/TextUtils';

/// xxx(27) /*CompositeSymbolBase*/

/*n.d(t, "a", function () {
    return l
});*/
/// var r = n(2)/*lodash*/;  // 2 times
/// var a = n.n(r);
/// var i = n(36)/*TextUtils*/;  // 1 times
/// var o = n(6)/*DiagramIdHelper*/;  // 3 times
/// var s = n(13)/*CreateEditorObject*/;  // 2 times
class l {
    getModelFromStructure(e, t) {
        if ("editor" == e) return {
            id: DiagramIdHelper.nextId(),
            lines: [{
                id: DiagramIdHelper.nextId(),
                blocks: []
            }]
        };
        var n = {
            id: DiagramIdHelper.nextId(),
            type: "composite",
            text: t,
            elements: {}
        };
        return _.keys(e).forEach(t => {
            n.elements[t] = this.getModelFromStructure(e[t], void 0)
        }),
        n
    }
    getModel(e) {
        var t = this.getModelMeta(),
        n = CreateEditorObject.createComposite(t.text);
        return _.keys(t.elements).forEach(r => {
            var a = t.elements[r];
            e && !e.isExpanded && (e.isExpanded || a.defaultHide) || (n.elements[r] = CreateEditorObject.createEmptyEditor())
        }),
        n
    }
    fillSymbolInfo(e) {
        return null == e.searchText && (e.searchText = e.names.join(" "), e.description && (e.searchText += " " + e.description)),
        e
    }
    isEmptyOrOneCharEditor(e) {
        return this.isEmptyEditor(e) || this.isOneCharacterEditor(e)
    }
    isOneCharacterEditor(e) {
        return 1 === e.lines.length && 1 === e.lines[0].blocks.length && null == e.lines[0].blocks[0].type && TextUtils.isSingleChar(e.lines[0].blocks[0].text)
    }
    isNotExistOrEmptyEditor(e) {
        return null == e || this.isEmptyEditor(e)
    }
    isEmptyEditor(e) {
        return !e || 1 === e.lines.length && 0 === e.lines[0].blocks.length
    }
}

export default l