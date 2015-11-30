define([
    "underscore",
    "jquery",
    "backbone",
    "addgistview",
    "naview",
    "gistsview",
    "baseview",
    "gistscollection",
    "gistmodel",
    "globalmodel"
], function (
    _,
    $,
    Backbone,
    CreateGistView,
    NaView,
    GistsView,
    BaseView,
    GistsCollection,
    GistModel,
    GlobalModel
) {
    return Backbone.Router.extend({
        initialize: function () {
            this.globalModel = new GlobalModel({isAddGist: true});
            this.listenTo(this.globalModel, "change:isAddGist", this.navigationOn);
            this.collection = {
                gists: new GistsCollection()
            }
            this.collection.gists.fetch();

            this.baseview = new BaseView({
                model: this.globalModel,
                collection: this.collection
            });

            this.baseview.render().$el.appendTo($(".all-content"));
        },
        navigationOn: function(value){
            this.baseview.changeNav();
        }
    });
});