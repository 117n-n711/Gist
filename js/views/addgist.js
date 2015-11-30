define([
    "underscore",
    "backbone",
    "gistmodel",
    "globalmodel"
], function (
    _,
    Backbone,
    GistModel,
    GlobalModel
) {
    return Backbone.View.extend({
        initialize: function(options){
            options = _.extend({
                tagName: "tbody",
                model: new GlobalModel()
            }, options);
            this.model = options.model;
            this.tagname = options.tagName || "tbody";
            this.savedModel = "";
        },
        template: _.template('<tr><td><input type="textarea" class="form-control name" /></td>' + "<td><textarea class=\"form-control filecontent\"></textarea></td><td><input type=\"button\" class=\"btn btn-primary submit\" value=\"Submit\"/></td></tr>"),
        events: {
            "click .submit": "addModel"
        },
        addModel: function () {
            console.log("add Model initiated.");
            var name = $('.name').val();
            var filecontent = $('.filecontent').val();
            var payload = {
                description: "This file is made form the gist app.",
                public: true,
                files: {}
            };
            payload.files[name] = {};
            payload.files[name]['filename'] = name;
            payload.files[name]['content'] = filecontent;
            var model = new GistModel(payload);
            this.savedModel = model;
            model.save({}, {
                success: this.onSuccess.bind(this),
                error: function(){alert("Error While saving");}
            });
        },
        onSuccess: function (model) {
            this.$('.name').val('');
            this.$('.filecontent').val('');
            console.log(model);
            this.trigger("model-created", this.savedModel);
        },
        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });
});