(function(module, require) {
  
  var React = require('react');

  var UploadTextFromLocalButton = React.createClass({    
    
    render: function() {      
      return (        
         <span className="btn btn-primary btn-file">
         Datei auswählen 
         <input ref="filectrl" type="file" onChange={this.fileChanged} />
         </span>
      );
    },

    fileChanged: function (){
      var file = this.refs.filectrl.getDOMNode().files[0];
      var reader = new FileReader();     
      reader.onload = this.onFileLoad;
      reader.readAsText(file);
    },

    onFileLoad: function(e){
      var fileExtension = e.target.fileExtension; 
      this.props.loadTextCallback(e.target.result);      
    },
  });

  module.exports = UploadTextFromLocalButton;

}(module, require));