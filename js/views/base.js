define([
    "underscore",
    "backbone",
    "gistscollection",
    "globalmodel",
    "naview",
    "mainview"
], function (
    _,
    Backbone,
    GistsCollection,
    GlobalModel,
    NaView,
    MainView
) {
    return Backbone.View.extend({
        initialize: function (options) {
            options = _.extend({
                model: new GlobalModel(),
                collection: {gists: new GistsCollection()}
            }, options);
            this.model = options.model;
            this.collection.gists = options.collection.gists;

            this.naview = new NaView({
                model: options.model,
            });

            this.mainview = new MainView({
                model: this.model,
                collection: this.collection,
                tagName: "table",
            });

        },
        template: _.template('<div class="main-container" style="padding-top: 35px;"> \
                                <div class="container" style="display:block;"> \
                                    <div class="row"> \
                                    <div class="col-12 text-center"> \
                                    <h1></h1> \
                                    <div class="all-gists"> \
                                    </div> \
                                    </div> \
                                    </div> \
                                    </div> \
                                    </div> \
                                    </div>'
        ),
        render: function(){
            //main base
            this.naview.render().$el.appendTo(this.$el);
            $(this.template()).appendTo(this.$el);
            this.mainview.render().$el.appendTo(this.$(".all-gists"));
            return this;
        },
        changeNav: function(){
            this.naview.changeNav();
            this.mainview.changeNav();
        }
    });
});