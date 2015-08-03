(function(module, require) {

  var React = require('react');
  var Grid = require('react-bootstrap/Grid');
  var Row = require('react-bootstrap/Row');
  var Col = require('react-bootstrap/Col');
  var Btn = require('react-bootstrap/Button');
  var Input = require('react-bootstrap/Input');
  var ReactBsTable = require("react-bootstrap-table");
  var BootstrapTable = ReactBsTable.BootstrapTable;
  var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
  var TableDataSet = ReactBsTable.TableDataSet;
  var DownloadTextFromGoogleDriveButton = require('./DownloadTextFromGoogleDriveButton.jsx');
  var UploadTextFromLocalButton = require('./UploadTextFromLocalButton.jsx');
  var DataTable = require('./DataTable.jsx');

  var Store = require('../Store.js');
  var _ = require('underscore');    

  var SpardaCsvImporter = require('../import/SpardaCsvImporter.jsx');

  function guid() {    
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
  }

  var dataToImport = [];

  var Importer = React.createClass({

    getInitialState: function() {
      return {
        'dataToImport' : new TableDataSet(dataToImport),
        'importType' : 'Sparda',
        'importDisabled' : true,
      };
    },

    importTypeChanged: function(e) {

      var selectedImportType = e.target.attributes['label'].nodeValue;
      this.setState({ 'importType' : selectedImportType});
    }, 

    componentDidMount: function() {
    },
   
    loadImportPreview: function(text){
      SpardaCsvImporter.importData(text, this.loadImportPreviewFinished);     
    },

    setData: function(data){
        dataToImport = data;
        this.state.dataToImport.setData(data);
    },

    loadImportPreviewFinished: function(data){

       _.forEach(data,function(dataEntry){
          dataEntry.Id = guid();           
      });

      this.setData(data);
      this.setState({'importDisabled' : false});   
    },

    importPreviewData: function(){      
      _.forEach(dataToImport, function(dataEntry){
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
              <h2>Import Type</h2>
          </Row>
          <Row>
            <Col>
              <Input type='radio' label='Sparda' checked={this.state.importType === 'Sparda'} onChange={this.importTypeChanged}/>
              <Input type='radio' label='Raiffeisen' checked={this.state.importType === 'Raiffeisen'} onChange={this.importTypeChanged}/>
            </Col>
          </Row> 
          <Row>
              <h2>Source</h2>
          </Row>         
          <Row>
              <Col>
                <UploadTextFromLocalButton loadTextCallback={this.loadImportPreview}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <DownloadTextFromGoogleDriveButton loadTextCallback={this.loadImportPreview}/>
            </Col>
          </Row>        
          <Row>
              <h2>Preview</h2>
          </Row> 
          <Row>
               <BootstrapTable ref="table" data={this.state.dataToImport} striped={true} hover={true} search={true}>                  
                <TableHeaderColumn hidden={true} isKey={true} dataField="Id">Id</TableHeaderColumn>           
                <TableHeaderColumn dataField="TransferDate">TransferDate</TableHeaderColumn>
                <TableHeaderColumn dataField="Ownname">Ownname</TableHeaderColumn>
                <TableHeaderColumn dataField="Othername">Othername</TableHeaderColumn>
                <TableHeaderColumn dataField="IBAN">IBAN</TableHeaderColumn>
                <TableHeaderColumn dataField="BIC">BIC</TableHeaderColumn>
                <TableHeaderColumn dataField="Subject">Subject</TableHeaderColumn>
                <TableHeaderColumn dataField="Amount">Amount</TableHeaderColumn>
              </BootstrapTable>              
          </Row>           
          <Row>
            <Col>
              <Btn className="btn btn-primary btn-file" sub disabled={this.state.importDisabled} onClick={this.importPreviewData}>Import</Btn>
            </Col>
          </Row>
        </Grid>
    );
  }  
});

module.exports = Importer;

}(module, require));