"use strict";

module.exports = {
    post: post,
    get: get,
    patch: patch,
    put: put,
    "delete": remove
};

function get(t, e, o) {
    e.locals = {
        verb: "get"
    };
    o();
}

function post(t, e, o) {
    e.locals = {
        verb: "post"
    };
    o();
}

function put(t, e, o) {
    e.locals = {
        verb: "put"
    };
    o();
}

function patch(t, e, o) {
    e.locals = {
        verb: "patch"
    };
    o();
}

function remove(t, e, o) {
    e.locals = {
        verb: "remove"
    };
    o();
}