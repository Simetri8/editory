import Global from '../Global';

/// xxx(141) /*DiagramElementCreater*/

/// var r = n(11)/*Global*/;  // 1 times
var DiagramElementCreater = new class {
    createBy(e, t) {
        var n = {
            left: -Math.min(e.diagramLeft - e.paddingLeft - 30, 0),
            top: -Math.min(e.diagramTop - e.paddingTop, 0),
            right: e.diagramWidth,
            bottom: e.diagramHeight
        };
        return Global.isTestEnv() && (n.left = 0, n.top = 0, n.bottom = 200),
        console.log(n),
        t(n)
    }
}

export default DiagramElementCreater