(function(module, require) {
  
  var JQuery = require('jquery');

  var RootStoreObject = { Data : [] };

  function guid() {    
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
  }

  var Store = {

    setRootStoreObject: function(rootStoreObject) {
      RootStoreObject = rootStoreObject
    },

    addDataItem: function(dataItem) {
      
      var dataItem = {
        Id : guid(),
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