import { StackrelSc } from './Symbol-stackrel';

/// xxx(1111) /*Symbol-overset*/

/// n.r(t)
/// var r = n(284)/*Symbol-stackrel*/;  // 1 times
var SymbolOverset = new class extends StackrelSc {
    getLatextName() {
        return "\\overset"
    }
}

export default SymbolOverset