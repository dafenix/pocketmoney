(function(document, require) {

	var React = require('react');    
    var AppRouter = require('./components/AppRouter.jsx');

	var attachFastClick = require('fastclick');
	attachFastClick(document.body);

	var main = document.getElementById('main');
	
  	React.render(<AppRouter/>, main);     
	
}(document, require));