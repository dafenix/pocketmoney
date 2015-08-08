var React = require('react');
var DateRangePicker = require('react-bootstrap-daterangepicker');
var Btn = require('react-bootstrap/Button');
var Glyphicon = require('react-bootstrap/Glyphicon');
var moment = require('moment');
var Grid = require('react-bootstrap/Grid');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');

var DateRangeFilter = React.createClass({
  getInitialState: function() {
    return {
      'fromDate' : moment().startOf('year'),
      'endDate' : moment().endOf('year')
    };
  },
  render: function() {
    var myranges = {
      'This Year': [moment().startOf('year'), moment().endOf('year')],
      'This Month': [moment().startOf('month'), moment().endOf('month')],
      'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
      '-02 Months': [moment().subtract(2, 'month').startOf('month'), moment().subtract(2, 'month').endOf('month')],
      '-03 Months': [moment().subtract(3, 'month').startOf('month'), moment().subtract(3, 'month').endOf('month')],
      '-04 Months': [moment().subtract(4, 'month').startOf('month'), moment().subtract(4, 'month').endOf('month')],
      '-05 Months': [moment().subtract(5, 'month').startOf('month'), moment().subtract(5, 'month').endOf('month')],
      '-06 Months': [moment().subtract(6, 'month').startOf('month'), moment().subtract(6, 'month').endOf('month')],
      '-07 Months': [moment().subtract(7, 'month').startOf('month'), moment().subtract(7, 'month').endOf('month')],
      '-08 Months': [moment().subtract(8, 'month').startOf('month'), moment().subtract(8, 'month').endOf('month')],
      '-09 Months': [moment().subtract(9, 'month').startOf('month'), moment().subtract(9, 'month').endOf('month')],
      '-10 Months': [moment().subtract(10, 'month').startOf('month'), moment().subtract(10, 'month').endOf('month')],
      '-11 Months': [moment().subtract(11, 'month').startOf('month'), moment().subtract(11, 'month').endOf('month')],
      '-12 Months': [moment().subtract(12, 'month').startOf('month'), moment().subtract(12, 'month').endOf('month')],
    };
    var start = this.state.fromDate.format('YYYY-MM-DD');
    var end = this.state.endDate.format('YYYY-MM-DD');
    var label = start + ' - ' + end;
    if (start === end) {
      label = start;
    }

    return (
      <Grid>
        <Row>
          <Col md={7} xs={12}>
            <div>
              <h3>Time Range</h3>
              <DateRangePicker ranges={myranges} startDate={this.state.fromDate} endDate={this.state.endDate} onEvent={this.handleEvent}>
                <Btn className="selected-date-range-btn" style={{width:'100%'}}>
                  <div className="pull-left"><Glyphicon glyph="calendar" /></div>
                  <div className="pull-right">
                    <span>
                      {label}
                    </span>
                    <span className="caret"></span>
                  </div>
                </Btn>
              </DateRangePicker>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  },
  handleEvent: function (event, picker) {
    if (picker.startDate.isSame(this.state.fromDate) && picker.endDate.isSame(this.state.endDate))
    {
      return;
    }
    this.setState({ 'fromDate': picker.startDate, 'endDate' : picker.endDate });
    this.props.onDateRangeChanged({ 'fromDate' : picker.startDate, 'endDate' : picker.endDate});
  }

});

module.exports = DateRangeFilter;
