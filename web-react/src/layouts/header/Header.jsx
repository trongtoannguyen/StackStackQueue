import Container from 'react-bootstrap/Container';
import { Nav, Navbar, NavItem, NavDropdown } from 'react-bootstrap';


import logoApp from './../../assets/react.svg';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import SearchFormHeader from '../../components/search/SearchFormHeader';
import { handleLogoutRedux } from '../../redux/actions/userAction';

import { toast } from 'react-toastify';


function Header() {

  const account = useSelector(state => state.user.account);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleLogout = () => {
    dispatch(handleLogoutRedux());
    navigate("/"); // redirect to Home
    toast.success("Log out successfully!");
  }

  return (
    <Navbar expand="lg" className="col-12 bg-body-tertiary header-container fixed-top">
      <Container className='navbar-header bg-light'>
        <Navbar.Brand href="/" className='navbar-brand justify-align-items-md-center'>
          <img
            src={logoApp}
            width="30" height="30"
            className="d-inline-block align-top" alt="logo" />
          <span className='text-dark'>Tech-Forum</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="me-auto">
            <NavItem className='text-lg-center'>
              <NavLink tag={Link} to="/forums" className='nav-link'>
                <i className="fa-solid fa-list fa-xl"></i>{" "}
                <span className='nav-item-title'>Forums</span>
              </NavLink>
            </NavItem>
            <NavItem className='text-lg-center'>
              <NavLink tag={Link} to="/" className='nav-link'>Other</NavLink>
            </NavItem>
            <NavItem className='text-lg-center'>
              <NavLink tag={Link} to="/members" className='nav-link'>
                <i className="fa-solid fa-users fa-xl"></i>{" "}
                <span className='nav-item-title'>Members</span>
              </NavLink>
            </NavItem>
            <NavItem className='text-lg-center'>
              <NavLink tag={Link} to="/register" className='nav-link'>
                <i className="fa-solid fa-user-plus"></i>{" "}
                <span className='nav-item-title'>Register</span>
              </NavLink>
            </NavItem>
            <NavItem className='text-lg-center'>
              <NavLink tag={Link} to="/login" className='nav-link'>
                <i className="fa-solid fa-right-to-bracket fa-xl"></i>{" "}
                <span className='nav-item-title'>Login</span>
              </NavLink>
            </NavItem>
          </Nav>

          <Nav className="right-side align-items-center text-sm-start">
            <SearchFormHeader />
            { account?.auth===true &&
              <NavDropdown title={account.email} id="basic-nav-dropdown" className='justify-content-start'>
                <NavDropdown.Item
                  onClick={() => handleLogout()}
                  className='dropdown-item'>
                  <i className="fa-solid fa-right-from-bracket"></i>{" "}
                  Logout
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='/user-profile'>Profile</NavDropdown.Item>
                <NavDropdown.Divider />

                <NavDropdown.Item href='/admin'>Dashboard</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='/admin/users'>Manage users</NavDropdown.Item>

              </NavDropdown>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

}

export default Header