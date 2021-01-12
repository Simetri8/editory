import _ from 'lodash';
import React from 'react';
import CreateEditorObject from '../Elements/CreateEditorObject';
import EventHelper from '../Mathcha/EventHelper';
import ToolbarIcons from '../Editor/Toolbar/ToolbarIcons';

/// xxx(194) /*GroupSymbolCollapsed*/

/// var r = n(3)/*_.assignIn*/;  // 4 times
/// var a = n.n(r);
/// var i = n(0)/*React*/;  // 1 times
/// var o = n.n(i);
/// var s = n(24)/*EventHelper*/;  // 2 times
/// var l = n(37)/*ToolbarIcons*/;  // 2 times
/// var c = n(13)/*CreateEditorObject*/;  // 2 times
var d = "? ";
var GroupSymbolCollapsed = new class {
    isCollapsed(e) {
        return !! e.collapsed
    }
    getCompositeBlockClassName() {
        return "group-symbol-collapsed"
    }
    toggleShowHide(e, t) {
        if (!e.collapsed && !e.hiddenData) return {
            selected: {
                charIndex: 0,
                key: "value",
                selected: {
                    lineIndex: 0,
                    charIndex: 2
                }
            },
            data: _.assignIn({},
            e, {
                elements: _.assignIn({},
                e.elements, {
                    value: this.createEmptyTextElement(t)
                }),
                collapsed: !0,
                hiddenData: e.elements.value
            })
        };
        var n = 0;
        return 1 === e.hiddenData.lines[0].blocks.length && e.hiddenData.lines[0].blocks[0].text === d && (n = 2),
        {
            selected: {
                charIndex: 0,
                key: "value",
                selected: {
                    lineIndex: 0,
                    charIndex: n
                }
            },
            data: _.assignIn({},
            e, {
                collapsed: !e.collapsed,
                elements: _.assignIn({},
                e.elements, {
                    value: e.hiddenData
                }),
                hiddenData: e.elements.value
            })
        }
    }
    renderShowHideElement(e, t, n, r) {
        return React.createElement("div", {
            key: "settings",
            className: "settings-show-hide no-print",
            style: {
                position: "absolute",
                left: -42,
                top: 0,
                fontSize: 12,
                border: "1px solid lightgray",
                padding: 4,
                paddingTop: 2,
                cursor: "pointer",
                width: 8,
                height: 10,
                fill: "gray",
                zIndex: 400
            },
            onMouseDown: EventHelper.onMouseDownStopPropagation,
            onDoubleClick: EventHelper.onDoubleClickStopPropagation,
            onMouseEnter: n,
            onMouseLeave: r,
            onClick: t
        },
        e ? ToolbarIcons.plus : ToolbarIcons.minus)
    }
    createEmptyTextElement(e) {
        var t = CreateEditorObject.createEmptyEditor();
        return t.lines[0].blocks.push(CreateEditorObject.createTextBlock(d)),
        this.assignDefaultStyle(t.lines, e),
        t
    }
    assignDefaultStyle(e, t) {
        e.forEach(e => {
            "text" == t && (e.style = {
                align: "center"
            });
            e.blocks.forEach(e => {
                e.style = {
                    color: "rgb(128,128,128)"
                }
            })
        })
    }
}

export default GroupSymbolCollapsed