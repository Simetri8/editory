import React from 'react';

/// xxx(1533) /*ShapeStyleBaseB*/

/// var i = n(0)/*React*/;  // 2 times
/// var o = n.n(i);
/*n.d(t, "a", function () {
    return ShapeStyleBaseB
});*/
class ShapeStyleBaseB {
    getIcon() {
        return {
            caption: "",
            component: React.createElement("svg", {
                style: {
                    width: 23,
                    height: 20,
                    position: "relative"
                },
                key: this.getType()
            },
            React.createElement("path", {
                style: {
                    stroke: "gray",
                    fill: "none",
                    transform: "translate(1px,0px)"
                },
                d: " M4,5.6 L16.1,5.6 L16.1,15.2 L4,15.2 Z"
            }))
        }
    }
    getInfo() {
        return {
            entityType: "shape-composite",
            type: this.getType()
        }
    }
    getSettingDefaultValue(e) {}
    getSnapablePoints(e) {
        return []
    }
    isSupportStyle(e, t) {
        return this.styleSupports(t).indexOf(e) >= 0
    }
    styleSupports(e) {
        return ["thickness", "strokeColor", "fillColor", "intersection", "strokeType"]
    }
    getBreakdownInfo(e) {
        return this.wrapBreakdownCachable(e, (e) => {
            return this.getBreakdownInfoWhenInvalidCache(e)
        })
    }
    wrapBreakdownCachable(e, t) {
        if (e.___breakdownInfoCache && e.___breakdownInfoCache.data === e.data && e.___breakdownInfoCache.settings === e.settings) return e.___breakdownInfoCache.info;
        var n = t(e);
        return e.___breakdownInfoCache = {
            data: e.data,
            settings: e.settings,
            info: n
        },
        n
    }
    getControlPoints(e, t) {
        return []
    }
    moveControlPoint(e) {
        return e.shape
    }
}

export default ShapeStyleBaseB