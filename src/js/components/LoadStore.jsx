(function(module, require) {

  var React = require('react');
  var Grid = require('react-bootstrap/Grid');
  var Row = require('react-bootstrap/Row');
  var Col = require('react-bootstrap/Col');
  var Btn = require('react-bootstrap/Button');
  var Store = require('../Store.js');
  var CsvParse = require('csv-parse');
  var _ = require('underscore');
  var FilePicker = require('../FilePicker.js');

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
        this.loadJson(e.target.result);
      }
    },
    loadJson: function(data){
      var storeJson = JSON.parse(data);
      Store.setRootStoreObject(storeJson);
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
        <Row>
          <Col>
            <Btn ref="pick" onClick={this.handleDriveClicked} className="btn btn-primary btn-file">Google-Drive</Btn>
          </Col>
        </Row>
        <br/>
        <a href="charts">Charts</a>
        <br/>
        <a href="datatable">Table</a>
      </Grid>
    );
  },
  handleDriveClicked: function(){
    var self = this;
    var picker = new FilePicker({
      apiKey: 'AIzaSyDVBhu-ngTcSBWyKncCWq6SzG_z_7AQoic',
      clientId: '288329116655-hnplk7t54j5kvp42uls529q0ovt8sjto.apps.googleusercontent.com',
      buttonEl: this.refs.pick.getDOMNode(),
      onSelect: function(file) {
        self.downloadFile(file, self.loadJson);
      }
    });
    picker.open();
  },
  downloadFile: function(file, callback) {
    if (file.downloadUrl) {
      var accessToken = gapi.auth.getToken().access_token;
      var xhr = new XMLHttpRequest();
      xhr.open('GET', file.downloadUrl);
      xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
      xhr.onload = function() {
        callback(xhr.responseText);
      };
      xhr.onerror = function() {
        callback(null);
      };
      xhr.send();
    } else {
      callback(null);
    }
  }
});

module.exports = LoadStore;

}(module, require));
