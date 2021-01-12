import Api from './Api';

/// xxx(1581) /*MathTypeErrorReporter*/

/// var api = n(1542)/*Api*/;  // 1 times
var MathTypeErrorReporter = new class {
    report(e) {
        if (! (window.location.href.indexOf("localhost:3001") >= 0)) {
            Api.Post("/api/problem-report", e);
        }
    }
};
/*n.d(t, "a", function () {
    return MathTypeErrorReporter;
});*/

export default MathTypeErrorReporter