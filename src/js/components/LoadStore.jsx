(function(module, require) {

  var React = require('react');
  var Grid = require('react-bootstrap/Grid');
  var Row = require('react-bootstrap/Row');
  var Col = require('react-bootstrap/Col');
  var Store = require('../Store.js');
  var _ = require('underscore');
  var DownloadTextFromGoogleDriveButton = require('./DownloadTextFromGoogleDriveButton.jsx');
  var UploadTextFromLocalButton = require('./UploadTextFromLocalButton.jsx');

  var LoadStore = React.createClass({

    componentDidMount: function() {
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
              <UploadTextFromLocalButton loadTextCallback={this.loadJson}/>
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
