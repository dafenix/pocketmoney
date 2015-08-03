(function(module, require) {

  var React = require('react');
  var Grid = require('react-bootstrap/Grid');
  var Row = require('react-bootstrap/Row');
  var Col = require('react-bootstrap/Col');
  var Btn = require('react-bootstrap/Button');
  var DownloadTextFromGoogleDriveButton = require('./DownloadTextFromGoogleDriveButton.jsx');
  var UploadTextFromLocalButton = require('./UploadTextFromLocalButton.jsx');
  var DataTable = require('./DataTable.jsx');

  var Store = require('../Store.js');
  var _ = require('underscore');    

  var SpardaCsvImporter = require('../import/SpardaCsvImporter.jsx');

  var Importer = React.createClass({

    getInitialState: function() {
      return {
        'dataToImport' : []
      };
    },

    componentDidMount: function() {
    },
   
    importData: function(text){
      SpardaCsvImporter.importData(text, this.importFinished);     
    },

    importFinished: function(data){
      this.setState({'dataToImport' : data});      
      alert("Ready to import loaded Data!");
    },

    importPreviewData: function(){
      _.forEach(this.state.dataToImport,function(dataEntry){
           Store.addDataItem(dataEntry);
      });       
      alert("Import done!");
    },

    render: function() {
      return (
        <Grid>
          <Row>
              <h1>Import fresh Data...</h1>
          </Row>
          <Row>
              <Col>
                <UploadTextFromLocalButton loadTextCallback={this.importData}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <DownloadTextFromGoogleDriveButton loadTextCallback={this.importData}/>
            </Col>
          </Row>        
          <Row>
              <h2>Preview</h2>
          </Row> 
          <Row>
              May be at later commit...
          </Row>           
          <Row>
            <Col>
              <Btn className="btn btn-primary btn-file" sub onClick={this.importPreviewData}>Import</Btn>
            </Col>
          </Row>
        </Grid>
    );
  }
  
});

module.exports = Importer;

}(module, require));
