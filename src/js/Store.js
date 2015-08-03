(function(module, require) {
  
  var JQuery = require('jquery');

  var RootStoreObject = { Data : [] };
  
  var Store = {

    setRootStoreObject: function(rootStoreObject) {
      RootStoreObject = rootStoreObject
    },  

    addDataItem: function(dataItem) {
      
      var dataItem = {
        Id : dataItem.Id,
        TransferDate : dataItem.TransferDate,
        Ownname : dataItem.Ownname,
        Othername : dataItem.Othername,
        IBAN : dataItem.IBAN,
        BIC :  dataItem.BIC,
        Subject : dataItem.Subject,
        Amount : dataItem.Amount
      };

      RootStoreObject.Data.push(dataItem);
    },

    getDataItems: function() {
        return JQuery.extend(true, {}, RootStoreObject).Data;
    },

    getCategories: function() {
        return JQuery.extend(true, {}, RootStoreObject).Categories;
    }
  };

  module.exports = Store;

}(module, require));