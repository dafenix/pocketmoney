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
   
var Charts = React.createClass({
  getInitialState: function() {
    var positions = Store.getDataItems();

    return {
      'filterValue' : '',
      'positions' : positions
    };
  },

  render: function() {
    return (
              <Row>
                <CategoryChart type={'e'} data={this.state.positions}/>
                <CategoryChart type={'a'} data={this.state.positions}/>
                <LineChart data={this.state.positions}/>
              </Row>
            );
  }
});

module.exports = Charts;

}(module, require));
