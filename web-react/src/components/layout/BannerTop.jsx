import { NavLink, Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';

const BannerTop = (props) => {
  const { bannerName, breadcrumbs } = props;
  // Rest of the component code...
  BannerTop.propTypes = {
    bannerName: PropTypes.string.isRequired,
    breadcrumbs: PropTypes.array.isRequired,
  };

  return (
    <div className="banner-top-container">
      {breadcrumbs && breadcrumbs.length > 0 &&
        <Nav className="col-12 container" aria-label='breadcrumb'>
          <ol className='breadcrumb'>

            <li className="breadcrumb-item">
              <NavLink tag={Link} to="/" className='nav-link'>
                <i className="fa-solid fa-house"></i>
              </NavLink>
            </li>

            {breadcrumbs?.map((item) => {
              return (
                <li key={item.id} className="breadcrumb-item">
                  <NavLink tag={Link} to={item.link} className='nav-link'>
                    {item.name}
                  </NavLink>
                </li>
              )
            })}
          </ol>
        </Nav>
      }

      <span className="banner-page-item col-12">
        <div className="title-page">
          <h3>{bannerName}</h3>
        </div>
      </span>
    </div>
  );
}

export default BannerTop;