(function(module, require) { 
  
  var ContainsValueCategorizer = {
    categorize: function(data, config, multiValueCategorizer) {  

        var propertyValue = data[config.Property];

        if(propertyValue.toLowerCase().indexOf(config.Value.toLowerCase()) !== -1){
          return config.Category;
        }
    }
  };

  module.exports = ContainsValueCategorizer;

}(module, require));
