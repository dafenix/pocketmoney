(function(module, require) {

  var React = require('react');
  var Grid = require('react-bootstrap/Grid');
  var Row = require('react-bootstrap/Row');
  var Col = require('react-bootstrap/Col');
  var Btn = require('react-bootstrap/Button');
  var Store = require('../Store.js');
  var CsvParse = require('csv-parse');
  var _ = require('underscore');

  var LoadStore = React.createClass({

    fileChanged: function (){
      var file = this.refs.filectrl.getDOMNode().files[0];
      var reader = new FileReader();
      var fileExtension = file.name.split('.').pop();
      reader.fileExtension = fileExtension.toLowerCase();
      reader.onload = this.onFileLoad;
      reader.readAsText(file);
    },

    onFileLoad: function(e){
      var fileExtension = e.target.fileExtension;
      if (fileExtension === "csv"){
        var categoryConfig = prompt('Please paste in your config','');
        if (categoryConfig === null || categoryConfig === '')
        {
          return;
        }
        CsvParse(e.target.result, {comment: '#', delimiter: ';'}, function(err, output){
                  var store = { Data: [], Categories:[] };
                  store.Categories = JSON.parse(categoryConfig).categories;
                  var idx = 0;
                  _.forEach(output,function(entry){
                    store.Data.push({ Id: idx,
                                 TransferDate: entry[0],
                                 Ownname : entry[2],
                           		 	 Othername: entry[2],
                           		   IBAN : "",
                           			 BIC : "",
                           		   Subject : entry[2],
                           			 Amount : entry[3]
                                })

                    idx++
                  });
                  Store.setRootStoreObject(store);
                });
      }
      if (fileExtension === "json"){
        var storeJson = JSON.parse(e.target.result);
        Store.setRootStoreObject(storeJson);
      }
    },

    render: function() {
      return (
      <Grid>
        <Row>
          <h1>Choose the File with your Data!</h1>
        </Row>
        <Row>
          <Col>
            <span className="btn btn-primary btn-file">
                Datei auswählen <input ref="filectrl" type="file" onChange={this.fileChanged} />
            </span>
          </Col>
        </Row>
        <br/>
        <a href="charts">Charts</a>
        <br/>
        <a href="datatable">Table</a>
      </Grid>
      );
    }
  });

  module.exports = LoadStore;

}(module, require));
