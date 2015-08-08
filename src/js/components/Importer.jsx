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

  var ImportFinalizer =  require('../import/ImportFinalizer.js');
  var SpardaCsvImporter = require('../import/SpardaCsvImporter.js');
  var RaibaCsvImporter = require('../import/RaibaCsvImporter.js');

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
      
      switch(this.state.importType) {
          case 'Sparda':
              SpardaCsvImporter.importData(text, this.loadImportPreviewFinished);  
              break;
          case 'Raiffeisen':
              RaibaCsvImporter.importData(text, this.loadImportPreviewFinished);  
              break;
          default:
              alert("ImportType not supported");
               break;
      }
    },

    setData: function(data){
        dataToImport = data;
        this.state.dataToImport.setData(data);
    },

    loadImportPreviewFinished: function(data){      

      ImportFinalizer.finalize(data, this.loadImportPreviewFinalized);
    },

    loadImportPreviewFinalized: function(data){      

      this.setData(data);
      this.setState({'importDisabled' : false});   
    },

    importData: function(){      
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
            <Col>
              <Btn className="btn btn-primary btn-file" sub disabled={this.state.importDisabled} onClick={this.importData}>Import</Btn>
            </Col>
          </Row>      
          <Row>
              <h2>Preview</h2>
          </Row> 
          <Row>
               <BootstrapTable ref="table" data={this.state.dataToImport} striped={true} hover={true} search={true}>                  
                <TableHeaderColumn hidden={true} isKey={true} dataField="Id">Id</TableHeaderColumn>           
                <TableHeaderColumn className="wordwrap" dataField="TransferDate">TransferDate</TableHeaderColumn>
                <TableHeaderColumn className="wordwrap" dataField="Ownname">Ownname</TableHeaderColumn>
                <TableHeaderColumn className="wordwrap" dataField="Othername">Othername</TableHeaderColumn>
                <TableHeaderColumn className="wordwrap" dataField="IBAN">IBAN</TableHeaderColumn>
                <TableHeaderColumn className="wordwrap" dataField="BIC">BIC</TableHeaderColumn>
                <TableHeaderColumn className="wordwrap" dataField="Subject">Subject</TableHeaderColumn>
                <TableHeaderColumn className="wordwrap" dataField="Amount">Amount</TableHeaderColumn>                
                <TableHeaderColumn className="wordwrap" dataField="Category">Category</TableHeaderColumn>
              </BootstrapTable>              
          </Row>           
          
        </Grid>
    );
  }  
});

module.exports = Importer;

}(module, require));
