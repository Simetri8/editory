
/// xxx(192) /*ShapeSelection*/

var ShapeSelection = new class {
    getSelectionStyle(e, t) {
        if (e.isGroupSelected || e.isRemoteSelected) return {
            stroke: e.remoteSelectedColor || "#b3d6b3",
            strokeOpacity: .5,
            strokeWidth: ("number" == typeof t ? t || 1 : t && t.style && t.style.thickness || 1) + 5
        }
    }
    isAnySelection(e) {
        return e.isSelected || e.isGroupSelected || e.isRemoteSelected
    }
}

export default ShapeSelection