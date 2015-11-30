define([
    "underscore",
    "backbone",
    "globalmodel",
], function (
    _,
    Backbone,
    GlobalModel
) {
    return Backbone.View.extend({
        initialize: function (options) {
            options = _.extend({
                model : new GlobalModel(),
                tagName: "thead"
            }, options);

            this.model = options.model;

            this.tagName = options.tagName;
        },
        render: function(){
            this.$el.html(this.template());
            return this;
        },
        template: _.template('<tr> \
                              <td>Filename.extension</td> \
                              <td>Content</td> \
                              <td>Action</td> \
                              </tr>'),
    });
});