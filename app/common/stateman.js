const safeGet = require('lodash/get');
const safeSet = require('lodash/set');

module.exports = {
    state: {},
    init: (initialState) => {
        this.state = JSON.parse(JSON.stringify(initialState)) || {};
    },

    get: field => safeGet(this.state, field, null),

    set: (field, value) => safeSet(this.state, field, value),

    _getString: () => JSON.stringify(this.state)
};