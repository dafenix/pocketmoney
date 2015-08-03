(function(module, require) {

  var JQuery = require('jquery');
  var _ = require('underscore');  
  var CsvParse = require('csv-parse');

  function removeFirstRows(data){
    data.splice(0,13);
  }

  function removeLastRows(data){

    data.splice(data.length-3,4);
  }

  var RaibaCsvImporter = {
    importData: function(text, importFinishedCallback) {     
             
             CsvParse(text, {comment: '#', delimiter: ';'}, function(err, output){
                var data = []; 
                _.forEach(output,function(entry){

                  var amountType = entry[12];
                  var amount = entry[11];  
                  
                  if(amountType === 'S')  {
                    amount = "-"+amount;
                  }              

                  var iban = entry[5];
                  if(!iban)  {
                    iban = entry[4];
                  } 

                  var bic = entry[7];
                  if(!bic)  {
                    bic = entry[6];
                  } 

                  data.push({
                              TransferDate: entry[0],
                              Ownname : entry[2],
                              Othername: entry[3],
                              IBAN : iban,
                              BIC : bic,
                              Subject : entry[8],
                              Amount : amount
                            });
                  });

                  removeFirstRows(data);
                  removeLastRows(data);
                  importFinishedCallback(data);
            });
    }
  };

  module.exports = RaibaCsvImporter;

}(module, require));
