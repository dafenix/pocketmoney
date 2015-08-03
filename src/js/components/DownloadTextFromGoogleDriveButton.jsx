(function(module, require) {
  
  var React = require('react');  
  var FilePicker = require('../Filepicker.js');  
  var Btn = require('react-bootstrap/Button');

  var DownloadTextFromGoogleDriveButton = React.createClass({    
    
    render: function() {      
      return (        
        <Btn ref="pick" onClick={this.handleDriveClicked} className="btn btn-primary btn-file">Google-Drive</Btn>    
      );
    },

    handleDriveClicked: function(){
      var self = this;
      var picker = new FilePicker({
        apiKey: 'AIzaSyDVBhu-ngTcSBWyKncCWq6SzG_z_7AQoic',
        clientId: '288329116655-hnplk7t54j5kvp42uls529q0ovt8sjto.apps.googleusercontent.com',
        buttonEl: this.refs.pick.getDOMNode(),
        onSelect: function(file) {
          self.downloadFile(file, self.props.loadTextCallback);
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
      } 
      else {
        callback(null);
      }
    }
  });

  module.exports = DownloadTextFromGoogleDriveButton;

}(module, require));