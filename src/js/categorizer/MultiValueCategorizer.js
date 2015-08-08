(function(module, require) {

  var _ = require('underscore');

  var ContainsValueCategorizer = require('./ContainsValueCategorizer.js');
  var AndValueCategorizer = require('./AndValueCategorizer.js');
  
  function createCategorizerByName(categorizerType) {    
      switch(categorizerType) {
          case 'ContainsValueCategorizer':
              return ContainsValueCategorizer;  
          case 'AndValueCategorizer':
              return AndValueCategorizer;  
          default:
              alert("CategorizerType not supported");
              break;
      }
  }

  var MultiValueCategorizer = {
    categorize: function(data, categoryConfigs, multiValueCategorizer) {  

        var categories = [];
        _.forEach(categoryConfigs, function(categoryConfig){

            var categorizer = createCategorizerByName(categoryConfig.Type);
            var category = categorizer.categorize(data, categoryConfig, multiValueCategorizer);
            
            if(category){
              categories.push(category);
            }
        });
        return categories;
    }
  };

  module.exports = MultiValueCategorizer;

}(module, require));
