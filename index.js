"use strict";

var express = require("express"), crud = require("./crud"), rest = {
    models: [],
    app: null,
    namespace: ""
}, verbs = [ "get", "post", "patch", "put", "delete" ];

module.exports = function(e) {
    rest.app = e.app || null;
    rest.models = e.models || [];
    rest.namespace = e.namespace || "";
    return {
        create: create
    };
};

function create() {
    if (rest.app) {
        rest.models.forEach(endpoints);
    }
}

function endpoints(e) {
    var r = e.schema, a = express.Router(), s = rest.namespace + "/" + r.modelName.toLowerCase() + "s";
    if (!e.plural || !e.plural.hidden) {
        register(e.plural, a, s);
    }
    if (!e.singular || !e.singular.hidden) {
        register(e.singular, a, s + "/:id");
    }
    rest.app.use(a);
}

function fallback(e, r) {
    r.json({
        message: "forbidden"
    });
}

function before(e, r, a) {
    a();
}

function after(e, r) {
    r.json({
        verb: r.locals.verb
    });
}

function register(e, r, a) {
    var s = r.route(a);
    verbs.forEach(function(r) {
        var a = e[r];
        if (!a || !a.hidden) {
            var t = {
                before: a && a.before ? a.before : before,
                after: a && a.after ? a.after : after
            };
            s[r](t.before, crud[r], t.after);
        }
    });
    s.all(fallback);
}