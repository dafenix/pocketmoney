(function(module, require) {

  var JQuery = require('jquery');
  var _ = require('underscore');

  var Categorizer = {
    categorize: function(categories, item) {
        var foundCategory = _.find(categories, function(category){
        var splitted = category.filter.split(';');
        var found = _.find(splitted,function(fItem){
          return (item.name.toLowerCase().indexOf(fItem.toLowerCase()) !== -1);
        });
        return found !== undefined;
      });
      if (foundCategory !== undefined)
      {
        item.category = foundCategory.name;
      }
    },

  };

  module.exports = Categorizer;

}(module, require));
