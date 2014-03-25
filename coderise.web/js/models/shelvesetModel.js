var ShelvesetModel = Backbone.Model.extend({
    validate: function (attrs) {
        if (!attrs.id) {
            return 'Shelveset id is required';
        }

        if (!attrs.title) {
            return 'Shelveset title is required';
        }

        if (!attrs.owner) {
            return 'Shelveset owner is required';
        }

        if (!attrs.createdAt) {
            return 'Shelveset creation date is required';
        }

        if (!attrs.fileList) {
            return 'Shelveset must contain not empty file list';
        }
        return "";
    }
});