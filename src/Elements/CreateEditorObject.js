import _ from 'lodash';
import DiagramIdHelper from './DiagramIdHelper';

/// xxx(13) /*CreateEditorObject*/

/// var r = n(3)/*_.assignIn*/;  // 1 times
/// var a = n.n(r);
/// var i = n(6)/*DiagramIdHelper*/;  // 12 times
/// var o = n(2)/*lodash*/;  // 1 times
/// var s = n.n(o);
var CreateEditorObject = new class {
    createEmptyLine() {
        return {
            id: DiagramIdHelper.nextId(),
            blocks: []
        }
    }
    createComposite(e) {
        return {
            id: DiagramIdHelper.nextId(),
            text: e,
            type: "composite",
            elements: {}
        }
    }
    createLineFromBlock(e) {
        return {
            id: DiagramIdHelper.nextId(),
            blocks: [e]
        }
    }
    createLineFromBlocks(e) {
        return {
            id: DiagramIdHelper.nextId(),
            blocks: e
        }
    }
    createPureTextLine(e) {
        return e ? {
            id: DiagramIdHelper.nextId(),
            blocks: [{
                id: DiagramIdHelper.nextId(),
                text: e
            }]
        } : {
            id: DiagramIdHelper.nextId(),
            blocks: []
        }
    }
    createEmptyEditor(e) {
        return {
            id: e || DiagramIdHelper.nextId(),
            lines: [{
                id: DiagramIdHelper.nextId(),
                blocks: []
            }]
        }
    }
    createEditorWith(e) {
        return null == e ? this.createEmptyEditor() : _.isString(e) ? this.createOneTextEditor(e) : 0 === e.length ? this.createEmptyEditor() : (e.text && (e = [this.createLineFromBlock(e)]), {
            id: DiagramIdHelper.nextId(),
            lines: e
        })
    }
    createOneTextEditor(e, t) {
        var n = this.createEmptyEditor(t);
        return n.lines[0].blocks = [{
            id: DiagramIdHelper.nextId(),
            text: e
        }],
        n
    }
    createTextBlock(e, t) {
        return _.assignIn({},
        t, {
            id: DiagramIdHelper.nextId(),
            text: e
        })
    }
}

export default CreateEditorObject