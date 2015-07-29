(function(module, require) {
  
  var React = require('react');
  var Grid = require('react-bootstrap/Grid');
  var Row = require('react-bootstrap/Row');
  var Col = require('react-bootstrap/Col');
  var Btn = require('react-bootstrap/Button');
  var Store = require('../Store.js');

  var LoadStore = React.createClass({
    
    fileChanged: function (){
      var file = this.refs.filectrl.getDOMNode().files[0];
      var reader = new FileReader();
      reader.onload = this.onFileLoad;     
      reader.readAsText(file);
    },

    onFileLoad: function(e){
      var storeJson = JSON.parse(e.target.result);
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
        <br/>
        <a href="piecharts">Charts</a>
        <br/>
        <a href="datatable">Table</a>
      </Grid>        
      );
    }
  });

  module.exports = LoadStore;

}(module, require));


