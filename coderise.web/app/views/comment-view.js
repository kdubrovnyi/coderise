define(function(require, exports, module){

  var _ = require('underscore');
  var Backbone = require('backbone');
  var markdown = require('markdown');
  var moment = require('moment');

  module.exports = Backbone.View.extend({

    tagName: 'li',

    timer_refresh: 60e3,

    /*
     * Templates
     */

    template: require('tpl!templates/comment.ejs'),

    formTemplate: require('tpl!templates/comment-edit.ejs'),

    /*
     * Initialize
     */

    initialize: function(params){
      if( !this.model ){
        throw new Error('You must provide a Comment model');
      }

      $(window).on('keyup.'+ this.cid, this.handleKeyup.bind(this));

      this.listenTo( this.model, 'remove', this.remove);
      this.listenTo( this.model, 'sync', this.render);

      _.bindAll(this, 'updateTime');
      this.timer = setTimeout(this.updateTime, this.timer_refresh);
    },

    enableEditing: function(){
      this.$el.addClass('editable');
    },

    /*
     * Event Methods
     */

    events: {
      'click .delete': 'destroy',
      'click .edit': 'edit',
      'submit form': 'updateComment'
    },

    handleKeyup: function(e){
      if( e.which === 27 && this.$('form').length === 1){
        this.dismissForm();
      }
    },

    destroy: function(e){
      e.preventDefault();
      this.model.destroy();
    },

    edit: function(e){
      e.preventDefault();
      if( this.$('form').length === 1 ){
        return this.dismissForm();
      }
      this.renderForm();
    },

    updateComment: function(e){
      e.preventDefault();
      this.model.save({ content: this.$('textarea').val() });
    },

    /*
     * Render Methods
     */

    render: function(){
      this.$el.html( this.template( this ) );
      return this.$el;
    },

    formatDate: function(){
      var date = moment( this.model.get('created_at') );
      return date.fromNow();
    },

    renderMarkdown: function(){
      return markdown.toHTML( this.model.get('content') );
    },

    renderForm: function(){
      var comment = this.$('.comment-content');
      var approxHeight = comment.height();
      comment.hide();
      this.$el.append( this.formTemplate( this ) );
      this.$('textarea').css('height', approxHeight);
    },

    dismissForm: function(){
      if( this.$('form').hasClass('zen') ){
        return this.$('form').removeClass('zen');
      }
      this.$('form').remove();
      this.$('.comment-content').show();
    },

    updateTime: function(){
      this.$('.date').text( this.formatDate() );
      this.timer = setTimeout(this.updateTime, this.timer_refresh);
    },

    /*
     * Overrides
     */

    // clean up the timer and $(window) events
    remove: function(){
      if( this.timer ){
        clearTimeout( this.timer );
      }
      $(window).off('.'+this.cid);
      Backbone.View.prototype.remove.call(this);
    }

  });

});
