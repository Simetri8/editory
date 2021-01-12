
/// xxx(1564) /*GuidGenerator*/

var GuidGenerator = new class {
    next() {
        var e = (new Date).getTime();
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (t) => {
            var n = (e + 16 * Math.random()) % 16 | 0;
            return e = Math.floor(e / 16),
            ("x" == t ? n : 3 & n | 8).toString(16);
        });
    }
};
/*n.d(t, "a", function () {
    return GuidGenerator;
});*/

export default GuidGenerator