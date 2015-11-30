define([
    "underscore",
    "jquery",
    "backbone",
    "gistmodel"
], function(
    _,
    $,
    Backbone,
    GistModel
){
    return Backbone.View.extend({
        initialize: function(options){
            options = _.extend({model: {}}, options);
            this.model = options.model || new GistModel();
            this.listenTo(this.model, "setModel", this.render);
            this.listenTo(this.model, "got-content", this.render);
        },
        tagName: "tr",
        template: _.template('<td><span class="filename"><%=filename %></span></td><td><span class="filedata"><%=content %></span></td><td><button class="btn btn-warning edit">Edit</button><button class="btn btn-danger delete">Delete</button><button class="btn btn-success update" style="display:none;">Update</button><button class="btn btn-danger cancel" style="display:none;">Cancel</button><div style="display:none;" class="hiddenId"><%= id%></div></td>'),
        events:{
            "click .edit": "editGist",
            "click .delete": "deleteGist",
            "click .update": "updateGist",
            "click .cancel": "cancelGist"
        },
        editGist: function(){
            this.trigger("edit-gist"); //Edit gist is on so need to hide edit and cancel from view
            this.$('.update').show();
            this.$('.cancel').show();
            var filename = this.$('.filename').html();
            var filedata = this.$('.filedata').html();
            this.$('.filename').html('<input type="text" class="form-control filename-update" value="' + filename + '">');
            this.$('.filedata').html('<textarea class="form-control filedata-update">' + filedata + '</textarea>');
        },
        deleteGist: function(){
            this.model.destroy();
            this.trigger("model-deleted");
        },
        updateGist: function(){
            var self = this;
            var fnm = $('.filename-update').val();
            var fcn = $('.filedata-update').val();
            if(this.model.setThis({filename: fnm, content: fcn})){
                var payload = {description: "This file is edited from gist app", files: {}};
                payload.files[fnm] = {};
                payload.files[fnm]["filename"] = fnm;
                payload.files[fnm]["content"] = fcn;
                this.model.save(payload, {
                    success: function(data){
                        this.trigger("update-complete");
                    }.bind(this), patch: true});
            }
        },
        cancelGist: function(){
            this.trigger("cancel-edit");
        },
        render: function(){
            this.$el.html("");
            var values = {
                id: this.model.get("id"),
            }
            values = _.extend(this.model.getValue(), values);
            this.$el.html(this.template(values));
            return this;
        }
    });
});