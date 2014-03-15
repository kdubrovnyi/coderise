define(function(require, exports, module){

  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');

  var CommentView = require('views/comment-view');
  var CommentsCollection = require('collections/comments');
  var PersonaModel = require('models/persona');

  module.exports = Backbone.View.extend({

    el: $('.comments'),

    initialize: function(){
      this.persona = new PersonaModel();
      this.collection = new CommentsCollection();

      this.listenTo( this.collection, 'add', this.renderComment );
      this.listenTo( this.collection, 'add remove', this.renderCommentCount );
      this.listenTo( this.persona, 'sync', this.renderPersona );

      this.collection.fetch();
    },

    renderComment: function(model){
      model.view = new CommentView({ model: model });
      this.$('#comment-list').prepend( model.view.render() );

      if( this.persona.get('email') === model.get('email') ){
        model.view.enableEditing();
      }

      this.resetFormFields();
    },

    renderCommentCount: function(){
      var length = this.collection.length;
      var commentText = length === 1 ? ' Comment' : ' Comments';
      this.$('.comment-count').text( length + commentText );
    },

    resetFormFields: function(){
      this.$('form textarea, form input[name="email"]').val(null);
    },

    events: {
      'submit form': 'createComment',
      'click .fullscreen': 'toggleFullscreen',
      'click .sign-in': 'createPersona',
      'click .logout': 'logout'
    },

    toggleFullscreen: function(e){
      e.preventDefault();
      $(e.currentTarget).parents('form').toggleClass('zen')
        .end().siblings('textarea').focus();
    },

    createComment: function(event){
      event.preventDefault();

      // Create a new Comment Model with the data in the form
      var comment = {
        content: this.$('form textarea').val(),
        email: this.persona.get('email'),
        created_at: +new Date()
      };
      // The `validate` option ensures that empty comments aren't added
      this.collection.create( comment, { validate: true });
    },

    createPersona: function(event){
      event.preventDefault();
      navigator.id.request();
    },

    renderPersona: function(model){
      this.$('.sign-in').hide();
      this.$('.logout').show();
      this.$('.submit').text('Post as '+model.get('email')).show();

      _.each( this.collection.where({ email: model.get('email') }), function(model){
        model.view.enableEditing();
      });
    },

    logout: function(){
      navigator.id.logout();
      window.location.reload();
    }


  });

});
