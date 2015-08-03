
(function(module, require) {
    var React = require('react');
    var RouterMixin = require('react-mini-router').RouterMixin;

    var LoadStore = require('./LoadStore.jsx');
    var Charts = require('./Charts.jsx');
    var DataTable = require('./DataTable.jsx');
    var Importer = require('./Importer.jsx');

    var AppRouter = React.createClass({

        mixins: [RouterMixin],

        routes: {
            '/' : 'loadstore',
            '/loadstore' : 'loadstore',
            '/charts' : 'charts',
            '/datatable' : 'datatable',
            '/importer' : 'importer'
        },

        render: function() {
            return (<div>{this.renderCurrentRoute()}</div>);
        },

        loadstore: function() {
            return (<LoadStore/>);
        },

        charts: function() {
            return (<Charts/>);
        },

        datatable: function() {
            return (<DataTable/>);
        },

        importer: function() {
            return (<Importer/>);
        },

        notFound: function(path) {
            return <div>Uh oh. {path} doesnt exist.</div>;
        }
    });

    module.exports = AppRouter;

}(module, require));
