var React = require('react');
var Navbar = require('react-bootstrap/Navbar');
var Nav = require('react-bootstrap/Nav');
var NavItem = require('react-bootstrap/NavItem');
var MenuItem = require('react-bootstrap/MenuItem');

var MainMenu = React.createClass({

  render: function() {
    return (<Navbar brand='Webpocketmoney' toggleNavKey={0}>
              <Nav right eventKey={0}> {/* This is the eventKey referenced */}
                <NavItem eventKey={1} href='#!'>Home</NavItem>
                <NavItem eventKey={2} href='/charts'>Charts</NavItem>
                <NavItem eventKey={3} href='/datatable'>Table</NavItem>
                <NavItem eventKey={3} href='/importer'>Import</NavItem>
              </Nav>
            </Navbar>);
}
});

module.exports = MainMenu;
