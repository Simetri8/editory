import _ from 'lodash';

/// xxx(292) /*SortHelper*/

/*n.d(t, "a", function () {
    return i
});*/
/// var r = n(2)/*lodash*/;  // 1 times
/// var a = n.n(r);
class i {
    constructor(e) {
        this.data = e;
        this.data = this.sortByNumberOfFrequency(this.data)
    }
    sort(e) {
        this.firstElement = e;
        this.data = this.sortByNumberOfFrequency(this.data)
    }
    sortByNumberOfFrequency(e) {
        return _.orderBy(e, [e => this.firstElement && e === this.firstElement ? 999999 : e.numberOfFrequency || 0], ["desc"])
    }
    getdata() {
        return this.data
    }
}

export default i