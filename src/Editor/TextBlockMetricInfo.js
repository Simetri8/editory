import CheckComponent from './CheckComponent';
import TextHelper from '../Mathcha/TextHelper';

/// xxx(159) /*TextBlockMetricInfo*/

/// var r = n(77)/*TextHelper*/;  // 2 times
/// var a = n(22)/*CheckComponent*/;  // 1 times
var TextBlockMetricInfo = new class {
    initMetricInfo() {
        return {
            haveLowerChar: !1,
            haveUpperChar: !1,
            haveComposite: !1,
            haveIndex: !1,
            havePower: !1,
            hasTextBlock: !1
        }
    }
    fillMetricsForTextBlock(e, t) {
        return t = t || this.initMetricInfo(),
        TextHelper.isAnyUpperBigUni(e) && (t.haveUpperChar = !0),
        TextHelper.isAnyLowerBigUni(e) && (t.haveLowerChar = !0),
        t.hasTextBlock = !0,
        t
    }
    fillMetricsForNonTextBlock(e, t, n) {
        return (n = n || this.initMetricInfo()).haveComposite = !CheckComponent.isOpenClose(e),
        n
    }
}

export default TextBlockMetricInfo