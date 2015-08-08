(function(module, require) {

  var JQuery = require('jquery');
  var _ = require('underscore');   
  var Categorizer = require('../categorizer/Categorizer.js');

  function guid() {    
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
  }

  function InZahl (Wert)
  {   // Erstellt von Ralf Pfeifer, www.ArsTechnica.de
       var PosPunkt = Wert.indexOf(".",0);
       var PosKomma = Wert.indexOf(",",0);
       if (PosKomma < 0) PosKomma = Wert.length;

       // Dezimalpunkte zur Tausendergruppierung entfernen
       while ((0 <= PosPunkt) && (PosPunkt < PosKomma))
       {
           Wert = Wert.substring(0, PosPunkt) + Wert.substring(PosPunkt + 1, Wert.length);
           PosPunkt = Wert.indexOf(".",0);
           PosKomma--;
       }

       // Enthaelt die Variable 'Wert' ein Komma ?
       PosKomma = Wert.indexOf(",",0);
       if (PosKomma >= 0)
          { Wert = Wert.substring(0, PosKomma) + "." + Wert.substring(PosKomma + 1, Wert.length); }

       return parseFloat(Wert);
   }
 
  var ImportFinalizer = {
    finalize: function(data, importFinalizedCallback) {     
       
      _.forEach(data,function(dataEntry){                   

          dataEntry.Id = guid(); 
          dataEntry.Amount = InZahl(dataEntry.Amount);
          var category = Categorizer.categorize(dataEntry);
          if(category){
            dataEntry.Category = category;
          }
      });

      importFinalizedCallback(data);       
    }
  };

  module.exports = ImportFinalizer;

}(module, require));
