(function(module, require) {

	var React = require('react');
	var _ = require('underscore');
	var PieChart = require("react-chartjs").Pie;
	var Grid = require('react-bootstrap/Grid');
	var Row = require('react-bootstrap/Row');
	var Col = require('react-bootstrap/Col');
	var Label = require('react-bootstrap/Label');
	var Glyphicon = require('react-bootstrap/Glyphicon');
	var ChartTable = require('./ChartTable.jsx');
	var ReactBsTable = require("react-bootstrap-table");
	var BootstrapTable = ReactBsTable.BootstrapTable;
	var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
	var TableDataSet = ReactBsTable.TableDataSet;
	var Please = require('pleasejs');
	var moment = require('moment');
	var Btn = require('react-bootstrap/Button');
	var DateRangeFilter = require('./DateRangeFilter.jsx')

	var CategoryChart = React.createClass({
		componentWillReceiveProps: function(nextProps) {
		  this.filterData(nextProps.data, nextProps.range);
		  this.setState({'positions' : []});
		},
		getDefaultProps: function() {
			return {
				'range': {
					'fromDate' : moment().startOf('year'),
					'endDate' : moment().endOf('year')
					}
			};
		},
		getInitialState: function() {
			return {
				'chartData' : [{}],
				'positions' : [],
				'showTableContent' : false
			};
		},
		getfilteredDataByRange: function(data, range) {
			if (range.fromDate !== null && range.endDate !== null){
					var filtered = _.filter(data,function(item){
					var transactionDate = moment(item.TransferDate,"DD.MM.YYYY");
					var fromDate = range.fromDate;
					var till = range.endDate;
					return (transactionDate >= fromDate && transactionDate <= till)
				});
				return filtered;
			}
			return data;
		},
		filterData: function(data, range) {
			var filtered = this.getfilteredDataByRange(data, range);
			this.calculateSum(filtered);
		},
		componentDidMount: function() {
			this.filterData(this.props.data, this.props.range);
		},
		filterChartMode: function(item) {
			return (this.props.type === 'e' && (item.Amount) > 0) ||
			(this.props.type === 'a' && (item.Amount) < 0);
		},
		calculateSum: function(data){
			var self = this;
			var summen = _.chain(data)
			.filter(function(item) {
				return self.filterChartMode(item);
			})			
			.groupBy('Category')
			.map(function(value,key){
				return {
					'category' : key,
					'amount' :    _.chain(_.pluck(value,'Amount'))
					.reduce(function(result, current) {
						return result + (current);
					}, 0)
					.value()
				}
			}).value();

			var chartData = [];
			var colors = Please.make_color({
				colors_returned: summen.length //set number of colors returned
			});
			var i = 0;
			_.forEach(summen,function(item){
				if (item !== undefined)
				{
					chartData.push({
						'value' : item.amount,
						'label' : item.category,
						'color' : colors[i]
					});
					i++;
				}
			});
			this.setState({ 'chartData' : chartData});
		},
		render: function() {
			var header = this.props.type === 'e' ? 'Einnahmen' : 'Ausgaben';
			var legendItems = _.map(this.state.chartData,function(item){
				var css = { 'backgroundColor' : item.color};
				return (<li key={item.label}><Label  style={css}><Glyphicon glyph='tags' /> {item.label} ({item.value})</Label></li>);
			});
			var tableContent;
			var options = { 'animation' : false, 'responsive' : true };
			if (this.state.showTableContent)
			{
				tableContent = { visibility: 'visible'};
			}
			else {
				tableContent = { visibility: 'collapse'};
			}

			return (
				<Grid>
					<Row>
						<Col xs={12} md={7} className="pie">
							<div>
								<h2>{header}</h2>
								<PieChart ref="pie" onClick={this.pieClicked} data={this.state.chartData} redraw options={options} />
							</div>
						</Col>
						<Col xs={2} md={2} className="pieCategories">
							<ul className="list-inline">
								{legendItems}
							</ul>
						</Col>
					</Row>
					<Row>
						<Col xs={12}>
							<ChartTable positions={this.state.positions}/>
						</Col>
					</Row>
				</Grid>
			);
		},
		pieClicked : function(event){
			var chart = this.refs.pie.getChart();
			var label = (chart.getSegmentsAtEvent(event)[0]).label;
			var filtered = this.getfilteredDataByRange(this.props.data, this.props.range);
			var data = _.filter(filtered,function(item){
				return item.Category === label || (label === "undefined" && !item.Category);
			});

			this.setState({'positions' : data});
		}
	});

	module.exports = CategoryChart;

}(module, require));
