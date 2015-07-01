var React = require('react'),
    App = require('./components/App.jsx'),
    JQuery = require('jquery'),
    _ = require('underscore');

var attachFastClick = require('fastclick');
attachFastClick(document.body);
var main = document.getElementById('main');

JQuery.getJSON("res/config.json").done(function(r){
  	React.render(<App categories={r.categories} />, main);     
});



