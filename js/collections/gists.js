define([
    "underscore",
    "backbone",
    "gistmodel"
], function(
    _,
    Backbone,
    GistModel
){
    return Backbone.Collection.extend({
        url: "https://api.github.com/users/117n-n711/gists",
        model: GistModel,
        initialize: function(options){

        },
        fetch: function(options){
            options = options || {};
            options["beforeSend"] = function(xhr){
                xhr.setRequestHeader('Authorization', 'token d6293413c7f94e4526aec6e9b6c380ac3182b0ec');
            };
            return Backbone.Collection.prototype.fetch.call(this, options);
        }
    });
});