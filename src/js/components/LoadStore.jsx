(function(module, require) {

  var React = require('react');
  var Grid = require('react-bootstrap/Grid');
  var Row = require('react-bootstrap/Row');
  var Col = require('react-bootstrap/Col');
  var Btn = require('react-bootstrap/Button');
  var Store = require('../Store.js');
  var CsvParse = require('csv-parse');
  var _ = require('underscore');
  var DownloadTextFromGoogleDriveButton = require('./DownloadTextFromGoogleDriveButton.jsx');

  var LoadStore = React.createClass({

    componentDidMount: function() {
    },

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
      this.loadJson(e.target.result);      
    },

    loadJson: function(data){
      var storeJson = JSON.parse(data);
      Store.setRootStoreObject(storeJson);
    },
    
    render: function() {
      return (
        <Grid>
          <Row>
            <h1>Choose your Storefile!</h1>
          </Row>
          <Row>
            <Col>
              <span className="btn btn-primary btn-file">
                Datei auswählen <input ref="filectrl" type="file" onChange={this.fileChanged} />
            </span>
          </Col>
        </Row>
        <Row>
          <Col>
            <DownloadTextFromGoogleDriveButton loadTextCallback={this.loadJson}/>
          </Col>
        </Row>
        <br/>
        <a href="charts">Charts</a>
        <br/>
        <a href="datatable">Table</a>
        <br/>
        <a href="importer">Import</a>
      </Grid>
    );
  }
});

module.exports = LoadStore;

}(module, require));
