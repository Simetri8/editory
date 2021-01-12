import _ from 'lodash';
import { fetch } from 'whatwg-fetch';
import axios from 'axios';
import { Promise } from 'bluebird';

/// xxx(1542) /*Api*/

function setServerResponseTypes(e) {
    e[e.Checking = 1] = "Checking";
    e[e.Valid = 2] = "Valid";
    e[e.LicenseMissing = 3] = "LicenseMissing";
    e[e.LicenseExpired = 4] = "LicenseExpired";
    e[e.LicenseCorrupted = 5] = "LicenseCorrupted";
    e[e.LicenseCheckingError = 6] = "LicenseCheckingError";
    e[e.LicenseInvalid = 7] = "LicenseInvalid";
    e[e.ServerResponseLicenseCorrupted = 8] = "ServerResponseLicenseCorrupted";
    e[e.ServerResponseError = 9] = "ServerResponseError";
    e[e.MachineCheckingFailed = 10] = "MachineCheckingFailed"
}
function qe() {
    return axios
    //return window.customFetch ? window.customFetch : fetch
}
function Qe(e) {
    if (401 === e.status || 403 === e.status) throw {
        isManaged: true,
        status: e.status,
        message: "Your session has expired,please refresh page and login again"
    };
    if (413 === e.status) throw {
        isManaged: true,
        status: e.status,
        message: "Your doucment has exceeded content limit"
    };
    if (422 === e.status) return e.json().then((x) => {
        var t = x.JSON || x;
        throw {
            isManaged: true,
            status: e.status,
            message: t.message
        };
    });
    if (!e.ok) throw {
        isManaged: true,
        status: e.status,
        message: e.statusText
    };
    return e
}
function Ze(e) {
    return e && e.isManaged
}
function Xe(e) {
    if (Ze(e)) throw e;
    throw {
        isManaged: true,
        status: 0,
        isConnectionError: true,
        message: "Connection error, could not perform this action"
    };
}
function rt(e) {
    return e ? "string" == typeof e ? e : JSON.stringify(e) : null
}
/*n.d(t, "a", function () {
    return Api
});*/
/*n.d(t, "ServerResponseTypes", function () {
    return ServerResponseTypes
});*/
var ServerResponseTypes;
setServerResponseTypes(ServerResponseTypes || (ServerResponseTypes = {}));
/// var Pe = n(3);  // 1 times
/// var Fe = n.n(Pe);
/// var Ke = n(328)/*fetch*/;  // 1 times
/// var Ve = n.n(Ke);
/// var Ne = n(30)/*blubirdjs*/;  // 4 times
/// var ke = n.n(Ne);
var je = {
    Accept: "application/json,text/plain,*/*",
    "Content-Type": "application/json"
    //'Access-Control-Allow-Origin': '*'
};

var apiHost = 'http://localhost:63286/';

var post = function (url, data, then, error) {
    axios.post(apiHost + url, data || {})
        .then((e)=>{
            console.log("[][Api] post", e);
            if(then)
                then(e);
        })
        .catch((e)=>{
            console.log("[][Api] post error", e);
            if(error)
                error(e);
        });
};

var get = function (url, then, error) {

    axios.get(apiHost + url)
        .then((e)=>{
            console.log("[][Api] get", e);
            if(then)
                then(e);
        })
        .catch((e)=>{
            console.log("[][Api] get error", e);
            if(error)
                error(e);
        });
};

var put = function (e, t) {
    return Promise.resolve(qe()(e, {
        method: "PUT",
        headers: je,
        //credentials: "same-origin",
        mode: 'no-cors',
        body: rt(t)
    })).then(Qe).
        catch(Xe)
};
var del = function (e, t) {
    return Promise.resolve(qe()(e, {
        method: "DELETE",
        headers: je,
        //credentials: "same-origin",
        mode: 'no-cors',
        body: rt(t)
    })).then(Qe).
        catch(Xe)
};
// var get = function (e) {
//     return Promise.resolve(qe()(e, {
//         headers: je,
//         mode: 'no-cors',
//     })).then(Qe).
//         catch(Xe)
// };
var Api = {
    Post: post,
    Put: put,
    Delete: del,
    Get: get
}

export { ServerResponseTypes }

export default Api