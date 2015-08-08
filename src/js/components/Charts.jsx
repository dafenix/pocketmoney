(function(module, require) {

  var React = require('react');
  var Button = require('react-bootstrap/Button');
  var _ = require('underscore');
  var CsvParse = require('csv-parse');
  var CategoryChart = require('./CategoryChart.jsx');
  var Grid = require('react-bootstrap/Grid');
  var Row = require('react-bootstrap/Row');
  var Store = require('../Store.js');
  var LineChart = require('./LineChart.jsx');
<<<<<<< HEAD
   
var Charts = React.createClass({
  getInitialState: function() {
    var positions = Store.getDataItems();
=======
  var DateRangeFilter = require('./DateRangeFilter.jsx')
  var moment = require('moment');

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

var Charts = React.createClass({
  getInitialState: function() {
    var positions = _.map(Store.getDataItems(), function(item){
          return {
            'category' : item.Category,
            'name' : item.Subject,
            'value' : InZahl(item.Amount),
            'TransferDate': item.TransferDate,
            'range': {
              'fromDate' : moment().startOf('year'),
              'endDate' : moment().endOf('year')
              }
          }
      });
>>>>>>> 7047801f44284f8d6580f1558a2db6e8a85513c0

    return {
      'filterValue' : '',
      'positions' : positions
    };
  },

  render: function() {
    return (
              <Row>
<<<<<<< HEAD
                <CategoryChart type={'e'} data={this.state.positions}/>
                <CategoryChart type={'a'} data={this.state.positions}/>
                <LineChart data={this.state.positions}/>
=======
                <DateRangeFilter onDateRangeChanged={this.onDateRangeChanged} />
                <CategoryChart type={'e'} categories={this.state.categories} data={this.state.positions} range={this.state.range}/>
                <CategoryChart type={'a'} categories={this.state.categories} data={this.state.positions} range={this.state.range}/>
                <LineChart categories={this.state.categories} data={this.state.positions}/>
>>>>>>> 7047801f44284f8d6580f1558a2db6e8a85513c0
              </Row>
            );
  },
  onDateRangeChanged: function(range){
    this.setState({ range : range });
  }
});

module.exports = Charts;

}(module, require));
