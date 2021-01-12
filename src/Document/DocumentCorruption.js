import ConsoleLog from '../ConsoleLog';
import CreateEditorObject from '../Elements/CreateEditorObject';
import DiagramIdHelper from '../Elements/DiagramIdHelper';

/// xxx(95) /*DocumentCorruption*/

/// var r = n(6)/*DiagramIdHelper*/;  // 4 times
/// var a = n(65)/*ConsoleLog*/;  // 7 times
/// var i = n(13)/*CreateEditorObject*/;  // 1 times
var DocumentCorruption = new class {
    constructor() {
        this.isDocumentCorrupted = !1
    }
    makeSureLine(e, t) {
        var n = e[t];
        return null == n && (ConsoleLog.warn("Corruption recovery: line is null"), n = {
            id: DiagramIdHelper.nextId(),
            blocks: []
        },
        e[t] = n),
        n
    }
    makeSureBlock(e, t) {
        var n = e[t];
        return null == n ? (ConsoleLog.warn("Corruption recovery: block is null"), n = {
            id: DiagramIdHelper.nextId(),
            text: " "
        },
        e[t] = n) : n.text || (ConsoleLog.warn("Corruption recovery: block text is null or empty"), n.text = " ", n.type && (n.type = null)),
        n
    }
    deleteWrongFormatDiagramEditor(e, t) {
        var n = e.elements[t];
        if (n) return DiagramIdHelper.isDiagramEditorId(t) && DiagramIdHelper.isDiagramEditorId(n.id) && n.shape ? void 0 : (ConsoleLog.warn("Corruption remove: editor model is not in correct format in diagram"), void delete e.elements[t]);
        delete e.elements[t]
    }
    makeSureEditorModel(e, t) {
        var n = t[e];
        return null == n && (ConsoleLog.warn("Corruption recovery: editor model is null"), n = CreateEditorObject.createEmptyEditor(), t[e] = n),
        n
    }
    makeSureBlocks(e) {
        if (!e.blocks) {
            ConsoleLog.warn("Corruption recovery: blocks is null");
            e.blocks = []
        }
    }
    makeSureLines(e) {
        if (!e.lines) {
            ConsoleLog.warn("Corruption recovery: lines is null");
            e.lines = []
        }
    }
    requestDocumentCorruption() {
        this.isDocumentCorrupted = !0
    }
    isCurrentDocumentInCorruption() {
        return this.isDocumentCorrupted
    }
    clearDocumentCorruptionState() {
        this.isDocumentCorrupted = !1
    }
}

export default DocumentCorruption