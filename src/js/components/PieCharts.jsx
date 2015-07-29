(function(module, require) {

  var React = require('react');
  var Button = require('react-bootstrap/Button');
  var _ = require('underscore');
  var CsvParse = require('csv-parse');
  var CategoryChart = require('./CategoryChart.jsx');
  var Grid = require('react-bootstrap/Grid');
  var Row = require('react-bootstrap/Row');
  var Store = require('../Store.js');

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

var PieCharts = React.createClass({
  getInitialState: function() {
    var positions = _.map(Store.getDataItems(), function(item){
          return {
            'category' : 'no category',
            'name' : item.Subject,
            'value' : InZahl(item.Amount)
          }
      });

    return {
      'filterValue' : '',
      'positions' : positions,
      'categories' : Store.getCategories()
    };
  },
  
  render: function() {
    return (<Grid>       
              <Row>
                <CategoryChart type={'e'} categories={this.state.categories} data={this.state.positions}/>
                <CategoryChart type={'a'} categories={this.state.categories} data={this.state.positions}/>
              </Row>        
            </Grid>);
  }
});

module.exports = PieCharts;

}(module, require));