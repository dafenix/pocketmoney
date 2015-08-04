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
	var DatePicker = require('react-datepicker');
	var Btn = require('react-bootstrap/Button');
	var DateRangePicker = require('react-bootstrap-daterangepicker');

	var CategoryChart = React.createClass({
		getInitialState: function() {

			return {
				'chartData' : [{}],
				'positions' : [],
				'showTableContent' : false,
				'fromDate' : moment().startOf('year'),
				'endDate' : moment().endOf('year')
			};
		},
		componentDidMount: function() {
			this.calculateSum(this.props.data);
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
		calculateSum: function(data){
			var self = this;
			var summen = _.chain(data)
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
			var options = { 'animation' : false, 'responsive' : true };
			if (this.state.showTableContent)
			{
				tableContent = { visibility: 'visible'};
			}
			else {
				tableContent = { visibility: 'collapse'};
			}
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
						<Col xs={1} md={3}>
							<div className="datetimefilter">
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
						<Col xs={11} md={7} className="pie">

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
		},
		handleEvent: function (event, picker) {
			if (picker.startDate.isSame(this.state.fromDate) && picker.endDate.isSame(this.state.endDate))
			{
				console.log('same');
				console.log('same');

				return;
			}
			this.setState({ 'fromDate': picker.startDate, 'endDate' : picker.endDate });
			this.dateRangeChanged();
		},
		dateRangeChanged: function(){
			var self = this;
			if (this.state.fromDate !== null && this.state.endDate !== null){
				var filtered = _.filter(this.props.data,function(item){
					var transactionDate = moment(item.TransferDate,"DD.MM.YYYY");
					var fromDate = self.state.fromDate;
					var till = self.state.endDate;
					return (transactionDate >= fromDate && transactionDate <= till)
				});
				this.calculateSum(filtered);
				console.log('range changed',filtered);
			}

		},
		germanStringToDate: function(inputString) {
			var dateParts = inputString.split(".");
			var date = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
			return date;
		}
	});

	module.exports = CategoryChart;

}(module, require));
