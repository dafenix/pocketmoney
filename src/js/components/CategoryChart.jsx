var React = require('react');
var _ = require('underscore');
var PieChart = require("react-chartjs").Pie;
var Grid = require('react-bootstrap/Grid');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var Label = require('react-bootstrap/Label');
var Glyphicon = require('react-bootstrap/Glyphicon');


var CategoryChart = React.createClass({
	getInitialState: function() {
        return {
           'chartData' : []
        };
    },
	componentDidMount: function() {
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
        _.forEach(summen,function(item){
            if (item !== undefined)
            {
                chartData.push({
                    'value' : item.amount,
                    'label' : item.category,
										'color' :'#'+Math.floor(Math.random()*16777215).toString(16)
                });
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
	componentWillReceiveProps: function(nextProps){
		this.calculateSum(nextProps);
        this.renderDemoPieIfNeeded(nextProps);
	},
	render: function() {
        var header = this.props.type === 'e' ? 'Einnahmen' : 'Ausgaben';
        var legendItems = _.map(this.state.chartData,function(item){
            var css = { 'backgroundColor' : item.color};
            return (<li key={item.label}><Label  style={css}><Glyphicon glyph='tags' /> {item.label} ({item.value})</Label></li>);
        });
	  	return (
            <Grid>
                <Row>
                    <Col xs={3} className="pie">
                        <div>
                            <h2>{header}</h2>
                            <PieChart data={this.state.chartData} redraw />
                        </div>
                    </Col>
                    <Col xs={3} className="pieCategories">
                        <ul className="list-inline">
                            {legendItems}
                        </ul>
                    </Col>
                </Row>
            </Grid>
		);
	}
});

module.exports = CategoryChart;
