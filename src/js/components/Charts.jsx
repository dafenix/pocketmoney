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
  var moment = require('moment');
  var DateRangeFilter = require('./DateRangeFilter.jsx')

  var Charts = React.createClass({
  getInitialState: function() {
    var positions = Store.getDataItems();

    return {
      'positions' : positions,
      'range': {
              'fromDate' : moment().startOf('year'),
              'endDate' : moment().endOf('year')
              }
    };
  },

  render: function() {
    return (
              <Row>
                <DateRangeFilter onDateRangeChanged={this.onDateRangeChanged} />
                <CategoryChart type={'e'} data={this.state.positions} range={this.state.range}/>
                <CategoryChart type={'a'} data={this.state.positions} range={this.state.range}/>
                <LineChart data={this.state.positions}/>
              </Row>
            );
  },
  onDateRangeChanged: function(range){
    this.setState({ range : range });
  }
});

module.exports = Charts;

}(module, require));
