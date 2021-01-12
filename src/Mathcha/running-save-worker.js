
var RunningSaveWorker;
/// xxx(1433) /*running-save-worker*/

RunningSaveWorker = function () {
    return new Worker("http://localhost:3001/running.save.worker.js")
}

export default RunningSaveWorker