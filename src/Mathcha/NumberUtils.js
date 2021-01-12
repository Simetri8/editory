
/// xxx(52) /*NumberUtils*/
/*GEREKSIZ*/var NumberUtils = new class {
    round2(e) {
        return Math.round(100 * e) / 100
    }
    floor2(e) {
        return Math.floor(100 * e) / 100
    }
    round4(e) {
        return Math.round(1e4 * e) / 1e4
    }
    rangeOverlap(e, t, n, r) {
        return ! (t < n || r < e)
    }
}

export default NumberUtils