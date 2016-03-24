"use strict";

module.exports = function e(n) {
    this._model = n;
    this._type = n.modelName.toLowerCase() + "s";
    var t = this;
    return {
        get: o,
        post: a,
        put: r,
        patch: l,
        "delete": c
    };
    function o(e, n, t) {
        n.locals.response = {};
        if (e.params.id) {
            i(e, n, t);
        } else {
            s(e, n, t);
        }
    }
    function i(e, n, o) {
        t._model.findById(e.params.id, function(e, t) {
            if (!e) {
                n.locals.response.data = y(n, t);
            }
            o();
        });
    }
    function s(e, n, o) {
        var i = f(e);
        var s = p(e);
        t._model.paginate(s, i).then(function(t) {
            n.locals.response.links = d(e, n, t, i, s);
            n.locals.response.data = g(n, t.docs);
            o();
        }, function(e) {});
    }
    function a(e, n, o) {
        n.locals.response = {};
        var i = u(e.body);
        var s = new t._model(i);
        s.save(function(e, t) {
            if (!e) {
                n.locals.response.data = y(n, t);
            }
            o();
        });
    }
    function r(e, n, t) {
        n.locals.response = {};
        t();
    }
    function l(e, n, o) {
        n.locals.response = {};
        if (e.params.id) {
            var i = u(e.body);
            t._model.findByIdAndUpdate(e.params.id, i, {
                "new": true
            }, function(e, t) {
                if (!e) {
                    n.locals.response.data = y(n, t);
                }
                o();
            });
        } else {
            o();
        }
    }
    function c(e, n, o) {
        n.locals.response = {};
        if (e.params.id) {
            t._model.findByIdAndRemove(e.params.id, function(e, t) {
                if (!e) {
                    n.locals.response.data = {
                        message: "ok"
                    };
                }
                o();
            });
        } else {
            o();
        }
    }
    function u(e) {
        var n = {};
        Object.keys(t._model.schema.tree).forEach(function(t) {
            if (e[t]) {
                n[t] = e[t];
            }
        });
        return n;
    }
    function f(e) {
        return {
            page: e.query.page || 1,
            limit: e.query.limit || 10,
            sort: {
                id: "asc"
            }
        };
    }
    function p(e) {
        var n = {};
        Object.keys(e.query).forEach(function(t) {
            n[t] = e.query[t];
        });
        return n;
    }
    function d(e, n, t, o, i) {
        var s = [], a = {}, r = n.locals.url + "?" + encodeURI(s);
        Object.keys(i).forEach(function(e) {
            s.push(e + "=" + i[e]);
        });
        s = s.join("&");
        if (t.total > 0) {
            a.self = m(r, o.page, o.limit, s);
        }
        if (t.page < t.pages) {
            a.next = m(r, Number(t.page) + 1, o.limit, s);
            a.last = m(r, t.pages, o.limit, s);
        }
        if (t.page > 1 && t.page <= t.pages) {
            a.first = m(r, 1, o.limit, s);
            a.prev = m(r, Number(t.page) - 1, o.limit, s);
        }
        return a;
    }
    function m(e, n, t, o) {
        return [ e, "&page=", n, "&limit=", t, "&", o ].join("");
    }
    function g(e, n) {
        var t = [];
        n.forEach(function(n) {
            t.push(y(e, n));
        });
        return t;
    }
    function y(e, n) {
        return {
            type: t._type,
            id: n.id,
            attributes: n.toJSON(),
            links: {
                self: e.locals.url + "/" + n.id
            }
        };
    }
};