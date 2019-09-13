    import React from 'react';
    import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
    import { Link } from "react-router-dom"
    
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
      <div>
        <Nav pills>
          <NavItem>
            <NavLink href="/" active>Home</NavLink>
          </NavItem>
          <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle nav caret>
              Add New Job
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem tag={Link} to="/MigForm">Mig Job</DropdownItem>
              <DropdownItem tag={Link} to="/StickForm">Stick Job</DropdownItem>
              <DropdownItem tag={Link} to="/TigForm">Tig Job</DropdownItem>
              <DropdownItem tag={Link} to="/FluxForm">Flux Core Job</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <NavItem>
            <NavLink href="/Charts">Charts</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/" onClick={this.handleLogout}>Log Out</NavLink>
          </NavItem>
        </Nav>
      </div>
    );
  }
}





