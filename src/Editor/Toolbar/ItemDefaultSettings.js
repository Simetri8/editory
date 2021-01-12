// Not found 'var' for: import  from '../../Shapes/ShapeLoader';
import DiagramIdHelper from '../../Elements/DiagramIdHelper';
import EntityUtils from '../EntityUtils';
import PropUpdateHelper from '../../Mathcha/PropUpdateHelper';

/// xxx(17) /*ItemDefaultSettings*/

/// var r = n(20)/*EntityUtils*/;  // 2 times
/// var a = n(6)/*DiagramIdHelper*/;  // 3 times
/// var i = n(1532)/*ShapeLoader*/;  // 0 times
/// var o = n(7)/*PropUpdateHelper*/;  // 2 times
var ItemDefaultSettings = new class {
    getSettings(e, t) {
        if (EntityUtils.isDiagramEditor(e)) return this.getTextSetting(e, t);
        var n = e.settings || {};
        if (null != n[t]) return n[t];
        if ("cornerRadius" == t) return 0;
        if (DiagramIdHelper.isDiagramArrowId(e.id) || DiagramIdHelper.isDiagramConnectionId(e.id)) return this.getArrowOrConnectionSettingDefault(t);
        if (DiagramIdHelper.isDiagramIntersectionId(e.id)) return this.getIntersectionDefault(t);
        if (EntityUtils.isCompositeShape(e)) {
            return "separator" != t && ("separatorDistance" == t ? 20 : "textColor" == t ? "#000" : void 0)
        }
        return "grid" != t && "textSnapToGrid" != t && "onlyShowGridOnEditing" != t && ("gridSize" == t ? 10 : "diagramHeight" == t ? 300 : "snapToOtherShapes" == t || void 0)
    }
    getPlotSettings(e, t) {
        var n = ((e = e || {}).settings || {})[t];
        return void 0 !== n ? n : "axisType" == t ? "school" : "plotAxisNumering" == t || "plotAxisShow" == t || "plotGridShow" == t || ("majorSteps" == t ? 5 : "minorTickShow" != t && "minorGridShow" != t && ("minorStep" == t ? 9 : "scale" == t ? 8 : "majorTextColor" == t ? "#808080" : "majorTextFontSize" == t ? 11 : "unitType" == t ? "radix10" : "axisColor" == t ? "#000" : "axisArrangement" == t ? "axis-plot-label" : "axisThickness" == t ? .5 : void 0))
    }
    getIntersectionDefault(e) {
        return "shapeType" == e ? "o" : "radius" == e ? 5 : void 0
    }
    getTextSetting(e, t) {
        var n = e.shape.settings || {};
        return null != n[t] ? n[t] : "fontSize" == t ? "\\normalsize" : "cornerRadius" == t ? 0 : void 0
    }
    getArrowOrConnectionSettingDefault(e) {
        switch (e) {
        case "isControlPointBreak":
            return !1;
        case "separatorDistance":
            return 10;
        case "separatorLength":
            return 8;
        case "breakWidth":
            return;
        case "breakPositionPercentage":
            return.5;
        case "perpendicularDistance":
            return 0
        }
    }
    getArrowOrConnectionSettings(e, t) {
        return null != (e = e || {})[t] ? e[t] : this.getArrowOrConnectionSettingDefault(t)
    }
    setSetting(e, t, n) {
        var r = e.settings || {},
        a = PropUpdateHelper.setProp(r, t, n);
        return PropUpdateHelper.setProp(e, "settings", a)
    }
}

export default ItemDefaultSettings