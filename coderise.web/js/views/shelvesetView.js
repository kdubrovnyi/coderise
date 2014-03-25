var ShelvesetView = Backbone.View.extend({

    tagName: 'li',
    template: new EJS({ url: '/js/templates/shelvesetTemplate.ejs' }),

    initialize: function () {
        if (!this.model) {
            throw new Error('You must provide a Shelveset model');
        }

        this.listenTo(this.model, 'remove', this.remove);
        this.listenTo(this.model, 'sync', this.render);

        _.bindAll(this, 'updateTime');
        this.timer = setTimeout(this.updateTime, this.timer_refresh);
    },

    events: {
        'click .choose': 'choose',
    },

    choose: function (e) {
        e.preventDefault();
            
        this.chooseShelveset();
    },

    render: function () {
        this.$el.html(this.template.render(this));
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

    remove: function () {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        $(window).off('.' + this.cid);
        Backbone.View.prototype.remove.call(this);
    }
});