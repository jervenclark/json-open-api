"use strict";

var express = require("express"), Crud = require("./crud"), rest = {
    models: [],
    app: null,
    namespace: "",
    endpoints: [],
    crud: null
}, verbs = [ "get", "post", "patch", "put", "delete" ], routes = {
    plural: "/",
    singular: "/:id"
};

module.exports = function(e) {
    rest.app = e.app || null;
    rest.models = e.models || [];
    rest.namespace = e.namespace || "";
    return {
        create: create,
        endpoints: endpoints
    };
};

function after(e, r) {
    var s = r.locals.response;
    if (s.errors) {
        r.status(s.errors[0].status).json(r.locals.response);
    } else {
        r.json(r.locals.response);
    }
}

function before(e, r, s) {
    s();
}

function create() {
    if (rest.app) {
        rest.models.forEach(register);
    }
}

function endpoint(e, r, s) {
    var t = r.route(s);
    verbs.forEach(function(r) {
        var s = e[r];
        if (!s || !s.hidden) {
            var o = {
                before: s && s.before ? s.before : before,
                after: s && s.after ? s.after : after
            };
            rest.endpoints.push("[" + r.toUpperCase() + "]:  	" + t.path);
            t[r](o.before, rest.crud[r], o.after);
        }
    });
    t.all(fallback);
}

function endpoints() {
    return rest.endpoints;
}

function fallback(e, r) {
    r.json({
        message: "forbidden"
    });
}

function register(e) {
    var r = e.schema, s = express.Router(), t = rest.namespace + "/" + r.modelName.toLowerCase() + "s";
    rest.crud = new Crud(r);
    s.use(function(e, r, s) {
        r.locals.url = [ e.protocol, "://", e.headers.host, t ].join("");
        s();
    });
    if (e.all) {
        s.use(e.all);
    }
    Object.keys(routes).forEach(function(r) {
        e[r] = !e[r] ? {} : e[r];
        if (!e[r].hidden) {
            endpoint(e[r], s, t + routes[r]);
        }
    });
    rest.app.use(s);
}