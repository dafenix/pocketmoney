(function(module, require) {

  var React = require('react');
  var Store = require('../Store.js');

  var ReactBsTable = require("react-bootstrap-table");
  var BootstrapTable = ReactBsTable.BootstrapTable;
  var TableHeaderColumn = ReactBsTable.TableHeaderColumn;
  var TableDataSet = ReactBsTable.TableDataSet;
  var Grid = require('react-bootstrap/Grid');

  var DataTable = React.createClass({

    getInitialState: function() {
      var dataItems = Store.getDataItems();

  		return {
        'tableDataSet' : new TableDataSet(dataItems)
  		};
  	},

    render: function() {
      return (
        <Grid>
          <BootstrapTable ref="table" data={this.state.tableDataSet} striped={true} hover={true} search={true}>
            <TableHeaderColumn hidden={true} isKey={true} dataField="Id">Id</TableHeaderColumn>
            <TableHeaderColumn dataField="TransferDate">TransferDate</TableHeaderColumn>
            <TableHeaderColumn dataField="Subject">Subject</TableHeaderColumn>
            <TableHeaderColumn dataField="Category">Category</TableHeaderColumn>
            <TableHeaderColumn dataField="Amount">Amount</TableHeaderColumn>
          </BootstrapTable>
        </Grid>
      );
    }
  });

  module.exports = DataTable;

}(module, require));
