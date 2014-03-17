define(function(require, exports, module){

  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');

  var ShelvesetView = require('views/shelveset-view');
  var ShelvesetsCollection = require('collections/shelvesets');

  module.exports = Backbone.View.extend({
      el: $('.container'),

      initialize: function () {
          $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
              options.url = 'http://localhost/coderise.service/api' + options.url;
          });

          this.collection = new ShelvesetsCollection();
          this.collection.url = "/Shelvesets";

          this.listenTo(this.collection, 'add', this.renderShelveset);
          this.listenTo(this.collection, 'add remove', this.renderShelvesetCount);

          this.collection.fetch();
      },

      renderShelveset: function (model) {
          model.view = new ShelvesetView({ model: model });
          this.$(".shelvesets").prepend(model.view.render());
      },

      renderShelvesetCount: function () {
          var length = this.collection.length;
          var shelvesetText = length === 1 ? ' Shelveset' : ' Shelvesets';
          this.$('.shelveset-count').text(length + shelvesetText);
      },

  });

});
