define([
    "underscore",
    "backbone",
    "gistscollection",
    "globalmodel",
    "naview",
    "gistsview",
    "addgistview",
    "headerview"
], function (
    _,
    Backbone,
    GistsCollection,
    GlobalModel,
    NaView,
    GistsView,
    AddGistView,
    HeaderView
) {
    return Backbone.View.extend({
        initialize: function (options) {
            options = _.extend({
                model : new GlobalModel(),
                collection: new GistsCollection(),
                tagName: "table"
            }, options);
            this.model = options.model;
            this.collection.gists = options.collection.gists;
            this.tagname = options.tagName;
            //Create a add gist view

            this.addgist = new AddGistView({
                model: this.model,
                tagName: "tbody"
            });
            this.listenTo(this.addgist, "model-created", this.addModel);
            this.headerview = new HeaderView({
                model: this.model,
                tagName: "thead"
            });
            //Create view all gist
            this.gistsview = new GistsView({
                collection: this.collection,
                tagName: "tbody"
            });
            this.listenTo(this.gistsview, "cancel-edit", this.render);

        },
        addModel: function(model){
            this.collection.gists.add(model);
            this.model.set({"isAddGist": false});
        },
        attributes: function(){
            return {
                class: "table"
            };
        },
        render: function(){
            //main
            this.$el.html('');
            this.headerview.render().$el.appendTo(this.$el);
            if(this.model.get("isAddGist")){
                this.addgist.render().$el.appendTo(this.$el);
            }else{
                this.gistsview.render().$el.appendTo(this.$el);
            }
            return this;
        },
        changeNav: function(){
            this.render();
        }
    });
});