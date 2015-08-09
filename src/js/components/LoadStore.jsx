(function(module, require) {

  var React = require('react');
  var Grid = require('react-bootstrap/Grid');
  var Row = require('react-bootstrap/Row');
  var Col = require('react-bootstrap/Col');
  var Btn = require('react-bootstrap/Button');
  var Store = require('../Store.js');
  var _ = require('underscore');
  var DownloadTextFromGoogleDriveButton = require('./DownloadTextFromGoogleDriveButton.jsx');
  var UploadTextFromLocalButton = require('./UploadTextFromLocalButton.jsx');

  var LoadStore = React.createClass({

    getInitialState: function() {       
      return {
        'StoreDataRowCount' : 0,
        'StoreCategoryRowCount' : 0,
        'StoreDataToDownload' : {}
      };
    },

    componentDidMount: function() {
      this.refreshMetaData();
    },   

    loadJson: function(data){
      var storeJson = JSON.parse(data);
      Store.setRootStoreObject(storeJson);  
      this.refreshMetaData();          
    },

    refreshMetaData: function(data){
      var dataItems = Store.getDataItems();
      var categoryItems = Store.getCategories();
      var storeDataToDownload = "data:charset=utf-8," + Store.getEncodedRootStoreObject();

      this.setState({'StoreDataRowCount' : dataItems.length});
      this.setState({'StoreCategoryRowCount' : categoryItems.length});
      this.setState({'StoreDataToDownload' : storeDataToDownload});                
    },

    render: function() {
      return (
        <Grid>
          <Row>
            <h2>Choose your Storefile!</h2>
          </Row>
          <Row>
            <Col>
              <UploadTextFromLocalButton loadTextCallback={this.loadJson}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <DownloadTextFromGoogleDriveButton loadTextCallback={this.loadJson}/>
            </Col>
          </Row>

          <Row>
            <h2>Your Storefile:</h2>
          </Row>
          <Row>
            <Col>
              Datacount: {this.state.StoreDataRowCount}
            </Col>            
          </Row>
          <Row>
            <Col>
              Categorycount: {this.state.StoreCategoryRowCount}
            </Col>            
          </Row>
          <Row>
            <h2>Download your Storefile!</h2>
          </Row>
          <Row>
            <a className="btn btn-primary btn-file" href={this.state.StoreDataToDownload} download="store.json">Download</a>          
          </Row>          
        </Grid>
    );
  }
});

module.exports = LoadStore;

}(module, require));
