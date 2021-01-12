
/// xxx(1552) /*DocumentProvider*/

var documentProvider = new class {
    setDocumentProvider(e) {
        this.documentProvider = e;
    }
    getCurrentDocumentInfo() {
        return this.documentProvider.getDocumentInfo();
    }
    getCurrentDocumentHistoryContents() {
        return this.documentProvider.getHistoryContents();
    }
    getColMathType() {
        return this.documentProvider.getColMathType();
    }
};
/*n.d(t, "a", function () {
    return documentProvider;
});*/

export default documentProvider