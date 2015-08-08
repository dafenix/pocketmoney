(function(module, require) { 

  var AndValueCategorizer = {
    categorize: function(data, config, multiValueCategorizer) {  

    	var categoryConfigs = config.Categories;
        var categories = multiValueCategorizer.categorize(data, categoryConfigs, multiValueCategorizer);        
        if(categories.length === config.Categories.length){
          return config.Category;
        }
    }
  };

  module.exports = AndValueCategorizer;

}(module, require));
