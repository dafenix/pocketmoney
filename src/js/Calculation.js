(function(module, require) {

  var JQuery = require('jquery');
  var _ = require('underscore');
  var Categorizer = require('./Categorizer.js');

  var Calculation = {
    germanStringToDate: function(inputString) {
      var dateParts = inputString.split(".");
      var date = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
      return date;
    },

    getMonths: function() {
      var months = new Array();
      months[0] = "January";
      months[1] = "February";
      months[2] = "March";
      months[3] = "April";
      months[4] = "May";
      months[5] = "June";
      months[6] = "July";
      months[7] = "August";
      months[8] = "September";
      months[9] = "October";
      months[10] = "November";
      months[11] = "December";
      return months;
    },

    extendDateProperties: function(dataItem) {
      var date = this.germanStringToDate(dataItem.TransferDate);
      var monthIndex = date.getMonth();
      var months = this.getMonths();
      var monthName = months[monthIndex];
      dataItem.monthName = monthName;
      dataItem.monthIndex = monthIndex;
      dataItem.year = date.getFullYear();
    },

    categoryAmountAggByMonth: function(dataItems) {
      var self = this;
      var groups = _.chain(dataItems)
        .forEach(function(item) {
          Categorizer.categorize(item);
          self.extendDateProperties(item);
        })
        .groupBy(function(item) {
          return item.year + '#' + item.monthName + '#' + item.category;
        })
        .map(function(group) {
          var first = group[0];
          return {
            year: first.year,
            month: first.monthName,
            sortIndex: first.year + first.monthIndex,
            category: first.category,
            amount: _.chain(_.pluck(group, 'value'))
              .reduce(function(result, current) {
                return result + (current);
              }, 0).value()
          }
        })
        .sortBy('sortIndex')
        .value();

        return groups;
    }

  };

  module.exports = Calculation;

}(module, require));
