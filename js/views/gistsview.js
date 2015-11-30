define([
    "underscore",
    "backbone",
    "gistview",
    "gistscollection"
], function (
    _,
    Backbone,
    GistView,
    GistsCollection
) {
    return Backbone.View.extend({
        initialize: function (options) {
            options = _.extend({
                collection: new GistsCollection(),
                tagName: "tbody",
            }, options);
            this.collection.gists = options.collection.gists;
            this.tagname = options.tagName;
            this.listenTo(this.collection.gists, 'update', this.render);
            this.listenTo(this.collection.gists, 'add', this.render);
            this.listenTo(this.collection.gists, 'remove', this.render);
        },
        render: function () {
            var self = this;
            this.$el.html("");
            this.collection.gists.forEach(function (gist) {
                var entry = new GistView({model: gist});
                self.$el.append(entry.render().$el);
                self.listenTo(entry, "cancel-edit", function(){self.trigger("cancel-edit");});
                //self.listenTo(entry, "model-deleted", this.render);
                self.listenTo(entry, "update-complete", self.render);
                self.listenTo(entry, "edit-gist",
                    function(){
                        self.$(".edit").hide();
                        self.$(".delete").hide();
                    });

            });
            return this;
        }
    });
});