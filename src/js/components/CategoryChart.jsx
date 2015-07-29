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

var CategoryChart = React.createClass({
	getInitialState: function() {
		
		return {
			'chartData' : [{}],
			'positions' : [],
			'showTableContent' : false
		};
	},
	componentDidMount: function() {
		this.calculateSum(this.props);
	},
	filterChartMode: function(item) {
		return (this.props.type === 'e' && (item.value) > 0) ||
		(this.props.type === 'a' && (item.value) < 0);
	},
	setMatchingCategory: function(item) {
		var foundCategory = _.find(this.props.categories, function(category){
			var splitted = category.filter.split(';');
			var found = _.find(splitted,function(fItem){
				return (item.name.toLowerCase().indexOf(fItem.toLowerCase()) !== -1);
			});
			return found !== undefined;
		});
		if (foundCategory !== undefined)
		{
			item.category = foundCategory.name;
		}
	},
	calculateSum: function(props){
		var self = this;
		var summen = _.chain(props.data)
		.filter(function(item) {
			return self.filterChartMode(item);
		})
		.forEach(function(item){
			self.setMatchingCategory(item);
		})
		.groupBy('category')
		.map(function(value,key){
			return {
				'category' : key,
				'amount' :    _.chain(_.pluck(value,'value'))
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
		console.log('c',colors);
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
	renderDemoPieIfNeeded: function (nextProps){
		if (nextProps.data.length == 0)
		{
			var color = this.props.type === 'e' ? '#67BCDB' : '#E44424';
			var highlight = this.props.type === 'e' ? '#67D9DC' : '#FB6749';
			var data = [
			{
				value: 100,
				color: color,
				highlight: highlight,
				label: "Keine Daten"
			}
			];
			this.setState({'chartData' : data});
		}
	},
	render: function() {
		var header = this.props.type === 'e' ? 'Einnahmen' : 'Ausgaben';
		var legendItems = _.map(this.state.chartData,function(item){
			var css = { 'backgroundColor' : item.color};
			return (<li key={item.label}><Label  style={css}><Glyphicon glyph='tags' /> {item.label} ({item.value})</Label></li>);
		});
		var tableContent;
		var options = { 'animation' : false};
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
					<Col xs={3} className="pie">
						<div>
							<h2>{header}</h2>
							<PieChart ref="pie" onClick={this.pieClicked} data={this.state.chartData} redraw options={options} />
						</div>
					</Col>
					<Col xs={3} className="pieCategories">
						<ul className="list-inline">
							{legendItems}
						</ul>
					</Col>
				</Row>
				<Row>
					<Col xs={6}>
						<ChartTable positions={this.state.positions}/>
					</Col>
				</Row>
			</Grid>
		);
	},
	pieClicked : function(event){
		var chart = this.refs.pie.getChart();
		var label = (chart.getSegmentsAtEvent(event)[0]).label;
		var data = _.filter(this.props.data,function(item){
			return item.category === label;
		});

		this.setState({'positions' : data});
	}
});

module.exports = CategoryChart;

}(module, require));
