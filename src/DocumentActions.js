import _ from 'lodash';
import { Promise } from 'bluebird';
import asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import regeneratorRuntime from 'regenerator-runtime';
import slicedToArray from '@babel/runtime/helpers/slicedToArray';
import Api from './Api';
import AppStorage from './AppStorage';
import ArrayHelper from './Mathcha/ArrayHelper';
import ArrayHelper2 from './Mathcha/ArrayHelper2';
import ConsoleLog from './ConsoleLog';
import CreateEditorObject from './Elements/CreateEditorObject';
import CursorPositionHelper from './Editor/CursorPositionHelper';
import DiagramIdHelper from './Elements/DiagramIdHelper';
import DocumentProvider from './DocumentProvider';
import DocumentTreeHelper from './Document/DocumentTreeHelper';
import FontsLoader from './FontsLoader';
import Global from './Global';
import ModelFontAnalyzer from './ModelFontAnalyzer';
import PageDispatches from './PageDispatches';
import PromiseRunner from './Document/PromiseRunner';
import Remainder from './Mathcha/Remainder';
import RunningSaveWorker from './Mathcha/running-save-worker';
import Serialization from './Serialization';
import SwitchCaseError from './Mathcha/SwitchCaseError';
import TabularHelper from './Tabular/TabularHelper';
import TextUtils from './Editor/TextUtils';
import TimerHelper from './Mathcha/TimerHelper';
import WorkerCreator from './Mathcha/WorkerCreator';

/// xxx(1553) /*DocumentActions*/

/// var Ne = n(30)/*blubirdjs*/;  // 9 times
/// var ke = n.n(Ne);
/// var st = n(68)/*DocumentTreeHelper*/;  // 1 times
/// var api = n(1542)/*Api*/;  // 15 times
/// var dispatches = n(1548)/*PageDispatches*/;  // 2 times
/// var appStorage = n(1551)/*AppStorage*/;  // 5 times
/// var documentProvider = n(1552)/*DocumentProvider*/;  // 2 times
/// var fontsLoader = n(1554)/*FontsLoader*/;  // 2 times
/// var Ca = n(1556)/*ModelFontAnalyzer*/;  // 2 times
/// var n19 = n(19)/*TimerHelper*/;  // 5 times
/// var Rt = n(65)/*ConsoleLog*/;  // 1 times
/// var Pt = n(176)/*PromiseRunner*/;  // 2 times
/// var Ht = n(61);  // 6 times
/// var ser = n(136)/*Serialization*/;  // 3 times
/// var _t = n.n(Ht);
/// var Pe = n(3);  // 38 times
/// var Fe = n.n(Pe);
/// var Ut = n(2)/*lodash*/;  // 76 times
/// var Wt = n.n(Ut);
/// var Aa = n(11)/*Global*/;  // 1 times
/// var zt = n(34)/*regenerator-runtime-exp*/;  // 10 times
/// var Yt = n.n(zt);
/// var Kt = n(53)/*babel-asyncToGenerator*/;  // 5 times
/// var Vt = n.n(Kt);
/// var sn = n(174)/*SwitchCaseError*/;  // 2 times
/// var ln = n(15)/*TabularHelper*/;  // 17 times
/// var mn = n(13)/*CreateEditorObject*/;  // 1 times
/// var Wn = n(55)/*ArrayHelper2*/;  // 13 times
/// var or = n(36)/*TextUtils*/;  // 1 times
/// var ur = n(6)/*DiagramIdHelper*/;  // 2 times
/// var ta = n(49)/*CursorPositionHelper*/;  // 2 times
/// var Zt = n(35)/*slicedToArray*/;  // 14 times
/// var Xt = n.n(Zt);
/// var ze = n(43)/*ArrayHelper*/;  // 2 times
/// var workerCreator = n(351)/*WorkerCreator*/;  // 1 times
/// var rsw = n(1433)/*running-save-worker*/;  // 1 times
var kt = (RunningSaveWorker, WorkerCreator);
var SaveWorkerAction = () => {
    return Object(kt)("save.worker");
};
var SilentSaver = new class {
    constructor(e, t) {
        this.appStorage = e;
        this.documentInfo = t;
    }
    silentSave(e) {
        var t = this.documentInfo.getCurrentDocumentInfo();
        if (e) {
            this.appStorage.savePageContent(t.model).then(() => { }).
                catch(() => { });
        } else {
            var n = SaveWorkerAction();
            n.postMessage({
                id: t.id,
                model: t.model
            });
            n.onmessage = (e) => {/*e.data.status;*/n.terminate();
            };
        }
    }
}(AppStorage, DocumentProvider);
var SaveWorker = new class {
    constructor(e, t) {
        this.savingWorker = e;
        this.appStorage = t;
    }
    save(e, t) {
        console.log("SaveWorker.save", t.isAnonymous, t.byShared);
        if (t.isAnonymous)
            return this.handleAnonymousSave(e);
        else return this.handleServerSave(e, t);
    }
    clearServerSaveLastPromise() {
        this.serverSaveLastPromise = null;
    }
    handleServerSave(e, t) {
        if (PromiseRunner.isPendingPromise(this.serverSaveLastPromise)) {
            this.serverSaveLastPromise.cancel();
            this.serverSaveLastPromise = null;
        }
        var n = {
            id: e.id,
            model: e.model,
            byShared: t.byShared,
            sharedLink: t.sharedLink
        };
        this.savingWorker.postMessage(n);
        this.serverSaveLastPromise = new Promise((e, t) => {
            this.savingWorker.onmessage = (n) => {
                if ("error" == n.data.status) {
                    var r = n.data.errorData;
                    var a = r.isConnectionError;
                    var i = r.message;
                    var o = r.notLoggedIn;
                    t({
                        customErrorType: "server-save-error",
                        message: a ? "Connection error,could not save document" : i,
                        notLoggedIn: o
                    });
                } else {
                    e();
                }
                this.clearServerSaveLastPromise();
            };
            this.savingWorker.onerror = (e) => {
                ConsoleLog.error(e);
                t({
                    customErrorType: "server-save-error",
                    message: "Connection error,please reload the page"
                });
                this.clearServerSaveLastPromise();
            };
        });
        return this.serverSaveLastPromise;
    }
    handleAnonymousSave(e) {
        return this.appStorage.savePageContent(e.model).then(() => { }).
            catch(() => {
                throw {
                    customErrorType: "local-save-error",
                    message: "Save failed in private mode,please login or use without private mode"
                };
            });
    }
}(SaveWorkerAction(), AppStorage);
var DocumentFetcher = new class {
    constructor(e) {
        this.appStorage = e;
    }
    clearFetchPromise() {
        this.lastDocumentLoadFetch = null;
    }
    fetch(e, t) {
        if (PromiseRunner.isPendingPromise(this.lastDocumentLoadFetch)) {
            this.lastDocumentLoadFetch.cancel();
            this.lastDocumentLoadFetch = null;
        }
        var n = DocumentTreeHelper.findDocument(t, e);
        if (n && n.isAnonymous) {
            this.lastDocumentLoadFetch = this.getAnonymousDocument(e);
        } else {
            var r = !n || n.notOwner;
            this.lastDocumentLoadFetch = this.fetchServerDocument(e, r);
        }
        this.lastDocumentLoadFetch = this.lastDocumentLoadFetch.then((e) => {
            var t = ModelFontAnalyzer.analyze(e.data, e.data.pageSettings);
            console.log(t);
            return FontsLoader.loadFonts(t).then(() => {
                return e;
            }).
                catch((e) => {
                    return console.error(e),
                        Promise.reject({
                            isManaged: true,
                            status: 500,
                            message: "Problem on Loading Fonts,you may need to refresh the page"
                        });
                });
        });
        return this.lastDocumentLoadFetch;
    }
    fetchServerDocument(e, t) {
        var n = "";
        e = e + ".json";
        if (t) n = "/api/documents/by-shared/".concat(e, "?sharedLink=").concat(DocumentFt.getPassedSharedLink(), "&")
        else n = "/api/documents/".concat(e, "?");
        n = "".concat(n).concat(TokenStorage.getQueryString());
        return Api.Get(n).then((e) => {
            return e.text();
        }).then((e) => {
            var t = Gt.parseFullFetchedDocumentData(e);
            var n = !t.notOwner || t.writeable;
            return DocumentSessionStarter.handle(t.colInfo, n, t.data).then((e) => {
                this.clearFetchPromise();
                if (e && e.data) {
                    console.log("reasign data from data and crdt");
                    t.data = e.data
                }
                return t;
            });
        }).
            catch((e) => {
                var t = e.isConnectionError;
                var n = e.message;
                throw this.clearFetchPromise(),
                new Error(t ? "Connection error,could not load next document" : n);
            });
    }
    getAnonymousDocument(e) {
        return new Promise((t) => {
            setTimeout(() => {
                var n = {
                    id: e,
                    data: this.appStorage.loadPageContent(),
                    historyContents: null,
                    settings: {}
                };
                t(n);
                this.clearFetchPromise();
            },
                300);
        });
    }
}(AppStorage);
var DocumentSessionStarter = new class {
    handle(e, t, n) {
        if (!Global.isCollaboratingTesting()) {
            return Promise.resolve(null);
        }
        if (e) {
            var r = JSON.parse(e);
            console.log(r);
            return ya.startSession(r, t, n);
        }
        return Promise.resolve(null);
    }
};
var DocumentWi = new class {
    fetch(e) {
        var t = "/api/documents/active2.json?sharedLink=".concat(e, "&");
        t = "".concat(t).concat(TokenStorage.getQueryString());
        return Api.Get(t).then((e) => {
            return e.json();
        }).then((x) => {
            var e = x.JSON || x;
            if ("found-document" != e.status) {
                return {
                    status: e.status
                };
            }
            var t = Gt.handleDocumentResponse(e.documentResponse);
            var n = !t.notOwner || t.writeable;
            return DocumentSessionStarter.handle(e.documentResponse.colInfo, n, t.data).then((n) => {
                if (n && n.data) {/*console.log("reasign data from data and crdt");*/t.data = n.data;
                }
                return {
                    status: e.status,
                    documentResponse: t
                };
            }).then((e) => {
                var t = ModelFontAnalyzer.analyze(e.documentResponse.data, e.documentResponse.data.pageSettings);
                return FontsLoader.loadFonts(t).then(() => {
                    return e;
                }).
                    catch((e) => {
                        return console.error(e),
                            Promise.reject({
                                isManaged: true,
                                status: 500,
                                message: "Problem on Loading Fonts,you may need to refresh the page"
                            });
                    });
            });
        });
    }
}
var DocumentFt = new class {
    getPassedSharedLink() {
        var e = document.createElement("a");
        e.href = window.document.location.toString();
        var t = e.pathname;
        var n = (/\/editor\/(.*)/.exec(t) || [])[1] || "";
        return n;
    }
};/* ha starts */
function Jt(e) {
    throw new Error("Didn't expect to get here");
}
var $t = new class {
    constructor() {
        this.identifiersComparator = (e, t) => {
            if (!e && !t) {
                return 0;
            }
            if (!e) {
                return -1;
            }
            if (!t) {
                return 1;
            }
            var n = Math.min(e.length, t.length);
            var r = 0;
            for (; r < n; r = r + 2) {
                var a = [e[r], e[r + 1]];
                var i = [t[r], t[r + 1]];
                if (a[0] != i[0]) {
                    return a[0] - i[0];
                }
                if (a[1] != i[1]) {
                    return a[1] - i[1];
                }
            }
            return e.length - t.length;
        };
        this.positionComparator = (e, t) => {
            return this.identifiersComparator(e[1], t[1]);
        };
    }
    isMyGeneratedPosition(e, t) {
        return _.last(e[1]) == t;
    }
    lamportOf(e) {
        return e[0];
    }
    dangerousModifyLamport(e, t) {
        e[0] = t;
    }
    isCharBlockTextFromCharInfo(e) {
        return !!e[2];
    }
    swapableItemEquals(e, t, n) {
        return e.id === n && 0 === this.compareSiteOperation(this.getSiteOpInfoFromSwapableItem(e), t);
    }
    latestItemPosition(e) {
        return this.positionComparator(e.column, e.row) < 0 ? e.row : e.column;
    }
    compareFieldPosition(e, t) {
        return e[0] != t[0] ? e[0] - t[0] : e[2] - t[2];
    }
    compareSiteOperation(e, t) {
        return e.lamport != t.lamport ? e.lamport - t.lamport : e.site - t.site;
    }
    getSiteOpInfoFromSwapableItem(e) {
        if (e.siteInfo) {
            return e.siteInfo;
        }
        var t = _.last(e.position[1]);
        return {
            lamport: e.position[0],
            site: t
        };
    }
    fieldPositionToSiteInfo(e) {
        return {
            lamport: e[0],
            site: e[2]
        };
    }
    fieldPositionEquals(e, t) {
        return e[0] == t[0] && e[1] == t[1] && e[2] == t[2];
    }
    fieldPositionEqualsIgnoreLamport(e, t) {
        return e[1] == t[1] && e[2] == t[2];
    }
    fieldPositionCompareKey(e, t) {
        return e[1] == t;
    }
    fieldPosition(e, t, n) {
        return [t, e, n];
    }
    key(e) {
        return e[1];
    }
    fieldPositionSite(e) {
        return e[2];
    }
    iDigit(e, t) {
        return e[2 * t];
    }
    iIdentifiers(e) {
        return e[1];
    }
    itemPosition(e, t) {
        return [e, t];
    }
    itemPositionToSiteInfo(e) {
        return {
            lamport: e[0],
            site: _.last(e[1])
        };
    }
    itemPositionFromIndex(e, t) {
        return [t.lamport, [e, t.site]];
    }
    generatePositionsFromLength(e, t) {
        return _.times(e, (e) => {
            return this.itemPositionFromIndex(e, t);
        });
    }
    cellPositionEquals(e, t, n, r, a) {
        return this.itemPositionEquals(e, n, a) && this.itemPositionEquals(t, r, a);
    }
    cellPositionEquals2(e, t, n) {
        return this.cellPositionEquals(e.row, e.column, t.row, t.column, n);
    }
    itemPositionEqualsLamportMustDifferent(e, t) {
        return e[0] != t[0] && this.itemPositionEquals(e, t, "no-lamport");
    }
    itemPositionEquals(e, t, n) {
        if ("include-lamport" == n && e[0] != t[0]) {
            return false;
        }
        var r = e[1];
        var a = t[1];
        if (r.length != a.length) {
            return false;
        }
        var i = 0;
        for (; i < r.length; i++) {
            if (r[i] != a[i]) {
                return false;
            }
        }
        return true;
    }
    generate(e, t, n) {
        if (!e && !t) {
            return [0, n];
        }
        if (!e) {
            return [this.iDigit(t, 0) - 1, n];
        }
        if (!t) {
            return [this.iDigit(e, 0) + 1, n];
        }
        var r = [];
        var a = Math.floor(Math.max(e.length, t.length) / 2);
        var i = 0;
        for (; i < a; i++) {
            var o = i >= e.length / 2 - 1;
            var s = i >= t.length / 2 - 1;
            var l = i < e.length / 2;
            var c = i < t.length / 2;
            var d = [e[2 * i], e[2 * i + 1]];
            var h = [t[2 * i], t[2 * i + 1]];
            if (!l) {
                return r.push(h[0] - 1),
                    r.push(n),
                    r;
            }
            if (!c) {
                return r.push(d[0] + 1),
                    r.push(n),
                    r;
            }
            if (h[0] > d[0] + 1) {
                return r.push(d[0] + 1),
                    r.push(n),
                    r;
            }
            if (r.push(d[0]), r.push(d[1]), h[0] > d[0]) {
                return o ? (r.push(0), r.push(n), r) : (r.push(this.iDigit(e, i + 1) + 1), r.push(n), r);
            }
            if (d[1] != h[1]) {
                return o ? (r.push(0), r.push(n), r) : (r.push(this.iDigit(e, i + 1) + 1), r.push(n), r);
            }
            if (o && s) {
                throw new Error("should not be like this");
            }
        }
        return r;
    }
    inferSiteInfoFromItemPosition(e) {
        return {
            lamport: e[0],
            site: _.last(e[1])
        };
    }
    compareCausalByItemPosition(e, t) {
        var n = this.inferSiteInfoFromItemPosition(e);
        var r = this.inferSiteInfoFromItemPosition(t);
        return this.compareSiteOperation(n, r);
    }
    sort(e, t) {
        e.sort((e, n) => {
            return this.positionComparator(t(e), t(n));
        });
    }
    sortBySiteOperation(e, t) {
        e.sort((e, n) => {
            return this.compareSiteOperation(t(e), t(n));
        });
    }
    verifyOrder(e, t) {
        var n = 0;
        for (; n < e.length - 1; n++) {
            var r = t(e[n]);
            var a = t(e[n + 1]);
            if (this.positionComparator(r, a) >= 0) {
                throw new Error("I'm not ok here");
            }
        }
    }
    verifyValidPos(e) {
        var t = 0;
        for (; t < e.length; t++) {
            if (void 0 === e[t]) {
                throw new Error("position should not be undefined");
            }
        }
    }
};
var en = new class {
    warn(e) {
        console.warn(e);
    }
    log(e) {
        console.log(e);
    }
};
var tn = new class {
    mergeArray(e, t) {
        return e && t ? e.concat(t) : e || t;
    }
    toUpdateType(e, t) {
        if (e) {
            return _.assignIn({},
                e, {
                type: t
            });
        }
    }
};
var nn = new class {
    mergeMapUpdate(e, t) {
        return e && t ? {
            type: "map-update",
            ops: (e.ops || []).concat(t.ops || [])
        } : e || t;
    }
    mergeEntityListUpdate(e, t) {
        return e && t ? {
            type: "entity-list-update",
            ops: (e.ops || []).concat(t.ops || [])
        } : e || t;
    }
    merge(e, t) {
        return e && t ? {
            type: "blocks",
            styleUpdates: tn.mergeArray(e.styleUpdates, t.styleUpdates),
            textUpdate: this.mergeTextUpdate(e.textUpdate, t.textUpdate)
        } : e || t;
    }
    mergeTextUpdate(e, t) {
        return e && t ? {
            insertions: tn.mergeArray(e.insertions, t.insertions),
            deletions: tn.mergeArray(e.deletions, t.deletions),
            updations: tn.mergeArray(e.updations, t.updations)
        } : e || t;
    }
    addTextUpdate(e, t) {
        return t ? (e = e || {
            type: "blocks",
            textUpdate: void 0,
            styleUpdates: void 0
        },
            _.assignIn({},
                e, {
                textUpdate: _.assignIn({},
                    e.textUpdate, {
                    insertions: t.insertions,
                    deletions: t.deletions
                })
            })) : e;
    }
    addSingleBlockUpdate(e, t) {
        return !t || t.length <= 0 ? e : (e = e || {
            type: "blocks",
            textUpdate: void 0,
            styleUpdates: void 0
        },
            _.assignIn({},
                e, {
                textUpdate: _.assignIn({},
                    e.textUpdate, {
                    updations: t
                })
            }));
    }
    addBlockStyleUpdate(e, t) {
        return !t || t.length <= 0 ? e : (e = e || {
            type: "blocks",
            textUpdate: void 0,
            styleUpdates: void 0
        },
            _.assignIn({},
                e, {
                styleUpdates: t
            }));
    }
};
class rn {
    constructor(e, t) {
        this.common = e;
        this.fieldMs = t;
    }
    mergeMap(e, t, n, r) {
        if (e = e || {},
            t = t || this.common.initCrdtMap(e, n), !r || !r.ops || r.ops.length <= 0) {
            return {
                type: "map",
                crdt: t,
                data: e
            };
        }
        r = nn.mergeMapUpdate(t[2], r);
        var a = _.clone(t[1]);
        var i = _.clone(e || {});
        var o = [];
        return r.ops.forEach((e) => {
            switch (e.type) {
                case "field-put":
                    var t = $t.key(e.position);
                    this.handleAll(a, t, n, i, e, o);
                    break;
                case "cs-field-updation":
                    var r = $t.key(e.position);
                    this.handleAll(a, r, n, i, e, o);
                    break;
                case "mk-field-updation":
                    this.handleAll(a, e.key, n, i, e, o);
                    break;
                default:
                    Jt();
            }
        }),
        {
            type: "map",
            crdt: ["map", a, o.length > 0 ? {
                type: "map-update",
                ops: o
            } : void 0],
            data: i
        };
    }
    handleAll(e, t, n, r, a, i) {
        var o = e.findIndex((e) => {
            return $t.key(e.position) == t;
        });
        var s = e[o];
        var l = r[t];
        var c = this.fieldMs.onMergeField(l, s, n, a);
        if (c) {
            if (c.result) {
                if (o >= 0) {
                    e[o] = c.result.crdtField;
                } else {
                    e.push(c.result.crdtField);
                }
                r[t] = c.result.data;
            }
            if (c.opBuffer) {
                en.warn("operation add to buffer");
                i.push(c.opBuffer);
            }
        }
    }
}
class an extends Error {
    constructor(e) {
        super("UnexpectedTypeError:".concat(e));
    }
}
class on {
    constructor(e, t, n, r, a, i, o, s, l, c, d) {
        this.entityListMs = e;
        this.swapableEntityListMs = t;
        this.mapMs = n;
        this.tempElemensMapMs = r;
        this.toggleElementsMapMs = a;
        this.tabularMs = i;
        this.mergeableTabularMs = o;
        this.tableMs = s;
        this.rawDataMs = l;
        this.blocksMs = c;
        this.longDivisionElementsMs = d;
    }
    mergeData(e, t, n, r) {
        switch (r.type) {
            case "new-data":
                if (!t || "raw-data" == t[0]) {
                    return this.rawDataMs.mergeRawData(e, t, n, r);
                }
                break;
            case "entity-list-update":
                if (!t || "entity-list" == t[0]) {
                    return this.entityListMs.mergeEntityList(e, t, n, r);
                }
                break;
            case "swapable-entity-list-update":
                if (!t || "swapable-entity-list" == t[0]) {
                    return this.swapableEntityListMs.mergeSwapableEntityList(e, t, n, r);
                }
                break;
            case "map-update":
                if (!t || "map" == t[0]) {
                    return this.mapMs.mergeMap(e, t, n, r);
                }
                break;
            case "temp-elements-map-update":
                if (!t || "temp-elements-map" == t[0]) {
                    return this.tempElemensMapMs.mergeElementsMap(e, t, n, r);
                }
                break;
            case "toggle-elements-map-update":
                if (!t || "toggle-elements-map" == t[0]) {
                    return this.toggleElementsMapMs.mergeToggleElementsMap(e, t, n, r);
                }
                break;
            case "tabular-update":
                if (!t || "tabular" == t[0]) {
                    return this.tabularMs.mergeTabular(e, t, n, r);
                }
                break;
            case "mergeable-tabular-update":
                if (!t || "mergeable-tabular" == t[0]) {
                    return this.mergeableTabularMs.mergeCellMergeableTabular(e, t, n, r);
                }
                break;
            case "table-update":
                if (!t || "table" == t[0]) {
                    return this.tableMs.mergeTable(e, t, n, r);
                }
                break;
            case "blocks":
                if (!t || "blocks" == t[0]) {
                    return this.blocksMs.mergeBlocks(e, t, n, r);
                }
                break;
            case "long-division-elements":
                if (!t || "long-division-elements" == t[0]) {
                    return this.longDivisionElementsMs.merge(e, t, n, r);
                }
                break;
            default:
                Jt();
        }
        throw new an('expect operation is "'.concat(t[0], '",but data/crdt type is "').concat(t[0], '"'));
    }
}
var cn = new class {
    findCellData(e, t, n, r, a) {
        var i = 0;
        for (; i < t.length; i++) {
            var o = t[i];
            var s = 0;
            for (; s < n.length; s++) {
                if ($t.cellPositionEquals(r, a, o, n[s], "include-lamport")) {
                    return e[TabularHelper.getKeyFromRowCol(i, s)];
                }
            }
        }
        return null;
    }
};
var dn = new class {
    combineCellRowColumnIndexOperations(e) {
        if (!e) {
            return e;
        }
        var t = _.partition(e, (e) => {
            switch (e.type) {
                case "item-insertion":
                    return true;
                case "item-deletion":
                    return false;
                default:
                    Jt();
            }
        });
        var n = slicedToArray(t, 2);
        var r = n[0];
        var a = n[1];
        var i = this.removeDuplicationPositions(r, a);
        var o = slicedToArray(i, 2);
        return r = o[0],
            (a = o[1]).concat(r);
    }
    groupOpsByType(e) {
        return _.groupBy(e, (e) => {
            return e.type;
        });
    }
    combineSwapableEntityListOperations(e) {
        if (!e || e.length <= 0) {
            return {
                delOps: [],
                otherOps: []
            };
        }
        var t = this.groupOpsByType(e);
        var n = this.removeDuplicationSwapableOps(t["item-insertion"] || [], t["item-deletion"] || []);
        var r = slicedToArray(n, 2);
        var a = r[0];
        return {
            delOps: r[1],
            otherOps: a.concat(t["item-updation"] || []).concat(t["item-swap"] || [])
        };
    }
    swapableInsAndDelEqual(e, t) {
        return e.value.id === t.id && 0 == $t.compareSiteOperation($t.inferSiteInfoFromItemPosition(e.position), t.siteInfo);
    }
    swapableIdSiteInfoEqual(e, t) {
        return e.id === t.id && 0 == $t.compareSiteOperation(e.siteInfo, t.siteInfo);
    }
    removeDuplicationSwapableOps(e, t) {
        var n = [];
        return t.forEach((t) => {
            if (e.some((e) => {
                return this.swapableInsAndDelEqual(e, t);
            })) {
                n.push({
                    id: t.id,
                    siteInfo: t.siteInfo
                });
            }
        }),
            n.length <= 0 ? [e, t] : [e.filter((e) => {
                return !n.some((t) => {
                    return this.swapableInsAndDelEqual(e, t);
                });
            }), t.filter((e) => {
                return !n.some((t) => {
                    return this.swapableIdSiteInfoEqual(e, t);
                });
            })];
    }
    combineEntityListOperations(e) {
        if (!e || e.length <= 0) {
            return {
                delOps: [],
                otherOps: []
            };
        }
        var t = this.groupOpsByType(e);
        var n = this.removeDuplicationPositions(t["item-insertion"] || [], t["item-deletion"] || []);
        var r = slicedToArray(n, 2);
        var a = r[0];
        return {
            delOps: r[1],
            otherOps: a.concat(t["item-updation"] || [])
        };
    }
    combineCellsOperation(e) {
        if (!e) {
            return e;
        }
        var t = [];
        var n = [];
        var r = [];
        e.forEach((e) => {
            switch (e.type) {
                case "cell-insertion":
                    t.push(e);
                    break;
                case "cell-deletion":
                    n.push(e);
                    break;
                default:
                    r.push(e);
            }
        });
        var a = this.removeDuplicationPositionsCell(t, n);
        var i = slicedToArray(a, 2);
        return t = i[0],
            (n = i[1]).concat(t).concat(r);
    }
    removeDuplicationPositions(e, t) {
        var n = [];
        return t.forEach((t) => {
            if (e.some((e) => {
                return $t.itemPositionEquals(t.position, e.position, "include-lamport");
            })) {
                n.push(t.position);
            }
        }),
            n.length <= 0 ? [e, t] : [e.filter((e) => {
                return !n.some((t) => {
                    return $t.itemPositionEquals(e.position, t, "include-lamport");
                });
            }), t.filter((e) => {
                return !n.some((t) => {
                    return $t.itemPositionEquals(e.position, t, "include-lamport");
                });
            })];
    }
    removeDuplicationPositionsCell(e, t) {
        var n = [];
        return t.forEach((t) => {
            if (e.some((e) => {
                return $t.cellPositionEquals2(t, e, "include-lamport");
            })) {
                n.push(t);
            }
        }),
            [e.filter((e) => {
                return !n.some((t) => {
                    return $t.cellPositionEquals2(e, t, "include-lamport");
                });
            }), t.filter((e) => {
                return !n.some((t) => {
                    return $t.cellPositionEquals2(e, t, "include-lamport");
                });
            })];
    }
    checkAnnihilateTextUpdate(e) {
        if (!e) {
            return e;
        }
        if (!e.deletions || !e.insertions) {
            return e;
        }
        var t = e.deletions.filter((t) => {
            return e.insertions.some((e) => {
                return $t.itemPositionEquals(t, e.position, "include-lamport");
            });
        });
        return t.length <= 0 ? e : {
            deletions: e.deletions.filter((e) => {
                return !t.some((t) => {
                    return $t.itemPositionEquals(e, t, "include-lamport");
                });
            }),
            insertions: e.insertions.filter((e) => {
                return !t.some((t) => {
                    return $t.itemPositionEquals(e.position, t, "include-lamport");
                });
            })
        };
    }
};
class hn {
    constructor(e) {
        this.cellMs = e;
    }
    merge(e, t, n, r, a) {
        if (!a) {
            return {
                crdtCells: r,
                changedCellsData: [],
                opsBuffer: void 0
            };
        }
        a = dn.combineCellsOperation(a);
        r = _.clone(r);
        var i = [];
        var o = [];
        return a.forEach((a) => {
            switch (a.type) {
                case "cell-deletion":
                    var s = r.findIndex((e) => {
                        return $t.cellPositionEquals2(e, a, "include-lamport");
                    });
                    return s < 0 ? void i.push(a) : void r.splice(s, 1);
                case "cell-insertion":
                    var l = r.some((e) => {
                        return $t.itemPositionEqualsLamportMustDifferent(e.row, a.row);
                    });
                    var c = r.some((e) => {
                        return $t.itemPositionEqualsLamportMustDifferent(e.column, a.column);
                    });
                    return l || c ? void i.push(a) : (r.push({
                        row: a.row,
                        column: a.column,
                        value: void 0
                    }), void o.push({
                        row: a.row,
                        column: a.column,
                        data: a.value
                    }));
                case "cell-updation":
                    var d = r.findIndex((e) => {
                        return $t.cellPositionEquals2(e, a, "include-lamport");
                    });
                    if (d < 0) {
                        return void i.push(a);
                    }
                    var h = r[d];
                    var u = cn.findCellData(e, t, n, h.row, h.column);
                    if (!u) {
                        return void i.push(a);
                    }
                    var p = $t.itemPositionToSiteInfo($t.latestItemPosition(h));
                    var m = this.cellMs.onMergeCell(u, h, p, a);
                    return o.push({
                        row: a.row,
                        column: a.column,
                        data: m.data
                    }),
                        void (r[d] = {
                            value: m.crdt,
                            row: h.row,
                            column: h.column
                        });
            }
            Object(SwitchCaseError)(a);
        }),
        {
            crdtCells: r,
            changedCellsData: o,
            opsBuffer: ArrayHelper.undefinedIfEmptyArr(i)
        };
    }
}
var un = new class {
    merge(e, t) {
        if (!t) {
            return {
                crdt: e,
                ops: void 0
            };
        }
        t = dn.combineCellRowColumnIndexOperations(t);
        var n = [];
        return e = _.clone(e),
            t.forEach((t) => {
                switch (t.type) {
                    case "item-deletion":
                        var r = e.findIndex((e) => {
                            return $t.itemPositionEquals(e, t.position, "include-lamport");
                        });
                        return r < 0 ? void n.push(t) : void e.splice(r, 1);
                    case "item-insertion":
                        return e.findIndex((e) => {
                            return $t.itemPositionEquals(e, t.position, "no-lamport");
                        }) >= 0 ? void n.push(t) : void e.push(t.position);
                }
                Object(SwitchCaseError)(t);
            }),
            $t.sort(e, (e) => {
                return e;
            }),
        {
            crdt: e,
            ops: n.length > 0 ? n : void 0
        };
    }
};
var pn = new class {
    objectAsUndefinedIfAllPropertiesNull(e) {
        if (_.keys(e).some((t) => {
            return "type" != t && !!e[t];
        })) {
            return e;
        }
    }
    anyObjectAsUndefinedIfAllPropertiesNull(e) {
        if (_.keys(e).some((t) => {
            return !!e[t];
        })) {
            return e;
        }
    }
    arrayAsUndefinedIfEmpty(e) {
        if (e && !(e.length <= 0)) {
            return e;
        }
    }
};
class fn {
    constructor(e) {
        this.tabularCellsMerge = e;
    }
    merge(e, t, n) {
        var r = this;
        if (!n) {
            return {
                elements: e.elements,
                row: e.row,
                column: e.column,
                elementsCrdt: t,
                opsBuffer: void 0
            };
        }
        var a = e.elements;
        var i = this.tabularCellsMerge.merge(a, t.rows, t.columns, t.cells, n.cellOperations);
        var o = i.changedCellsData;
        var s = i.crdtCells;
        var l = i.opsBuffer;
        var c = un.merge(t.rows, n.rowOperations);
        var d = c.crdt;
        var h = c.ops;
        var u = un.merge(t.columns, n.columnOperations);
        var p = u.crdt;
        var m = u.ops;
        var f = {};
        var g = function (e) {
            var n = d[e];
            var i = function (i) {
                var l = p[i];
                var c = o.find((e) => {
                    return $t.cellPositionEquals(n, l, e.row, e.column, "include-lamport");
                });
                if (c) {
                    return f[TabularHelper.getKeyFromRowCol(e, i)] = c.data,
                        "continue";
                }
                var d = cn.findCellData(a, t.rows, t.columns, n, l);
                if (!d) {
                    var h = {
                        row: n,
                        column: l,
                        value: void 0
                    };
                    s.push(h);
                    var u = CreateEditorObject.createEmptyEditor(r.generateIdForMissingCellEditor(n, l));
                    return f[TabularHelper.getKeyFromRowCol(e, i)] = u,
                        "continue";
                }
                f[TabularHelper.getKeyFromRowCol(e, i)] = d;
            };
            var l = 0;
            for (; l < p.length; l++) {
                i(l);
            }
        };
        var y = 0;
        for (; y < d.length; y++) {
            g(y);
        }
        return {
            elements: f,
            row: d.length,
            column: p.length,
            elementsCrdt: {
                cells: s,
                rows: d,
                columns: p
            },
            opsBuffer: pn.anyObjectAsUndefinedIfAllPropertiesNull({
                rowOperations: h,
                columnOperations: m,
                cellOperations: l
            })
        };
    }
    generateIdForMissingCellEditor(e, t) {
        var n = "".concat(e[0], "_").concat(e[1].join("_"));
        var r = "".concat(t[0], "_").concat(t[1].join("_"));
        return "n".concat(n, "__").concat(r);
    }
}
class gn {
    constructor(e, t, n) {
        this.common = e;
        this.elementsMs = n;
        var r = new hn(t);
        this.tabularElementsMerge = new fn(r);
    }
    mergeTabular(e, t, n, r) {
        if (t = t || this.common.initCrdtTabular(e, n), !r) {
            return {
                type: "tabular",
                crdt: t,
                data: e
            };
        }
        var a = this.tabularElementsMerge.merge(e, t[1].elements, r.elements);
        var i = this.common.getTabularOthersMap(e);
        var o = this.elementsMs.mergeMap(i, t[1].others, n, r.others);
        var s = this.common.getNonCellEditorsMap(e.elements);
        var l = this.elementsMs.mergeMap(s, t[1].nonCellInElements, n, r.nonCellInElements);
        return {
            type: "tabular",
            crdt: ["tabular", {
                elements: a.elementsCrdt,
                others: o.crdt,
                nonCellInElements: l.crdt
            },
                t[2]],
            data: _.assignIn({},
                o.data, {
                elements: _.assignIn({},
                    a.elements, l.data),
                row: a.row,
                column: a.column
            })
        };
    }
}
class yn {
    constructor(e) {
        this.dataMs = e;
    }
    onMergeCell(e, t, n, r) {
        var a = this.dataMs.mergeMap(e, t.value, n, r.value);
        return {
            crdt: a.crdt,
            data: a.data
        };
    }
}
class An {
    constructor(e) {
        this.common = e;
    }
    mergeRawData(e, t, n, r) {
        return t = t || this.common.initRawDataCrdt(n),
            r ? $t.compareSiteOperation(t[1], r.siteInfo) > 0 ? {
                type: "raw-data",
                data: e,
                crdt: t
            } : {
                    type: "raw-data",
                    data: r.value,
                    crdt: ["raw-data", r.siteInfo]
                } : {
                    type: "raw-data",
                    data: e,
                    crdt: t
                };
    }
}
var En = new class {
    merge(e, t) {
        if (!t || t.length <= 0) {
            return e || [];
        }
        var n = [...e || []];
        return t.forEach((e) => {
            var t = n.findIndex((t) => {
                return $t.cellPositionEquals2(t, e, "include-lamport");
            });
            if (t >= 0) {
                n[t] = this.mergeCell(n[t], e);
            } else {
                n.push(e);
            }
        }),
            n;
    }
    mergeCell(e, t) {
        return $t.compareSiteOperation(e.siteInfo, t.siteInfo) > 0 ? e : t;
    }
};
var vn = new class {
    build(e, t, n, r) {
        var a = this.initCheckedCells(e, t.length, n.length);
        return (r || []).forEach((e) => {
            this.mergeCrdtCellToMatrix(e, a, t, n);
        }),
            a;
    }
    mergeCrdtCellToMatrix(e, t, n, r) {
        var a = this.findCellPosition(e.row, e.column, n, r);
        if (a) {
            var i = a.row;
            var o = a.column;
            var s = this.calculateCellSpan(e, n, r, i, o);
            var l = s.rowSpan;
            var c = s.columnSpan;
            t[i][o] = {
                row: i,
                column: o,
                rowSpan: l,
                colSpan: c,
                hidden: t[i][o].hidden
            };
        }
    }
    calculateCellSpan(e, t, n, r, a) {
        return {
            rowSpan: this.calculateSpan(e.expandRows, r, t),
            columnSpan: this.calculateSpan(e.expandColumns, a, n)
        };
    }
    calculateSpan(e, t, n) {
        if (!e || e.length <= 0) {
            return 1;
        }
        var r = 1;
        var a = function (a) {
            var i = n[a];
            if (e.some((e) => {
                return $t.itemPositionEquals(i, e, "include-lamport");
            })) {
                r = a - t + 1;
            }
        };
        var i = t + 1;
        for (; i < n.length; i++) {
            a(i);
        }
        return r;
    }
    findCellPosition(e, t, n, r) {
        var a = 0;
        for (; a < n.length; a++) {
            var i = n[a];
            var o = 0;
            for (; o < r.length; o++) {
                var s = r[o];
                if ($t.cellPositionEquals(e, t, i, s, "include-lamport")) {
                    return {
                        row: a,
                        column: o
                    };
                }
            }
        }
    }
    initCheckedCells(e, t, n) {
        var r = new Array(t);
        var a = 0;
        for (; a < r.length; a++) {
            r[a] = new Array(n);
            var i = r[a];
            var o = 0;
            for (; o < i.length; o++) {
                var s = e[TabularHelper.getKeyFromRowCol(a, o)];
                i[o] = {
                    row: a,
                    column: o,
                    rowSpan: s.rowSpan || 1,
                    colSpan: s.colSpan || 1,
                    hidden: false
                };
            }
        }
        return r;
    }
};
var Sn = new class {
    findMergeRootCellInfo(e) {
        var t = [];
        var n = 0;
        for (; n < e.length; n++) {
            var r = e[n];
            var a = 0;
            for (; a < r.length; a++) {
                var i = r[a];
                if (i) {
                    var o = i.rowSpan || 1;
                    var s = i.colSpan || 1;
                    if (o > 1 || s > 1) {
                        t.push({
                            row: n,
                            column: a,
                            rowSpan: o,
                            colSpan: s,
                            hidden: false
                        });
                    }
                }
            }
        }
        return t;
    }
    isRootCellConflict(e, t) {
        return this.isIntersect(e.row, e.row + e.rowSpan - 1, t.row, t.row + t.rowSpan - 1) && this.isIntersect(e.column, e.column + e.colSpan - 1, t.column, t.column + t.colSpan - 1);
    }
    isIntersect(e, t, n, r) {
        return !(t < n || r < e);
    }
};
var Cn = new class {
    resolve(e) {
        var t = Sn.findMergeRootCellInfo(e);
        var n = this.findRootCellConflict(t);
        for (; null != n;) {
            this.mergeConflictMergedCells(e, n);
            t = Sn.findMergeRootCellInfo(e);
            n = this.findRootCellConflict(t);
        }
    }
    findRootCellConflict(e) {
        var t = 0;
        for (; t < e.length; t++) {
            var n = t + 1;
            for (; n < e.length; n++) {
                var r = e[t];
                var a = e[n];
                if (Sn.isRootCellConflict(r, a)) {
                    return [r, a];
                }
            }
        }
        return null;
    }
    mergeConflictMergedCells(e, t) {
        var n = slicedToArray(t, 2);
        var r = n[0];
        var a = n[1];
        var i = Math.min(r.row, a.row);
        var o = Math.min(r.column, a.column);
        var s = {
            row: i,
            column: o,
            rowSpan: Math.max(r.row + r.rowSpan - i, a.row + a.rowSpan - i),
            colSpan: Math.max(r.column + r.colSpan - o, a.column + a.colSpan - o),
            hidden: false
        };
        e[r.row][r.column] = _.assignIn({},
            e[r.row][r.column], {
            colSpan: 1,
            rowSpan: 1,
            hidden: true
        });
        e[a.row][a.column] = _.assignIn({},
            e[a.row][a.column], {
            colSpan: 1,
            rowSpan: 1,
            hidden: true
        });
        var l = e[s.row][s.column];
        e[s.row][s.column] = _.assignIn({},
            l, {
            colSpan: Math.max(s.colSpan, l.colSpan || 1),
            rowSpan: Math.max(s.rowSpan, l.rowSpan || 1),
            hidden: false
        });
    }
};
var xn = new class {
    fill(e) {
        Sn.findMergeRootCellInfo(e).forEach((t) => {
            return this.setHidden(e, t);
        });
    }
    setHidden(e, t) {
        var n = t.row;
        for (; n < t.row + t.rowSpan; n++) {
            var r = e[n];
            var a = t.column;
            for (; a < t.column + t.colSpan; a++) {
                if (n != t.row || a != t.column) {
                    var i = r[a];
                    if (i.colSpan > 1 || i.rowSpan > 1) {
                        throw new Error("wrong algorithm or input");
                    }
                    i.hidden = true;
                }
            }
        }
    }
};
var In = new class {
    apply(e, t) {
        var n = false;
        var r = {};
        var a = 0;
        for (; a < e.length; a++) {
            var i = e[a];
            var o = 0;
            for (; o < i.length; o++) {
                var s = t[TabularHelper.getKeyFromRowCol(a, o)];
                var l = this.getChangedCellData(s, i[o]);
                if (s != l) {
                    r[TabularHelper.getKeyFromRowCol(a, o)] = l;
                    n = true;
                }
            }
        }
        return n ? _.assignIn({},
            t, r) : t;
    }
    getChangedCellData(e, t) {
        var n = e.colSpan || 1;
        var r = e.rowSpan || 1;
        var a = !!e.hidden;
        var i = t.colSpan || 1;
        var o = t.rowSpan || 1;
        var s = !!t.hidden;
        return n != i || r != o || a != s ? _.assignIn({},
            e, {
            colSpan: 1 === i ? void 0 : i,
            rowSpan: 1 === o ? void 0 : o,
            hidden: 1 === s || void 0
        }) : e;
    }
};
class Tn {
    constructor(e, t) {
        this.common = e;
        this.baseTabularMs = t;
    }
    mergeCellMergeableTabular(e, t, n, r) {
        if (t = t || this.common.initCrdtMergeableTabular(e, n), !r) {
            return {
                type: "mergeable-tabular",
                crdt: t,
                data: e
            };
        }
        var a = this.handleBase(e, t, n, r);
        return this.handleMergeableLayer(a, t[1].mergedLayer, r);
    }
    handleBase(e, t, n, r) {
        var a = ["tabular", {
            elements: t[1].elements,
            others: t[1].others,
            nonCellInElements: t[1].nonCellInElements
        },
            t[2]];
        var i = _.assignIn({},
            r, {
            type: "tabular-update"
        });
        return this.baseTabularMs.mergeTabular(e, a, n, i);
    }
    handleMergeableLayer(e, t, n) {
        var r = e.data;
        var a = t;
        if (this.shouldApplyMergeLayer(n)) {
            var i = this.applyMergeLayer(e.data.elements, e.crdt[1].elements, t, n.mergeableLayer);
            r = _.assignIn({},
                r, {
                elements: i[1]
            });
            a = i[0];
        }
        return {
            type: "mergeable-tabular",
            data: r,
            crdt: ["mergeable-tabular", _.assignIn({},
                e.crdt[1], {
                mergedLayer: a
            }), e.crdt[2]]
        };
    }
    applyMergeLayer(e, t, n, r) {
        var a = En.merge(n, r);
        var i = vn.build(e, t.rows, t.columns, a);
        return Cn.resolve(i),
            xn.fill(i),
            [a, In.apply(i, e)];
    }
    shouldApplyMergeLayer(e) {
        return !!e && (!!e.mergeableLayer || !!e.elements && (!!e.elements.rowOperations || !!e.elements.columnOperations));
    }
}
var bn = new class {
    makeCrdtPairs(e, t) {
        if (e.length != t.length) {
            throw new Error("error on making crdt pair,length is different");
        }
        var n = new Array(e.length);
        var r = 0;
        for (; r < e.length; r++) {
            n[r] = {
                item: e[r],
                crdtItem: t[r]
            };
        }
        return n;
    }
};
class Ln {
    constructor(e) {
        this.compare = e;
    }
    find(e, t) {
        var n = 0;
        var r = e.length - 1;
        for (; n <= r;) {
            var a = Math.floor((n + r) / 2);
            switch (this.compare(e[a], t)) {
                case 1:
                    n = a + 1;
                    break;
                case 0:
                    r = a - 1;
                    break;
                default:
                    return a;
            }
        }
        return -1;
    }
}
var Rn = new class {
    constructor() { }
    numberToComparisonResult(e) {
        return e < 0 ? 1 : e > 0 ? 0 : 2;
    }
    findIndexBy(e, t, n, r) {
        var a = (new Ln(this.binarySearchComparisonBy.bind(this, n))).find(e, t);
        if ("include-lamport" != r) {
            return a;
        }
        if (a >= 0) {
            var i = e[a];
            if ($t.lamportOf(n(i)) != $t.lamportOf(t)) {
                return -1;
            }
        }
        return a;
    }
    binarySearchComparisonBy(e, t, n) {
        var r = e(t);
        var a = $t.positionComparator(r, n);
        return this.numberToComparisonResult(a);
    }
    existPositionWithDifferentLamport(e, t) {
        return this.findIndexBy(e, t, (e) => {
            return e;
        },
            null) >= 0;
    }
};
class Mn {
    constructor(e, t) {
        this.common = e;
        this.itemMs = t;
    }
    mergeEntityList(e, t, n, r) {
        if (e = e || [], t = t || this.common.initCrdtEntityList(e, n), !(r = nn.mergeEntityListUpdate(t[2], r)) || !r.ops) {
            return {
                type: "entity-list",
                crdt: t,
                data: e
            };
        }
        var a = dn.combineEntityListOperations(r.ops);
        var i = a.delOps;
        var o = a.otherOps;
        var s = _.clone(e);
        var l = bn.makeCrdtPairs(s, t[1]);
        var c = [];
        return i.forEach((e) => {
            var t = Rn.findIndexBy(l, e.position, (e) => {
                return e.crdtItem.position;
            },
                "include-lamport");
            if (t < 0) {
                return en.warn("entity list:item-deletion add buffer"),
                    void c.push(e);
            }
            l.splice(t, 1);
        }),
            o.forEach((n) => {
                switch (n.type) {
                    case "item-insertion":
                        if (Rn.findIndexBy(t[1], n.position, (e) => {
                            return e.position;
                        },
                            null) >= 0) {
                            return void c.push(n);
                        }
                        var r = e.findIndex((e) => {
                            return e.id === n.value.id;
                        });
                        if (r >= 0) {
                            var a = t[1][r];
                            if ($t.compareCausalByItemPosition(a.position, n.position) > 0) {
                                return;
                            }
                            l.splice(r, 1);
                        }
                        var i = {
                            crdtItem: {
                                position: n.position,
                                value: void 0
                            },
                            item: n.value
                        };
                        return void l.push(i);
                    case "item-updation":
                        var o = l.findIndex((e) => {
                            return $t.itemPositionEquals(e.crdtItem.position, n.position, "include-lamport");
                        });
                        if (o < 0) {
                            return en.warn("entity-list:item-updation add to buffer"),
                                void c.push(n);
                        }
                        var s = l[o];
                        var d = $t.itemPositionToSiteInfo(s.crdtItem.position);
                        var h = this.itemMs.onMergeItem(s.item, s.crdtItem, d, n);
                        return l[o].item = h.data,
                            void (l[o].crdtItem = h.crdtItem);
                }
            }),
            $t.sort(l, (e) => {
                return e.crdtItem.position;
            }),
        {
            type: "entity-list",
            crdt: ["entity-list", l.map((e) => {
                return e.crdtItem;
            }), this.buildBuffer(c)],
            data: l.map((e) => {
                return e.item;
            })
        };
    }
    buildBuffer(e) {
        if (e && e.length > 0) {
            return {
                type: "entity-list-update",
                ops: e
            };
        }
    }
}
class wn {
    constructor(e, t) {
        this.common = e;
        this.mapMs = t;
    }
    mergeElementsMap(e, t, n, r) {
        if (t = t || this.common.initTempElementsMapCrdt(e, n), !r) {
            return {
                type: "temp-elements-map",
                crdt: t,
                data: e
            };
        }
        var a = _.assignIn({},
            e.___tempElements, e.elements);
        var i = this.mapMs.mergeMap(a, t[1].elements, n, r.elementsMap);
        var o = this.getEntityWithoutElementsAndTemp(e);
        var s = this.mapMs.mergeMap(o, t[1].others, n, r.others);
        var l = this.mergeLayout(t[1].layout, r.layout);
        var c = this.applyEntityWithLayout(l, i.data);
        var d = slicedToArray(c, 2);
        var h = d[0];
        var u = d[1];
        return {
            type: "temp-elements-map",
            crdt: ["temp-elements-map", {
                elements: i.crdt,
                others: s.crdt,
                layout: l
            }],
            data: _.assignIn({},
                e, s.data, {
                elements: h,
                ___tempElements: u
            })
        };
    }
    applyEntityWithLayout(e, t) {
        var n = {};
        var r = {};
        return _.keys(t).forEach((a) => {
            if (e[1].includes(a)) {
                n[a] = t[a];
            } else {
                r[a] = t[a];
            }
        }),
            [n, r];
    }
    mergeLayout(e, t) {
        return e && t ? $t.compareSiteOperation(e[0], t[0]) > 0 ? e : t : e || t;
    }
    getEntityWithoutElementsAndTemp(e) {
        return _.omit(e, ["elements", "___tempElements"]);
    }
}
class On {
    constructor(e, t) {
        this.common = e;
        this.mapMs = t;
    }
    mergeToggleElementsMap(e, t, n, r) {
        if (t = t || this.common.initToggleElementsMapCrdt(), !r) {
            return {
                type: "toggle-elements-map",
                crdt: t,
                data: e
            };
        }
        var a = this.common.combineToggleElements(e);
        var i = this.common.buildRestObjectForToggleElements(e);
        var o = this.mapMs.mergeMap(a, t[1].elements, n, r.elementsMap);
        var s = this.mapMs.mergeMap(i, t[1].others, n, r.others);
        return {
            type: "toggle-elements-map",
            crdt: ["toggle-elements-map", {
                elements: o.crdt,
                others: s.crdt
            }],
            data: this.buildEndResultElements(s.data, o.data)
        };
    }
    buildEndResultElements(e, t) {
        return e.collapsed ? _.assignIn({},
            e, {
            elements: {
                value: t.secondary
            },
            hiddenData: t.primary
        }) : _.assignIn({},
            e, {
            elements: {
                value: t.primary
            },
            hiddenData: t.secondary
        });
    }
}
class Dn {
    constructor(e, t) {
        this.common = e;
        this.itemMs = t;
    }
    mergeSwapableEntityList(e, t, n, r) {
        if (e = e || [], t = t || this.common.initCrdtSwapableEntityList(e, n), !r || !r.ops) {
            return {
                type: "swapable-entity-list",
                crdt: t,
                data: e
            };
        }
        if (t[2]) {
            r = {
                type: "swapable-entity-list-update",
                ops: tn.mergeArray(r.ops, t[2].ops)
            };
        }
        var a = dn.combineSwapableEntityListOperations(r.ops);
        var i = a.delOps;
        var o = a.otherOps;
        var s = _.clone(e);
        var l = bn.makeCrdtPairs(s, t[1]);
        var c = [];
        return i.forEach((e) => {
            var t = l.findIndex((t) => {
                return $t.swapableItemEquals(t.crdtItem, e.siteInfo, e.id);
            });
            if (t < 0) {
                return c.push(e),
                    void en.warn("swapable-entity-list-ms:item-deletion buffer");
            }
            l.splice(t, 1);
        }),
            o.forEach((n) => {
                switch (n.type) {
                    case "item-insertion":
                        if (Rn.findIndexBy(t[1], n.position, (e) => {
                            return e.position;
                        },
                            null) >= 0) {
                            return en.warn("swapable-entity-list-ms:item-insertion buffer"),
                                void c.push(n);
                        }
                        var r = e.findIndex((e) => {
                            return e.id === n.value.id;
                        });
                        if (r >= 0) {
                            var a = t[1][r];
                            if ($t.compareCausalByItemPosition(a.position, n.position) > 0) {
                                return;
                            }
                            l.splice(r, 1);
                        }
                        var i = {
                            crdtItem: {
                                position: n.position,
                                id: n.value.id,
                                value: void 0
                            },
                            item: n.value
                        };
                        return void l.push(i);
                    case "item-updation":
                        var o = l.findIndex((e) => {
                            return $t.swapableItemEquals(e.crdtItem, n.siteInfo, n.id);
                        });
                        if (o < 0) {
                            return en.warn("swapable-entity-list-ms:item-updation buffer"),
                                void c.push(n);
                        }
                        var s = l[o];
                        var d = $t.itemPositionToSiteInfo(s.crdtItem.position);
                        var h = this.itemMs.onMergeItem(s.item, s.crdtItem, d, {
                            type: "item-updation",
                            position: s.crdtItem.position,
                            value: n.value
                        });
                        l[o].item = h.data;
                        var u = l[o].crdtItem;
                        return void (l[o].crdtItem = {
                            id: u.id,
                            siteInfo: u.siteInfo,
                            position: h.crdtItem.position,
                            value: h.crdtItem.value
                        });
                    case "item-swap":
                        var p = l.findIndex((e) => {
                            return $t.swapableItemEquals(e.crdtItem, n.siteInfo, n.id);
                        });
                        if (p < 0) {
                            return en.warn("swapable-entity-list-ms:item-swap buffer"),
                                void c.push(n);
                        }
                        var m = l[p];
                        if ($t.compareCausalByItemPosition(m.crdtItem.position, n.newPosition) > 0) {
                            return;
                        }
                        l.splice(p, 1);
                        var f = {
                            crdtItem: {
                                position: n.newPosition,
                                id: n.id,
                                value: m.crdtItem.value,
                                siteInfo: n.siteInfo
                            },
                            item: m.item
                        };
                        return void l.push(f);
                }
            }),
            $t.sort(l, (e) => {
                return e.crdtItem.position;
            }),
        {
            type: "swapable-entity-list",
            crdt: ["swapable-entity-list", l.map((e) => {
                return e.crdtItem;
            }), pn.objectAsUndefinedIfAllPropertiesNull({
                type: "swapable-entity-list-update",
                ops: pn.arrayAsUndefinedIfEmpty(c)
            })],
            data: l.map((e) => {
                return e.item;
            })
        };
    }
}
class Nn {
    constructor(e, t, n) {
        this.common = e;
        this.dataDs = t;
        this.defaultObj = n;
        this.handleNewField = (e, t, n, r, a) => {
            return this.handleAll(t, e, a, n, r);
        };
        this.handleUpdateField = (e, t, n, r, a) => {
            var i = $t.key(e.position);
            return this.handleAll(t, i, a, n, r);
        };
        this.handleDeleteField = (e, t, n, r, a) => {
            var i = $t.key(e.position);
            return this.handleAll(t, i, a, n, r);
        };
    }
    handleAll(e, t, n, r, a) {
        var i = e[t] || this.defaultObj;
        var o = n[t] || this.defaultObj;
        var s = r[1].find((e) => {
            return $t.key(e.position) == t;
        });
        var l = s ? s.value : void 0;
        var c = this.dataDs.detect(i, l, a, o);
        return {
            crdtField: {
                position: this.common.newFieldPosition(t),
                value: c.crdt
            },
            operations: c.data ? [{
                type: "mk-field-updation",
                key: t,
                defaultValue: this.defaultObj,
                value: c.data
            }] : void 0
        };
    }
}
class kn extends Error {
    constructor(e, t) {
        super("Crdt[".concat(e, "]:").concat(t));
    }
}
class Bn {
    constructor(e, t) {
        var n = this;
        this.common = e;
        this.fieldDs = t;
        this.type = "map";
        this.detect = (e, t, r, a) => {
            e = e || {};
            a = a || {};
            t = t || this.common.initCrdtMap(e, r, this.excludeFields);
            var i = _.clone(t[1]);
            var o = [];
            var s = function (s) {
                if (n.shouldIgnoreKey(a, s)) {
                    return "continue";
                }
                if (void 0 === a[s] && void 0 === e[s]) {
                    return "continue";
                }
                if (void 0 === e[s]) {
                    var l = n.fieldDs.handleNewField(s, e, t, r, a);
                    return o = o.concat(l.operations || []),
                        n.updateOrInsertCrdtField(i, l.crdtField),
                        "continue";
                }
                if (a[s] !== e[s]) {
                    var c = i.findIndex((e) => {
                        return $t.fieldPositionCompareKey(e.position, s);
                    });
                    if (c < 0) {
                        throw new kn("field-merging", "missing field '".concat(s, "'"));
                    }
                    var d = i[c];
                    var h = n.fieldDs.handleUpdateField(d, e, t, r, a);
                    o = o.concat(h.operations || []);
                    if (h.crdtField) {
                        i[c] = h.crdtField;
                    }
                }
            };
            var l;
            for (l in a) {
                s(l);
            }
            var c = function (s) {
                if (n.shouldIgnoreKey(e, s)) {
                    return "continue";
                }
                if (void 0 === e[s]) {
                    return "continue";
                }
                if (void 0 === a[s]) {
                    var l = i.findIndex((e) => {
                        return $t.fieldPositionCompareKey(e.position, s);
                    });
                    if (l < 0) {
                        throw new kn("field-merging", "missing field '".concat(s, "'"));
                    }
                    var c = i[l];
                    var d = n.fieldDs.handleDeleteField(c, e, t, r, a);
                    o = o.concat(d.operations || []);
                    if (d.crdtField) {
                        i[l] = d.crdtField;
                    }
                }
            };
            for (l in e) {
                c(l);
            }
            return {
                type: "map",
                crdt: ["map", i, t[2]],
                data: pn.objectAsUndefinedIfAllPropertiesNull({
                    type: "map-update",
                    ops: o.length > 0 ? o : void 0
                })
            };
        };
    }
    setFieldDs(e) {
        this.fieldDs = e;
    }
    updateOrInsertCrdtField(e, t) {
        if (t) {
            var n = e.findIndex((e) => {
                return $t.fieldPositionCompareKey(e.position, $t.key(t.position));
            });
            if (n < 0) {
                e.push(t);
            } else {
                e[n] = t;
            }
        }
    }
    shouldIgnoreKey(e, t) {
        return !e.hasOwnProperty(t) || (!!t.startsWith("___") || !(!this.excludeFields || !this.excludeFields.includes(t)));
    }
}
class Pn {
    constructor(e, t, n) {
        this.filterFields = e;
        this.matchedDs = t;
        this.otherwise = n;
    }
    getMatchedItem(e) {
        return this.filterFields.includes(e) ? this.matchedDs : this.otherwise;
    }
    handleNewField(e, t, n, r, a) {
        return this.getMatchedItem(e).handleNewField(e, t, n, r, a);
    }
    handleUpdateField(e, t, n, r, a) {
        return this.getMatchedItem($t.key(e.position)).handleUpdateField(e, t, n, r, a);
    }
    handleDeleteField(e, t, n, r, a) {
        return this.getMatchedItem($t.key(e.position)).handleDeleteField(e, t, n, r, a);
    }
}
class Fn {
    constructor(e, t) {
        this.switchs = e;
        this.otherwise = t;
    }
    getMatchedItem(e) {
        var t = this.switchs.find((t) => {
            return t.key === e;
        });
        return t ? t.item : this.otherwise;
    }
    handleNewField(e, t, n, r, a) {
        return this.getMatchedItem(e).handleNewField(e, t, n, r, a);
    }
    handleUpdateField(e, t, n, r, a) {
        return this.getMatchedItem($t.key(e.position)).handleUpdateField(e, t, n, r, a);
    }
    handleDeleteField(e, t, n, r, a) {
        return this.getMatchedItem($t.key(e.position)).handleDeleteField(e, t, n, r, a);
    }
}
class Hn {
    constructor(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        this.a = e;
        this.b = t;
        if (null != n.indexEqual) {
            this.indexEqual = n.indexEqual;
        }
        if (null != n.equal) {
            this.equal = n.equal;
        }
    }
    scanCommon(e, t) {
        return this.scan(0, this.a.length, 0, this.b.length, e, t);
    }
    scanDiff(e, t) {
        if (!e) {
            return this.scanCommon(void 0, t);
        }
        var n = 0;
        var r = 0;
        var a = this.scanCommon((t, a, i, o) => {
            return (n < t || r < i) && e(n, t, r, i),
                n = a,
                r = o;
        },
            t);
        if (null != a) {
            var i = this.a.length;
            var o = this.b.length;
            if (n < i || r < o) {
                e(n, i, r, o);
            }
        }
        return a;
    }
    getLcs(e) {
        var t;
        var n;
        return "string" == typeof this.a ? (t = "", n = (e, n) => {
            var r = this.a.slice(e, n);
            t = t + r;
        }) : (t = [], n = (e, n) => {
            var r = this.a.slice(e, n);
            t = [...t, ...r];
        }),
            null != this.scanCommon(n, e) ? t : null;
    }
    equal(e, t) {
        return e === t;
    }
    indexEqual(e, t) {
        return this.equal(this.a[e], this.b[t]);
    }
    findMiddleSnake(e, t, n, r, a) {
        var i = r - n - (t - e);
        var o = i % 2 != 0;
        var s = 2 * a + 1;
        var l = new Array(s);
        var c = new Array(s);
        l[a + 1] = 0;
        c[a - 1] = 0;
        var d = 0;
        for (; d <= a;) {
            var h = -d;
            for (; h <= d;) {
                var u = h === -d || h !== d && l[a + h - 1] < l[a + h + 1];
                var p = u ? h + 1 : h - 1;
                var m = l[a + p];
                var f = e + m;
                var g = n + m - p;
                if (u) {
                    ++g;
                } else {
                    ++f;
                }
                var y = f;
                var A = g;
                for (; y < t && A < r && this.indexEqual(y, A);) {
                    ++y;
                    ++A;
                }
                if (l[a + h] = y - e, o) {
                    var E = h + i;
                    if (-d < E && E < d) {
                        if (y + c[a + E] >= t) {
                            return {
                                d: 2 * d - 1,
                                aS: f,
                                aE: y,
                                bS: g,
                                bE: A
                            };
                        }
                    }
                }
                h = h + 2;
            }
            h = -d;
            for (; h <= d;) {
                var v = h === d || h !== -d && c[a + h - 1] > c[a + h + 1];
                var S = v ? h - 1 : h + 1;
                var C = c[a + S];
                var x = t - C;
                var I = r - C - S;
                if (v) {
                    --I;
                } else {
                    --x;
                }
                var T = x;
                var b = I;
                for (; T > e && b > n && this.indexEqual(T - 1, b - 1);) {
                    --T;
                    --b;
                }
                if (c[a + h] = t - T, !o) {
                    var L = h - i;
                    if (-d <= L && L <= d) {
                        if (T - l[a + L] <= e) {
                            return {
                                d: 2 * d,
                                aS: T,
                                aE: x,
                                bS: b,
                                bE: I
                            };
                        }
                    }
                }
                h = h + 2;
            } ++d;
        }
    }
    scan(e, t, n, r, a, i) {
        var o = t - e;
        var s = r - n;
        if (0 === o || 0 === s) {
            return 0;
        }
        if (null == i) {
            i = o + s;
        }
        var l = Math.ceil(i / 2);
        var c = this.findMiddleSnake(e, t, n, r, l);
        if (null == c) {
            return null;
        }
        if (0 === c.d) {
            if (a && c.aE > c.aS) {
                a(c.aS, c.aE, c.bS, c.bE);
            }
        } else {
            if (1 === c.d) {
                var d;
                if (a) {
                    if ((d = o < s ? c.aS - e : c.bS - n) > 0) {
                        a(e, e + d, n, n + d);
                    }
                    if (c.aE > c.aS) {
                        a(c.aS, c.aE, c.bS, c.bE);
                    }
                }
            } else {
                this.scan(e, c.aS, n, c.bS, a);
                if (a && c.aE > c.aS) {
                    a(c.aS, c.aE, c.bS, c.bE);
                }
                this.scan(c.aE, t, c.bE, r, a);
            }
        }
        return c.d;
    }
}
var _n = function (e, t, n) {
    return new Hn(e, t, n);
};
class Un {
    constructor(e, t) {
        this.common = e;
        this.handler = t;
        this.entityEqual = (e, t) => {
            return this.handler.isSameRef(e, t);
        };
        if (!t.isSameRef) {
            t.isSameRef = function (e, t) {
                return e === t;
            };
        }
    }
    getIndentifierAt(e, t) {
        return t < 0 || t >= e.length ? null : this.handler.getPosition(e[t])[1];
    }
    diffSwapable(e, t, n, r) {
        var a = _n(e, n, {
            equal: this.entityEqual
        });
        var i = _.clone(t);
        var o = 0;
        return a.scanDiff((a, s, l, c) => {
            o = this.unswapableDiff({
                aS: a,
                aE: s,
                bS: l,
                bE: c,
                aEntities: e,
                clonedAIndexDelta: o,
                bEntities: n,
                clonedCrdtAEntities: i,
                customData: r,
                crdtAEntities: t
            });
        }),
            i;
    }
    diffNonSwap(e, t, n, r) {
        var a = _.clone(t);
        return this.unswapableDiff({
            aS: 0,
            bS: 0,
            aE: e.length,
            bE: n.length,
            aEntities: e,
            bEntities: n,
            clonedCrdtAEntities: a,
            customData: r,
            clonedAIndexDelta: 0,
            crdtAEntities: t
        }),
            a;
    }
    unswapableDiff(e) {
        var t = e.aS;
        var n = e.aE;
        var r = e.bS;
        var a = e.bE;
        var i = e.aEntities;
        var o = e.bEntities;
        var s = e.clonedCrdtAEntities;
        var l = e.customData;
        var c = e.clonedAIndexDelta;
        var d = e.crdtAEntities;
        var h = t;
        var u = r;
        for (; u < a;) {
            var p = h < n ? i[h] : null;
            var m = o[u];
            if (p) {
                if (this.handler.isSameRef(p, m)) {
                    h++;
                    u++;
                } else {
                    var f = d[h];
                    var g = this.handler.getPosition(f);
                    if (this.handler.isMatchedEntity(p, m)) {
                        var y = $t.itemPositionToSiteInfo(g);
                        var A = this.handler.onUpdate(f, y, p, m, l, h + c);
                        s[h + c] = A;
                        h++;
                        u++;
                    } else {
                        var E = this.findMatchedEntityInRange(i, h, n, m);
                        if (E < 0) {
                            var v = this.getIndentifierAt(s, h + c - 1);
                            var S = this.getIndentifierAt(s, h + c);
                            var C = this.common.generateIdentifiers(v, S);
                            var x = this.common.newItemPosition(C);
                            var I = this.handler.onNew(x, m, l, h + c);
                            s.splice(h + c, 0, I);
                            u++;
                            c++;
                        } else {
                            var T = h;
                            for (; T < E; T++) {
                                this.handler.onDelete(d[T], i[T], l, c + h);
                            }
                            s.splice(h + c, E - h);
                            c = c - (E - h);
                            h = E;
                        }
                    }
                }
            } else {
                var b = this.getIndentifierAt(s, h + c - 1);
                var L = this.getIndentifierAt(s, h + c);
                var R = this.common.generateIdentifiers(b, L);
                var M = this.common.newItemPosition(R);
                var w = this.handler.onNew(M, m, l, h + c);
                s.splice(h + c, 0, w);
                u++;
                c++;
            }
        }
        var O = h;
        for (; O < n; O++) {
            this.handler.onDelete(s[c + O], i[O], l, c + h);
        }
        return h < n && (s.splice(h + c, n - h), c = c - (n - h)),
            c;
    }
    findMatchedEntityInRange(e, t, n, r) {
        var a = t;
        for (; a < n; a++) {
            if (this.handler.isMatchedEntity(e[a], r)) {
                return a;
            }
        }
        return -1;
    }
    findMatchedEntity(e, t, n) {
        var r = t;
        var a = e.length;
        for (; r < a; r++) {
            if (this.handler.isMatchedEntity(e[r], n)) {
                return r;
            }
        }
        return -1;
    }
}
var Gn = new class {
    toRows(e) {
        return _.times(e.row, (t) => {
            return this.getEditorsAtRow(e.elements, t, e.column);
        });
    }
    toColumns(e) {
        return _.times(e.column, (t) => {
            return this.getEditorsAtColumn(e.elements, t, e.row);
        });
    }
    getCellEditorsFromElements(e) {
        return _.toPairs(e).filter((e) => {
            return TabularHelper.isKeyInTabularFormat(e[0]);
        }).map((e) => {
            return e[1];
        });
    }
    getEditorsAtRow(e, t, n) {
        var r = new Array(n);
        var a = 0;
        for (; a < n; a++) {
            r[a] = e[TabularHelper.getKeyFromRowCol(t, a)];
        }
        return r;
    }
    getEditorsAtColumn(e, t, n) {
        var r = new Array(n);
        var a = 0;
        for (; a < n; a++) {
            r[a] = e[TabularHelper.getKeyFromRowCol(a, t)];
        }
        return r;
    }
};
class zn {
    constructor(e, t, n, r) {
        this.common = e;
        this.cellDetections = t;
        this.othersDs = n;
        this.elementsDs = r;
        this.type = "tabular";
        this.diff = new Un(e, {
            getPosition: (e) => {
                return e;
            },
            isSameRef: (e, t) => {
                return e.some((e) => {
                    return t.some((t) => {
                        return e === t || e.id === t.id;
                    });
                });
            },
            isMatchedEntity: (e, t) => {
                return false;
            },
            onNew: (e, t, n) => {
                return n.operations.push({
                    type: "item-insertion",
                    position: e
                }),
                    e;
            },
            onUpdate: (e, t, n, r, a) => {
                return e;
            },
            onDelete(e, t, n) {
                n.operations.push({
                    type: "item-deletion",
                    position: e
                });
            }
        });
    }
    isCellPositionMatched(e, t) {
        return $t.cellPositionEquals(e.row, e.column, t.row, t.column, "include-lamport");
    }
    detectElementsInfo(e, t, n) {
        var r = this;
        var a = t[1].elements;
        var i = this.detectRows(e, n, a.rows);
        var o = this.detectColumns(e, n, a.columns);
        var s = i.crdtPositions;
        var l = o.crdtPositions;
        var c = ArrayHelper2.newArray(s.length * l.length, true);
        var d = Gn.getCellEditorsFromElements(e.elements);
        var h = [];
        var u = function (e) {
            var t = s[e];
            var i = function (i) {
                var o = l[i];
                var s = e * l.length + i;
                var u = a.cells.findIndex((e) => {
                    return $t.cellPositionEquals(e.row, e.column, t, o, "include-lamport");
                });
                if (u >= 0) {
                    var p = a.cells[u];
                    c[s] = p;
                    var m = n.elements[TabularHelper.getKeyFromRowCol(e, i)];
                    var f = d.find((e) => {
                        return e.id === m.id;
                    });
                    if (!f) {
                        throw new kn("", "missing real data for editor with id:".concat(m.id));
                    }
                    if (m === f) {
                        return "continue";
                    }
                    var g = $t.itemPositionToSiteInfo($t.latestItemPosition(p));
                    var y = r.cellDetections.handleUpdateCell(f, p, g, m);
                    return y.crdt && (c[s] = y.crdt),
                        y.value && (h = h.concat(y.value)),
                        "continue";
                }
                var A = n.elements[TabularHelper.getKeyFromRowCol(e, i)];
                h.push({
                    type: "cell-insertion",
                    row: t,
                    column: o,
                    value: A
                });
                c[s] = {
                    row: t,
                    column: o,
                    value: void 0
                };
            };
            var o = 0;
            for (; o < l.length; o++) {
                i(o);
            }
        };
        var p = 0;
        for (; p < s.length; p++) {
            u(p);
        }
        return t[1].elements.cells.forEach((e) => {
            if (!c.some((t) => {
                return this.isCellPositionMatched(t, e);
            })) {
                h.push({
                    type: "cell-deletion",
                    row: e.row,
                    column: e.column
                });
            }
        }),
        {
            elementsInfo: {
                cells: c,
                rows: s,
                columns: l
            },
            elementsUpdate: pn.anyObjectAsUndefinedIfAllPropertiesNull({
                rowOperations: pn.arrayAsUndefinedIfEmpty(i.operations),
                columnOperations: pn.arrayAsUndefinedIfEmpty(o.operations),
                cellOperations: pn.arrayAsUndefinedIfEmpty(h)
            })
        };
    }
    detect(e, t, n, r) {
        t = t || this.common.initCrdtTabular(e, n);
        var a = this.detectElementsInfo(e, t, r);
        var i = this.common.getTabularOthersMap(e);
        var o = this.common.getTabularOthersMap(r);
        var s = this.othersDs.detect(i, t[1].others, n, o);
        var l = this.common.getNonCellEditorsMap(e.elements);
        var c = this.common.getNonCellEditorsMap(r.elements);
        var d = this.elementsDs.detect(l, t[1].nonCellInElements, n, c);
        return {
            type: "tabular",
            crdt: ["tabular", {
                elements: a.elementsInfo,
                others: s.crdt,
                nonCellInElements: d.crdt
            },
                t[2]],
            data: pn.objectAsUndefinedIfAllPropertiesNull({
                type: "tabular-update",
                elements: a.elementsUpdate || void 0,
                others: s.data || void 0,
                nonCellInElements: d.data || void 0
            })
        };
    }
    detectRows(e, t, n) {
        var r = Gn.toRows(e);
        var a = Gn.toRows(t);
        var i = {
            crdtPositions: [],
            operations: []
        };
        return i.crdtPositions = this.diff.diffSwapable(r, n, a, i),
            i;
    }
    detectColumns(e, t, n) {
        var r = Gn.toColumns(e);
        var a = Gn.toColumns(t);
        var i = {
            crdtPositions: [],
            operations: []
        };
        return i.crdtPositions = this.diff.diffSwapable(r, n, a, i),
            i;
    }
}
class Yn {
    constructor(e) {
        this.dataDetection = e;
    }
    handleUpdateCell(e, t, n, r) {
        var a = this.dataDetection.detect(e, t.value, n, r);
        return {
            crdt: _.assignIn({},
                t, {
                value: a.crdt
            }),
            value: a.data && [{
                type: "cell-updation",
                row: t.row,
                column: t.column,
                value: a.data
            }]
        };
    }
}
var Kn = new class {
    diff(e, t, n, r, a) {
        var i = this.toArrayEntities(e);
        var o = this.toArrayEntities(t);
        var s = [];
        var l = _.clone(r || []);
        return o.forEach((e) => {
            var r = i.find((t) => {
                return t.id === e.id;
            });
            if (r && (!r || !this.mergeInformationEquals(e, r))) {
                var o = this.findRowColumnPosition(n, t, e.id);
                var c = this.buildNewMergedCrdtCell(e, o, n.rows, n.columns, a);
                var d = l.findIndex((e) => {
                    return $t.cellPositionEquals2(o, e, "include-lamport");
                });
                if (d >= 0) {
                    l[d] = c;
                } else {
                    l.push(c);
                }
                s.push(c);
            }
        }),
        {
            crdt: l,
            ops: s
        };
    }
    buildNewMergedCrdtCell(e, t, n, r, a) {
        return {
            row: t.row,
            column: t.column,
            expandRows: e.rowSpan > 1 ? _.times(e.rowSpan - 1, (e) => {
                return n[t.rIndex + e + 1];
            }) : void 0,
            expandColumns: e.colSpan > 1 ? _.times(e.colSpan - 1, (e) => {
                return r[t.cIndex + e + 1];
            }) : void 0,
            siteInfo: a
        };
    }
    findRowColumnPosition(e, t, n) {
        var r = 0;
        for (; r < e.rows.length; r++) {
            var a = 0;
            for (; a < e.columns.length; a++) {
                if (t[TabularHelper.getKeyFromRowCol(r, a)].id === n) {
                    return {
                        row: e.rows[r],
                        column: e.columns[a],
                        rIndex: r,
                        cIndex: a
                    };
                }
            }
        }
        return null;
    }
    mergeInformationEquals(e, t) {
        var n = e.colSpan || 1;
        var r = t.colSpan || 1;
        var a = e.rowSpan || 1;
        var i = t.rowSpan || 1;
        return n === r && a === i && e.hidden === t.hidden;
    }
    toArrayEntities(e) {
        return _.values(e);
    }
};
class Vn {
    constructor(e, t, n, r) {
        this.common = e;
        this.type = "mergeable-tabular";
        this.tabularDs = new zn(e, t, n, r);
    }
    detect(e, t, n, r) {
        var a = ["tabular", {
            elements: (t = t || this.common.initCrdtMergeableTabular(e, n))[1].elements,
            others: t[1].others,
            nonCellInElements: t[1].nonCellInElements
        },
            t[2]];
        var i = this.tabularDs.detect(e, a, n, r);
        var o = Kn.diff(e.elements, r.elements, i.crdt[1].elements, t[1].mergedLayer, this.common.currentSiteOperationInfo());
        return {
            type: "mergeable-tabular",
            crdt: ["mergeable-tabular", {
                elements: i.crdt[1].elements,
                others: i.crdt[1].others,
                mergedLayer: pn.arrayAsUndefinedIfEmpty(o.crdt),
                nonCellInElements: i.crdt[1].nonCellInElements
            },
                i.crdt[2]],
            data: pn.objectAsUndefinedIfAllPropertiesNull({
                type: "mergeable-tabular-update",
                elements: i.data && i.data.elements,
                others: i.data && i.data.others,
                nonCellInElements: i.data && i.data.nonCellInElements,
                mergeableLayer: pn.arrayAsUndefinedIfEmpty(o.ops)
            })
        };
    }
}
var jn = new class {
    sync(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
        if (t === n) {
            return e;
        }
        if (n = n || [], (t = t || []).length <= 0 && n.length <= 0) {
            return e;
        }
        var a = 0;
        var i = 0;
        var o = n.length;
        var s = t.length;
        var l = _.clone(e);
        var c = 0;
        for (; i < o && !(a >= s);) {
            var d = t[a];
            var h = n[i];
            if ($t.itemPositionEquals(d, h, "include-lamport")) {
                a++;
                i++;
            } else {
                var u = this.findMatchedEntityInRange(t, a, h);
                if (u < 0) {
                    l.splice(a + c, 0, r);
                    i++;
                    c++;
                } else {
                    l.splice(a + c, u - a);
                    c = c - (u - a);
                    a = u;
                }
            }
        }
        return a < s && l.splice(a + c, s - a),
            ArrayHelper2.setLength(l, n.length, r),
            l;
    }
    findMatchedEntityInRange(e, t, n) {
        var r = t;
        for (; r < e.length; r++) {
            if ($t.itemPositionEquals(e[r], n, "include-lamport")) {
                return r;
            }
        }
        return -1;
    }
};
class qn {
    constructor(e) {
        this.common = e;
    }
    detect(e, t, n, r, a) {
        n = ArrayHelper2.cloneSetLength(n, e.length);
        r = ArrayHelper2.cloneSetLength(r, t.length);
        a = ArrayHelper2.cloneSetLength(a, e.length);
        var i = [];
        var o = bn.makeCrdtPairs(n, a);
        var s = jn.sync(o, e, t, {
            item: null,
            crdtItem: null
        });
        var l = 0;
        for (; l < r.length; l++) {
            var c = s[l];
            var d = r[l];
            if (c.item != d) {
                var h = this.common.currentSiteOperationInfo();
                s[l] = {
                    item: d,
                    crdtItem: h
                };
                i.push({
                    type: "item-put",
                    position: t[l],
                    siteInfo: h,
                    value: d
                });
            }
        }
        return {
            crdt: s.map((e) => {
                return e.crdtItem;
            }),
            operations: i
        };
    }
}
class Qn {
    constructor(e, t, n, r) {
        this.common = e;
        this.type = "table";
        this.mTabularDs = new Vn(e, t, n, r);
        this.tableRowColumnSizeDs = new qn(e);
    }
    getTabularIgnoreColumnWidthsRowHeights(e) {
        return _.omit(e, ["columnWidths", "rowHeights"]);
    }
    getInnerTabular() {
        return this.mTabularDs;
    }
    detect(e, t, n, r) {
        t = t || this.common.initCrdtTable(e, n);
        var a;
        var i;
        var o = this.getTabularIgnoreColumnWidthsRowHeights(e);
        var s = this.getTabularIgnoreColumnWidthsRowHeights(r);
        var l = this.mTabularDs.detect(o, ["mergeable-tabular", t[1], void 0], n, s);
        var c = l.crdt[1];
        if (e.columnWidths != r.columnWidths || t[1].elements.columns != c.elements.columns) {
            var d = this.tableRowColumnSizeDs.detect(t[1].elements.columns, c.elements.columns, e.columnWidths, r.columnWidths, t[1].columnWidths);
            c = _.assignIn({},
                c, {
                columnWidths: d.crdt
            });
            a = d.operations;
        }
        if (e.rowHeights != r.rowHeights || t[1].elements.rows != c.elements.rows) {
            var h = this.tableRowColumnSizeDs.detect(t[1].elements.rows, c.elements.rows, e.rowHeights, r.rowHeights, t[1].rowHeights);
            c = _.assignIn({},
                c, {
                rowHeights: h.crdt
            });
            i = h.operations;
        }
        return {
            type: "table",
            crdt: ["table", c, t[2]],
            data: pn.objectAsUndefinedIfAllPropertiesNull(_.assignIn({},
                l.data, {
                type: "table-update",
                columnWidths: pn.arrayAsUndefinedIfEmpty(a),
                rowHeights: pn.arrayAsUndefinedIfEmpty(i)
            }))
        };
    }
}
class Zn {
    constructor(e, t) {
        this.common = e;
        this.itemDetections = t;
        this.type = "entity-list";
        this.detect = (e, t, n, r) => {
            e = e || [];
            r = r || [];
            t = t || this.common.initCrdtEntityList(e, n);
            var a = {
                ops: []
            };
            return {
                type: "entity-list",
                crdt: ["entity-list", this.diff.diffNonSwap(e, t[1], r, a), t[2]],
                data: pn.objectAsUndefinedIfAllPropertiesNull({
                    type: "entity-list-update",
                    ops: pn.arrayAsUndefinedIfEmpty(a.ops)
                })
            };
        };
        this.diff = new Un(e, {
            onDelete: (e, t, n) => {
                n.ops.push({
                    type: "item-deletion",
                    position: e.position
                });
            },
            onNew: (e, t, n) => {
                var r = {
                    type: "item-insertion",
                    position: e,
                    value: t
                };
                return n.ops.push(r),
                {
                    position: r.position,
                    value: void 0
                };
            },
            onUpdate: (e, t, n, r, a) => {
                var i = this.itemDetections.handleUpdateItem(n, e, t, r);
                return i.operationItem && i.operationItem.value ? (a.ops.push({
                    type: "item-updation",
                    position: i.operationItem.position,
                    value: i.operationItem.value
                }), i.crdtItem) : e;
            },
            isMatchedEntity: (e, t) => {
                return e.id === t.id;
            },
            getPosition: (e) => {
                return e.position;
            }
        });
    }
}
class Xn {
    constructor(e, t) {
        this.filter = e;
        this.defaultDetection = t;
    }
    handleUpdateItem(e, t, n, r) {
        var a = (this.filter(e) || this.defaultDetection).detect(e, t.value, n, r);
        return {
            crdtItem: {
                position: t.position,
                value: a.crdt
            },
            operationItem: {
                type: "item-updation",
                position: t.position,
                value: a.data
            }
        };
    }
}
class Jn {
    constructor(e, t, n) {
        this.common = e;
        this.elementsDs = t;
        this.othersDs = n;
        this.type = "temp-elements-map";
    }
    detect(e, t, n, r) {
        t = t || this.common.initTempElementsMapCrdt(e, n);
        var a;
        var i = this.getEntityWithoutElementsAndTemp(e);
        var o = this.getEntityWithoutElementsAndTemp(r);
        var s = this.othersDs.detect(i, t[1].others, n, o);
        var l = this.elementsDs.detect(_.assignIn({},
            e.___tempElements, e.elements), t[1].elements, n, _.assignIn({},
                r.___tempElements, r.elements));
        return this.isLayoutChanged(e, r) && (a = [this.common.currentSiteOperationInfo(), _.keys(r.elements)]),
        {
            type: "temp-elements-map",
            crdt: ["temp-elements-map", {
                layout: a || t[1].layout,
                elements: l.crdt,
                others: s.crdt
            }],
            data: pn.objectAsUndefinedIfAllPropertiesNull({
                type: "temp-elements-map-update",
                layout: a,
                elementsMap: l.data,
                others: s.data
            })
        };
    }
    isLayoutChanged(e, t) {
        var n = _.keys(e.elements);
        var r = _.keys(t.elements);
        return _.xor(n, r).length > 0;
    }
    getEntityWithoutElementsAndTemp(e) {
        return _.omit(e, ["elements", "___tempElements"]);
    }
}
class $n {
    constructor(e, t, n) {
        this.common = e;
        this.elementsDs = t;
        this.othersDs = n;
        this.type = "toggle-elements-map";
    }
    detect(e, t, n, r) {
        t = t || this.common.initToggleElementsMapCrdt();
        var a = this.common.combineToggleElements(e);
        var i = this.common.combineToggleElements(r);
        var o = this.common.buildRestObjectForToggleElements(e);
        var s = this.common.buildRestObjectForToggleElements(r);
        var l = this.elementsDs.detect(a, t[1].elements, n, i);
        var c = this.othersDs.detect(o, t[1].others, n, s);
        return {
            type: "toggle-elements-map",
            crdt: ["toggle-elements-map", {
                elements: l.crdt,
                others: c.crdt
            }],
            data: pn.objectAsUndefinedIfAllPropertiesNull({
                type: "toggle-elements-map-update",
                elementsMap: l.data,
                others: c.data
            })
        };
    }
}
class er {
    constructor(e, t) {
        this.common = e;
        this.itemDetections = t;
        this.type = "swapable-entity-list";
        this.diff = new Un(e, {
            onDelete: (e, t, n, r) => {
                n.deletions.push({
                    id: e.id,
                    siteInfo: $t.getSiteOpInfoFromSwapableItem(e),
                    type: "item-deletion",
                    entity: t,
                    crdt: e
                });
                n.prevClondedEntities.splice(r, 1);
            },
            onNew: (e, t, n, r) => {
                var a = {
                    type: "item-insertion",
                    position: e,
                    value: t
                };
                return n.insertions.push(a),
                    n.prevClondedEntities.splice(r, 0, t),
                {
                    position: a.position,
                    value: null,
                    id: t.id
                };
            },
            onUpdate: (e, t, n, r, a) => {
                return e;
            },
            isMatchedEntity: (e, t) => {
                return e.id === t.id;
            },
            isSameRef: (e, t) => {
                return e.id === t.id;
            },
            getPosition: (e) => {
                return e.position;
            }
        });
    }
    detect(e, t, n, r) {
        e = e || [];
        r = r || [];
        t = t || this.common.initCrdtSwapableEntityList(e, n);
        var a = {
            deletions: [],
            insertions: [],
            updations: [],
            prevClondedEntities: _.clone(e)
        };
        var i = this.diff.diffSwapable(e, t[1], r, a);
        var o = this.buildSwapedOperations(a, i).concat(this.handleUpdations(a.prevClondedEntities, r, i));
        return {
            type: "swapable-entity-list",
            crdt: ["swapable-entity-list", i, t[2]],
            data: pn.objectAsUndefinedIfAllPropertiesNull({
                type: "swapable-entity-list-update",
                ops: pn.arrayAsUndefinedIfEmpty(o)
            })
        };
    }
    handleUpdations(e, t, n) {
        if (t.length != e.length) {
            throw new Error("wrong algorithm");
        }
        var r = [];
        var a = 0;
        for (; a < t.length; a++) {
            var i = t[a];
            var o = e[a];
            if (i != o) {
                if (i.id != o.id) {
                    throw new Error("wrong algorithm on id");
                }
                var s = $t.getSiteOpInfoFromSwapableItem(n[a]);
                var l = this.itemDetections.handleUpdateItem(o, n[a], s, i);
                if (l.operationItem) {
                    r.push({
                        type: "item-updation",
                        id: i.id,
                        siteInfo: s,
                        value: l.operationItem.value
                    });
                }
                n[a] = _.assignIn({},
                    n[a], {
                    value: l.crdtItem.value
                });
            }
        }
        return r;
    }
    buildSwapedOperations(e, t) {
        var n = e.updations;
        return e.insertions.forEach((r) => {
            var a = e.deletions.findIndex((e) => {
                return e.id === r.value.id;
            });
            if (a >= 0) {
                var i = e.deletions[a];
                var o = $t.getSiteOpInfoFromSwapableItem(i.crdt);
                n.push({
                    type: "item-swap",
                    id: i.id,
                    siteInfo: o,
                    newPosition: r.position
                });
                e.deletions.splice(a, 1);
                var s = t.findIndex((e) => {
                    return e.id === r.value.id;
                });
                if (s < 0) {
                    throw new Error("should not be here");
                }
                var l = t[s];
                var c = i.crdt.value;
                if (i.entity != r.value) {
                    var d = this.itemDetections.handleUpdateItem(i.entity, i.crdt, o, r.value);
                    c = d.crdtItem.value;
                    if (d.operationItem) {
                        n.push({
                            type: "item-updation",
                            id: i.entity.id,
                            siteInfo: o,
                            value: d.operationItem.value
                        });
                    }
                }
                t[s] = _.assignIn({},
                    l, {
                    siteInfo: o,
                    value: c
                });
            } else {
                n.push(r);
            }
        }),
            e.deletions.forEach((e) => {
                n.push({
                    type: "item-deletion",
                    id: e.id,
                    siteInfo: e.siteInfo
                });
            }),
            n;
    }
}
var tr = new class {
    positionFromIndex(e, t, n) {
        return [t.lamport, [e, t.site], n];
    }
    toBlockCharInfo(e, t) {
        return [e[0], e[1], 1, {
            crdt: t
        }];
    }
    itemPositionToCharPosition(e, t) {
        return [e[0], e[1], t];
    }
    getBlockCrdt(e) {
        return e[3].crdt;
    }
    itemPositionFromCharInfo(e) {
        return [e[0], e[1]];
    }
    getGraphemeCount(e) {
        return e[2];
    }
};
class nr {
    constructor(e) {
        this.common = e;
    }
    crdtCompress(e) {
        var t = {};
        return _.keys(e).forEach((n) => {
            t[n] = this.crdtRangesCompress(e[n]);
        }),
            this.stripCrdtEmptyArray(t);
    }
    stripCrdtEmptyArray(e) {
        if (_.keys(e).forEach((t) => {
            if (e[t] && e[t].length <= 0) {
                delete e[t];
            }
        }), !(_.keys(e).length <= 0)) {
            return e;
        }
    }
    crdtUncompress(e, t, n) {
        var r = {};
        return _.keys(e).forEach((a) => {
            r[a] = this.crdtRangesUncompress(e[a], t, n, a);
        }),
            r;
    }
    operationCompress(e, t) {
        var n = {};
        return _.keys(e).forEach((r) => {
            var a = this.operationCompressOnKey(e[r], t);
            n[r] = a;
        }),
            this.stripOperationEmptyArray({
                siteOp: this.common.currentSiteOperationInfo(),
                map: n
            });
    }
    stripOperationEmptyArray(e) {
        var t = e.map;
        if (_.keys(t).forEach((e) => {
            if (t[e] && t[e].length <= 0) {
                delete t[e];
            }
        }), !(_.keys(t).length <= 0)) {
            return e;
        }
    }
    operationCompressOnKey(e, t) {
        if (e.length <= 0) {
            return [];
        }
        var n = [];
        var r = null;
        var a = function (a) {
            var i = e[a];
            if (!i || !i.siteOp) {
                return "continue";
            }
            if (r && r.value === i.value) {
                return r.positions.push(tr.itemPositionFromCharInfo(t[a])),
                    "continue";
            }
            var o = n.find((e) => {
                return e.value === i.value;
            });
            if (!o) {
                return o = {
                    value: i.value,
                    positions: [tr.itemPositionFromCharInfo(t[a])]
                },
                    r = o,
                    n.push(o),
                    "continue";
            }
            o.positions.push(tr.itemPositionFromCharInfo(t[a]));
            r = o;
        };
        var i = 0;
        for (; i < e.length; i++) {
            a(i);
        }
        return n;
    }
    operationUncompress(e, t) {
        if (!e) {
            return [{},
            []];
        }
        var n = {};
        var r = [];
        return e.forEach((e) => {
            var a = null;
            _.keys(e.map).forEach((r) => {
                n[r] = n[r] || ArrayHelper2.newArray(t.length, true);
                var i = this.operationUncompressOnKey(n[r], e.map[r], t, e.siteOp);
                if (i && i.length > 0) {
                    (a = a || {
                        map: {},
                        siteOp: e.siteOp
                    }).map[r] = this.mergeUnmatched(a.map[r], i);
                }
            });
            if (a) {
                r.push(a);
            }
        }),
            [n, r];
    }
    mergeUnmatched(e, t) {
        return (e || []).concat(t || []);
    }
    operationUncompressOnKey(e, t, n, r) {
        if (n.length <= 0) {
            return t;
        }
        var a = [];
        return t.forEach((t) => {
            t.positions.forEach((i) => {
                var o = n.findIndex((e) => {
                    return $t.itemPositionEquals(e, i, "include-lamport");
                });
                if (o >= 0) {
                    e[o] = this.mergeCrdtCharStyleValue(e[o], {
                        siteOp: r,
                        value: t.value
                    });
                } else {
                    console.warn("unmatched for style updation,add to buffer");
                    this.addToUnMatchedResult(a, t.value, i);
                }
            });
        }),
            a;
    }
    mergeCrdtCharStyleValue(e, t) {
        return e && t ? $t.compareSiteOperation(e.siteOp, t.siteOp) > 0 ? e : t : e || t;
    }
    addToUnMatchedResult(e, t, n) {
        var r = e.find((e) => {
            return e.value === t;
        });
        if (!r) {
            r = {
                value: t,
                positions: []
            };
            e.push(r);
        }
        r.positions.push(n);
    }
    crdtRangesCompress(e) {
        if (e.length <= 0) {
            return [];
        }
        var t = e.length;
        var n = [];
        var r = false;
        var a = null;
        var i = 0;
        for (; i < t; i++) {
            var o = e[i];
            var s = !!o && !!o.siteOp;
            if (r && s) {
                if (o.value === a.value && this.siteOpEqual(o.siteOp, a.siteOp)) {
                    n[n.length - 1].to = i;
                } else {
                    n.push({
                        from: i,
                        to: i,
                        siteOp: o.siteOp
                    });
                }
            } else {
                if ((r || s) && s) {
                    n.push({
                        from: i,
                        to: i,
                        siteOp: o.siteOp
                    });
                }
            }
            r = s;
            a = s ? o : null;
        }
        return n;
    }
    crdtRangesUncompress(e, t, n, r) {
        if (e.length <= 0) {
            return [];
        }
        var a = _.sumBy(n, (e) => {
            return e.length;
        });
        var i = ArrayHelper2.newArray(a, true);
        e.forEach((e) => {
            var t = e.from;
            for (; t <= e.to; t++) {
                i[t] = {
                    value: null,
                    siteOp: e.siteOp
                };
            }
        });
        var o = n[0].length;
        var s = 0;
        var l = 0;
        for (; l < a; l++) {
            if (l >= o && (o = o + n[++s].length), i[l]) {
                var c = this.undefinedAsNull((t[s].style || {})[r]);
                i[l].value = c;
            } else {
                i[l] = void 0;
            }
        }
        return i;
    }
    undefinedAsNull(e) {
        return void 0 === e ? null : e;
    }
    siteOpEqual(e, t) {
        return e === t || !!e == !!t && 0 == $t.compareSiteOperation(e, t);
    }
}
var rr = new class {
    extract(e, t) {
        var n = {};
        var r = 0;
        var a = _.sumBy(t, (e) => {
            return e.length;
        });
        return e.forEach((e, i) => {
            _.toPairs(e.style || {}).forEach((e) => {
                var o = slicedToArray(e, 2);
                var s = o[0];
                var l = o[1];
                var c = n[s];
                if (!c) {
                    c = ArrayHelper2.newArray(a, true);
                    n[s] = c;
                }
                var d = r + t[i].length;
                var h = r;
                for (; h < d; h++) {
                    c[h] = l;
                }
            });
            r = r + t[i].length;
        }),
            n;
    }
};
var ar = new class {
    sync(e, t, n) {
        var r = {};
        return n = n || {
            deletions: void 0,
            insertions: void 0
        },
            _.keys(e).forEach((a) => {
                r[a] = this.syncValues(e[a], t, n);
            }),
            r;
    }
    syncValues(e, t, n) {
        if (!n) {
            return e;
        }
        var r = bn.makeCrdtPairs(e, t);
        var a = n.deletions || [];
        var i = n.insertions || [];
        return r = r.filter((e) => {
            return !a.some((t) => {
                return $t.itemPositionEquals(e.crdtItem, t, "include-lamport");
            });
        }),
            i = i.filter((e) => {
                return !Rn.existPositionWithDifferentLamport(t, e.position);
            }),
            r = r.concat(i.map((e) => {
                return {
                    crdtItem: e.position,
                    item: null
                };
            })),
            $t.sort(r, (e) => {
                return e.crdtItem;
            }),
            r.map((e) => {
                return e.item;
            });
    }
};
class ir {
    constructor(e) {
        this.common = e;
    }
    diff(e, t) {
        var n = _.uniq(_.keys(e).concat(_.keys(t)));
        var r = {};
        var a = {};
        return n.forEach((n) => {
            var i = this.diffOnStyleKey(e[n], t[n]);
            var o = slicedToArray(i, 2);
            var s = o[0];
            var l = o[1];
            r[n] = s;
            a[n] = l;
        }),
        {
            crdt: r,
            changes: a
        };
    }
    diffOnStyleKey(e, t) {
        e = e || [];
        t = t || [];
        var n = Math.max(e.length, t.length);
        var r = ArrayHelper2.newArray(n, true);
        var a = ArrayHelper2.newArray(n, true);
        var i = 0;
        for (; i < n; i++) {
            var o = e[i];
            if ((o ? o.value : null) != t[i]) {
                r[i] = {
                    siteOp: this.common.currentSiteOperationInfo(),
                    value: t[i]
                };
                a[i] = r[i];
            } else {
                r[i] = o;
            }
        }
        return [r, a];
    }
}
var sr = new class {
    isCharBlock(e) {
        return "string" != typeof e;
    }
    isCrdtCharBlock(e) {
        return !!e[3];
    }
    findBlockCharIndex(e, t) {
        return e.findIndex((e) => {
            return this.isCharBlock(e) && e.id === t;
        });
    }
    blocksToCharArrs(e, t) {
        return t ? this.blocksToCharArrsByCrdt(e, t) : this.rawBlocksToCharArrs(e);
    }
    blocksToCharArrsByCrdt(e, t) {
        var n = 0;
        var r = [];
        if (e.forEach((e) => {
            if (e.type) {
                var a = t[n];
                if (!a || !this.isCrdtCharBlock(a)) {
                    throw new kn("char-info", "should not empty or text here");
                }
                var i = {
                    id: e.id
                };
                r.push([i]);
                n = n + 1;
            } else {
                var o = [];
                var s = 0;
                for (; s < e.text.length;) {
                    var l = t[n];
                    if (!l || this.isCrdtCharBlock(l)) {
                        throw new kn("char-info", "should not empty or be composite block here");
                    }
                    var c = tr.getGraphemeCount(l);
                    o.push(e.text.substr(s, c));
                    s = s + c;
                    n = n + 1;
                }
                r.push(o);
            }
        }), n < t.length) {
            throw new kn("char-info", "crdt char position more than expected");
        }
        return r;
    }
    rawBlocksToCharArrs(e) {
        return e.map((e) => {
            return e.type ? [{
                id: e.id
            }] : TextUtils.getUnistringUncached(e.text).toStringArray();
        });
    }
};
class lr {
    constructor(e) {
        this.common = e;
    }
    charUnitCompareEqual(e, t) {
        if (e === t) {
            return true;
        }
        var n = typeof e;
        return n === typeof t && "string" != n && e.id === t.id;
    }
    detectText(e, t, n, r) {
        var a;
        var i = this;
        a = _n(e, n, {
            equal: this.charUnitCompareEqual
        });
        var o = 0;
        var s = _.clone(t);
        var l = {
            deletions: [],
            insertions: []
        };
        return a.scanDiff((e, a, c, d) => {
            if (a > e) {
                var h = e;
                for (; h < a; h++) {
                    l.deletions.push(tr.itemPositionFromCharInfo(t[h]));
                }
                s.splice(e + o, a - e);
            }
            if (d > c) {
                var u = e - 1 >= 0 ? $t.iIdentifiers(t[e - 1]) : null;
                var p = e < t.length ? $t.iIdentifiers(t[e]) : null;
                var m = new Array(d - c);
                var f = function (e) {
                    var t = i.common.generateIdentifiers(u, p);
                    var a = n[e];
                    var o = i.common.newItemPosition(t);
                    var s = void 0;
                    if (sr.isCharBlock(a)) {
                        m[e - c] = tr.toBlockCharInfo(o, void 0);
                        s = {
                            position: o,
                            text: a,
                            block: r.find((e) => {
                                return e.id === a.id;
                            })
                        };
                    } else {
                        m[e - c] = tr.itemPositionToCharPosition(o, a.length);
                        s = {
                            position: o,
                            text: a
                        };
                    }
                    l.insertions.push(s);
                    u = t;
                };
                var g = c;
                for (; g < d; g++) {
                    f(g);
                }
                s.splice(e + o, 0, ...m);
            }
            o = o + (d - c - (a - e));
        }),
        {
            crdt: s,
            textUpdate: pn.anyObjectAsUndefinedIfAllPropertiesNull({
                insertions: pn.arrayAsUndefinedIfEmpty(l.insertions),
                deletions: pn.arrayAsUndefinedIfEmpty(l.deletions)
            })
        };
    }
}
var cr = new class {
    initStyleMapCrdt(e, t, n) {
        var r = {};
        var a = 0;
        return e.forEach((e, i) => {
            var o = _.keys(e.style || {});
            if (e.style && o.length > 0) {
                o.forEach((e) => {
                    var o = r[e];
                    if (!o) {
                        o = [];
                        r[e] = o;
                    }
                    o.push({
                        from: a,
                        to: a + t[i].length - 1,
                        siteOp: n
                    });
                });
            }
            a = a + t[i].length;
        }),
            r;
    }
    initCrdt(e, t, n) {
        return ["blocks", {
            chars: this.initCharInfo(e, t, n),
            styleMap: this.initStyleMapCrdt(e, t, n)
        },
            void 0];
    }
    initCharInfo(e, t, n) {
        var r = _.sumBy(t, (e) => {
            return e.length;
        });
        var a = ArrayHelper2.newArray(r, true);
        var i = 0;
        var o = 0;
        for (; o < t.length; o++) {
            if (e[o].type) {
                a[i] = tr.toBlockCharInfo(tr.positionFromIndex(i, n, 1), void 0);
            } else {
                var s = t[o];
                var l = i;
                for (; l < i + s.length; l++) {
                    var c = s[l - i].length;
                    a[l] = tr.positionFromIndex(l, n, c);
                }
            }
            i = i + t[o].length;
        }
        return a;
    }
};
class dr {
    constructor(e, t) {
        this.blockDs = t;
        this.type = "blocks";
        this.crdtStyleValuesDiff = new ir(e);
        this.crdtDataCompression = new nr(e);
        this.textDiff = new lr(e);
    }
    detect(e, t, n, r) {
        var a = sr.blocksToCharArrs(e, t && t[1].chars);
        var i = sr.blocksToCharArrs(r, void 0);
        var o = _.flatten(a);
        var s = _.flatten(i);
        if ((t = t || cr.initCrdt(e, a, n))[1].chars.length != o.length) {
            en.warn("Something wrong with crdt in DS");
        }
        var l = this.textDiff.detectText(o, t[1].chars, s, r);
        var c = l.crdt;
        var d = l.textUpdate;
        var h = this.detectStyles(e, a, r, i, t[1].styleMap, t[1].chars, c, d);
        var u = slicedToArray(h, 2);
        var p = u[0];
        var m = u[1];
        var f = this.detectSingleBlockCharChange(e, c, s, r);
        if (f) {
            this.mergeSingleBlockCrdt(c, f.crdtItems);
        }
        var g = m ? [m] : void 0;
        return {
            type: "blocks",
            crdt: ["blocks", {
                chars: c,
                styleMap: p
            },
                t[2]],
            data: pn.objectAsUndefinedIfAllPropertiesNull({
                type: "blocks",
                styleUpdates: g,
                textUpdate: pn.anyObjectAsUndefinedIfAllPropertiesNull(_.assignIn({},
                    d, {
                    updations: f ? f.updations : void 0
                }))
            })
        };
    }
    mergeSingleBlockCrdt(e, t) {
        t.forEach((t) => {
            e[t.charIndex] = tr.toBlockCharInfo(e[t.charIndex], t.crdt);
        });
    }
    detectStyles(e, t, n, r, a, i, o, s) {
        var l = this.crdtDataCompression.crdtUncompress(a, e, t);
        l = ar.sync(l, i, s);
        var c = rr.extract(n, r);
        var d = this.crdtStyleValuesDiff.diff(l, c);
        var h = d.crdt;
        var u = d.changes;
        return [this.crdtDataCompression.crdtCompress(h), this.crdtDataCompression.operationCompress(u, o)];
    }
    detectSingleBlockCharChange(e, t, n, r) {
        var a = e.filter((e) => {
            return !!e.type;
        });
        var i = r.filter((e) => {
            return !!e.type;
        });
        var o = {
            updations: [],
            crdtItems: []
        };
        if (a.forEach((e) => {
            i.forEach((r) => {
                if (e != r && e.id === r.id) {
                    var a = sr.findBlockCharIndex(n, e.id);
                    var i = t[a];
                    var s = $t.itemPositionToSiteInfo(i);
                    var l = this.blockDs.detect(e, tr.getBlockCrdt(i), s, r);
                    if (l.data) {
                        o.updations.push({
                            position: tr.itemPositionFromCharInfo(i),
                            value: l.data
                        });
                    }
                    o.crdtItems.push({
                        charIndex: a,
                        crdt: l.crdt
                    });
                }
            });
        }), o.updations.length > 0) {
            return o;
        }
    }
}
class pr {
    constructor(e) {
        this.bd = e;
        this.filterListItemFunc = (e) => {
            return DiagramIdHelper.isDiagramGroupId(e.id) ? this.getShapeGroupDs() : null;
        };
        this.shapesDs = this.initShapesDs();
        this.compositeBlockDs = this.initCompositeBlockDs();
        this.diagramBlockDs = this.initDiagramBlockDs(this.shapesDs);
        this.tabularBlockDs = this.initTabularBlockDetection();
        this.arrayBlockDs = this.initArrayBlockDetection();
        this.tableBlockDs = this.initTableBlockDetection();
        this.tempElementsMapDs = this.bd.tempElementsMapDs(this.compositeBlockDs);
        this.toggleElementsMapDs = this.bd.toggleElementsMapDs(this.compositeBlockDs);
        this.longDivisionDs = this.initLongDivisionDs();
        this.underlineSectionDs = this.initUnderlineSectionBlockDs();
    }
    initLongDivisionDs() {
        return this.bd.mapDs(this.bd.switchMapField(this.bd.switches(this.bd.
            switch("elements", this.bd.alwaysObjectMapField(this.bd.longDivisionElementsDs(), {})), this.bd.
                switch("style", this.bd.styleFieldDs())), this.bd.rawDataFieldDs()));
    }
    initCompositeBlockDs() {
        return this.bd.mapDs(this.bd.switchMapField(this.bd.switches(this.bd.
            switch("elements", this.bd.elementsFieldDs()), this.bd.
                switch("style", this.bd.styleFieldDs())), this.bd.rawDataFieldDs()));
    }
    initUnderlineSectionBlockDs() {
        return this.bd.mapDs(this.bd.switchMapField(this.bd.switches(this.bd.
            switch("elements", this.bd.elementsFieldDs()), this.bd.
                switch("style", this.bd.styleFieldDs()), this.bd.
                    switch("lineStyle", this.bd.styleFieldDs())), this.bd.rawDataFieldDs()));
    }
    getShapeGroupDs() {
        return this.shapeGroupDs || (this.shapeGroupDs = this.bd.mapDs(this.bd.switchMapField(this.bd.switches(this.bd.
            switch("entities", this.shapesDs), this.bd.
                switch("style", this.bd.styleFieldDs()), this.bd.
                    switch("settings", this.bd.styleFieldDs())), this.bd.rawDataFieldDs()))),
            this.shapeGroupDs;
    }
    initShapesDs() {
        return this.bd.alwaysObjectMapField(this.bd.swapableEntityListDs(this.bd.filterListItemDs(this.filterListItemFunc, this.bd.mapDs(this.bd.switchMapField(this.bd.switches(this.bd.
            switch("style", this.bd.styleFieldDs()), this.bd.
                switch("settings", this.bd.styleFieldDs())), this.bd.rawDataFieldDs())))), []);
    }
    initConnectionFieldDs() {
        return this.bd.alwaysObjectMapField(this.bd.entityListDs(this.bd.listItemDs(this.bd.mapDs(this.bd.switchMapField(this.bd.switches(this.bd.
            switch("style", this.bd.styleFieldDs()), this.bd.
                switch("settings", this.bd.styleFieldDs())), this.bd.rawDataFieldDs())))), []);
    }
    initIntersectionFieldDs() {
        return this.bd.alwaysObjectMapField(this.bd.mapDs(this.bd.switchMapField(this.bd.switches(this.bd.
            switch("style", this.bd.styleFieldDs()), this.bd.
                switch("settings", this.bd.styleFieldDs())), this.bd.rawDataFieldDs())), {});
    }
    initDiagramBlockDs(e) {
        var t = this.bd.alwaysObjectMapField(this.bd.entityListDs(this.bd.listItemDs(this.bd.mapDs(this.bd.alwaysNewMapField()))), []);
        return this.bd.mapDs(this.bd.switchMapField(this.bd.switches(this.bd.
            switch("elements", this.bd.diagramElementsFieldDs()), this.bd.
                switch("style", this.bd.styleFieldDs()), this.bd.
                    switch("settings", this.bd.styleFieldDs()), this.bd.
                        switch("shapes", e), this.bd.
                            switch("horizontalGuides", t), this.bd.
                                switch("verticalGuides", t), this.bd.
                                    switch("connections", this.initConnectionFieldDs()), this.bd.
                                        switch("intersections", this.initIntersectionFieldDs())), this.bd.rawDataFieldDs()));
    }
    initTabularBlockDetection() {
        return this.bd.tabularDs(this.bd.editorDs(), this.bd.mapDs(this.bd.filterMapField(["style"], this.bd.styleFieldDs(), this.bd.rawDataFieldDs())));
    }
    initArrayBlockDetection() {
        return this.bd.tabularDs(this.bd.editorDs(), this.bd.mapDs(this.bd.switchMapField(this.bd.switches(this.bd.
            switch("aligns", this.bd.alwaysObjectMapField(this.bd.rawDataDs(), {})), this.bd.
                switch("style", this.bd.styleFieldDs())), this.bd.rawDataFieldDs())));
    }
    initTableBlockDetection() {
        return this.bd.tableDs(this.bd.editorDs(), this.bd.mapDs(this.bd.switchMapField(this.bd.switches(this.bd.
            switch("style", this.bd.styleFieldDs())), this.bd.rawDataFieldDs())));
    }
    detect(e, t, n, r) {
        var a = e;
        if (ha.type == null) {
            throw new kn("no-text-block-ds", "text block should not come here");
        }
        switch (a.text) {
            case "\\matrix":
            case "\\cases":
            case "\\gathered":
            case "\\aligned":
            case "\\gather":
            case "\\smallmatrix":
            case "\\align":
                return this.tabularBlockDs.detect(e, t, n, r);
            case "\\array":
                return this.arrayBlockDs.detect(e, t, n, r);
            case "\\table":
            case "\\latex-table":
                return this.tableBlockDs.detect(e, t, n, r);
            case "\\diagram":
                return this.diagramBlockDs.detect(e, t, n, r);
            case "\\z-schema":
                return this.tempElementsMapDs.detect(e, t, n, r);
            case "\\text-mode-group":
            case "\\text-mode-group-inline":
            case "\\math-mode-group":
                return this.toggleElementsMapDs.detect(e, t, n, r);
            case "\\longdivision":
                return this.longDivisionDs.detect(e, t, n, r);
            case "\\underline-section":
                return this.underlineSectionDs.detect(e, t, n, r);
        }
        return this.compositeBlockDs.detect(e, t, n, r);
    }
}
class mr {
    constructor(e) {
        this.common = e;
        this.handleNewField = (e, t, n, r, a) => {
            return this.buildPutOp(e, a[e]);
        };
        this.handleUpdateField = (e, t, n, r, a) => {
            var i = $t.key(e.position);
            return this.buildPutOp(i, a[i]);
        };
        this.handleDeleteField = (e, t, n, r, a) => {
            var i = $t.key(e.position);
            return this.buildPutOp(i, void 0);
        };
    }
    buildPutOp(e, t) {
        var n = {
            type: "field-put",
            position: this.common.newFieldPosition(e),
            value: t
        };
        return {
            crdtField: {
                position: n.position,
                value: void 0
            },
            operations: [n]
        };
    }
}
class fr {
    constructor(e, t) {
        this.common = e;
        this.dataDs = t;
        this.handleNewField = (e, t, n, r, a) => {
            return this.handleAll(t, e, a, n);
        };
        this.handleUpdateField = (e, t, n, r, a) => {
            var i = $t.key(e.position);
            return this.handleAll(t, i, a, n);
        };
        this.handleDeleteField = (e, t, n, r, a) => {
            var i = $t.key(e.position);
            return this.handleAll(t, i, a, n);
        };
    }
    handleAll(e, t, n, r) {
        var a = e[t];
        var i = n[t];
        if (a === i) {
            return {
                crdtField: r[1].find((e) => {
                    return $t.key(e.position) == t;
                }),
                operations: void 0
            };
        }
        if (!a || !i) {
            var o = this.common.newFieldPosition(t);
            return {
                crdtField: {
                    position: o,
                    value: null
                },
                operations: [{
                    type: "field-put",
                    position: o,
                    value: i
                }]
            };
        }
        var s = r[1].find((e) => {
            return $t.key(e.position) == t;
        });
        if (!s) {
            throw new kn("missing-crdt-field", "prev field has value,it must have crdt");
        }
        var l = this.dataDs.detect(a, s.value, $t.fieldPositionToSiteInfo(s.position), i);
        return {
            crdtField: {
                position: s.position,
                value: l.crdt
            },
            operations: l.data ? [{
                type: "cs-field-updation",
                position: s.position,
                value: l.data
            }] : void 0
        };
    }
}
class gr {
    constructor(e) {
        this.dataDetection = e;
    }
    handleUpdateItem(e, t, n, r) {
        var a = this.dataDetection.detect(e, t.value, n, r);
        return {
            crdtItem: {
                position: t.position,
                value: a.crdt
            },
            operationItem: a.data && {
                type: "item-updation",
                position: t.position,
                value: a.data
            }
        };
    }
}
class yr {
    constructor(e) {
        this.common = e;
        this.type = "raw-data";
    }
    detect(e, t, n, r) {
        return t = t || this.common.initRawDataCrdt(n),
            e === r ? {
                type: "data",
                crdt: t,
                data: void 0
            } : {
                    type: "data",
                    crdt: ["raw-data", this.common.currentSiteOperationInfo()],
                    data: {
                        type: "new-data",
                        siteInfo: this.common.currentSiteOperationInfo(),
                        value: r
                    }
                };
    }
}
/// var Ar = n(50)/*Remainder*/;  // 4 times
class Er {
    constructor(e, t, n) {
        this.common = e;
        this.editorDs = t;
        this.entityListDs = n;
        this.type = "long-divisions-elements";
    }
    detect(e, t, n, r) {
        t = t || this.common.initCrdtLongDivisionElements();
        var a = _.clone(t[1]);
        var i = {
            type: "long-division-elements",
            divident: void 0,
            divisor: void 0,
            quotient: void 0,
            remainders: void 0
        };
        this.detectField("divident", e, r, a, n, i);
        this.detectField("divisor", e, r, a, n, i);
        this.detectField("quotient", e, r, a, n, i);
        var o = this.remaindersToList(e);
        var s = this.remaindersToList(r);
        var l = this.entityListDs.detect(o, a.remainders, n, s);
        return l.data && (i.remainders = l.data),
            a.remainders = l.crdt,
        {
            type: "long-division-elements",
            crdt: ["long-division-elements", a],
            data: pn.objectAsUndefinedIfAllPropertiesNull(i)
        };
    }
    remaindersToList(e) {
        return Remainder.getRemaindersSortedKeys1(_.keys(e)).map((t) => {
            return e[t];
        });
    }
    detectField(e, t, n, r, a, i) {
        if (t[e] != n[e]) {
            var o = this.editorDs.detect(t[e], r[e], a, n[e]);
            r[e] = o.crdt;
            if (o.data) {
                i[e] = o.data;
            }
        }
    }
}
class vr {
    constructor(e) {
        this.common = e;
    }
    setCommonEditorDs(e) {
        this.innerEditorDs = e;
    }
    setDiagramEditorDs(e) {
        this.innerDiagramEditorDs = e;
    }
    longDivisionElementsDs() {
        return new Er(this.common, this.innerEditorDs, this.entityListDs(this.listItemDs(this.innerEditorDs)));
    }
    tabularDs(e, t) {
        return new zn(this.common, new Yn(e), t, this.elementsDs());
    }
    tableDs(e, t) {
        return new Qn(this.common, new Yn(e), t, this.elementsDs());
    }
    swapableEntityListDs(e) {
        return new er(this.common, e);
    }
    alwaysNewMapField() {
        return new mr(this.common);
    }
    alwaysObjectMapField(e, t) {
        return new Nn(this.common, e, t);
    }
    diffOnUpdateMapField(e) {
        return new fr(this.common, e);
    }
    mapDs(e) {
        var t = new Bn(this.common, e);
        var n = arguments.length;
        var r = new Array(n > 1 ? n - 1 : 0);
        var a = 1;
        for (; a < n; a++) {
            r[a - 1] = arguments[a];
        }
        return r && r.length > 0 && (t.excludeFields = r),
            t;
    }
    editorDs() {
        if (!this.innerEditorDs) {
            throw new Error("editorDs");
        }
        return this.innerEditorDs;
    }
    diagramEditorDs() {
        if (!this.diagramEditorDs) {
            throw new Error("diagramEditorDs");
        }
        return this.diagramEditorDs;
    }
    editorMapFieldDs(e) {
        return this.filterMapField(["lines"], this.linesMapFieldDs(e), this.rawDataFieldDs());
    }
    diagramEditorMapFieldDs(e) {
        return this.switchMapField(this.switches(this.
            switch("lines", this.linesMapFieldDs(e)), this.
                switch("shape", this.diagramEditorShape())), this.rawDataFieldDs());
    }
    diagramEditorShape() {
        return this.alwaysObjectMapField(this.mapDs(this.switchMapField(this.switches(this.
            switch("style", this.styleFieldDs()), this.
                switch("settings", this.styleFieldDs())), this.rawDataFieldDs())), {});
    }
    linesMapFieldDs(e) {
        return this.alwaysObjectMapField(this.entityListDs(this.listItemDs(this.mapDs(this.filterMapField(["blocks"], this.alwaysObjectMapField(this.blocksDs(new pr(e)), []), this.rawDataFieldDs())))), []);
    }
    blocksDs(e) {
        return new dr(this.common, e);
    }
    tempElementsMapDs(e) {
        return new Jn(this.common, new Bn(this.common, this.editorFieldDs()), e);
    }
    toggleElementsMapDs(e) {
        return new $n(this.common, new Bn(this.common, this.editorFieldDs()), e);
    }
    entityListDs(e) {
        return new Zn(this.common, e);
    }
    listItemDs(e) {
        return new gr(e);
    }
    filterListItemDs(e, t) {
        return new Xn(e, t);
    }
    withEditorDetection(e) {
        return this.innerEditorDs != e && (this.cachedElementsFieldDs = null, this.cachedElementsDs = null),
            this.innerEditorDs = e,
            this;
    }
    editorFieldDs() {
        if (!this.innerEditorDs) {
            throw new Error("should set editor detection");
        }
        return this.cachedEditorFieldDs || (this.cachedEditorFieldDs = this.diffOnUpdateMapField(this.innerEditorDs)),
            this.cachedEditorFieldDs;
    }
    elementsDs() {
        return this.cachedElementsDs || (this.cachedElementsDs = new Bn(this.common, this.editorFieldDs())),
            this.cachedElementsDs;
    }
    elementsFieldDs() {
        return this.cachedElementsFieldDs || (this.cachedElementsFieldDs = this.alwaysObjectMapField(this.elementsDs(), {})),
            this.cachedElementsFieldDs;
    }
    diagramElementsFieldDs() {
        return this.alwaysObjectMapField(this.mapDs(this.diffOnUpdateMapField(this.innerDiagramEditorDs)), {});
    }
    styleFieldDs() {
        return this.cachedStyleFieldDs || (this.cachedStyleFieldDs = this.alwaysObjectMapField(this.rawDataDs(), {})),
            this.cachedStyleFieldDs;
    }
    rawDataDs() {
        return this.cachedRawDataDs || (this.cachedRawDataDs = new yr(this.common)),
            this.cachedRawDataDs;
    }
    filterMapField(e, t, n) {
        return new Pn(e, t, n);
    }
    switchMapField(e, t) {
        return new Fn(e, t);
    }
    switches() {
        var e = arguments.length;
        var t = new Array(e);
        var n = 0;
        for (; n < e; n++) {
            t[n] = arguments[n];
        }
        return t;
    }
    switch(e, t) {
        return {
            key: e,
            item: t
        };
    }
    rawDataFieldDs() {
        return this.cachedRawDataFieldDs || (this.cachedRawDataFieldDs = this.alwaysNewMapField()),
            this.cachedRawDataFieldDs;
    }
}
class Sr {
    constructor(e) {
        this.type = "map";
        this.bd = new vr(e);
        var t = this.bd.mapDs(null);
        var n = this.bd.mapDs(null);
        this.bd.setCommonEditorDs(t);
        this.bd.setDiagramEditorDs(n);
        t.setFieldDs(this.bd.editorMapFieldDs(this.bd));
        n.setFieldDs(this.bd.diagramEditorMapFieldDs(this.bd));
        this.editorDs = this.bd.mapDs(this.bd.editorMapFieldDs(this.bd), "theoremInfo", "pageSettings");
        this.pageSettingsDs = this.bd.mapDs(this.bd.alwaysNewMapField());
        this.theoremInfoDs = this.bd.mapDs(this.bd.alwaysNewMapField());
    }
    detectRootEditor(e, t, n, r) {
        t = t || {
            editor: null,
            pageSettings: null,
            theoremInfo: null
        };
        var a = this.editorDs.detect(e, t.editor, n, r);
        var i = this.pageSettingsDs.detect(e.pageSettings, t.pageSettings, n, r.pageSettings);
        var o = this.theoremInfoDs.detect(e.theoremInfo, t.theoremInfo, n, r.theoremInfo);
        return {
            crdt: {
                editor: a.crdt,
                pageSettings: i.crdt,
                theoremInfo: o.crdt
            },
            data: {
                editor: a.data,
                pageSettings: i.data,
                theoremInfo: o.data,
                cursor: void 0
            }
        };
    }
}
class Cr {
    constructor(e) {
        this.mapMs = e;
    }
    mergeRootEditor(e, t, n, r) {
        t = t || {
            editor: null,
            pageSettings: null,
            theoremInfo: null
        };
        var a = this.mapMs.mergeMap(e, t.editor, n, r.editor);
        var i = this.mapMs.mergeMap(e.pageSettings, t.pageSettings, n, r.pageSettings);
        var o = this.mapMs.mergeMap(e.theoremInfo, t.theoremInfo, n, r.theoremInfo);
        return {
            crdt: {
                editor: a.crdt,
                pageSettings: i.crdt,
                theoremInfo: o.crdt
            },
            editor: a.data,
            pageSettings: i.data,
            theoremInfo: o.data
        };
    }
}
var xr = new class {
    merge(e, t, n) {
        var r = _.clone(e);
        return _.keys(n).forEach((e) => {
            r[e] = this.mergeOnStyle(r[e], t, n[e]);
        }),
            r;
    }
    mergeOnStyle(e, t, n) {
        e = e || new Array(t);
        var r = new Array(t);
        var a = 0;
        for (; a < t; a++) {
            var i = e[a];
            var o = n[a];
            if (i && i.siteOp) {
                if (o && o.siteOp) {
                    var s = $t.compareSiteOperation(i.siteOp, o.siteOp);
                    r[a] = s <= 0 ? o : i;
                } else {
                    r[a] = i;
                }
            } else {
                r[a] = o;
            }
        }
        return r;
    }
};
var Ir = new class {
    partition(e, t) {
        var n = t.length;
        if (n <= 0) {
            return [];
        }
        var r = t[0];
        var a = sr.isCharBlock(r) ? r.id : void 0;
        var i = _.keys(e);
        var o = [{
            from: 0,
            to: 0,
            styles: this.buildStyleMap(i, e, 0),
            singleBlockId: a
        }];
        var s = 1;
        for (; s < n; s++) {
            var l = o[o.length - 1];
            var c = t[s];
            var d = sr.isCharBlock(c);
            if (l.singleBlockId || d || !this.compareToLastEquals(i, l, e, s)) {
                o.push({
                    from: s,
                    to: s,
                    styles: this.buildStyleMap(i, e, s),
                    singleBlockId: d ? c.id : void 0
                });
            } else {
                l.to = s;
            }
        }
        return o;
    }
    buildStyleMap(e, t, n) {
        if (!e || e.length <= 0) {
            return null;
        }
        var r = {};
        return e.forEach((e) => {
            r[e] = t[e][n] && t[e][n].value;
        }),
            r;
    }
    compareToLastEquals(e, t, n, r) {
        if (!e || e.length <= 0) {
            return true;
        }
        var a = true;
        var i = false;
        var o = void 0;
        try {
            var s;
            var l = e[Symbol.iterator]();
            for (; !(a = (s = l.next()).done); a = true) {
                var c = s.value;
                var d = n[c][r];
                var h = t.styles[c];
                if (d) {
                    if (h != d.value) {
                        return false;
                    }
                } else {
                    if (h) {
                        return false;
                    }
                }
            }
        } catch (e) {
            i = true;
            o = e;
        } finally {
            try {
                if (!(a || null == l.
                    return)) {
                    l.
                        return();
                }
            } finally {
                if (i) {
                    throw o;
                }
            }
        }
        return true;
    }
};
var Tr = new class {
    apply(e, t, n) {
        var r = 0;
        var a = 0;
        var i = e.length;
        var o = [];
        t = _.clone(t);
        for (; r < i;) {
            var s = e[r];
            var l = t[a];
            if (s.singleBlockId) {
                var c = this.findIndexFrom(a, t, s.singleBlockId);
                if (c < 0) {
                    throw new Error("My algorithm is wrong !!!");
                }
                o.push(this.mergeSingleBlock(t[c], s));
                r++;
                t.splice(c, 1);
            } else {
                var d = n.slice(s.from, s.to + 1).join("");
                if (l && !l.type) {
                    o.push(this.createTextBlock(l, s, d));
                    r++;
                    a++;
                } else {
                    o.push(this.createTextBlock(null, s, d));
                    r++;
                }
            }
        }
        return o;
    }
    findIndexFrom(e, t, n) {
        var r = e;
        for (; e < t.length; r++) {
            if (t[r].id === n) {
                return r;
            }
        }
        return -1;
    }
    mergeSingleBlock(e, t) {
        return _.assignIn({},
            e, {
            style: t.styles
        });
    }
    createTextBlock(e, t, n) {
        return e ? e.text === n && ArrayHelper.objectMemberEquals(e.style || {},
            t.styles) ? e : {
                id: e.id,
                text: n,
                style: t.styles
            } : {
                id: DiagramIdHelper.nextId(),
                text: n,
                style: t.styles
            };
    }
};
var br = new class {
    build(e, t, n) {
        var r = Ir.partition(n, t);
        return Tr.apply(r, e, t);
    }
};
var Lr = new class {
    mergeText(e, t, n) {
        if (e = e || [], t = t || [], !n) {
            return {
                chars: e,
                crdtChars: t,
                insertionBlocks: [],
                deletionBlockIds: [],
                opsBuffer: void 0
            };
        }
        var r = bn.makeCrdtPairs(e, t);
        var a = n.deletions || [];
        var i = n.insertions || [];
        var o = [];
        var s = [];
        var l = {
            deletions: [],
            insertions: []
        };
        return i = i.filter((e) => {
            var n = Rn.existPositionWithDifferentLamport(t, e.position);
            return n && (en.warn("unmatched index for insertion,added to buffer"), en.log(e), l.insertions.push(e)),
                !n;
        }),
            r = r.concat(i.map((e) => {
                var t = e.text;
                return sr.isCharBlock(t) ? (o.push(e.block), {
                    crdtItem: tr.toBlockCharInfo(e.position, void 0),
                    item: t
                }) : {
                        crdtItem: tr.itemPositionToCharPosition(e.position, t.length),
                        item: e.text
                    };
            })),
            $t.sort(r, (e) => {
                return e.crdtItem;
            }),
            a.forEach((e) => {
                var t = Rn.findIndexBy(r, e, (e) => {
                    return e.crdtItem;
                },
                    "include-lamport");
                if (t < 0) {
                    return en.warn("unmatched index for deletion,added to buffer"),
                        en.log(e),
                        void l.deletions.push(e);
                }
                var n = r[t];
                if (sr.isCharBlock(n.item)) {
                    s.push(n.item.id);
                }
                r.splice(t, 1);
            }),
        {
            chars: r.map((e) => {
                return e.item;
            }),
            crdtChars: r.map((e) => {
                return e.crdtItem;
            }),
            insertionBlocks: o,
            deletionBlockIds: s,
            opsBuffer: this.toUndefinedIfEmpty(l)
        };
    }
    toUndefinedIfEmpty(e) {
        if (!(e.deletions.length <= 0 && e.insertions.length <= 0)) {
            return e;
        }
    }
};
var Rr = new class {
    sync(e, t, n) {
        return e.filter((e) => {
            return !t.includes(e.id);
        }).concat(n);
    }
};
class Mr {
    constructor(e) {
        this.anyDataMs = e;
    }
    merge(e, t, n, r) {
        r = r || [];
        e = _.clone(e);
        n = _.clone(n);
        var a = [];
        return r.forEach((r) => {
            var i = Rn.findIndexBy(e, r.position, (e) => {
                return e;
            },
                "include-lamport");
            if (i < 0) {
                return en.warn("updation for single block unmatched,add to buffer"),
                    void a.push(r);
            }
            var o = t[i];
            if (!sr.isCharBlock(o)) {
                throw new kn("char-info", "expect char unit as composite block");
            }
            var s = n.findIndex((e) => {
                return e.id === o.id;
            });
            if (s < 0) {
                throw new Error("Something wrong with my algorithm");
            }
            var l = n[s];
            var c = e[i];
            var d = $t.itemPositionToSiteInfo(c);
            var h = this.anyDataMs.mergeData(l, tr.getBlockCrdt(c), d, r.value);
            e[i] = tr.toBlockCharInfo(c, h.crdt);
            n[s] = _.assignIn({},
                h.data, {
                style: l.style
            });
        }),
        {
            crdtChars: e,
            blocks: n,
            opsBuffer: a
        };
    }
}
class wr {
    constructor(e, t) {
        this.crdtDataCompression = new nr(e);
        this.singleBlockUpdation = new Mr(t);
    }
    mergeBlocks(e, t, n, r) {
        var a;
        var i = sr.blocksToCharArrs(e, t && t[1].chars);
        if (t = t || cr.initCrdt(e, i, n), !r) {
            return {
                type: "blocks",
                crdt: t,
                data: e
            };
        }
        r = nn.merge(r, t[2]);
        var o = _.flatten(i);
        if (t[1].chars.length != o.length) {
            en.warn("Something wrong with crdt in MS");
        }
        var s = Lr.mergeText(o, t[1].chars, r.textUpdate);
        a = nn.addTextUpdate(a, s.opsBuffer);
        var l = Rr.sync(e, s.deletionBlockIds, s.insertionBlocks);
        var c = this.singleBlockUpdation.merge(s.crdtChars, s.chars, l, r.textUpdate && r.textUpdate.updations);
        a = nn.addSingleBlockUpdate(a, c.opsBuffer);
        var d = c.crdtChars;
        var h = this.mergeStyles(e, c.blocks, i, t[1].styleMap, t[1].chars, s.chars, d, r);
        return a = nn.addBlockStyleUpdate(a, h.opsBuffer),
            d.length != s.chars.length && en.warn("Something wrong with crdt in MS"),
        {
            type: "blocks",
            data: h.blocks,
            crdt: ["blocks", {
                chars: d,
                styleMap: h.styleMap
            },
                a]
        };
    }
    mergeStyles(e, t, n, r, a, i, o, s) {
        s = s || {
            type: "blocks",
            styleUpdates: void 0,
            textUpdate: void 0
        };
        var l = this.crdtDataCompression.crdtUncompress(r, e, n);
        var c = this.crdtDataCompression.operationUncompress(s.styleUpdates, o);
        var d = slicedToArray(c, 2);
        var h = d[0];
        var u = d[1];
        var p = ar.sync(l, a, s.textUpdate);
        var m = xr.merge(p, i.length, h);
        return {
            blocks: br.build(t, i, m),
            styleMap: this.crdtDataCompression.crdtCompress(m),
            opsBuffer: u
        };
    }
}
var Or = new class {
    merge(e, t, n, r, a) {
        a = a || [];
        e = ArrayHelper2.cloneSetLength(e, n.length);
        t = ArrayHelper2.cloneSetLength(t, n.length);
        var i = jn.sync(bn.makeCrdtPairs(e, t), n, r, {
            item: null,
            crdtItem: null
        });
        var o = [];
        return a.forEach((e) => {
            var t = Rn.findIndexBy(r, e.position, (e) => {
                return e;
            },
                "include-lamport");
            if (t < 0) {
                o.push(e);
            } else {
                var n = i[t];
                if (!n.crdtItem || $t.compareSiteOperation(n.crdtItem, e.siteInfo) < 0) {
                    i[t] = {
                        item: e.value,
                        crdtItem: e.siteInfo
                    };
                }
            }
        }),
        {
            crdt: i.map((e) => {
                return e.crdtItem;
            }),
            values: i.map((e) => {
                return e.item;
            }),
            opsBuffer: pn.arrayAsUndefinedIfEmpty(o)
        };
    }
};
class Dr {
    constructor(e, t) {
        this.common = e;
        this.baseMergeableTabularMs = t;
    }
    mergeTable(e, t, n, r) {
        if (t = t || this.common.initCrdtTable(e, n), !r) {
            return {
                type: "table",
                crdt: t,
                data: e
            };
        }
        var a = this.baseMergeableTabularMs.mergeCellMergeableTabular(e, this.toMergeableCrdt(t), n, this.toMergeableTabularUpdate(r));
        r = r || {
            type: "table-update"
        };
        var i = t[1].columnWidths;
        var o = t[1].rowHeights;
        var s = e.columnWidths;
        var l = e.rowHeights;
        var c = this.mergeRowHeightOrColumnWidths(t[2], r) || {
            columnWidths: void 0,
            rowHeights: void 0
        };
        var d = {
            columnWidths: [],
            rowHeights: []
        };
        if (this.isColumnChanged(r) || c.columnWidths) {
            var h = Or.merge(e.columnWidths, t[1].columnWidths, t[1].elements.columns, a.crdt[1].elements.columns, c.columnWidths);
            i = h.crdt;
            s = h.values;
            if (h.opsBuffer) {
                d.columnWidths = d.columnWidths.concat(h.opsBuffer);
            }
        }
        if (this.isRowChanged(r) || c.rowHeights) {
            var u = Or.merge(e.rowHeights, t[1].rowHeights, t[1].elements.rows, a.crdt[1].elements.rows, c.rowHeights);
            o = u.crdt;
            l = u.values;
            if (u.opsBuffer) {
                d.rowHeights = d.rowHeights.concat(u.opsBuffer);
            }
        }
        return {
            type: "table",
            crdt: ["table", _.assignIn({},
                a.crdt[1], {
                columnWidths: i,
                rowHeights: o
            }), this.mergeSpecificTableUpdate(this.toTableUpdate(a.crdt[2]), d)],
            data: _.assignIn({},
                a.data, {
                columnWidths: s,
                rowHeights: l
            })
        };
    }
    toTableUpdate(e) {
        return _.assignIn({},
            e, {
            mergeableLayer: void 0,
            rowHeights: void 0,
            columnWidths: void 0,
            type: "table-update"
        });
    }
    mergeSpecificTableUpdate(e, t) {
        return t.columnWidths.length <= 0 && t.rowHeights.length <= 0 ? pn.objectAsUndefinedIfAllPropertiesNull(e) : pn.objectAsUndefinedIfAllPropertiesNull(_.assignIn({},
            e, {
            rowHeights: tn.mergeArray(e.rowHeights, t.rowHeights),
            columnWidths: tn.mergeArray(e.columnWidths, t.columnWidths)
        }));
    }
    toMergeableCrdt(e) {
        return ["mergeable-tabular", e[1], this.toTabularUpdate(e[2])];
    }
    toTabularUpdate(e) {
        return tn.toUpdateType(e, "tabular-update");
    }
    toMergeableTabularUpdate(e) {
        return tn.toUpdateType(e, "mergeable-tabular-update");
    }
    mergeRowHeightOrColumnWidths(e, t) {
        return e && t ? {
            columnWidths: tn.mergeArray(e.columnWidths, t.columnWidths),
            rowHeights: tn.mergeArray(e.rowHeights, t.rowHeights)
        } : e || t;
    }
    isColumnChanged(e) {
        return e && e.elements && e.elements.columnOperations;
    }
    isRowChanged(e) {
        return e && e.elements && e.elements.rowOperations;
    }
}
class Nr {
    constructor(e) {
        this.dataMs = e;
    }
    onMergeItem(e, t, n, r) {
        var a = this.dataMs.mergeData(e, t.value, n, r.value);
        return {
            crdtItem: _.assignIn({},
                t, {
                value: a.crdt
            }),
            data: a.data
        };
    }
}
class kr {
    constructor(e, t) {
        this.common = e;
        this.dataMs = t;
    }
    onMergeField(e, t, n, r) {
        switch (r.type) {
            case "field-put":
                return this.handleFieldPut(t, r);
            case "cs-field-updation":
                return this.handleCausalFieldUpdation(e, t, r);
            case "mk-field-updation":
                return this.handleMatchKeyFieldUpdation(e, t, n, r);
            default:
                Jt();
        }
    }
    handleCausalFieldUpdation(e, t, n) {
        if (!t) {
            return {
                result: void 0,
                opBuffer: n
            };
        }
        var r = $t.compareFieldPosition(t.position, n.position);
        if (r < 0) {
            return {
                result: void 0,
                opBuffer: n
            };
        }
        if (r > 0) {
            return {
                result: void 0,
                opBuffer: void 0
            };
        }
        var a = this.dataMs.mergeData(e, t.value, $t.fieldPositionToSiteInfo(t.position), n.value);
        return {
            result: {
                crdtField: {
                    position: t.position,
                    value: a.crdt
                },
                data: a.data
            },
            opBuffer: void 0
        };
    }
    handleFieldPut(e, t) {
        return e && $t.compareFieldPosition(e.position, t.position) > 0 ? {
            result: void 0,
            opBuffer: void 0
        } : {
                result: {
                    crdtField: {
                        position: t.position,
                        value: void 0
                    },
                    data: t.value
                },
                opBuffer: void 0
            };
    }
    handleMatchKeyFieldUpdation(e, t, n, r) {
        e = e || r.defaultValue;
        t = t || {
            position: this.common.newFieldPosition(r.key),
            value: null
        };
        var a = this.dataMs.mergeData(e, t.value, n, r.value);
        return {
            result: {
                crdtField: {
                    position: t.position,
                    value: a.crdt
                },
                data: a.data
            },
            opBuffer: void 0
        };
    }
}
class Br {
    constructor(e, t, n) {
        this.common = e;
        this.mapMs = t;
        this.entityListMs = n;
    }
    merge(e, t, n, r) {
        if (t = t || this.common.initCrdtLongDivisionElements(), !r) {
            return {
                type: "long-division-elements",
                crdt: t,
                data: e
            };
        }
        var a = _.clone(t[1]);
        var i = {
            divident: e.divident,
            divisor: e.divisor,
            quotient: e.quotient
        };
        if (r.remainders) {
            i = {
                divident: e.divident,
                divisor: e.divisor,
                quotient: e.quotient
            };
            var o = this.remaindersToList(e);
            var s = this.entityListMs.mergeEntityList(o, a.remainders, n, r.remainders);
            a.remainders = s.crdt;
            this.entitiesToRemainders(s.data, i);
        } else {
            i = _.clone(e);
        }
        return this.mergeField("divident", i, a, n, r),
            this.mergeField("divisor", i, a, n, r),
            this.mergeField("quotient", i, a, n, r),
        {
            type: "long-division-elements",
            crdt: ["long-division-elements", a],
            data: i
        };
    }
    entitiesToRemainders(e, t) {
        e.forEach((e, n) => {
            t[Remainder.buildRemainderKey(n)] = e;
        });
    }
    mergeField(e, t, n, r, a) {
        if (a[e]) {
            var i = this.mapMs.mergeMap(t[e], n[e], r, a[e]);
            n[e] = i.crdt;
            t[e] = i.data;
        }
    }
    remaindersToList(e) {
        return Remainder.getRemaindersSortedKeys1(_.keys(e)).map((t) => {
            return e[t];
        });
    }
}
class Pr {
    constructor(e) {
        this.common = e;
        this.mergeRootEditor = (e, t, n) => {
            return this.rootEditorMs.mergeRootEditor(e, t, this.common.getDefaultSiteOp(), n);
        };
        this.detectRootEditor = (e, t, n) => {
            return this.rootEditorDs.detectRootEditor(e, t, {
                lamport: 0,
                site: 0
            },
                n);
        };
        var t = new on(null, null, null, null, null, null, null, null, null, null, null);
        var n = new Nr(t);
        var r = new kr(e, t);
        var a = new Mn(e, n);
        var i = new Dn(e, n);
        var o = new rn(e, r);
        var s = new wn(e, o);
        var l = new On(e, o);
        var c = new gn(e, new yn(o), o);
        var d = new Tn(e, c);
        var h = new Dr(e, d);
        var u = new An(e);
        var p = new wr(e, t);
        var m = new Br(e, o, a);
        t.entityListMs = a;
        t.swapableEntityListMs = i;
        t.mapMs = o;
        t.tempElemensMapMs = s;
        t.toggleElementsMapMs = l;
        t.tabularMs = c;
        t.mergeableTabularMs = d;
        t.tableMs = h;
        t.rawDataMs = u;
        t.blocksMs = p;
        t.longDivisionElementsMs = m;
        this.rootEditorDs = new Sr(e);
        this.rootEditorMs = new Cr(o);
    }
}
class Fr {
    constructor(e) {
        this.lineLevel = e;
    }
    detect(e, t, n) {
        if (!n) {
            return this.detectEditorWithoutCrdt(e, t);
        }
        var r = n[1].find((e) => {
            return "lines" == $t.key(e.position);
        });
        if (!r) {
            return this.detectEditorWithoutCrdt(e, t);
        }
        if (!r.value) {
            return this.detectEditorWithoutCrdt(e, t);
        }
        if ("entity-list" != r.value[0]) {
            throw new kn("wrong-crdt-type", "lines must have crdt type as entity list");
        }
        var a = r.value[1][e.lineIndex];
        if (!a) {
            throw new kn("index outbound", "line index out of bound");
        }
        return this.lineLevel.detect(e, a);
    }
    detectEditorWithoutCrdt(e, t) {
        var n = {
            lineIndex: this.inferIndex(e.lineIndex, t),
            charIndex: this.inferIndex(e.charIndex, t)
        };
        return e.key && e.selected && (n.key = e.key, n.selected = this.detect(e.selected, t, null)),
            n;
    }
    inferIndex(e, t) {
        return [t.lamport, [e, t.site]];
    }
}
class Hr {
    constructor(e) {
        this.blockLevel = e;
    }
    detect(e, t) {
        if (!t.value) {
            return this.detectEditorWithoutCharIndex(e, t);
        }
        if ("map" != t.value[0]) {
            throw new kn("wrong-crdt-type", "line must have crdt type as map");
        }
        var n = t.value[1].find((e) => {
            return "blocks" == $t.key(e.position);
        });
        if (!n || !n.value) {
            return this.detectEditorWithoutCharIndex(e, t);
        }
        if ("blocks" != n.value[0]) {
            throw new kn("wrong-crdt-type", "blocks must have crdt type as blocks");
        }
        var r = n.value[1];
        if (!r || !r.chars) {
            return this.detectEditorWithoutCharIndex(e, t);
        }
        if (e.charIndex === r.chars.length) {
            return 0 === r.chars.length ? {
                lineIndex: t.position,
                charIndex: [0, [0, 0]]
            } : {
                    lineIndex: t.position,
                    charIndex: tr.itemPositionFromCharInfo(r.chars[r.chars.length - 1]),
                    anchorRight: true
                };
        }
        var a = r.chars[e.charIndex];
        if (!a) {
            return console.warn("char info should be found"),
            {
                lineIndex: t.position,
                charIndex: [0, [0, 0]]
            };
        }
        if (!e.key || !e.selected) {
            return {
                lineIndex: t.position,
                charIndex: tr.itemPositionFromCharInfo(a)
            };
        }
        if (!$t.isCharBlockTextFromCharInfo(a)) {
            throw new kn("wrong-crdt-type", "char info must be block char info");
        }
        var i = $t.itemPositionToSiteInfo(a);
        var o = this.blockLevel.detect(e.selected, e.key, i, tr.getBlockCrdt(a));
        var s = slicedToArray(o, 2);
        var l = s[0];
        var c = s[1];
        return {
            lineIndex: t.position,
            charIndex: tr.itemPositionFromCharInfo(a),
            key: c || e.key,
            selected: l
        };
    }
    detectEditorWithoutCharIndex(e, t) {
        var n = $t.itemPositionToSiteInfo(t.position);
        var r = {
            lineIndex: t.position,
            charIndex: this.inferIndex(e.charIndex, n)
        };
        if (e.key && e.selected) {
            var a = this.blockLevel.detect(e.selected, e.key, n, null);
            var i = slicedToArray(a, 2);
            var o = i[0];
            var s = i[1];
            r.key = s || e.key;
            r.selected = o;
        }
        return r;
    }
    inferIndex(e, t) {
        return [t.lamport, [e, t.site]];
    }
}
var _r = new class {
    longDivisionElementsToMap(e) {
        var t = [{
            position: $t.fieldPosition("divident", 0, 0),
            value: e[1].divident
        },
        {
            position: $t.fieldPosition("divisor", 0, 0),
            value: e[1].divisor
        },
        {
            position: $t.fieldPosition("quotient", 0, 0),
            value: e[1].quotient
        }];
        if (e[1].remainders) {
            var n = e[1].remainders[1].map((e, t) => {
                return {
                    position: $t.fieldPosition(Remainder.buildRemainderKey(t), 0, 0),
                    value: e.value
                };
            });
            t = t.concat(n);
        }
        return ["map", t, void 0];
    }
};
class Ur {
    constructor(e) {
        this.editorLevel = e;
    }
    detect(e, t, n, r) {
        if (!r) {
            return [this.editorLevel.detect(e, n, null), null];
        }
        switch (r[0]) {
            case "entity-list":
            case "raw-data":
            case "swapable-entity-list":
            case "blocks":
                throw new kn("unexpected-crdt-type", "Unexpected ".concat(r[0], " for block"));
            case "map":
                return [this.detectBlock(e, t, n, r)];
            case "mergeable-tabular":
            case "table":
            case "tabular":
                return this.detectTabular(e, t, n, r[1]);
            case "temp-elements-map":
            case "toggle-elements-map":
                return [this.detectElements(e, t, n, r[1].elements)];
            case "long-division-elements":
                return [this.detectElements(e, t, n, _r.longDivisionElementsToMap(r))];
        }
        Jt(r[0]);
    }
    detectTabular(e, t, n, r) {
        if (!TabularHelper.isKeyInTabularFormat(t)) {
            return [this.detectElements(e, t, n, r.nonCellInElements)];
        }
        var a = TabularHelper.getTabularCellIndexFromKey(t);
        var i = a.row;
        var o = a.column;
        var s = r.elements.rows[i];
        var l = r.elements.columns[o];
        var c = r.elements.cells.find((e) => {
            return $t.cellPositionEquals(s, l, e.row, e.column, "include-lamport");
        });
        return [this.editorLevel.detect(e, $t.itemPositionToSiteInfo(c.row), c.value), {
            row: s,
            column: l
        }];
    }
    detectElements(e, t, n, r) {
        if (!r) {
            return this.editorLevel.detect(e, n, null);
        }
        if ("map" == r[0]) {
            return this.detectElemetsMap(e, t, n, r);
        }
        if ("long-division-elements" == r[0]) {
            return this.detectElements(e, t, n, _r.longDivisionElementsToMap(r));
        }
        throw new Error("ds:not supported elements cursor");
    }
    detectElemetsMap(e, t, n, r) {
        var a = r[1].find((e) => {
            return $t.key(e.position) == t;
        });
        if (!a || !a.value) {
            return this.editorLevel.detect(e, n);
        }
        if ("map" != a.value[0]) {
            throw new kn("wrong-crdt-type", "found editor must have crdt type as map");
        }
        var i = $t.fieldPositionToSiteInfo(a.position);
        return this.editorLevel.detect(e, i, a.value);
    }
    detectBlock(e, t, n, r) {
        if (!r) {
            return this.editorLevel.detect(e, n, null);
        }
        var a = r[1].find((e) => {
            return "elements" == $t.key(e.position);
        });
        return a && a.value ? this.detectElements(e, t, n, a.value) : this.editorLevel.detect(e, n);
    }
}
class Wr {
    constructor(e) {
        this.rootSiteOp = e;
        var t = new Ur(null);
        var n = new Hr(t);
        var r = new Fr(n);
        t.editorLevel = r;
        this.editorLevel = r;
    }
    detect(e, t) {
        var n = t.editor;
        return this.detectEditor(e, this.rootSiteOp, n);
    }
    detectEditor(e, t, n) {
        return this.editorLevel.detect(e, t, n);
    }
}
class Gr {
    constructor(e, t) {
        this.colSession = e;
        this.handler = new Pr(t);
        this.cursorDs = new Wr(t.getDefaultSiteOp());
    }
    getCursorDs() {
        return this.cursorDs;
    }
    detectCursor(e) {
        var t = this.colSession;
        return t.isSelectedChanged(e) && e ? [this.cursorDs.detect(e, t.getCrdtOrEmpty()), e] : null;
    }
    detect(e, t) {
        var n = this.colSession;
        var r = n.isPageSettingsChanged(e.pageSettings);
        var a = n.isTheoremInfoChanged(e.theoremInfo);
        if (!n.isEditorChanged(e) && !r && !a) {
            return null;
        }
        var i = n.getEditor();
        if (r || a) {
            i = _.assignIn({},
                i, {
                pageSettings: n.getPageSettings(),
                theoremInfo: n.getTheoremInfo()
            });
        }
        var o = this.handler.detectRootEditor(i, n.getCrdt(), e);
        var s = t ? this.cursorDs.detect(t, o.crdt) : null;
        return {
            ops: o.data,
            crdtCursor: s,
            cursor: t,
            crdtEditor: o.crdt,
            editor: e
        };
    }
}
var zr = new class {
    searchIndex(e, t, n) {
        var r = e.length;
        var a = 0;
        for (; a < r; a++) {
            var i = e[a].position;
            var o = $t.positionComparator(i, t);
            if (0 === o) {
                return a;
            }
            if (o > 0) {
                return a;
            }
        }
        return n;
    }
    searchIndex1(e, t, n) {
        var r = e.length;
        var a = 0;
        for (; a < r; a++) {
            var i = e[a];
            var o = $t.positionComparator(i, t);
            if (0 === o) {
                return a;
            }
            if (o > 0) {
                return a;
            }
        }
        return n;
    }
};
var Yr = new class {
    inferKeyAsString(e) {
        return "string" == typeof e ? e : e.row && e.column ? TabularHelper.getKeyFromRowCol($t.iDigit($t.iIdentifiers(e.row), 0), $t.iDigit($t.iIdentifiers(e.column), 0)) : (console.warn("Can not identify key type?"), "____unknownkey___");
    }
};
class Kr {
    constructor(e) {
        this.lineLevel = e;
    }
    mergeEditor(e, t) {
        if (!t) {
            return this.mergeEditorWithoutCrdt(e);
        }
        var n = t[1].find((e) => {
            return "lines" == $t.key(e.position);
        });
        if (!n) {
            return this.mergeEditorWithoutCrdt(e);
        }
        if (!n.value) {
            return this.mergeEditorWithoutCrdt(e);
        }
        if ("entity-list" != n.value[0]) {
            throw new kn("wrong-crdt-type", "lines must have crdt type as entity list");
        }
        var r = zr.searchIndex(n.value[1], e.lineIndex, n.value[1].length - 1);
        var a = n.value[1][r];
        return this.lineLevel.mergeLine(e, a, r);
    }
    mergeEditorWithoutCrdt(e) {
        var t = $t.iIdentifiers(e.lineIndex);
        var n = $t.iIdentifiers(e.charIndex);
        if (t.length > 2 || n.length > 2) {
            console.warn("CharIndex Identifiers should be at default,[it's possible to happen ]");
        }
        var r = {
            lineIndex: Math.max($t.iDigit(t, 0), 0),
            charIndex: Math.max($t.iDigit(n, 0), 0)
        };
        return e.key && (r.key = Yr.inferKeyAsString(e.key), r.selected = this.mergeEditorWithoutCrdt(e.selected)),
            r;
    }
}
class Vr {
    constructor(e) {
        this.blockLevel = e;
    }
    mergeLine(e, t, n) {
        if (!t.value) {
            return this.mergeEditorWithoutCharIndexCrdt(e, n);
        }
        if ("map" != t.value[0]) {
            return console.warn("line must have crdt type as map [possible scenario:info deleted or not comming]"),
                this.mergeEditorWithoutCharIndexCrdt(e, n);
        }
        var r = t.value[1].find((e) => {
            return "blocks" == $t.key(e.position);
        });
        if (!r || !r.value) {
            return this.mergeEditorWithoutCharIndexCrdt(e, n);
        }
        if ("blocks" != r.value[0]) {
            throw new kn("wrong-crdt-type", "blocks must have crdt type as blocks");
        }
        var a = r.value[1];
        if (!a || !a.chars) {
            return this.mergeEditorWithoutCharIndexCrdt(e, n);
        }
        if (null == e.charIndex) {
            return {
                lineIndex: n,
                charIndex: 0
            };
        }
        var i = zr.searchIndex1(a.chars, e.charIndex, a.chars.length);
        if (e.anchorRight && i++ , !e.key || !e.selected) {
            return {
                lineIndex: n,
                charIndex: i
            };
        }
        var o = a.chars[i];
        if (!o) {
            return console.warn("char info should be found,case happens when there is no text in this line"),
            {
                lineIndex: n,
                charIndex: 0
            };
        }
        if (!$t.isCharBlockTextFromCharInfo(o)) {
            return console.warn("char info must be block char info [possible scenario:info deleted or not comming]"),
            {
                lineIndex: n,
                charIndex: i
            };
        }
        var s = this.blockLevel.merge(e.selected, e.key, tr.getBlockCrdt(o));
        return s ? {
            lineIndex: n,
            charIndex: i,
            key: s[1] || Yr.inferKeyAsString(e.key),
            selected: s[0]
        } : {
                lineIndex: n,
                charIndex: i
            };
    }
    mergeEditorWithoutCharIndexCrdt(e, t) {
        var n = $t.iIdentifiers(e.charIndex);
        if (n.length > 2) {
            console.warn("CharIndex Identifiers should be at default,[it's possible to happen ]");
        }
        var r = {
            lineIndex: t,
            charIndex: Math.max($t.iDigit(n, 0), 0)
        };
        if (e.key) {
            var a = this.blockLevel.merge(e.selected, e.key);
            r.key = a[1] || Yr.inferKeyAsString(e.key);
            r.selected = a[0];
        }
        return r;
    }
}
class jr {
    constructor(e) {
        this.editorLevel = e;
    }
    merge(e, t, n) {
        if (!n) {
            return [this.editorLevel.mergeEditor(e)];
        }
        switch (n[0]) {
            case "entity-list":
            case "raw-data":
            case "swapable-entity-list":
            case "blocks":
                return console.warn("Unexpected ".concat(n[0], " for block")),
                    [this.editorLevel.mergeEditor(e)];
            case "map":
                return [this.mergeBlock(e, Yr.inferKeyAsString(t), n)];
            case "mergeable-tabular":
            case "table":
            case "tabular":
                return this.mergeTabular(e, t, n[1]);
            case "temp-elements-map":
            case "toggle-elements-map":
                return [this.mergeElements(e, Yr.inferKeyAsString(t), n[1].elements)];
            case "long-division-elements":
                return [this.mergeElementsMap(e, Yr.inferKeyAsString(t), _r.longDivisionElementsToMap(n))];
        }
        Jt(n[0]);
    }
    mergeTabular(e, t, n) {
        if ("string" == typeof t) {
            return [this.mergeElements(e, t, n.nonCellInElements)];
        }
        var r = n.elements;
        var a = zr.searchIndex1(n.elements.rows, t.row, n.elements.rows.length - 1);
        var i = zr.searchIndex1(n.elements.columns, t.column, n.elements.columns.length - 1);
        var o = r.rows[a];
        var s = r.columns[i];
        var l = r.cells.find((e) => {
            return $t.cellPositionEquals(o, s, e.row, e.column, "include-lamport");
        });
        var c = TabularHelper.getKeyFromRowCol(a, i);
        return [this.editorLevel.mergeEditor(e, l.value), c];
    }
    mergeBlock(e, t, n) {
        if (!n) {
            return this.editorLevel.mergeEditor(e);
        }
        var r = n[1].find((e) => {
            return "elements" == $t.key(e.position);
        });
        return r && r.value ? this.mergeElements(e, t, r.value) : this.editorLevel.mergeEditor(e);
    }
    mergeElements(e, t, n) {
        return n ? "map" == n[0] ? this.mergeElementsMap(e, t, n) : "long-division-elements" == n[0] ? this.mergeElementsMap(e, t, _r.longDivisionElementsToMap(n)) : (console.warn("elements must have crdt type as map [possible scenario:info deleted or not comming]"), this.editorLevel.mergeEditor(e)) : this.editorLevel.mergeEditor(e);
    }
    mergeElementsMap(e, t, n) {
        if (!n) {
            return this.editorLevel.mergeEditor(e);
        }
        var r = n[1].find((e) => {
            return $t.key(e.position) == t;
        });
        if (!r || !r.value) {
            return this.editorLevel.mergeEditor(e);
        }
        if ("map" != r.value[0]) {
            throw new kn("wrong-crdt-type", "found editor must have crdt type as map");
        }
        return this.editorLevel.mergeEditor(e, r.value);
    }
}
class qr {
    constructor() {
        var e = new jr(null);
        var t = new Vr(e);
        var n = new Kr(t);
        e.editorLevel = n;
        this.editorLevel = n;
    }
    merge(e, t) {
        var n = t.editor;
        return this.editorLevel.mergeEditor(e, n);
    }
}
class Qr {
    constructor(e, t) {
        this.colSession = e;
        this.handler = new Pr(t);
        this.cursorMs = new qr;
    }
    getCursorMs() {
        return this.cursorMs;
    }
    applyRemoteCursorChange(e) {
        return this.cursorMs.merge(e, this.colSession.getCrdtOrEmpty());
    }
    applyChange(e, t) {
        var n;
        var r = this.colSession;
        var a = this.handler.mergeRootEditor(r.getEditor(), r.getCrdt(), e);
        if (t) {
            n = this.cursorMs.merge(t, a.crdt);
        }
        var i = r.isPageSettingsChanged(a.pageSettings);
        var o = r.isTheoremInfoChanged(a.theoremInfo);
        return {
            editor: a.editor,
            crdtEditor: a.crdt,
            pageSettings: i ? r.getPageSettings() : null,
            theoremInfo: o ? r.getTheoremInfo() : null,
            cursorSelected: n
        };
    }
}
var Zr = new class {
    log(e) {
        console.log(e);
    }
    logRootEditorChanges(e) {
        if (e) {
            if (e.editor && e.editor.ops && e.editor.ops.length > 0) {
                this.logLeafChanges(e.editor);
            }
            if (e.pageSettings && e.pageSettings.ops && e.pageSettings.ops.length > 0) {
                this.logLeafChanges(e.pageSettings);
            }
            if (e.theoremInfo && e.theoremInfo.ops && e.theoremInfo.ops.length > 0) {
                this.logLeafChanges(e.theoremInfo);
            }
        }
    }
    logLeafChanges(e) {
        if (e) {
            switch (e.type) {
                case "map-update":
                    if (!e.ops || 1 != e.ops.length) {
                        return void console.table(e);
                    }
                    var t = e.ops[0];
                    return "cs-field-updation" == t.type ? void this.logLeafChanges(t.value) : "mk-field-updation" == t.type ? void this.logLeafChanges(t.value) : "field-put" != t.type ? void console.table(t) : void 0;
                case "entity-list-update":
                    if (!e.ops || 1 != e.ops.length) {
                        return void console.table(e);
                    }
                    var n = e.ops[0];
                    return "item-updation" != n.type ? void console.table(n) : void this.logLeafChanges(n.value);
                case "swapable-entity-list-update":
                    if (!e.ops || 1 != e.ops.length) {
                        return void console.table(e);
                    }
                    var r = e.ops[0];
                    return "item-updation" != r.type ? void console.table(r) : void this.logLeafChanges(r.value);
                case "new-data":
                    return void console.table(e.value);
                case "tabular-update":
                case "mergeable-tabular-update":
                case "long-division-elements":
                    return void console.table(e);
                case "temp-elements-map-update":
                    if (!e.layout && e.others.ops.length <= 0 && 1 === e.elementsMap.ops.length) {
                        var a = e.elementsMap.ops[0];
                        if ("cs-field-updation" == a.type || "mk-field-updation" == a.type) {
                            return void this.logLeafChanges(a.value);
                        }
                    }
                    return void console.table(e);
                case "toggle-elements-map-update":
                    if (e.others.ops.length <= 0 && 1 === e.elementsMap.ops.length) {
                        var i = e.elementsMap.ops[0];
                        if ("cs-field-updation" == i.type || "mk-field-updation" == i.type) {
                            return void this.logLeafChanges(i.value);
                        }
                    }
                    return void console.table(e);
                case "blocks":
                    return void console.table(e);
            }
        }
    }
};
class Xr {
    constructor(e, t) {
        this.rootEditor = e;
        this.remoteCursorMap = {};
        this.updateDataAndCrdt(e, t);
    }
    updateDataAndCrdt(e, t) {
        this.rootEditor = e;
        this.crdtRootEditor = t;
        this.lastPageSettings = this.rootEditor.pageSettings;
        this.lastTheoremInfo = this.rootEditor.theoremInfo;
    }
    getRemoteCursors(e) {
        var t = e.map((e) => {
            return e.toString();
        });
        return _.keys(this.remoteCursorMap).filter((e) => {
            return t.includes(e);
        }).map((e) => {
            return {
                siteId: Number.parseInt(e),
                cursor: this.remoteCursorMap[e]
            };
        });
    }
    getEditor() {
        return this.rootEditor;
    }
    getCrdt() {
        return this.crdtRootEditor;
    }
    getCrdtOrEmpty() {
        return this.crdtRootEditor || {
            editor: null,
            pageSettings: null,
            theoremInfo: null
        };
    }
    update(e, t) {
        this.rootEditor = e;
        this.crdtRootEditor = t;
        this.lastPageSettings = e.pageSettings;
        this.lastTheoremInfo = e.theoremInfo;
    }
    updateRemoteCursor(e, t) {
        this.remoteCursorMap[e] = t;
    }
    updateSelected(e) {
        this.selected = e;
    }
    getPageSettings() {
        return this.lastPageSettings;
    }
    getTheoremInfo() {
        return this.lastTheoremInfo;
    }
    isEditorChanged(e) {
        return this.rootEditor != e;
    }
    isPageSettingsChanged(e) {
        return this.lastPageSettings != e;
    }
    isTheoremInfoChanged(e) {
        return this.lastTheoremInfo != e;
    }
    getSelected() {
        return this.selected;
    }
    isSelectedChanged(e) {
        return this.selected != e;
    }
}
class Jr {
    constructor() {
        this.messages = [];
    }
    enqueue(e) {
        this.messages.push(e);
    }
    dequeueBatch() {
        var e = this.messages;
        return this.messages = [],
            e;
    }
}
class ea {
    constructor(e, t) {
        this.cursorDs = e;
        this.cursorMs = t;
    }
    reposition(e, t, n) {
        if (!e) {
            return null;
        }
        var r = this.cursorDs.detect(e, t);
        return this.cursorMs.merge(r, n);
    }
    getCursorCrdt(e, t) {
        return e ? this.cursorDs.detect(e, t) : null;
    }
    toCursorSelected(e, t) {
        return e ? this.cursorMs.merge(e, t) : null;
    }
}
class na {
    constructor(e) {
        this.defaultLamport = 0;
        this.lamport = 1;
        this.lamport = e;
    }
    get() {
        return this.lamport;
    }
    getDefault() {
        return this.defaultLamport;
    }
    setDefault(e) {
        return this.defaultLamport = e;
    }
    increase() {
        return this.lamport++ ,
            this.lamport;
    }
    receiveMessage(e) {
        this.lamport = Math.max(this.lamport, e) + 1;
    }
}
class ra {
    constructor() {
        this.identifiers = [];
    }
    add(e) {
        this.identifiers.push({
            siteId: e.siteId,
            lamport: e.lamport
        });
    }
    addIdentifiers(e) {
        console.log("adding identifiers", e);
        e.forEach((e) => {
            return this.addIdentifier(e);
        });
    }
    addIdentifier(e) {
        if (!this.isExisted(e)) {
            this.identifiers.push(e);
        }
    }
    getBatchIdentifiers() {
        return _.takeRight(this.identifiers, 200);
    }
    isExisted(e) {
        return this.identifiers.some((t) => {
            return t.lamport === e.lamport && t.siteId === e.siteId;
        });
    }
    isExistedMessage(e) {
        return this.identifiers.some((t) => {
            return t.lamport === e.lamport && t.siteId === e.siteId;
        });
    }
}
class aa {
    constructor(e, t) {
        this.selfSiteId = e;
        this.requestNameChange = t;
        this.map = {};
        this.handleNameChangeRequest = (e) => {
            if (this.map[this.selfSiteId]) {
                this.map[this.selfSiteId].displayName = e;
            }
            this.requestNameChange(e);
        };
    }
    clean() {
        this.map = {};
        this.notify();
    }
    getPartyInfo(e) {
        return this.map[e];
    }
    removeParty(e) {
        if (this.selfSiteId != e) {
            delete this.map[e];
            this.notify();
        }
    }
    setParty(e) {
        this.innerSetParty(e);
        this.notify();
    }
    innerSetParty(e) {
        this.map[e.siteId] = e;
    }
    setParties(e) {
        e.forEach((e) => {
            return this.setParty(e);
        });
        this.notify();
    }
    register(e) {
        this.registeredSubscriber = e;
        e.raiseNameChange = this.handleNameChangeRequest;
    }
    changeName(e, t) {
        if (this.map[e]) {
            this.map[e].displayName = t;
        }
        this.notify();
    }
    notify() {
        if (this.registeredSubscriber) {
            var e;
            var t = [];
            _.values(this.map).forEach((n) => {
                if (n.siteId != this.selfSiteId) {
                    t.push(n);
                } else {
                    e = n;
                }
            });
            this.registeredSubscriber.handlePartiesChange(t, e);
        }
    }
}
class oa {
    constructor(e) {
        this.siteId = e;
    }
    getDefaultSiteId() {
        return 0;
    }
    getCurrentSiteId() {
        return this.siteId;
    }
}
class sa {
    constructor(e) {
        this.infoProvider = e;
        this.newFieldPosition = (e, t) => {
            return t ? $t.fieldPosition(e, t.lamport, t.site) : $t.fieldPosition(e, this.infoProvider.getLamport(), this.infoProvider.siteId());
        };
    }
    newFieldPositionFrom(e) {
        return $t.fieldPosition($t.key(e), this.infoProvider.getLamport(), $t.fieldPositionSite(e));
    }
    lamportIncrease() {
        this.infoProvider.lamportIncrease();
    }
    getDefaultSiteOp() {
        return {
            lamport: this.infoProvider.getDefaultLamport(),
            site: this.infoProvider.defaultSiteId()
        };
    }
    combineToggleElements(e) {
        var t = e.elements.value;
        return e.hiddenData ? e.hiddenData ? e.collapsed ? {
            primary: e.hiddenData,
            secondary: t
        } : {
                primary: t,
                secondary: e.hiddenData
            } : void 0 : {
                primary: t
            };
    }
    buildRestObjectForToggleElements(e) {
        return _.omit(e, ["elements", "hiddenData"]);
    }
    initCrdtLongDivisionElements() {
        return ["long-division-elements", {
            divident: void 0,
            divisor: void 0,
            quotient: void 0,
            remainders: void 0
        }];
    }
    initToggleElementsMapCrdt() {
        return ["toggle-elements-map", {
            elements: void 0,
            others: void 0
        }];
    }
    initTempElementsMapCrdt(e, t) {
        return ["temp-elements-map", {
            layout: [t, _.keys(e.elements)],
            elements: void 0,
            others: void 0
        }];
    }
    initRawDataCrdt(e) {
        return ["raw-data", e];
    }
    initCrdtMergeableTabular(e, t) {
        return ["mergeable-tabular", this.initCrdtTabular(e, t)[1], void 0];
    }
    initCrdtTable(e, t) {
        return ["table", this.initCrdtTabular(e, t)[1], void 0];
    }
    initCrdtTabular(e, t) {
        var n = new Array(e.row * e.column);
        var r = 0;
        for (; r < e.row; r++) {
            var a = 0;
            for (; a < e.column; a++) {
                n[r * e.column + a] = {
                    row: $t.itemPositionFromIndex(r, t),
                    column: $t.itemPositionFromIndex(a, t),
                    value: void 0
                };
            }
        }
        return ["tabular", {
            elements: {
                cells: n,
                columns: _.times(e.column).map((e) => {
                    return $t.itemPositionFromIndex(e, t);
                }),
                rows: _.times(e.row).map((e) => {
                    return $t.itemPositionFromIndex(e, t);
                })
            },
            others: void 0,
            nonCellInElements: void 0
        },
            void 0];
    }
    getTabularOthersMap(e) {
        return _.omit(e, ["row", "column", "elements"]);
    }
    getNonCellEditorsMap(e) {
        var t = {};
        return _.keys(e).forEach((n) => {
            if (!this.isKeyInTabularFormat(n)) {
                t[n] = e[n];
            }
        }),
            t;
    }
    isKeyInTabularFormat(e) {
        return /^[0-9]+_[0-9]+$/.test(e);
    }
    generateIdentifiers(e, t) {
        return $t.generate(e, t, this.infoProvider.siteId());
    }
    findMatchedEntity(e, t, n) {
        var r = t;
        var a = e.length;
        for (; r < a; r++) {
            if (e[r].id === n.id) {
                return r;
            }
        }
        return -1;
    }
    findMatchedItem(e, t, n) {
        var r = t;
        var a = e.length;
        for (; r < a; r++) {
            if (e[r] === n) {
                return r;
            }
        }
        return -1;
    }
    initCrdtSwapableEntityList(e, t) {
        return ["swapable-entity-list", e.map((e, n) => {
            var r = $t.itemPositionFromIndex(n, t);
            return {
                id: e.id,
                position: r,
                value: void 0
            };
        }), void 0];
    }
    initCrdtEntityList(e, t) {
        return ["entity-list", (e || []).map((e, n) => {
            return this.initCrdtListItem(n, t);
        }), void 0];
    }
    initCrdtListItem(e, t) {
        return {
            position: $t.itemPositionFromIndex(e, t),
            value: void 0
        };
    }
    initCrdtMap(e, t, n) {
        return ["map", _.keys(e || {}).map((r) => {
            if (e.hasOwnProperty(r) && !(r.startsWith("___") || n && n.includes(r))) {
                return {
                    position: $t.fieldPosition(r, t.lamport, t.site),
                    value: void 0
                };
            }
        }).filter((e) => {
            return e;
        }), void 0];
    }
    lamport() {
        return this.infoProvider.getLamport();
    }
    listItem(e, t) {
        return {
            position: $t.itemPosition(this.lamport(), e),
            value: t
        };
    }
    currentSiteOperationInfo() {
        return this.lastCurrentSiteOp && this.lastCurrentSiteOp.lamport === this.infoProvider.getLamport() && this.lastCurrentSiteOp.site === this.infoProvider.siteId() ? this.lastCurrentSiteOp : (this.lastCurrentSiteOp = {
            lamport: this.infoProvider.getLamport(),
            site: this.infoProvider.siteId()
        },
            this.lastCurrentSiteOp);
    }
    newItemPosition(e) {
        return $t.itemPosition(this.lamport(), e);
    }
}
class la {
    constructor(e, t) {
        this.lamportProvider = e;
        this.siteInfo = t;
    }
    getLamport() {
        return this.lamportProvider.get();
    }
    getDefaultLamport() {
        return this.lamportProvider.getDefault();
    }
    defaultSiteId() {
        return this.siteInfo.getDefaultSiteId();
    }
    siteId() {
        return this.siteInfo.getCurrentSiteId();
    }
    lamportIncrease() {
        this.lamportProvider.increase();
    }
}
class da {
    constructor(e, t, n) {
        this.rootEditor = e;
        this.crdtRootEditor = t;
        this.mainSelected = n;
    }
    isSelectedChanged(e) {
        return this.mainSelected != e;
    }
    getEditor() {
        return this.rootEditor;
    }
    getPageSettings() {
        return this.rootEditor.pageSettings;
    }
    getTheoremInfo() {
        return this.rootEditor.theoremInfo;
    }
    getCrdt() {
        return this.crdtRootEditor;
    }
    isEditorChanged(e) {
        return this.rootEditor != e;
    }
    isPageSettingsChanged(e) {
        return false;
    }
    isTheoremInfoChanged(e) {
        return false;
    }
    getCrdtOrEmpty() {
        return this.crdtRootEditor || {
            editor: null,
            pageSettings: null,
            theoremInfo: null
        };
    }
}
class ca {
    constructor(e, t, n) {
        this.common = e;
        this.colSession = t;
        this.cursorReposition = n;
        this.records = [];
        this.recordIndex = -1;
    }
    trimLongHistory() {
        if (this.records.length > 120 && this.recordIndex > 100) {
            this.records = this.records.slice(20);
            this.recordIndex = -20;
        }
    }
    undo(e, t) {
        return this.colSession.isEditorChanged(e) ? this.handleUndoWhenThereAreChanges(e, t) : this.handleUndoWhenNoChange();
    }
    handleUndoWhenNoChange() {
        if (this.records.length <= 0) {
            return null;
        }
        if (this.recordIndex < 0) {
            return null;
        }
        var e = this.records[this.recordIndex];
        var t = this.diffStatesGetOps(e.to, this.colSession.getEditor(), this.colSession.getSelected());
        var n = this.applyToState(e.from, t);
        var r = this.diffStatesFromCurrent(n.editor, n.selected);
        return e.to = this.colSessionToState(),
            e.from = this.detectResultToState(r),
            this.recordIndex-- ,
        {
            editor: r.editor,
            crdtEditor: r.crdtEditor,
            selected: r.cursor,
            crdtSelected: r.crdtCursor,
            ops: r.ops
        };
    }
    detectResultToState(e) {
        return {
            editor: e.editor,
            crdtEditor: e.crdtEditor,
            selected: e.cursor,
            crdtSelected: e.crdtCursor
        };
    }
    colSessionToState() {
        return {
            editor: this.colSession.getEditor(),
            crdtEditor: this.colSession.getCrdt(),
            selected: this.colSession.getSelected(),
            crdtSelected: this.cursorReposition.getCursorCrdt(this.colSession.getSelected(), this.colSession.getCrdtOrEmpty())
        };
    }
    buildUndoRedoCommon() {
        return new sa(new la(new na(0), new oa(-1)));
    }
    stateToColSession(e) {
        return new da(e.editor, e.crdtEditor, e.selected);
    }
    applyToState(e, t) {
        if (!t) {
            return {
                editor: e.editor,
                selected: e.selected
            };
        }
        var n = (new Qr(this.stateToColSession(e), this.buildUndoRedoCommon())).applyChange(t, e.crdtSelected);
        return {
            editor: n.editor,
            selected: n.cursorSelected
        };
    }
    handleUndoWhenThereAreChanges(e, t) {
        var n = (new Gr(this.colSession, this.common)).detect(e, t);
        var r = this.diffToState(n);
        return this.addChange({
            editor: this.colSession.getEditor(),
            crdtEditor: this.colSession.getCrdt(),
            selected: this.colSession.getSelected(),
            crdtSelected: this.cursorReposition.getCursorCrdt(this.colSession.getSelected(), this.colSession.getCrdtOrEmpty())
        },
            r),
            this.recordIndex-- ,
        {
            editor: this.colSession.getEditor(),
            crdtEditor: this.colSession.getCrdt(),
            selected: this.colSession.getSelected(),
            crdtSelected: n.crdtCursor,
            ops: null
        };
    }
    diffToState(e) {
        return {
            crdtEditor: e.crdtEditor,
            editor: e.editor,
            crdtSelected: e.crdtCursor,
            selected: e.cursor
        };
    }
    redo(e) {
        if (this.colSession.isEditorChanged(e)) {
            return null;
        }
        if (this.records.length <= 0) {
            return null;
        }
        if (this.recordIndex >= this.records.length - 1) {
            return null;
        }
        this.recordIndex++;
        var t = this.records[this.recordIndex];
        var n = this.diffStatesGetOps(t.from, this.colSession.getEditor(), this.colSession.getSelected());
        var r = this.applyToState(t.to, n);
        var a = this.diffStatesFromCurrent(r.editor, r.selected);
        return t.from = this.colSessionToState(),
            t.to = this.detectResultToState(a),
        {
            editor: a.editor,
            crdtEditor: a.crdtEditor,
            selected: a.cursor,
            crdtSelected: a.crdtCursor,
            ops: a.ops
        };
    }
    diffStatesFromCurrent(e, t) {
        return (new Gr(this.colSession, this.common)).detect(e, t);
    }
    diffStatesGetOps(e, t, n) {
        if (e.editor === t) {
            return null;
        }
        var r = new da(e.editor, e.crdtEditor, e.selected);
        return (new Gr(r, this.common)).detect(t, n).ops;
    }
    prepareForAdd() {
        if (this.recordIndex < this.records.length - 1) {
            this.records = this.records.slice(0, this.recordIndex + 1);
        }
    }
    addChange(e, t) {
        this.prepareForAdd();
        this.records.push({
            from: e,
            to: t
        });
        this.recordIndex = this.records.length - 1;
        this.trimLongHistory();
    }
}
class ha {
    constructor(e, t, n, r, a) {
        this.mathtypeRef = e;
        this.channel = t;
        this.siteId = n;
        this.messageQueue = new Jr;
        this.lastRequestCursorPrepositionSiteIds = [];
        this.sortedMessages = new ra;
        this.isStoped = false;
        this.handleNameChangeRequest = (e) => {
            console.log("request name:", e);
            DocumentActions.TokenStorage.storeLastAnonymousName(e);
            this.sendOutMessage({
                type: "party-name-change",
                name: e,
                siteId: this.siteId
            });
        };
        this.handleRequestPreposition = (e) => {
            this.lastRequestCursorPrepositionSiteIds = this.lastRequestCursorPrepositionSiteIds.concat(e);
        };
        this.handleDataChange = () => {
            if (!this.isStoped) {
                this.handleTracking();
                this.processMergeMessages();
            }
        };
        this.handleSelectedChange = () => {
            var e = this.crdtChangeDs.detectCursor(this.mathtypeRef.getCursorSelected()) || [void 0, void 0];
            var t = slicedToArray(e, 2);
            var n = t[0];
            var r = t[1];
            if (n) {
                return this.colSession.updateSelected(r),
                    Zr.log(n),
                {
                    type: "cursor-crdt",
                    siteId: this.siteId,
                    lamport: this.lamportProvider.get(),
                    cursor: n
                };
            }
        };
        this.handleDeltaChange = () => {
            var e = this.crdtChangeDs.detect(this.mathtypeRef.getModel(), this.mathtypeRef.getCursorSelected());
            if (!e) {
                return null;
            }
            var t = {
                editor: this.colSession.getEditor(),
                crdtEditor: this.colSession.getCrdt(),
                selected: this.colSession.getSelected(),
                crdtSelected: this.cursorReposition.getCursorCrdt(this.colSession.getSelected(), this.colSession.getCrdtOrEmpty())
            };
            this.colSession.update(e.editor, e.crdtEditor);
            this.colSession.updateSelected(e.cursor);
            var n = {
                editor: this.colSession.getEditor(),
                crdtEditor: this.colSession.getCrdt(),
                selected: this.colSession.getSelected(),
                crdtSelected: e.crdtCursor
            };
            return this.colHistory.addChange(t, n),
                Zr.logRootEditorChanges(e.ops),
                Zr.log(e.crdtCursor),
            {
                type: "crdt",
                lamport: this.lamportProvider.get(),
                siteId: this.siteId,
                operations: e.ops,
                cursor: e.crdtCursor
            };
        };
        window.latestColHandler = this;
        this.lamportProvider = new na(r);
        var i = a.data;
        var o = a.crdt;
        this.partyHandler = new aa(n, this.handleNameChangeRequest);
        if (a.messageIdentifiers) {
            this.sortedMessages.addIdentifiers(a.messageIdentifiers);
        }
        this.colSession = new Xr(i, o);
        var s = new oa(n);
        var l = new sa(new la(this.lamportProvider, s));
        this.crdtMerger = new Qr(this.colSession, l);
        this.crdtChangeDs = new Gr(this.colSession, l);
        this.notifyDataChangedDebounced = _.debounce(this.handleDataChange, 300);
        this.cursorReposition = new ea(this.crdtChangeDs.getCursorDs(), this.crdtMerger.getCursorMs());
        this.prepositionAdapter = {
            requestPreposition: this.handleRequestPreposition
        };
        this.colHistory = new ca(l, this.colSession, this.cursorReposition);
    }
    removeParty(e) {
        this.partyHandler.removeParty(e);
    }
    setParties(e) {
        this.partyHandler.setParties(e);
    }
    registerPartyChangeSubscriber(e) {
        this.partyHandler.register(e);
    }
    requestUndo() {
        var e = this.mathtypeRef.getModel();
        var t = this.mathtypeRef.getCursorSelected();
        var n = this.colHistory.undo(e, t);
        this.handleUndoRedoResponse(n);
        console.log("request undo");
    }
    handleUndoRedoResponse(e) {
        if (e && (this.colSession.update(e.editor, e.crdtEditor), this.colSession.updateSelected(e.selected), this.mathtypeRef.colIncrementUpdate(e.editor, {
            selected: e.selected,
            extendedSelected: null
        }), e.ops)) {
            var t = {
                type: "crdt",
                siteId: this.siteId,
                lamport: this.lamportProvider.get(),
                operations: e.ops,
                cursor: e.crdtSelected
            };
            this.lamportProvider.increase();
            this.sendOutMessage(t);
        }
    }
    requestRedo() {
        var e = this.mathtypeRef.getModel();
        var t = this.colHistory.redo(e);
        this.handleUndoRedoResponse(t);
        console.log("request redo");
    }
    getCurrentColState() {
        return {
            data: this.colSession.getEditor(),
            crdt: this.colSession.getCrdt(),
            messageIdentifiers: this.sortedMessages.getBatchIdentifiers()
        };
    }
    setColDataAndCrdt(e) {
        this.colSession.updateDataAndCrdt(e.data, e.crdt);
        this.sortedMessages.addIdentifiers(e.messageIdentifiers);
    }
    startTracking() {
        this.trakcingIntervalId = setInterval(() => {
            this.notifyDataChangedDebounced();
        },
            500);
    }
    stopTracking() {
        console.log("stop tracking");
        clearInterval(this.trakcingIntervalId);
        this.isStoped = true;
        this.partyHandler.clean();
    }
    addMerge(e) {
        if ("crdt" != e.type || e.siteId != this.siteId) {
            if ("crdt" == e.type && this.sortedMessages.isExistedMessage(e)) {
                console.log("message exists,ignore !!!");
            } else {
                if ("cursor-crdt" != e.type || e.siteId != this.siteId) {
                    this.messageQueue.enqueue(e);
                    if ("crdt" == e.type) {
                        this.sortedMessages.add(e);
                    }
                } else {
                    console.log("cursor myself,ignore");
                }
            }
        } else {
            console.log("message for myself,ignore !!!");
        }
    }
    getPartyDisplayName(e) {
        var t = this.partyHandler.getPartyInfo(e);
        return t && t.displayName || "Unknown";
    }
    processMergeMessages() {
        var e = this.messageQueue.dequeueBatch();
        if (e.length > 0) {
            console.log("process merge message,number of messages:", e.length);
        }
        var t;
        var n;
        var r = {
            editor: null,
            pageSettings: null,
            remoteCursors: {},
            theoremInfo: null,
            mainSelection: null,
            removedSiteIds: []
        };
        var a = this.colSession.getSelected();
        var i = this.mathtypeRef.getExtendedSelected();
        if (e.forEach((e) => {
            switch (console.log(e), e.type) {
                case "crdt":
                    this.lamportProvider.receiveMessage(e.lamport);
                    if (!t && a) {
                        t = this.cursorReposition.getCursorCrdt(a, this.colSession.getCrdtOrEmpty());
                    }
                    if (!n && i) {
                        n = this.cursorReposition.getCursorCrdt(i, this.colSession.getCrdtOrEmpty());
                    }
                    var o = this.crdtMerger.applyChange(e.operations, e.cursor);
                    return this.colSession.update(o.editor, o.crdtEditor),
                        r.editor = o.editor,
                        o.pageSettings && (r.pageSettings = o.pageSettings),
                        o.theoremInfo && (r.theoremInfo = o.theoremInfo),
                        void (e.cursor && (this.colSession.updateRemoteCursor(e.siteId, e.cursor), r.remoteCursors[e.siteId] = {
                            siteId: e.siteId,
                            selected: o.cursorSelected,
                            displayName: this.getPartyDisplayName(e.siteId)
                        }));
                case "cursor-crdt":
                    this.lamportProvider.receiveMessage(e.lamport);
                    var s = this.crdtMerger.applyRemoteCursorChange(e.cursor);
                    return this.colSession.updateRemoteCursor(e.siteId, e.cursor),
                        void (r.remoteCursors[e.siteId] = {
                            siteId: e.siteId,
                            selected: s,
                            displayName: this.getPartyDisplayName(e.siteId)
                        });
                case "party-remove":
                    return void r.removedSiteIds.push(e.siteId);
                case "party-name-change":
                    return this.partyHandler.changeName(e.siteId, e.name),
                        void this.mathtypeRef.changeCursorName(e.siteId, e.name);
            }
            Jt();
        }), t) {
            var o = this.cursorReposition.toCursorSelected(t, this.colSession.getCrdtOrEmpty());
            if (!CursorPositionHelper.isSelectedDeepEqual(o, a)) {
                r.mainSelection = {
                    selected: o,
                    extendedSelected: i
                };
            }
        }
        if (n && t) {
            var s = this.cursorReposition.toCursorSelected(n, this.colSession.getCrdtOrEmpty());
            if (!CursorPositionHelper.isSelectedDeepEqual(s, i)) {
                r.mainSelection = {
                    selected: r.mainSelection ? r.mainSelection.selected : a,
                    extendedSelected: s
                };
            }
        }
        this.processAccumulation(r);
    }
    processAccumulation(e) {
        if (e.editor && e.mainSelection ? (this.mathtypeRef.colIncrementUpdate(e.editor, e.mainSelection), this.colSession.updateSelected(e.mainSelection.selected)) : e.editor && this.mathtypeRef.colIncrementUpdate(e.editor), this.lastRequestCursorPrepositionSiteIds.length > 0) {
            this.colSession.getRemoteCursors(this.lastRequestCursorPrepositionSiteIds).forEach((t) => {
                if (!e.remoteCursors[t.siteId]) {
                    var n = {
                        siteId: t.siteId,
                        selected: this.cursorReposition.toCursorSelected(t.cursor, this.colSession.getCrdtOrEmpty()),
                        displayName: this.getPartyDisplayName(t.siteId)
                    };
                    e.remoteCursors[t.siteId] = n;
                }
            });
            this.lastRequestCursorPrepositionSiteIds = [];
        }
        var t = _.values(e.remoteCursors);
        if (t.length > 0) {
            TimerHelper.next(() => {
                this.mathtypeRef.setRemoteCursors(t, this.prepositionAdapter);
            });
        }
        if (e.pageSettings) {
            TimerHelper.next(() => {
                this.mathtypeRef.setPageSettings(e.pageSettings);
            });
        }
        if (e.theoremInfo) {
            TimerHelper.next(() => {
                this.mathtypeRef.setTheoremInfo(e.theoremInfo);
            });
        }
        if (e.removedSiteIds.length > 0) {
            TimerHelper.next(() => {
                this.mathtypeRef.removeSites(e.removedSiteIds);
            });
        }
    }
    sendOutMessage(e) {
        if ("crdt" == e.type) {
            this.sortedMessages.add(e);
        }
        if (!("crdt" != e.type && "cursor-crdt" != e.type)) {
            console.log("%c lamport on send:".concat(e.lamport), "color:orange");
        }
        this.channel.sendMessage(JSON.stringify(e));
    }
    handleTracking() {
        var e = this.handleDeltaChange();
        if (e) {
            return this.sendOutMessage(e),
                void this.lamportProvider.increase();
        }
        var t = this.handleSelectedChange();
        if (t) {
            this.sendOutMessage(t);
            this.lamportProvider.increase();
        }
    }
}/*  */class ua {
    constructor(e, t) {
        this.colClientSession = e;
        this.checkResponseHandler = t;
        this.checkInterval = null;
        this.handleBeforeUnload = () => {
            if (console.warn("before unload raise"), this.checkInterval) {
                var e = {
                    clientId: this.colClientSession.getClientId(),
                    writeable: this.colClientSession.isWriteable()
                };
                Qt.requestClose(this.colClientSession.getToken(), e);
            }
        };
    }
    startCheck() {
        window.onbeforeunload = this.handleBeforeUnload;
        this.checkInterval = setInterval(() => {
            console.log("checking ...");
            this.runCheck();
        },
            1E3);
    }
    stopCheck() {
        clearInterval(this.checkInterval);
        this.checkInterval = null;
        if (window.onbeforeunload === this.handleBeforeUnload) {
            window.onbeforeunload = null;
        }
    }
    runCheck() {
        var e = this;
        return asyncToGenerator(regeneratorRuntime.mark(function t() {
            var n;
            var r;
            return regeneratorRuntime.wrap(function (t) {
                for (; ;) {
                    switch (t.prev = t.next) {
                        case 0:
                            return n = {
                                clientId: e.colClientSession.getClientId(),
                                writeable: e.colClientSession.isWriteable()
                            },
                                t.next = 3,
                                Qt.check(n, e.colClientSession.getToken());
                        case 3:
                            r = t.sent;
                            e.checkResponseHandler.processCheckResponse(r);
                        case 5:
                        case "end":
                            return t.stop();
                    }
                }
            },
                t);
        }))();
    }
}
class pa {
    constructor(e, t, n) {
        this.provider = e;
        this.channel = t;
        this.lastModel = n;
    }
    start() {
        console.log("col server sent started!");
        this.intervalId = setInterval(() => {
            this.send();
        },
            5E3);
    }
    stop() {
        clearInterval(this.intervalId);
        console.log("col server sent stop!");
    }
    send() {
        var e = this.provider.getCurrentColState();
        if (this.lastModel != e.data) {
            console.log("%c sending col data state", "color:orange");
            this.lastModel = e.data;
            var t = {
                rawData: Serialization.stringifyForSave(this.provider.getCurrentColState()),
                type: "col-data-message"
            };
            this.channel.sendMessage(JSON.stringify(t));
        }
    }
}
class fa {
    constructor() {
        this.notified = false;
    }
    register(e) {
        this.handler = e;
    }
    notifyResultType(e, t) {
        if (!this.notified) {
            if ("hold" != e) {
                this.notified = true;
                this.handler.onFinish(t);
            } else {
                this.handler.onProgressing();
            }
        }
    }
}
class jt {
    constructor(e) {
        this.writeable = e;
        this.initLamport = 0;
        console.log(this.writeable);
    }
    setToken(e) {
        this.token = e;
    }
    getToken() {
        return this.token;
    }
    setFirstClientInfo(e) {
        this.firstClientInfo = e;
    }
    getSiteId() {
        return this.siteId;
    }
    setSiteid(e) {
        return this.siteId = e;
    }
    isWriteable() {
        return this.writeable;
    }
    getClientId() {
        return this.firstClientInfo && this.firstClientInfo.clientId;
    }
}
class qt {
    constructor(e) {
        this.messageHandler = e;
        this.retryCount = 0;
        this.messageBuffer = [];
        this.forceClose = false;
        this.handleMessage = (e) => {
            console.log(e.data);
            this.messageHandler.handleMessage(e.data);
        };
        this.handleRetry = () => {
            console.log("retrying connection ws");
            this.start(this.token, true).then(() => {
                this.retryCount = 0;
            }).
                catch(() => {
                    this.startRetry();
                });
        };
    }
    stop() {
        console.log("stop connection session");
        if (this.webSocket) {
            this.forceClose = true;
            this.webSocket.close();
            clearInterval(this.retryIntervalId);
            this.retryIntervalId = null;
        }
    }
    startRetry() {
        this.retryCount++;
        if (this.retryCount > 10) {
            console.log("Retry reach limit,give up!");
        } else {
            setTimeout(this.handleRetry, 2E3);
        }
    }
    pushBuffer() {
        if (this.messageBuffer.length > 0) {
            console.log("There are messages in buffer,start push!");
            this.messageBuffer.forEach((e) => {
                this.webSocket.send(e);
            });
            this.messageBuffer = [];
        }
    }
    start(e, t) {
        this.token = e;
        var n = "ws://".concat(this.getHost(), "/col/ws/op?token=").concat(e).concat(t ? "&reconnect=true" : "");
        return console.log("web socket url:", n),
            this.webSocket && this.webSocket.readyState != WebSocket.CLOSED && (this.webSocket.onclose = null, this.webSocket.close()),
            new Promise((e, t) => {
                try {
                    clearTimeout(this.connectTimeoutId);
                    this.connectTimeoutId = setTimeout(() => {
                        this.webSocket.close();
                    },
                        4E3);
                    this.webSocket = new WebSocket(n);
                    this.webSocket.onopen = () => { };
                    this.webSocket.onclose = (e) => {
                        if (4E3 != e.code) {
                            console.log("websocket client close");
                            if (this.forceClose) {
                                console.log("request close,NOT retrying");
                            } else {
                                if (!this.isInRetryPhase()) {
                                    this.startRetry();
                                }
                            }
                        } else {
                            this.messageHandler.reloadSession();
                        }
                    };
                    this.webSocket.onerror = () => {
                        console.log("websocket error");
                        t();
                    };
                    this.webSocket.onmessage = (t) => {
                        if ("string" == typeof t.data && "ready" == t.data) {
                            this.webSocket.onmessage = this.handleMessage;
                            clearTimeout(this.connectTimeoutId);
                            e();
                            console.log("websocket client open");
                            this.pushBuffer();
                        }
                    };
                } catch (e) {
                    t(e);
                }
            });
    }
    isInRetryPhase() {
        return this.retryCount > 0;
    }
    isWebSocketReady() {
        return this.webSocket && this.webSocket.readyState === WebSocket.OPEN;
    }
    send(e) {
        if (!this.isInRetryPhase() && this.isWebSocketReady()) {
            this.webSocket.send(e);
        } else {
            this.messageBuffer.push(e);
        }
    }
    getHost() {
        return document.location.host;
    }
}
var Qt = new class {
    check(e, t) {
        return asyncToGenerator(regeneratorRuntime.mark(function n() {
            var r;
            var a;
            return regeneratorRuntime.wrap(function (n) {
                for (; ;) {
                    switch (n.prev = n.next) {
                        case 0:
                            return n.next = 2,
                                Api.Post("/col/s2s/check?token=".concat(t), e);
                        case 2:
                            return r = n.sent,
                                n.next = 5,
                                r.json();
                        case 5:
                            return a = n.sent,
                                n.abrupt("return", a);
                        case 7:
                        case "end":
                            return n.stop();
                    }
                }
            },
                n);
        }))();
    }
    sendDataAndCrdtState(e, t) {
        return asyncToGenerator(regeneratorRuntime.mark(function n() {
            var r;
            return regeneratorRuntime.wrap(function (n) {
                for (; ;) {
                    switch (n.prev = n.next) {
                        case 0:
                            return n.next = 2,
                                Api.Post("/col/s2s/col-info?token=".concat(t), JSON.stringify(e), {
                                    "Content-Type": "text/plan",
                                    Accept: "text/plan"
                                });
                        case 2:
                            return r = n.sent,
                                n.next = 5,
                                r.json();
                        case 5:
                        case "end":
                            return n.stop();
                    }
                }
            },
                n);
        }))();
    }
    requestClose(e, t) {
        return asyncToGenerator(regeneratorRuntime.mark(function n() {
            return regeneratorRuntime.wrap(function (n) {
                for (; ;) {
                    switch (n.prev = n.next) {
                        case 0:
                            return n.next = 2,
                                Api.Post("/col/s2s/close-session?token=".concat(e), t);
                        case 2:
                        case "end":
                            return n.stop();
                    }
                }
            },
                n);
        }))();
    }
};
class ma {
    constructor(e, t, n) {
        this.mathType = t;
        this.originalEditorModel = n;
        this.colConnectionSession = new qt(this);
        this.colDocumentLoadReadyNotifier = new fa;
        this.colClientSession = new jt(e);
        this.colServerChecking = new ua(this.colClientSession, this);
    }
    registerPartyChangeSubscriber(e) {
        this.registeredSubscriber = e;
        if (this.colHandler) {
            this.colHandler.registerPartyChangeSubscriber(e);
        }
    }
    registerReloadSesion(e) {
        this.reloadSessionHandler = e;
    }
    reloadSession() {
        if (this.reloadSessionHandler) {
            this.reloadSessionHandler();
        }
    }
    requestUndo() {
        if (this.colHandler) {
            this.colHandler.requestUndo();
        }
    }
    requestRedo() {
        if (this.colHandler) {
            this.colHandler.requestRedo();
        }
    }
    handleMessage(e) {
        var t = JSON.parse(e);
        if ("crdt-bulk" != t.type) {
            if ("parties-state" == t.type) {
                return t.cursors.forEach((e) => {
                    var t = JSON.parse(e);
                    this.colHandler.addMerge(t);
                }),
                    void this.colHandler.setParties(t.parties);
            }
            if ("party-add" == t.type) {
                return console.log("handle party add", t.info),
                    void this.colHandler.setParties([t.info]);
            }
            if ("party-remove" == t.type) {
                console.log("handle party remove");
                this.colHandler.removeParty(t.siteId);
            }
            this.colHandler.addMerge(t);
        } else {
            t.messages.forEach((e) => {
                var t = JSON.parse(e);
                t.cursor = null;
                this.colHandler.addMerge(t);
            });
        }
    }
    sendMessage(e) {
        this.colConnectionSession.send(e);
    }
    processCheckResponse(e) {
        this.handleResult(e);
    }
    sendDataAndCrdtStateOfCurrentMathType() {
        var e = this;
        return asyncToGenerator(regeneratorRuntime.mark(function t() {
            var n;
            return regeneratorRuntime.wrap(function (t) {
                for (; ;) {
                    switch (t.prev = t.next) {
                        case 0:
                            return n = {
                                data: e.mathType.getModel(),
                                crdt: null,
                                messageIdentifiers: []
                            },
                                t.next = 3,
                                Qt.sendDataAndCrdtState(n, e.colClientSession.getToken());
                        case 3:
                        case "end":
                            return t.stop();
                    }
                }
            },
                t);
        }))();
    }
    startCrdtTracking(e, t) {
        if (this.colHandler) {
            throw new Error("should not have col handler here");
        }
        console.log("readonly:", e);
        (t = _.clone(t) || {}).data = t.data || this.originalEditorModel;
        console.log("%c siteId:".concat(this.colClientSession.getSiteId(), ",init lamport:").concat(this.colClientSession.initLamport), "color:orange");
        this.colHandler = new ha(this.mathType, this, this.colClientSession.getSiteId(), this.colClientSession.initLamport, t);
        if (this.registeredSubscriber) {
            this.colHandler.registerPartyChangeSubscriber(this.registeredSubscriber);
        }
        this.colHandler.startTracking();
        if (!e) {
            this.colDataServerSend = new pa(this.colHandler, this, t.data);
            this.colDataServerSend.start();
        }
    }
    handleInitDataResponse(e, t) {
        this.colClientSession.setSiteid(e.siteId);
        this.colClientSession.setToken(e.token);
        this.colClientSession.userDisplayName = e.userDisplayName;
        this.colClientSession.initLamport = e.lamport;
        this.colDocumentLoadReadyNotifier.register(t);
        TokenStorage.storeLastSessionToken(e.token);
        TokenStorage.storeLastAnonymousName(e.userDisplayName);
        this.handleResult(e.colInfo);
    }
    handleResult(e) {
        switch (console.log(e), e.type) {
            case "first-client-info":
                return this.colDocumentLoadReadyNotifier.notifyResultType(e.type, null),
                    this.colClientSession.setFirstClientInfo(e),
                    void this.colServerChecking.startCheck();
            case "sync-data":
                return this.colDocumentLoadReadyNotifier.notifyResultType(e.type, null),
                    this.colServerChecking.stopCheck(),
                    this.startCrdtTracking(!this.colClientSession.isWriteable(), null),
                    void (this.colClientSession.isWriteable() ? this.sendDataAndCrdtStateOfCurrentMathType().then(() => {
                        this.colConnectionSession.start(this.colClientSession.getToken());
                    }) : this.colConnectionSession.start(this.colClientSession.getToken()));
            case "hold":
                return this.colDocumentLoadReadyNotifier.notifyResultType(e.type, null),
                    void setTimeout(() => {
                        this.colServerChecking.runCheck();
                    },
                        1E3);
            case "resync-data":
                var t = JSON.parse(e.rawData);
                return this.colDocumentLoadReadyNotifier.notifyResultType(e.type, t),
                    this.colServerChecking.stopCheck(),
                    this.startCrdtTracking(!this.colClientSession.isWriteable(), t),
                    void this.colConnectionSession.start(this.colClientSession.getToken());
            case "reload":
                return this.colDocumentLoadReadyNotifier.notifyResultType(e.type, null),
                    void this.reloadSession();
            case "ok":
                return void this.colDocumentLoadReadyNotifier.notifyResultType(e.type, null);
        }
        Jt();
    }
    endSession() {
        console.log("session end!");
        this.colServerChecking.stopCheck();
        this.colConnectionSession.stop();
        if (this.colHandler) {
            this.colHandler.stopTracking();
        }
        if (this.colDataServerSend) {
            this.colDataServerSend.stop();
        }
    }
}
var ga = new class {
    setStore(e) {
        this.store = e;
    }
    getStore() {
        return this.store;
    }
    dispatch(e) {
        this.store.dispatch(e);
    }
};
var ya = new class {
    registerPartyChangeSubscriber(e) {
        this.registeredSubscriber = e;
        if (this.colDocumentSession) {
            this.colDocumentSession.registerPartyChangeSubscriber(e);
        }
    }
    getCurrentColDocumentSession() {
        return this.colDocumentSession;
    }
    startSession(e, t, n) {
        if (e) {
            if (this.colDocumentSession) {
                this.colDocumentSession.endSession();
                this.colDocumentSession = null;
            }
            return new Promise((r) => {
                var a = new ma(t, DocumentProvider.getColMathType(), n);
                if (this.registeredSubscriber) {
                    a.registerPartyChangeSubscriber(this.registeredSubscriber);
                }
                a.handleInitDataResponse(e, {
                    onProgressing() {
                        console.log("progressing");
                    },
                    onFinish(e) {
                        r(e);
                    }
                });
                a.registerReloadSesion(() => {
                    TimerHelper.next(() => {
                        this.reloadSession();
                    });
                });
                this.colDocumentSession = a;
            });
        } else {
            return Promise.resolve(null);
        }
    }
    reloadSession() {
        var e = ga.getStore().getState();
        var t = e.documents.activeDocumentData;
        if (t) {
            console.log("Reload session handling ...");
            ga.dispatch({
                type: "documents_loading"
            });
            DocumentFetcher.fetch(t.id, e.documents.tree).then((e) => {
                ga.dispatch(PageDispatches.setActiveDocument(e));
            }).
                catch((e) => {
                    ga.dispatch(PageDispatches.setActiveDocumentError(e.message));
                });
        }
    }
};
var hi = new class {
    processInitResponse(e) {
        return e.isFirstLoginAndNoDocument = this.isFirstLoginAndNoDocument(e),
            e.user.settings && e.user.settings.generalSettings && e.user.settings.generalSettings.complexObject && (e.user.settings.generalSettings.complexObject = JSON.parse(e.user.settings.generalSettings.complexObject)),
            e;
    }
    isFirstLoginAndNoDocument(e) {
        return e.user.isFirstLogin && 1 === e.tree.documents.length;
    }
};
var Gt = new class {
    handleDocumentResponse(e) {
        var t = this.toDocumentFull(e);
        if (e.isAnonymous) t.data = AppStorage.loadPageContent();
        return t;
    }
    parseFullFetchedDocumentData(e) {
        var t = JSON.parse(e);
        t.data = Serialization.parseFromSavedModel(t.data);
        t.settings = this.parseDocumentSettings(t.settings);
        return t;
    }
    toDocumentFull(e) {
        var t = e.data;
        var n = e.settings;
        var r = _.omit(e, ["data", "settings"]);
        return _.assignIn({},
            r, {
            data: Serialization.parseFromSavedModel(t),
            settings: this.parseDocumentSettings(n)
        });
    }
    parseDocumentSettings(e) {
        if (!e) {
            return {};
        }
        if (!_.isString(e)) {
            return e;
        }
        var t = JSON.parse(e);
        t.print && (t.print = JSON.parse(t.print));
        return t;
    }
};
var DocumentActions = new class {
    fetchFullDocument(e) {
        return Api.Get("/api/documents/".concat(e)).then((e) => {
            return e.text();
        }).then((e) => {
            return Gt.parseFullFetchedDocumentData(e);
        });
    }
    setSidebarWidthSettings(e) {
        return Api.Put("/api/user-settings/side-bar-width/".concat(e)).then(() => {
            return null;
        });
    }
    notifyTreeInfo(e) {
        return Api.Put("/api/tree/info", {
            collapsedToggles: e
        }).then(() => {
            return null;
        });
    }
    move(e, t) {
        return Api.Put("/api/tree/move", {
            nodes: e,
            directoryId: t
        }).then((e) => {
            return e.json();
        });
    }
    addNewDocument(e, t) {
        return Api.Post("/api/document", {
            name: e,
            directoryId: t
        }).then((e) => {
            return e.json();
        });
    }
    duplicateDocument(e, t, n) {
        return Api.Post("/api/documents/".concat(t, "/duplicate"), {
            name: e,
            directoryId: n
        }).then((e) => {
            return e.json();
        });
    }
    addNewDirectory(e, t) {
        return Api.Post("/api/directories", {
            name: e,
            directoryId: t
        }).then((e) => {
            return e.json();
        });
    }
    deleteItems(e) {
        return Api.Put("/api/tree/delete", {
            idInfo: e
        }).then((e) => {
            return e.json();
        });
    }
    fetchInit(e) {
        return Api.Get("/api/init2.json?sharedLink=".concat(e)).then((e) => {
            return e.json();
        }).then((x) => {
            var e = x.JSON || x;
            return hi.processInitResponse(e);
        });
    }
    saveAndIgnore(e, t) {
        return new Promise((n) => {
            var r = SaveWorkerAction();
            r.postMessage({
                id: e,
                model: t
            });
            r.onmessage = function () {
                n();
                r.terminate();
            };
        });
    }
    handleFirstUserLogin(e) {
        var t = e.documents[0].id;
        if (!t) {
            return null;
        }
        var n = SaveWorkerAction();
        var r = AppStorage.loadPageContent();
        return n.postMessage({
            id: t,
            model: r
        }),
            n.onmessage = function () {
                n.terminate();
            },
            t;
    }
    notifyEditingDocument(e) {
        Api.Put("/api/documents/".concat(e, "/editing"));
    }
};
var TokenStorage = new class {
    storeLastSessionToken(e) {
        localStorage.setItem("col_token", e);
    }
    getLastSessionToken() {
        return localStorage.getItem("col_token");
    }
    storeLastAnonymousName(e) {
        localStorage.setItem("col_anonymous_name", e);
    }
    getLastAnonymousName() {
        return localStorage.getItem("col_anonymous_name");
    }
    getQueryString() {
        var e = this.getLastSessionToken();
        return e ? "lastToken=".concat(e, "&displayName=").concat(this.getLastAnonymousName()) : "";
    }
};
/*n.d(t, "a", function () {
    return DocumentActions;
});*/
/*n.d(t, "SaveWorker", function () {
    return SaveWorker;
});*/
/*n.d(t, "SilentSaver", function () {
    return SilentSaver;
});*/
/*n.d(t, "DocumentFetcher", function () {
    return DocumentFetcher;
});*/
/*n.d(t, "DocumentWi", function () {
    return DocumentWi;
});*/
/*n.d(t, "TokenStorage", function () {
    return TokenStorage;
});*/
/*n.d(t, "DocumentFt", function () {
    return DocumentFt;
});*/
/*n.d(t, "DocumentYa", function () {
    return ya;
});*/

export { SaveWorker }

export { SilentSaver }

export { DocumentFetcher }

export { DocumentWi }

export { TokenStorage }

export { DocumentFt }

export { ya as DocumentYa }

export default DocumentActions