define(function(require, exports, module){

  var Backbone = require('backbone');
  var CommentModel = require('models/comment');

  require('backbone.localStorage');

  module.exports = Backbone.Collection.extend({
    model: CommentModel,
    localStorage: new Backbone.LocalStorage('Comments')
  });

});
