"use strict";

module.exports = function n(e) {
    this._model = e;
    this._type = e.modelName.toLowerCase() + "s";
    var t = this;
    return {
        get: o,
        post: s,
        put: u,
        patch: a,
        "delete": c
    };
    function o(n, e, t) {
        e.locals.response = {};
        if (n.params.id) {
            i(n, e, t);
        } else {
            l(n, e, t);
        }
    }
    function i(n, e, o) {
        t._model.findById(n.params.id, function(n, t) {
            if (!n) {
                e.locals.response.data = g(e, t);
            }
            o();
        });
    }
    function l(n, e, o) {
        var i = r(n);
        var l = f(n);
        t._model.paginate(l, i).then(function(t) {
            e.locals.response.links = p(n, e, t, i, l);
            e.locals.response.data = m(e, t.docs);
            o();
        }, function(n) {});
    }
    function s(n, e, o) {
        t._model.find({}, function(n, e) {
            console.log(n, e);
            o();
        });
    }
    function u(n, e, o) {
        t._model.find({}, function(n, e) {
            console.log(n, e);
            o();
        });
    }
    function a(n, e, o) {
        t._model.find({}, function(n, e) {
            console.log(n, e);
            o();
        });
    }
    function c(n, e, o) {
        t._model.find({}, function(n, e) {
            console.log(n, e);
            o();
        });
    }
    function r(n) {
        return {
            page: n.query.page || 1,
            limit: n.query.limit || 10,
            sort: {
                id: "asc"
            }
        };
    }
    function f(n) {
        var e = {};
        Object.keys(n.query).forEach(function(t) {
            e[t] = n.query[t];
        });
        return e;
    }
    function p(n, e, t, o, i) {
        var l = [], s = {}, u = e.locals.url + "?" + encodeURI(l);
        Object.keys(i).forEach(function(n) {
            l.push(n + "=" + i[n]);
        });
        l = l.join("&");
        if (t.total > 0) {
            s.self = d(u, o.page, o.limit, l);
        }
        if (t.page < t.pages) {
            s.next = d(u, Number(t.page) + 1, o.limit, l);
            s.last = d(u, t.pages, o.limit, l);
        }
        if (t.page > 1 && t.page <= t.pages) {
            s.first = d(u, 1, o.limit, l);
            s.prev = d(u, Number(t.page) - 1, o.limit, l);
        }
        return s;
    }
    function d(n, e, t, o) {
        return [ n, "&page=", e, "&limit=", t, "&", o ].join("");
    }
    function m(n, e) {
        var t = [];
        e.forEach(function(e) {
            t.push(g(n, e));
        });
        return t;
    }
    function g(n, e) {
        return {
            type: t._type,
            id: e.id,
            attributes: e.toJSON(),
            links: {
                self: n.locals.url + "/" + e.id
            }
        };
    }
};