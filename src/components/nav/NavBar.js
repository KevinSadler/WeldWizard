import React from 'react';
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import { Link, } from "react-router-dom"
import './NavBar.css'
import Logo from './logo.png'

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  handleLogout() {
    sessionStorage.clear();
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <div >
        <div className="navLogo">
          <img className="logoImage" src={Logo}></img>
        </div>
        <Nav pills className="navBar">
          <NavItem >
            <NavLink className="navItem" tag={Link} to="/" >Home</NavLink>
          </NavItem>
          <Dropdown className="navItem" nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle nav caret className="navDrop">
              Add New Job
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem className="navItem" tag={Link} to="/MigForm">Mig Job</DropdownItem>
              <DropdownItem className="navItem" tag={Link} to="/StickForm">Stick Job</DropdownItem>
              <DropdownItem className="navItem" tag={Link} to="/TigForm">Tig Job</DropdownItem>
              <DropdownItem className="navItem" tag={Link} to="/FluxForm">Flux Core Job</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <NavItem >
            <NavLink className="navItem" tag={Link} to="/Charts">Charts</NavLink>
          </NavItem>
          <NavItem >
            <NavLink className="navItem" tag={Link} to="/" onClick={this.handleLogout}>Log Out</NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}





