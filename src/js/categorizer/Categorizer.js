(function(module, require) {
  
  var _ = require('underscore');
  var Store = require('../Store.js');
 
  var MultiValueCategorizer = require('./MultiValueCategorizer.js');

  var Categorizer = {
    categorize: function(data) {
        var categoryConfigs = Store.getCategories();
        var categories = MultiValueCategorizer.categorize(data, categoryConfigs, MultiValueCategorizer);                
        return _.first(categories);            
    }
  };

  module.exports = Categorizer;

}(module, require));
