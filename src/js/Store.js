(function(module, require) {
  
  var JQuery = require('jquery');

  var RootStoreObject = { Data : [] };

  var Store = {

    setRootStoreObject: function(rootStoreObject) {
      RootStoreObject = rootStoreObject
    },

    addDataItem: function(id, date, ownname, othername, iban, bic, subject, amount) {
      
      var dataItem = {
        Id : id,
        TransferDate : date,
        Ownname : ownname,
        Othername : othername,
        IBAN : iban,
        BIC :  bic,
        Subject : subject,
        Amount : amount
      };

      RootStoreObject.Data.add(dataItem);
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