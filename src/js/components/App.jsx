var React = require('react');
var Button = require('react-bootstrap/Button');
var _ = require('underscore');
var CsvParse = require('csv-parse');
var CategoryChart = require('./CategoryChart.jsx');
var Grid = require('react-bootstrap/Grid');
var Row = require('react-bootstrap/Row');

function InZahl (Wert)
   {   // Erstellt von Ralf Pfeifer, www.ArsTechnica.de
       var PosPunkt = Wert.indexOf(".",0);
       var PosKomma = Wert.indexOf(",",0);
       if (PosKomma < 0) PosKomma = Wert.length;

       // Dezimalpunkte zur Tausendergruppierung entfernen
       while ((0 <= PosPunkt) && (PosPunkt < PosKomma))
       {
           Wert = Wert.substring(0, PosPunkt) + Wert.substring(PosPunkt + 1, Wert.length);
           PosPunkt = Wert.indexOf(".",0);
           PosKomma--;
       }

       // Enthaelt die Variable 'Wert' ein Komma ?
       PosKomma = Wert.indexOf(",",0);
       if (PosKomma >= 0)
          { Wert = Wert.substring(0, PosKomma) + "." + Wert.substring(PosKomma + 1, Wert.length); }

       return parseFloat(Wert);
       }

var App = React.createClass({
  getInitialState: function() {
    return {
      'filterValue' : '',
      'positions' : [],
      'categories' :[]
    };
  },
  getDefaultProps: function() {
    return {
    };
  },
  componentDidMount: function() {
    var self = this;
    this.setState({'categories' : this.props.categories});
  },
  render: function() {
    return (<Grid>
        <Row>
          <span className="btn btn-primary btn-file">
              Datei auswählen<input ref="filectrl" type="file" onChange={this.fileChanged} />
          </span>
        </Row>
        <Row>
          <CategoryChart type={'e'} categories={this.state.categories} data={this.state.positions}/>
          <CategoryChart type={'a'} categories={this.state.categories} data={this.state.positions}/>
        </Row>
      </Grid>);
  },
  fileChanged: function (){
    var file = this.refs.filectrl.getDOMNode().files[0];
    var reader = new FileReader();
    var self = this;
    reader.onload = function(e){
      CsvParse(reader.result, {comment: '#', delimiter: ';'}, function(err, output){
          var positions = _.map(output, function(entry){
            return {
              'category' : 'no category',
              'name' : entry[1],
              'value' : InZahl(entry[2])
            }
          });
          self.setState({'positions' : positions});
      });
    };
    reader.readAsText(file);
  }
});

module.exports = App;
