define([
    "underscore",
    "backbone"
], function (_,
             Backbone) {
    return Backbone.Model.extend({
        default: {
            isAddGist: true,
        },
        initialize: function (options) {
            options = _.extend({isAddGist: true}, options);
            this.isAddGist = options.isAddGist;

        }
    });
});