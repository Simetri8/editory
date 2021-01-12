
var RunningBuiltinWorker;
/// xxx(669) /*running-builtin-worker*/

RunningBuiltinWorker = function () {
    return new Worker("http://localhost:3001/running.builtin.worker.js")
}

export default RunningBuiltinWorker