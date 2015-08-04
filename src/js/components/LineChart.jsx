var React = require('react');
var LineChartCtrl = require("react-chartjs").Line;
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var _ = require('underscore');
var Calculation = require('../Calculation.js')
var Please = require('pleasejs');
var Grid = require('react-bootstrap/Grid');

var LineChart = React.createClass({
  getInitialState: function() {
    return {
      'LineChartData' : {
        labels: [],
        datasets: [{}]
      }
    };
  },
  convertHex: function(hex,opacity){
    hex = hex.replace('#','');
    var r = parseInt(hex.substring(0,2), 16);
    var g = parseInt(hex.substring(2,4), 16);
    var b = parseInt(hex.substring(4,6), 16);

    var result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
    return result;
  },
  componentDidMount: function() {
    var self = this;
    var data = Calculation.categoryAmountAggByMonth(this.props.data);
    var data2 =  _.chain(data)
    .groupBy('category')
    .map(function(value, key) {
      var months = _.unique(_.pluck(data,'month'));
      var amounts = new Array(months.length);
      var idx = 0;
      _.forEach(amounts,function(t){
        amounts[idx] = 0;
        idx++;
      });
      _.forEach(value,function(v){
        var idx = months.indexOf(v.month);
        amounts[idx] = v.amount;
      });
      var colors = Please.make_color({
        colors_returned: 2
      });
      return {
        category: key,
        sortindex : value[0].sortindex,
        data: amounts,
        fillColor: "rgba(0,0,0,0.0)",
        strokeColor: self.convertHex(colors[0],80),
        pointColor: self.convertHex(colors[0],80),
        pointHighlightFill: "#fff",
        pointHighlightStroke: self.convertHex(colors[1],100)
      }
    }).value();

    var lineChartData = {
      labels: _.unique(_.pluck(data,'month')),
      datasets: data2
    };
    this.setState({ LineChartData : lineChartData});
  },
  render: function() {
    var options = { 'responsive' : true };
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <div>
              <h2>Trend</h2>
              <LineChartCtrl data={this.state.LineChartData} redraw options={options}></LineChartCtrl>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
});

module.exports = LineChart;
