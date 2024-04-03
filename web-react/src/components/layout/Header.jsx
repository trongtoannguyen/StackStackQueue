import Container from 'react-bootstrap/Container';
import { Nav, Navbar, NavItem, NavDropdown } from 'react-bootstrap';
import logoApp from './../../assets/react.svg';
import { NavLink, Link } from 'react-router-dom';


import SearchFormHeader from '../search/SearchFormHeader';


function Header() {


  const handleLogout = () => {
  }

  return (
    <header className='header-container'>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <NavLink tag={Link} to="/" className='navbar-brand'>
            <img
              src={logoApp}
              width="30" height="30"
              className="d-inline-block align-top" alt="logo" />
            <span>Tech-Forum</span>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="me-auto">
              <NavItem>
                <NavLink tag={Link} to="/forums" className='nav-link'>
                  <i className="pi pi-list w3-xx"></i><></>
                  Forums</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/" className='nav-link'>Other</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/members" className='nav-link'>Members</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/register" className='nav-link'>Register</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/login" className='nav-link'>Login</NavLink>
              </NavItem>
              <NavItem>
                <span className='nav-link'>Welcome</span>
              </NavItem>
            </Nav>

            <Nav className="right-side">
              <NavItem>
                <SearchFormHeader />
              </NavItem>

              <NavDropdown title="Management" id="basic-nav-dropdown">
                <NavItem>
                  <NavDropdown.Item
                    onClick={() => handleLogout()}
                    className='dropdown-item'>Logout
                  </NavDropdown.Item>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/users"
                    className='dropdown-item'>Manage User</NavLink>
                </NavItem>

              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </header>
  );

}

export default Header