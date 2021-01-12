
var DocumentInfoWorker;
/// xxx(1482) /*document-info-worker*/

DocumentInfoWorker = function () {
    return new Worker("http://localhost:3001/running.document-info.worker.js")
}

export default DocumentInfoWorker