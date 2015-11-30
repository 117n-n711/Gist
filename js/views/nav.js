define([
    "underscore",
    "backbone",
    "globalmodel"
], function (
    _,
    Backbone,
    GlobalModel
) {
    return Backbone.View.extend({
        initialize: function (options) {
            this.model = options.model || new GlobalModel();
        },
        events: {
            "click .create": "callCreate",
            "click .view-all": "viewAll"
        },
        render: function () {
            this.$el.html(this.template());
            this.changeNav();
            return this;
        },
        onModeChange: function () {

        },
        callCreate: function () {
            if(! this.model.get("isAddGist")){
                this.model.set({"isAddGist": true});
            }
        },
        viewAll: function () {
            if(this.model.get("isAddGist")){
                this.model.set({"isAddGist": false});
            }
        },
        changeNav: function(){
            if(this.model.get("isAddGist")){
                this.$('.view-all').removeClass("active");
                this.$('.create').addClass("active");
            }else{
                this.$('.create').removeClass("active");
                this.$('.view-all').addClass("active");
            }
        },
        template: _.template(' \
                    <nav class="navbar navbar-default navbar-fixed-top nav-gist" style="display:block;"> \
                    <div class="container"> \
                    <div class="navbar-header"> \
                    <a class="navbar-brand" href="#">Gist</a> \
                    </div> \
                    <div class="navbar-collapse collapse top-collapse"> \
                    <ul class="nav navbar-nav"> \
                    <li class="create"><a>Create New</a></li><li class="view-all"><a>View All</a></li> \
                    </ul> \
                    </div> \
                    </div></nav>'
        ),
    });
});