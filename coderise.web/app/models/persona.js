define(function(requre, exports, module){

  var _ = require('underscore');
  var $ = require('jquery');
  var Backbone = require('backbone');

  module.exports = Backbone.Model.extend({

    url: 'http://localhost:3000/auth/login',

    initialize: function(){
      navigator.id.watch({
        onlogin: this.onlogin.bind(this),
        onlogout: this.onlogout.bind(this)
      });
    },

    onlogin: function(assertion){
      var data = {
        assertion: assertion
      };

      this.fetch({ data: data });
    },

    onlogout: function(){

    },

    sync: function(method, model, options){
      var params = {
        url: this.url,
        type: 'post',
        xhrFields: { withCredentials: true }
      };

      return $.ajax( _.extend(params, options) );
    }

  });

});
