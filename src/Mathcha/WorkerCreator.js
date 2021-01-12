import Global from '../Global';

/// xxx(351) /*WorkerCreator*/

/// var r = n(11)/*Global*/;  // 2 times
var WorkerCreator = (e => {
    var t = "/running.".concat(e, ".js");
    if (Global.useCdn()) {
        var n = new Blob(['importScripts("'.concat(Global.resolveStaticAssetPath(t), '")')]);
        return new Worker(URL.createObjectURL(n))
    }
    return new Worker(t)
})

export default WorkerCreator