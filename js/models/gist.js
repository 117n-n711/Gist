define([
    "underscore",
    "backbone"
], function (_,
             Backbone) {
    return Backbone.Model.extend({
        idAttribute: "id",
        urlRoot: "https://api.github.com/gists",
        default: {
            files: {},
            id: null
        },
        initialize: function (options) {
            options = _.extend({files: {}, id: null}, options);
            this.files = options.files;
            this.id = options.id;
            this.getContent();
        },
        getContent: function(){
            _.mapObject(this.files, function (val, key) {
                if(val){
                    if(val.raw_url){
                        $.ajax({
                            url: val.raw_url,
                            success: this.makeContent.bind(this)
                        });
                    }
                }
            }.bind(this));
        },
        makeContent: function(data){
            _.mapObject(this.files, function(val, key){
                if(val){
                    this.files[key]["content"] = data;
                    this.trigger("got-content");
                }
            }.bind(this));
        },
        save: function(attrs, options){
            options = _.extend({patch: false}, options);
            if(options.patch){
                _.mapObject(this.files, function(val, key){
                    if(attrs.files[key] == undefined){
                        attrs.files[key] = null;
                    }
                }.bind(this));
            }
            options["beforeSend"] = function(xhr){
                xhr.setRequestHeader('Authorization', 'token d6293413c7f94e4526aec6e9b6c380ac3182b0ec');
            };
            Backbone.Model.prototype.save.call(this, attrs, options);
            _.mapObject(this.files,
                function(val, key){
                    if(!val){
                        delete this.files[key];
                    }
                }.bind(this)
            );
        },
        destroy: function(options){
            options = options || {patch: true};
            options.patch = true;
            options["beforeSend"] = function(xhr){
                xhr.setRequestHeader('Authorization', 'token d6293413c7f94e4526aec6e9b6c380ac3182b0ec');
            };
            Backbone.Model.prototype.destroy.call(this, options);
        },
        setThis: function(options){
            options = options || {filename: "", content: ""};
            var oldfile = this.getValue();
            if(options.filename != ""){
                var data = {filename: options.filename, content: options.content};
                if(oldfile.filename != options.filename){
                    this.files[oldfile.filename] = null;
                }
                this.files[options.filename] = data;
                return true;
            }
            return false;
        },
        getValue: function(){
            var filename = "";
            var content = "";
            _.mapObject( this.files,
                function(valu, key){
                    if(valu){
                        filename = valu["filename"];
                        content = valu["content"];
                    }
                }
            );
            return {filename: filename, content: content};
        }
    });
});