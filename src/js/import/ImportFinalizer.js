(function(module, require) {

  var JQuery = require('jquery');
  var _ = require('underscore');   
  var Categorizer = require('../Categorizer.js');

  function guid() {    
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
  }
 
  var ImportFinalizer = {
    finalize: function(data, importFinalizedCallback) {     
       
      _.forEach(data,function(dataEntry){

          var item = {name : dataEntry.Subject};
          Categorizer.categorize(item);

          dataEntry.Id = guid(); 
          dataEntry.Category =  item.category;         
      });

      importFinalizedCallback(data);       
    }
  };

  module.exports = ImportFinalizer;

}(module, require));
