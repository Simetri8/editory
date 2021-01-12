
var SpellCheckWorker;
/// xxx(1432) /*spell-check-worker*/

SpellCheckWorker = function () {
    return new Worker("http://localhost:3001/running.spell-check.worker.js")
}

export default SpellCheckWorker