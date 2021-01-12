import { connect } from 'react-redux';
import { Promise } from 'bluebird';
import logger from 'redux-logger';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import PageWrapper from './PageWrapper';
import Reducers from './Reducers';

/// xxx(1543) /*RootComponent*/

/// n.r(t)
/// var page = n(1546)/*PageWrapper*/;  // 2 times
/// var React = n(0)/*React*/;  // 0 times
/// var ReactDOM = n(16)/*ReactDOM*/;  // 0 times
/// var we = n(542)/*redux-thunk*/;  // 2 times
/// var Oe = n.n(we);
/// var De = n(701)/*redux-logger*/;  // 1 times
/// var Ne = n(30)/*blubirdjs*/;  // 1 times
/// var ke = n.n(Ne);
/// var redux = n(1544)/*Rdx*/;  // 0 times
/// var rd = n(1545)/*Reducers*/;  // 1 times
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
var reducers = redux.combineReducers(Reducers);
try {
    if (!Object({
        NODE_ENV: "production",
        NO_CDN: false
    }).ELECTRON) {
        n.p = window.cdnPrefix + n.p;
    }
} catch(e) {
    console.log("ELECTRON >window.cdnPrefix", e);
}
Promise.config({
    cancellation: true
});
var fonts = ["Asana", "Asana-Math", "Asana-Mathbb", "Asana-Mathit", "Asana-Mathcal", "Asana-Mathfrak", "Asana-mathsf", "Asana-Mathtt", "Asana-Mathrm", "Asana-Mathscr", "FontAwesome"];
if ("dev" == mathGlobal.environment) {
    Object(logger.createLogger)();
    var store = redux.createStore(reducers, redux.D(thunk));
    ga.setStore(store);
    var fontList = [];
    fonts.forEach((e) => {
        var t;
        if (e instanceof Array) {
            return (t = document.createElement("div")).style.fontFamily = e[0],
            e[1] && (t.style.fontWeight = "bold"),
            e[2] && (t.style.fontStyle = "italic"),
            t.style.position = "absolute",
            t.style.left = "-1000px",
            t.innerText = "a",
            document.body.appendChild(t),
            void fontList.push(t);
        } (t = document.createElement("div")).style.fontFamily = e;
        t.style.position = "absolute";
        t.style.left = "-1000px";
        t.innerText = "a";
        document.body.appendChild(t);
        fontList.push(t);
    });
    setTimeout(() => {
        fontList.forEach((e) => {
            return document.body.removeChild(e);
        });
        ReactDOM.render(React.createElement(redux.Provider, {
            store: store
        },
        React.createElement(PageWrapper, null)), document.getElementById("root"));
    },
    500);
} else {
    store = redux.createStore(reducers, redux.D(thunk));
    ga.setStore(store);
    ReactDOM.render(React.createElement(redux.Provider, {
        store: store
    },
    React.createElement(PageWrapper, null)), document.getElementById("root"));
}

export default RootComponent 