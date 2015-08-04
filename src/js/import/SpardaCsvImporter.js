(function(module, require) {

  var JQuery = require('jquery');
  var _ = require('underscore');  
  var CsvParse = require('csv-parse');

  var SpardaCsvImporter = {
    importData: function(text, importFinishedCallback) {        
              CsvParse(text, {comment: '#', delimiter: ';'}, function(err, output){
                var data = []; 
                _.forEach(output,function(entry){
                  data.push(
                          {
                            TransferDate: entry[0],
                            Ownname : entry[1],
                            Othername: entry[1],
                            IBAN : "",
                            BIC : "",
                            Subject : entry[1],
                            Amount : entry[2]
                          })
                  });
                  importFinishedCallback(data);
            });
    }
  };

  module.exports = SpardaCsvImporter;

}(module, require));
