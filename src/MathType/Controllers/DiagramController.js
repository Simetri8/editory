import _ from 'lodash';
import { LinePointItemGroupB } from '../../Editor/Toolbar/LinePointItemGroup';
import ActionDataController from './ActionDataController';
import BlockHelper from '../../Elements/BlockHelper';
import Controller_G from './Controller_G';
import Controller_z from './Controller_z';
import EntityChanger from '../../Editor/EntityChanger';
import EntityHelper from '../../Editor/EntityHelper';
import EntityUtils from '../../Editor/EntityUtils';

/// xxx(1635) /*DiagramController*/

/// var r = n(3)/*_.assignIn*/;  // 3 times
/// var a = n.n(r);
/// var I = n(12)/*BlockHelper*/;  // 2 times
/// var j = n(63)/*EntityHelper*/;  // 11 times
/// var nt = n(147)/*EntityChanger*/;  // 5 times
/// var rt = n(450)/*LinePointItemGroup*/;  // 1 times
/// var at = n(20)/*EntityUtils*/;  // 1 times
/// var ActionDataController = n(1641)/*ActionDataController*/;  // 1 times
/// var Controller_z = n(1643)/*Controller_z*/;  // 2 times
/// var Controller_G = n(1644)/*Controller_G*/;  // 1 times
class DiagramController {
    constructor(e) {
        this.target = e;
    }
    handleKeyForDiagram(e, t, n) {
        switch (t.action) {
        case "paste":
            case "copy":
            case "cut":
            case "undo":
            case "redo":
            return null;
        }
        if ("select-all" == t.action) {
            var r = Controller_z.handleEditor(e, (t) => {
                var n = e.selectedBlockModel;
                var r = EntityHelper.getAllSelectableEntityIds(n);
                var i = _.assignIn({},
                e.cursorSelected, {
                    controlSelectedInfo: {
                        selectedIds: r
                    }
                });
                return {
                    editorModel: t.editorModel,
                    editorSelected: i
                };
            });
            return this.handleResult(r);
        }
        var i = BlockHelper.findLeafSelected(e.cursorSelected);
        var o = i.controlSelectedInfo && i.controlSelectedInfo.selectedIds;
        if (!o || o.length <= 0) {
            switch (t.action) {
            case "left":
                case "right":
                case "down":
                case "up":
                return null;
            case "backspace":
                case "delete":
                return this.target.handleDelete(e, null);
            }
            return null;
        }
        var s = Controller_z.handleEditor(e, (r) => {
            var i;
            var o = e.selectedBlockModel;
            var s = r.editorSelected;
            var l = r.editorSelected.controlSelectedInfo && r.editorSelected.controlSelectedInfo.selectedIds;
            switch (t.action) {
            case "select-all":
                var c = EntityHelper.getAllSelectableEntityIds(o);
                var d = _.assignIn({},
                e.cursorSelected, {
                    controlSelectedInfo: {
                        selectedIds: c
                    }
                });
                return {
                    editorModel: r.editorModel,
                    editorSelected: d
                };
            }
            var h = s.controlSelectedInfo && s.controlSelectedInfo.subSelection;
            var u = n ? 10 : 1;
            if (h && "line-point" == h.type) {
                var p = EntityUtils.getEntityById(o, l[0]);
                switch (t.action) {
                case "left":
                    var m = EntityHelper.moveMainControlPoint(p, h.index, null, {
                        x: -1 * u,
                        y: 0
                    });
                    i = EntityChanger.changeEntityInData(o, m);
                    break;
                case "right":
                    var f = EntityHelper.moveMainControlPoint(p, h.index, null, {
                        x: 1 * u,
                        y: 0
                    });
                    i = EntityChanger.changeEntityInData(o, f);
                    break;
                case "up":
                    var g = EntityHelper.moveMainControlPoint(p, h.index, null, {
                        x: 0,
                        y: -1 * u
                    });
                    i = EntityChanger.changeEntityInData(o, g);
                    break;
                case "down":
                    var y = EntityHelper.moveMainControlPoint(p, h.index, null, {
                        x: 0,
                        y: 1 * u
                    });
                    i = EntityChanger.changeEntityInData(o, y);
                    break;
                case "backspace":
                    case "delete":
                    var A = Object(LinePointItemGroupB)(p, h);
                    if (A != p) {
                        i = EntityChanger.changeEntityInData(o, A);
                    }
                }
            } else {
                switch (t.action) {
                case "left":
                    i = EntityHelper.moveEntitiesByIds(o, l, {
                        x: -1 * u,
                        y: 0
                    }).diagram;
                    break;
                case "right":
                    i = EntityHelper.moveEntitiesByIds(o, l, {
                        x: 1 * u,
                        y: 0
                    }).diagram;
                    break;
                case "up":
                    i = EntityHelper.moveEntitiesByIds(o, l, {
                        x: 0,
                        y: -1 * u
                    }).diagram;
                    break;
                case "down":
                    i = EntityHelper.moveEntitiesByIds(o, l, {
                        x: 0,
                        y: 1 * u
                    }).diagram;
                    break;
                case "backspace":
                    case "delete":
                    i = EntityHelper.removeEntitiesAndRelating(o, l);
                    var E = [];
                }
            }
            if (i) {
                var v = r.editorSelected.lineIndex;
                var S = r.editorSelected.charIndex;
                var C = BlockHelper.blockIndexFromCharIndex(r.editorModel.lines[v], S);
                var x = Controller_G.replaceBlockInEditor(r.editorModel, i, v, C);
                var T = r.editorSelected;
                return E && (T = _.assignIn({},
                T, {
                    controlSelectedInfo: {
                        selectedIds: E
                    }
                })),
                {
                    editorModel: x,
                    editorSelected: T
                };
            }
            return null;
        });
        return this.handleResult(s);
    }
    handleResult(e) {
        if (!e) {
            return ActionDataController.emptyResult();
        }
        var t = this.target.toKeyHandledResult(e, {
            clearHiddenIputText: true
        });
        return t.isOneLineChanged = true,
        t;
    }
}
/*n.d(t, "a", function () {
    return DiagramController;
})*/

export default DiagramController