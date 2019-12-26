! function (t) {
    var n = {};

    function e(i) {
        if (n[i]) return n[i].exports;
        var r = n[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return t[i].call(r.exports, r, r.exports, e), r.l = !0, r.exports
    }
    e.m = t, e.c = n, e.d = function (t, n, i) {
        e.o(t, n) || Object.defineProperty(t, n, {
            enumerable: !0,
            get: i
        })
    }, e.r = function (t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, e.t = function (t, n) {
        if (1 & n && (t = e(t)), 8 & n) return t;
        if (4 & n && "object" == typeof t && t && t.__esModule) return t;
        var i = Object.create(null);
        if (e.r(i), Object.defineProperty(i, "default", {
                enumerable: !0,
                value: t
            }), 2 & n && "string" != typeof t)
            for (var r in t) e.d(i, r, function (n) {
                return t[n]
            }.bind(null, r));
        return i
    }, e.n = function (t) {
        var n = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return e.d(n, "a", n), n
    }, e.o = function (t, n) {
        return Object.prototype.hasOwnProperty.call(t, n)
    }, e.p = "", e(e.s = 0)
}([function (t, n, e) {
    window.simulateDragDrop = e(1).simulateDragDrop, window.scrollStop = e(2).scrollStop, window.testability = e(3), window.instrumentBrowser = e(4), window.instrumentBrowser(window), window.scrollStop(), window.seleniumtestabilityready = !0
}, function (t, n) {
    n.simulateDragDrop = function (t, n) {
        var e = "dragend",
            i = "dragstart",
            r = "drop";

        function a(t) {
            var n = new CustomEvent("CustomEvent");
            return n.initCustomEvent(t, !0, !0, null), n.dataTransfer = {
                data: {},
                setData: function (t, n) {
                    this.data[t] = n
                },
                getData: function (t) {
                    return this.data[t]
                }
            }, n
        }

        function o(t, n, e) {
            return t.dispatchEvent ? t.dispatchEvent(e) : t.fireEvent ? t.fireEvent("on" + n, e) : void 0
        }
        var s = a(i);
        o(t, i, s);
        var u = a(r);
        u.dataTransfer = s.dataTransfer, o(n, r, u);
        var d = a(e);
        d.dataTransfer = s.dataTransfer, o(t, e, d)
    }
}, function (t, n) {
    n.scrollStop = function () {
        var t = null;
        window.addEventListener("scroll", (function (n) {
            null != t && (window.clearTimeout(t), window.testability.wait.oneLess()), window.testability.wait.oneMore(), t = setTimeout((function () {
                window.testability.wait.oneLess(), t = null
            }), 66)
        }), !1)
    }
}, function (t, n, e) {
    var i, r;
    /*! testability.js - v0.3.1
     *  Release on: 2016-10-11
     *  Copyright (c) 2016 Alfonso Presa
     *  Licensed MIT */
    r = this, void 0 === (i = function () {
        return r.testability = function () {
            "use strict";
            return function t() {
                if (!this || this.constructor !== t) return new t;
                var n = 0,
                    e = [];
                this.reset = function () {
                    n = 0, e = []
                }, this.when = {
                    ready: function (t) {
                        0 === n ? t() : e.push(t)
                    }
                }, this.wait = {
                    start: function () {
                        var t = this;
                        return this.oneMore(), {
                            end: function () {
                                t && t.oneLess(), t = void 0
                            }
                        }
                    },
                    oneMore: function () {
                        n += 1
                    },
                    oneLess: function () {
                        if ((n -= 1) < 0 && (n = 0), 0 === n)
                            for (; 0 === n && 0 !== e.length;) e.pop()()
                    },
                    for: function (t) {
                        this.oneMore(), t.then(this.oneLess).catch(this.oneLess)
                    }
                }
            }()
        }()
    }.apply(n, [])) || (t.exports = i)
}, function (t, n, e) {
    "use strict";
    var i = function (t) {
        var n, e, i = (t = t || this).setImmediate || t.setTimeout;

        function r(n, e, r) {
            var a = t[n];
            if (a) {
                var o = t[e],
                    s = {},
                    u = {};
                t[n] = function () {
                    var n, e = arguments[0],
                        i = arguments[1] || 0;
                    return !r || i < 5e3 && s[e] !== e ? (arguments[0] = function () {
                        var i;
                        s[e] = e;
                        try {
                            i = e.apply(t, arguments)
                        } finally {
                            delete s[e], d(n)
                        }
                        return i
                    }, n = a.apply(t, arguments), u[n] = t.testability.wait.start()) : n = a.apply(t, arguments), n
                }, t[e] = function () {
                    var n = o.apply(t, arguments);
                    return d(arguments[0]), n
                }, t[n].restore = function () {
                    t[n] = a
                }, t[e].restore = function () {
                    t[e] = o
                }
            }

            function d(t) {
                var n = u[t];
                n && (i(n.end), delete u[t])
            }
        }
        r("setTimeout", "clearTimeout", !0), r("setImmediate", "clearImmediate", !1), (e = t[n = "fetch"]) && (t[n] = function () {
            var n;

            function r(n) {
                return i(t.testability.wait.oneLess), n
            }
            return (n = e.apply(t, arguments)).then(r).catch(r), t.testability.wait.oneMore(), n
        }, t[n].restore = function () {
            t[n] = e
        });
        var a = t.XMLHttpRequest.prototype.open;
        t.XMLHttpRequest.prototype.open = function () {
            if (t.testability) {
                var n;
                this.addEventListener("readystatechange", (function () {
                    4 === this.readyState && n && i(n.end), 1 !== this.readyState || n || (n = testability.wait.start())
                }), !1);
                var e = this.abort;
                this.abort = function () {
                    n && i(n.end), e.apply(this, arguments)
                }
            }
            a.apply(this, arguments)
        };
        var o = function () {
            var t, n = document.createElement("fakeelement"),
                e = {
                    OTransition: {
                        transitionend: "oTransitionEnd",
                        transitionstart: "oTransitionStart",
                        animationend: "oAnimationEnd",
                        animationstart: "oAnimationStart"
                    },
                    MozTransition: {
                        transitionend: "transitionend",
                        transitionstart: "transitionstart",
                        animationend: "animationend",
                        animationstart: "animationstart"
                    },
                    WebkitTransition: {
                        transitionend: "webkitTransitionEnd",
                        transitionstart: "webkitTransitionStart",
                        animationend: "webkitAnimationEnd",
                        animationstart: "webkitAnimationStart"
                    }
                };
            for (t in e)
                if (void 0 !== n.style[t]) return e[t];
            return {
                transitionend: "transitionend",
                transitionstart: "transitionstart",
                animationend: "animationend",
                animationstart: "animationstart"
            }
        }();

        function s(n) {
            if (n.target && !n.target._testabilityAnimating) {
                var e = t.getComputedStyle(n.target),
                    i = e["animation-iteration-count"] || e["-webkit-animation-iteration-count"];
                if (i && i.indexOf("infinite") >= 0) return;
                n.target._testabilityAnimating = !0, t.testability.wait.oneMore()
            }
        }

        function u(n) {
            n.target && n.target._testabilityAnimating && (i(t.testability.wait.oneLess), delete n.target._testabilityAnimating)
        }
        document.addEventListener(o.animationstart, s), document.addEventListener(o.animationend, u);
        var d = Element.prototype.animate;
        return d && (Element.prototype.animate = function () {
            var t = d.apply(this, arguments);
            return t.effect.activeDuration !== 1 / 0 && testability.wait.for(t.finished), t
        }), {
            animationEvents: o,
            restore: function () {
                t.setTimeout.restore(), t.clearTimeout.restore(), t.setImmediate && (t.setImmediate.restore(), t.clearImmediate.restore()), t.fetch && t.fetch.restore(), t.XMLHttpRequest.prototype.open = a, document.removeEventListener(o.transitionstart, s), document.removeEventListener(o.transitionend, u), document.removeEventListener(o.animationstart, s), document.removeEventListener(o.animationend, u), d && (Element.prototype.animate = d)
            }
        }
    };
    "undefined" == typeof window && (t.exports = i), t.exports = i
}]);