import SymbolArrowBase from '../Elements/SymbolArrowBase';
import SymbolUnknow from './Symbol-unknow';

/// xxx(1258) /*Symbol-rightarrow*/

/// n.r(t)
/// var r = n(347)/*Symbol-unknow*/;  // 1 times
/// var a = n(241)/*SymbolArrowBase*/;  // 1 times
class i extends SymbolArrowBase {
    getArrow() {
        return "→"
    }
}
var SymbolRightarrow = new class extends SymbolUnknow {
    getViewComponent() {
        return i
    }
    getSymbolInfo() {
        var e = super.getSymbolInfo();
        return e.shortcut = {
            char:
            "->"
        },
        e
    }
    getLatextName() {
        return "\\rightarrow"
    }
    getSymbol() {
        return "→"
    }
}

export default SymbolRightarrow