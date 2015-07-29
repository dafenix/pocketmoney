
(function(module, require) {
    var React = require('react');
    var RouterMixin = require('react-mini-router').RouterMixin;
    
    var LoadStore = require('./LoadStore.jsx');  
    var PieCharts = require('./PieCharts.jsx');   
    var DataTable = require('./DataTable.jsx');   

    var AppRouter = React.createClass({

        mixins: [RouterMixin],

        routes: {
            '/' : 'loadstore',
            '/loadstore' : 'loadstore',
            '/piecharts' : 'piecharts',
            '/datatable' : 'datatable'
        },
                
        render: function() {
            return this.renderCurrentRoute();
        },

        loadstore: function() {
            return (<LoadStore/>);
        },

        piecharts: function() {
            return (<PieCharts/>);
        },

        datatable: function() {
            return (<DataTable/>);
        },

        notFound: function(path) {
            return <div>Uh oh. {path} doesnt exist.</div>;
        }
    });

    module.exports = AppRouter;

}(module, require));