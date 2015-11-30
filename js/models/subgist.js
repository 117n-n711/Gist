define([
    "underscore",
    "backbone",
], function(
    _,
    Backbone
){
    return Backbone.Model.extend({
        default: {
            filename: "",
            content: ""
        },
        initialize: function(options){
            options = _.extend({filename: "", raw_url: "", content: ""}, options);
            if(options.raw_url){

            }
        },
        setThis: function(attrs, options){
            options = options || {silent: true};
            Backbone.Model.prototype.set.call(this, attrs, options);
            // Need to check if Backbone Model worked fine or not.
            this.trigger("modelChanged");
        },
        destroy: function(options){
            Backbone.Model.prototype.destroy.call(this, options);
            this.trigger("modelDestroyed");
        }
    });
});