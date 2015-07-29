(function(module, require) {
  
  var React = require('react');
  var ReactBsTable = require("react-bootstrap-table");
  var BootstrapTable = ReactBsTable.BootstrapTable;
  var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
  var TableDataSet = ReactBsTable.TableDataSet;

  var ChartTable = React.createClass({
    getDefaultProps: function() {
      return {
        positions : []
      };
    },
    getInitialState: function() {
  		return {
  			'showTableContent' : false,
        'tableDataSet' : new TableDataSet([])
  		};
  	},
    componentWillReceiveProps: function(nextProps){
      var flag = false;
      if (nextProps.positions.length > 0 ){
        flag = true;
      }
      this.setState({'showTableContent' : flag});
      this.state.tableDataSet.setData(nextProps.positions);
    },
    render: function() {
      var tableContent;
      if (this.state.showTableContent)
      {
        tableContent = { visibility: 'visible'};
      }
      else {
        tableContent = { visibility: 'collapse'};
      }
      return (
        <div style={tableContent}>
        <BootstrapTable  ref="table" data={this.state.tableDataSet} striped={true} hover={true} search={true}>
          <TableHeaderColumn hidden={true} isKey={true} dataField="id">Id</TableHeaderColumn>
          <TableHeaderColumn dataField="category">Category</TableHeaderColumn>
          <TableHeaderColumn dataField="name">Name</TableHeaderColumn>
          <TableHeaderColumn dataField="value">Value</TableHeaderColumn>
        </BootstrapTable>
      </div>
      );
    }

  });

  module.exports = ChartTable;

}(module, require));


