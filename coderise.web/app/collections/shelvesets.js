define(function (require, exports, module) {

    var Backbone = require('backbone');
    var ShelvesetModel = require('models/shelveset');

    module.exports = Backbone.Collection.extend({
        model: ShelvesetModel,
    });

});
