(function(module, require) {
  
  var JQuery = require('jquery');

  var RootStoreObject = { Data : [], Categories: [] };
  
  function getRootStoreObjectCopy() {
    return JQuery.extend(true, {}, RootStoreObject);
  }

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
        Amount : dataItem.Amount,
        Category : dataItem.Category
      };

      RootStoreObject.Data.push(dataItem);
    },

    getDataItems: function() {
        return getRootStoreObjectCopy().Data;
    },

    getCategories: function() {
        return getRootStoreObjectCopy().Categories;
    },

    getEncodedRootStoreObject: function() {
        var rootStoreObject = getRootStoreObjectCopy();
        return encodeURIComponent(JSON.stringify(rootStoreObject))
    }
  };

  module.exports = Store;

}(module, require));