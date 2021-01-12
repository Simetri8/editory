import $observable from 'symbol-observable';
import * as ReactIs from 'react-is';
import hoistNonReactStatics from 'hoist-non-react-statics';
import invariant from 'invariant';
import PropTypes from 'prop-types';
import React from 'react';

var Rdx;
/// xxx(1544) /*Rdx*/

function te(e, t) {
    var n;
    var r;
    if (void 0 === t) {
        t = {};
    }
    var a = t;
    var i = a.getDisplayName;
    var o = void 0 === i ?
    function (e) {
        return "ConnectAdvanced(" + e + ")";
    } : i;
    var s = a.methodName;
    var l = void 0 === s ? "connectAdvanced" : s;
    var c = a.renderCountProp;
    var d = void 0 === c ? void 0 : c;
    var h = a.shouldHandleStateChanges;
    var u = void 0 === h || h;
    var p = a.storeKey;
    var m = void 0 === p ? "store" : p;
    var f = a.withRef;
    var g = void 0 !== f && f;
    var y = z(a, ["getDisplayName", "methodName", "renderCountProp", "shouldHandleStateChanges", "storeKey", "withRef"]);
    var A = m + "Subscription";
    var E = J++;
    var v = ((n = {})[m] = str, n[A] = H, n);
    var S = ((r = {})[A] = H, r);
    return function (t) {
        invariant(Object(ReactIs.isValidElementType)(t), "You must pass a component to the function returned by " + l + ". Instead received " + JSON.stringify(t));
        var n = t.displayName || t.name || "Component";
        var r = o(n);
        var a = G({},
        y, {
            getDisplayName: o,
            methodName: l,
            renderCountProp: d,
            shouldHandleStateChanges: u,
            storeKey: m,
            withRef: g,
            displayName: r,
            wrappedComponentName: n,
            WrappedComponent: t
        });
        var i = function (n) {
            function i(e, t) {
                var a;
                return (a = n.call(this, e, t) || this).version = E,
                a.state = {},
                a.renderCount = 0,
                a.store = e[m] || t[m],
                a.propsMode = Boolean(e[m]),
                a.setWrappedInstance = a.setWrappedInstance.bind(W(W(a))),
                invariant(a.store, 'Could not find "' + m + '" in either the context or props of "' + r + '". Either wrap the root component in a<Provider>,or explicitly pass "' + m + '" as a prop to "' + r + '".'),
                a.initSelector(),
                a.initSubscription(),
                a;
            }
            N(i, n);
            var o = i.prototype;
            return o.getChildContext = function () {
                var e;
                var t = this.propsMode ? null : this.subscription;
                return (e = {})[A] = t || this.context[A],
                e;
            },
            o.componentDidMount = function () {
                if (u) {
                    this.subscription.trySubscribe();
                    this.selector.run(this.props);
                    if (this.selector.shouldComponentUpdate) {
                        this.forceUpdate();
                    }
                }
            },
            o.componentWillReceiveProps = function (e) {
                this.selector.run(e);
            },
            o.shouldComponentUpdate = function () {
                return this.selector.shouldComponentUpdate;
            },
            o.componentWillUnmount = function () {
                if (this.subscription) {
                    this.subscription.tryUnsubscribe();
                }
                this.subscription = null;
                this.notifyNestedSubs = ee;
                this.store = null;
                this.selector.run = ee;
                this.selector.shouldComponentUpdate = false;
            },
            o.getWrappedInstance = function () {
                return invariant(g, "To access the wrapped instance,you need to specify{withRef:true}in the options argument of the " + l + "() call."),
                this.wrappedInstance;
            },
            o.setWrappedInstance = function (e) {
                this.wrappedInstance = e;
            },
            o.initSelector = function () {
                var t = e(this.store.dispatch, a);
                this.selector = function (e, t) {
                    var n = {
                        run: function (r) {
                            try {
                                var a = e(t.getState(), r);
                                if (a !== n.props || n.error) {
                                    n.shouldComponentUpdate = true;
                                    n.props = a;
                                    n.error = null;
                                }
                            } catch(e) {
                                n.shouldComponentUpdate = true;
                                n.error = e;
                            }
                        }
                    };
                    return n;
                } (t, this.store);
                this.selector.run(this.props);
            },
            o.initSubscription = function () {
                if (u) {
                    var e = (this.propsMode ? this.props : this.context)[A];
                    this.subscription = new X(this.store, e, this.onStateChange.bind(this));
                    this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(this.subscription);
                }
            },
            o.onStateChange = function () {
                this.selector.run(this.props);
                if (this.selector.shouldComponentUpdate) {
                    this.componentDidUpdate = this.notifyNestedSubsOnComponentDidUpdate;
                    this.setState($);
                } else {
                    this.notifyNestedSubs();
                }
            },
            o.notifyNestedSubsOnComponentDidUpdate = function () {
                this.componentDidUpdate = void 0;
                this.notifyNestedSubs();
            },
            o.isSubscribed = function () {
                return Boolean(this.subscription) && this.subscription.isSubscribed();
            },
            o.addExtraProps = function (e) {
                if (! (g || d || this.propsMode && this.subscription)) {
                    return e;
                }
                var t = G({},
                e);
                return g && (t.ref = this.setWrappedInstance),
                d && (t[d] = this.renderCount++),
                this.propsMode && this.subscription && (t[A] = this.subscription),
                t;
            },
            o.render = function () {
                var e = this.selector;
                if (e.shouldComponentUpdate = false, e.error) {
                    throw e.error;
                }
                return Object(React.createElement)(t, this.addExtraProps(e.props));
            },
            i;
        } (React.Component);
        return i.WrappedComponent = t,
        i.displayName = r,
        i.childContextTypes = S,
        i.contextTypes = v,
        i.propTypes = v,
        hoistNonReactStatics(i, t);
    };
}
function me(e, t) {
    var n = t.initMapStateToProps;
    var r = t.initMapDispatchToProps;
    var a = t.initMergeProps;
    var i = z(t, ["initMapStateToProps", "initMapDispatchToProps", "initMergeProps"]);
    var o = n(e, i);
    var s = r(e, i);
    var l = a(e, i);
    return (i.pure ? pe : ue)(o, s, l, e, i);
}
function ge(e, t) {
    return e === t;
}
function ae(e, t) {
    if (re(e, t)) {
        return true;
    }
    if ("object" != typeof e || null == e || "object" != typeof t || null == t) {
        return false;
    }
    var n = Object.keys(e);
    var r = Object.keys(t);
    if (n.length !== r.length) {
        return false;
    }
    var a = 0;
    for (; a < n.length; a++) {
        if (!ne.call(t, n[a]) || !re(e[n[a]], t[n[a]])) {
            return false;
        }
    }
    return true;
}
function z(e, t) {
    if (null == e) {
        return {};
    }
    var n;
    var r;
    var a = {};
    var i = Object.keys(e);
    r = 0;
    for (; r < i.length; r++) {
        n = i[r];
        if (! (t.indexOf(n) >= 0)) {
            a[n] = e[n];
        }
    }
    return a;
}
function w(e, t) {
    return function () {
        return t(e.apply(void 0, arguments));
    };
}
function N(e, t) {
    e.prototype = Object.create(t.prototype);
    e.prototype.constructor = e;
    e.__proto__ = t;
}
function W(e) {
    if (void 0 === e) {
        throw new ReferenceError("this hasn't been initialised-super() hasn't been called");
    }
    return e;
}
function ee() {}
function re(e, t) {
    return e === t ? 0 !== e || 0 !== t || 1 / e === 1 / t : e != e && t != t;
}
function ie(e) {
    return function (t, n) {
        function a() {
            return r;
        }
        var r = e(t, n);
        return a.dependsOnOwnProps = false,
        a;
    };
}
function se(e, t) {
    return function (t, n) {
        var displayName = n.displayName;
        var r = function (e, t) {
            return r.dependsOnOwnProps ? r.mapToProps(e, t) : r.mapToProps(e);
        };
        r.dependsOnOwnProps = true;
        r.mapToProps = function (t, n) {
            r.mapToProps = e;
            r.dependsOnOwnProps = oe(e);
            var a = r(t, n);
            if ("function" == typeof a) {
                r.mapToProps = a;
                r.dependsOnOwnProps = oe(a);
                a = r(t, n);
            }
            return a;
        };
        return r;
    };
}
function de(e, t, n) {
    return G({},
    n, e, t);
}
function ue(e, t, n, r) {
    return function (a, i) {
        return n(e(a, i), t(r, i), i);
    };
}
function pe(e, t, n, r, a) {
    function m(a, p) {
        var m;
        var f;
        var g = !h(p, o);
        var y = !d(a, i);
        return i = a,
        o = p,
        g && y ? (s = e(i, o), t.dependsOnOwnProps && (l = t(r, o)), c = n(s, l, o)) : g ? (e.dependsOnOwnProps && (s = e(i, o)), t.dependsOnOwnProps && (l = t(r, o)), c = n(s, l, o)) : y ? (m = e(i, o), f = !u(m, s), s = m, f && (c = n(s, l, o)), c) : c;
    }
    var i;
    var o;
    var s;
    var l;
    var c;
    var d = a.areStatesEqual;
    var h = a.areOwnPropsEqual;
    var u = a.areStatePropsEqual;
    var p = false;
    return function (a, d) {
        return p ? m(a, d) : (s = e(i = a, o = d), l = t(r, o), c = n(s, l, o), p = true, c);
    };
}
function oe(e) {
    return null !== e.dependsOnOwnProps && void 0 !== e.dependsOnOwnProps ? Boolean(e.dependsOnOwnProps) : 1 !== e.length;
}
function G() {
    return (G = Object.assign ||
    function (e) {
        var t = 1;
        for (; t < arguments.length; t++) {
            var n = arguments[t];
            var r;
            for (r in n) {
                if (Object.prototype.hasOwnProperty.call(n, r)) {
                    e[r] = n[r];
                }
            }
        }
        return e;
    }).apply(this, arguments);
}
function fe(e, t, n) {
    var r = t.length - 1;
    for (; r >= 0; r--) {
        var a = t[r](e);
        if (a) {
            return a;
        }
    }
    return function (t, r) {
        throw new Error("Invalid value of type " + typeof e + " for " + n + " argument when connecting component " + r.wrappedComponentName + ".");
    };
}
function M(e, t) {
    var n = t && t.type;
    return "Given action " + (n && '"' + n.toString() + '"' || "an action") + ',reducer "' + e + '" returned undefined. To ignore an action,you must explicitly return the previous state. If you want this reducer to hold no value,you can return null instead of undefined.';
}
function createStore(e, t, n) {
    function c() {
        if (s === o) {
            s = o.slice();
        }
    }
    function d() {
        return i;
    }
    function h(e) {
        if ("function" != typeof e) {
            throw new Error("Expected listener to be a function.");
        }
        var t = true;
        return c(),
        s.push(e),
        function () {
            if (t) {
                t = false;
                c();
                var n = s.indexOf(e);
                s.splice(n, 1);
            }
        };
    }
    function u(e) {
        if (!T(e)) {
            throw new Error("Actions must be plain objects. Use custom middleware for async actions.");
        }
        if (void 0 === e.type) {
            throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');
        }
        if (l) {
            throw new Error("Reducers may not dispatch actions.");
        }
        try {
            l = true;
            i = a(i, e);
        } finally {
            l = false;
        }
        var t = o = s;
        var n = 0;
        for (; n < t.length; n++) {
            (0, t[n])();
        }
        return e;
    }
    var r;
    if ("function" == typeof t && void 0 === n && (n = t, t = void 0), void 0 !== n) {
        if ("function" != typeof n) {
            throw new Error("Expected the enhancer to be a function.");
        }
        return n(createStore)(e, t);
    }
    if ("function" != typeof e) {
        throw new Error("Expected the reducer to be a function.");
    }
    var a = e;
    var i = t;
    var o = [];
    var s = o;
    var l = false;
    return u({
        type: L.INIT
    }),
    (r = {
        dispatch: u,
        subscribe: h,
        getState: d,
        replaceReducer: function (e) {
            if ("function" != typeof e) {
                throw new Error("Expected the nextReducer to be a function.");
            }
            a = e;
            u({
                type: L.INIT
            });
        }
    })[$observable] = function () {
        var e;
        var t = h;
        return (e = {
            subscribe: function (e) {
                function n() {
                    if (e.next) {
                        e.next(d());
                    }
                }
                if ("object" != typeof e) {
                    throw new TypeError("Expected the observer to be an object.");
                }
                return n(),
                {
                    unsubscribe: t(n)
                };
            }
        })[$observable] = function () {
            return this;
        },
        e;
    },
    r;
}
function D() {
    var e = arguments.length;
    var t = Array(e);
    var n = 0;
    for (; n < e; n++) {
        t[n] = arguments[n];
    }
    return function (e) {
        return function (n, r, a) {
            var i;
            var o = e(n, r, a);
            var s = o.dispatch;
            var l = {
                getState: o.getState,
                dispatch: function (e) {
                    return s(e);
                }
            };
            return i = t.map(function (e) {
                return e(l);
            }),
            s = function () {
                var e = arguments.length;
                var t = Array(e);
                var n = 0;
                for (; n < e; n++) {
                    t[n] = arguments[n];
                }
                return 0 === t.length ?
                function (e) {
                    return e;
                } : 1 === t.length ? t[0] : t.reduce(function (e, t) {
                    return function () {
                        return e(t.apply(void 0, arguments));
                    };
                });
            }.apply(void 0, i)(o.dispatch),
            O({},
            o, {
                dispatch: s
            });
        };
    };
}
/// var k = n(0);  // 4 times
/// var B = n.n(k);
/// var P = n(23);  // 10 times
/// var F = n.n(P);
/// var Y = n(700);  // 1 times
/// var K = n.n(Y);
/// var V = n(468);  // 3 times
/// var j = n.n(V);
/// var q = n(327);  // 1 times
var J = 0;
var $ = {};
var ne = Object.prototype.hasOwnProperty;
/// var b = n(541);  // 2 times
var H = PropTypes.shape({
    trySubscribe: PropTypes.func.isRequired,
    tryUnsubscribe: PropTypes.func.isRequired,
    notifyNestedSubs: PropTypes.func.isRequired,
    isSubscribed: PropTypes.func.isRequired
});
var str = PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired
});
var Q = null;
var Z = {
    notify: function () {}
};
var X = function () {
    function e(e, t, n) {
        this.store = e;
        this.parentSub = t;
        this.onStateChange = n;
        this.unsubscribe = null;
        this.listeners = Z;
    }
    var t = e.prototype;
    return t.addNestedSub = function (e) {
        return this.trySubscribe(),
        this.listeners.subscribe(e);
    },
    t.notifyNestedSubs = function () {
        this.listeners.notify();
    },
    t.isSubscribed = function () {
        return Boolean(this.unsubscribe);
    },
    t.trySubscribe = function () {
        var e;
        var t;
        if (!this.unsubscribe) {
            this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.onStateChange) : this.store.subscribe(this.onStateChange);
            this.listeners = (e = [], t = [], {
                clear: function () {
                    t = Q;
                    e = Q;
                },
                notify: function () {
                    var n = e = t;
                    var r = 0;
                    for (; r < n.length; r++) {
                        n[r]();
                    }
                },
                get: function () {
                    return t;
                },
                subscribe: function (n) {
                    var r = true;
                    return t === e && (t = e.slice()),
                    t.push(n),
                    function () {
                        if (r && e !== Q) {
                            r = false;
                            if (t === e) {
                                t = e.slice();
                            }
                            t.splice(t.indexOf(n), 1);
                        }
                    };
                }
            });
        }
    },
    t.tryUnsubscribe = function () {
        if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
            this.listeners.clear();
            this.listeners = Z;
        }
    },
    e;
} ();
var le = [function (e) {
    return "function" == typeof e ? se(e) : void 0;
},
function (e) {
    return e ? void 0 : ie(function (e) {
        return {
            dispatch: e
        };
    });
},
function (e) {
    return e && "object" == typeof e ? ie(function (t) {
        return function (e, t) {
            if ("function" == typeof e) {
                return w(e, t);
            }
            if ("object" != typeof e || null == e) {
                throw new Error("bindActionCreators expected an object or a function,instead received " + (null == e ? "null" : typeof e) + '. Did you write "import ActionCreators from" instead of "import*as ActionCreators from"?');
            }
            var n = Object.keys(e);
            var r = {};
            var a = 0;
            for (; a < n.length; a++) {
                var i = n[a];
                var o = e[i];
                if ("function" == typeof o) {
                    r[i] = w(o, t);
                }
            }
            return r;
        } (e, t);
    }) : void 0;
}];
var ce = [function (e) {
    return "function" == typeof e ? se(e) : void 0;
},
function (e) {
    return e ? void 0 : ie(function () {
        return {};
    });
}];
var he = [function (e) {
    return "function" == typeof e ?
    function (e) {
        return function (t, n) {
            var displayName = n.displayName;
            var r;
            var a = n.pure;
            var i = n.areMergedPropsEqual;
            var o = false;
            return function (t, n, s) {
                var l = e(t, n, s);
                return o ? a && i(l, r) || (r = l) : (o = true, r = l),
                r;
            };
        };
    } (e) : void 0;
},
function (e) {
    return e ? void 0 : function () {
        return de;
    };
}];
var ye;
var Ae;
var Ee;
var ve;
var Se;
var Ce;
var xe;
var Ie;
var Te;
var be;
var Le;
var Re;
var Me = (Ee = (Ae = void 0 === ye ? {} : ye).connectHOC, ve = void 0 === Ee ? te : Ee, Se = Ae.mapStateToPropsFactories, Ce = void 0 === Se ? ce : Se, xe = Ae.mapDispatchToPropsFactories, Ie = void 0 === xe ? le : xe, Te = Ae.mergePropsFactories, be = void 0 === Te ? he : Te, Le = Ae.selectorFactory, Re = void 0 === Le ? me : Le, function (e, t, n, r) {
    if (void 0 === r) {
        r = {};
    }
    var a = r;
    var i = a.pure;
    var o = void 0 === i || i;
    var s = a.areStatesEqual;
    var l = void 0 === s ? ge : s;
    var c = a.areOwnPropsEqual;
    var d = void 0 === c ? ae : c;
    var h = a.areStatePropsEqual;
    var u = void 0 === h ? ae : h;
    var p = a.areMergedPropsEqual;
    var m = void 0 === p ? ae : p;
    var f = z(a, ["pure", "areStatesEqual", "areOwnPropsEqual", "areStatePropsEqual", "areMergedPropsEqual"]);
    var g = fe(e, Ce, "mapStateToProps");
    var y = fe(t, Ie, "mapDispatchToProps");
    var A = fe(n, be, "mergeProps");
    return ve(Re, G({
        methodName: "connect",
        getDisplayName: function (e) {
            return "Connect(" + e + ")";
        },
        shouldHandleStateChanges: Boolean(e),
        initMapStateToProps: g,
        initMapDispatchToProps: y,
        initMergeProps: A,
        pure: o,
        areStatesEqual: l,
        areOwnPropsEqual: d,
        areStatePropsEqual: u,
        areMergedPropsEqual: m
    },
    f));
});
var i = Function("return this")().Symbol;
var o = Object.prototype;
var s = o.hasOwnProperty;
var l = o.toString;
var c = i ? i.toStringTag : void 0;
var d = function (e) {
    var t = s.call(e, c);
    var n = e[c];
    try {
        e[c] = void 0;
        var r = true;
    } catch(e) {}
    var a = l.call(e);
    return r && (t ? e[c] = n : delete e[c]),
    a;
};
var h = Object.prototype.toString;
var u = function (e) {
    return h.call(e);
};
var p = "[object Null]";
var m = "[object Undefined]";
var f = i ? i.toStringTag : void 0;
var g = function (e) {
    return null == e ? void 0 === e ? m : p : f && f in Object(e) ? d(e) : u(e);
};
var y = function (e, t) {
    return function (n) {
        return e(t(n));
    };
} (Object.getPrototypeOf, Object);
var A = function (e) {
    return null != e && "object" == typeof e;
};
var E = "[object Object]";
var v = Function.prototype;
var S = Object.prototype;
var C = v.toString;
var x = S.hasOwnProperty;
var I = C.call(Object);
var T = function (e) {
    if (!A(e) || g(e) != E) {
        return false;
    }
    var t = y(e);
    if (null == t) {
        return true;
    }
    var n = x.call(t, "constructor") && t.constructor;
    return "function" == typeof n && n instanceof n && C.call(n) == I;
};
var L = {
    INIT: "@@redux/INIT"
};
var Provider = function (e) {
    var t;
    if (void 0 === e) {
        e = "store";
    }
    var n = e + "Subscription";
    var r = function (t) {
        function a(n, r) {
            var a;
            return (a = t.call(this, n, r) || this)[e] = n.store,
            a;
        }
        N(a, t);
        var r = a.prototype;
        return r.getChildContext = function () {
            var t;
            return (t = {})[e] = this[e],
            t[n] = null,
            t;
        },
        r.render = function () {
            return React.Children.only(this.props.children);
        },
        a;
    } (React.Component);
    return r.propTypes = {
        store: str.isRequired,
        children: PropTypes.element.isRequired
    },
    r.childContextTypes = ((t = {})[e] = str.isRequired, t[n] = H, t),
    r;
} ();
var combineReducers = function (e) {
    var t = Object.keys(e);
    var n = {};
    var r = 0;
    for (; r < t.length; r++) {
        var a = t[r];
        if ("function" == typeof e[a]) {
            n[a] = e[a];
        }
    }
    var i = Object.keys(n);
    var o = void 0;
    try {
        Object.keys(e).forEach(function (t) {
            var n = e[t];
            if (void 0 === n(void 0, {
                type: L.INIT
            })) {
                throw new Error('Reducer "' + t + "\" returned undefined during initialization. If the state passed to the reducer is undefined,you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer,you can use null instead of undefined.");
            }
            if (void 0 === n(void 0, {
                type: "@@redux/PROBE_UNKNOWN_ACTION_" + Math.random().toString(36).substring(7).split("").join(".")
            })) {
                throw new Error('Reducer "' + t + "\" returned undefined when probed with a random type. Don't try to handle " + L.INIT + ' or other actions in "redux/*" namespace. They are considered private. Instead,you must return the current state for any unknown actions,unless it is undefined,in which case you must return the initial state,regardless of the action type. The initial state may not be undefined,but can be null.');
            }
        });
    } catch(e) {
        o = e;
    }
    return function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        var t = arguments[1];
        if (o) {
            throw o;
        }
        var r = false;
        var a = {};
        var s = 0;
        for (; s < i.length; s++) {
            var l = i[s];
            var c = n[l];
            var d = e[l];
            var h = c(d, t);
            if (void 0 === h) {
                var u = M(l, t);
                throw new Error(u);
            }
            a[l] = h;
            r = r || h !== d;
        }
        return r ? a : e;
    };
};
var O = Object.assign ||
function (e) {
    var t = 1;
    for (; t < arguments.length; t++) {
        var n = arguments[t];
        var r;
        for (r in n) {
            if (Object.prototype.hasOwnProperty.call(n, r)) {
                e[r] = n[r];
            }
        }
    }
    return e;
};
var exports = {
    connect: Me,
    Provider: Provider,
    combineReducers: combineReducers,
    createStore: createStore,
    D: D
};
Rdx = exports;
/*n.d(t, "connect", function () {
    return Me;
});*/
/*n.d(t, "Provider", function () {
    return Provider;
});*/
/*n.d(t, "combineReducers", function () {
    return combineReducers;
});*/
/*n.d(t, "createStore", function () {
    return createStore;
});*/
/*n.d(t, "D", function () {
    return D;
});*/

export { Me as connect }

export { Provider }

export { combineReducers }

export { createStore }

export { D as RdxD }

export default Rdx