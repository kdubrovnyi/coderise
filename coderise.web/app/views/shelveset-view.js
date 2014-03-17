define(function (require, exports, module) {

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

        template: require('tpl!templates/shelveset.ejs'),

        /*
         * Initialize
         */

        initialize: function (params) {
            if (!this.model) {
                throw new Error('You must provide a Shelveset model');
            }

            this.listenTo(this.model, 'remove', this.remove);
            this.listenTo(this.model, 'sync', this.render);

            _.bindAll(this, 'updateTime');
            this.timer = setTimeout(this.updateTime, this.timer_refresh);
        },

        /*
         * Event Methods
         */

        events: {
            'click .choose': 'choose',
        },

        choose: function (e) {
            e.preventDefault();
            
            this.chooseShelveset();
        },

        /*
         * Render Methods
         */

        render: function () {
            this.$el.html(this.template(this));
            return this.$el;
        },

        formatDate: function () {
            var date = moment(this.model.get('CreatedAt'));
            return date.fromNow();
        },

        renderMarkdown: function () {
            return markdown.toHTML(this.model.get('Description'));
        },

        chooseShelveset: function () {
            //var comment = this.$('.comment-content');
            //var approxHeight = comment.height();
            //comment.hide();
            //this.$el.append(this.formTemplate(this));
            //this.$('textarea').css('height', approxHeight);
        },

        updateTime: function () {
            this.$('.date').text(this.formatDate());
            this.timer = setTimeout(this.updateTime, this.timer_refresh);
        },

        /*
         * Overrides
         */

        // clean up the timer and $(window) events
        remove: function () {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            $(window).off('.' + this.cid);
            Backbone.View.prototype.remove.call(this);
        }
    });

});
