import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';
import './NavBar.css'

const NavBar = ({ user, profile, logoutUser, clearCurrentProfile }) => {
  const onLogoutClick = () => {
    clearCurrentProfile();
    logoutUser();
  };
  return (
    <div className='main-wrapper'>
      <div className='header myheader'>
        <div className='header-left'>
          <Link to='/dashboard' className='logo'>
            <img src='assets/img/logo.png' width='35' height='35' alt='' />
            <span>Preclinic</span>
          </Link>
        </div>
        <Link id='toggle_btn' to='javascript:void(0);'>
          <i className='fa fa-bars'></i>
        </Link>
        <a id='mobile_btn' className='mobile_btn float-left' href='#sidebar'>
          <i className='fa fa-bars'></i>
        </a>
        <ul className='nav user-menu float-right'>
          <li className='nav-item dropdown has-arrow'>
            <a
              href=' '
              className='dropdown-toggle nav-link user-link'
              data-toggle='dropdown'>
              <span className='user-img'>
                <img
                  className='rounded-circle'
                  src={profile ? `/${profile.profilephoto}` : '/default.jpg'}
                  width='24'
                  alt='Admin'
                />
                <span className='status online'></span>
              </span>
              <span> {user.name} </span>
            </a>
            <div className='dropdown-menu'>
              <Link className='dropdown-item' to='/dashboard/profile'>
                My Profile
              </Link>
              <Link className='dropdown-item' to='/dashboard/editprofile'>
                Edit Profile
              </Link>

              <Link to='/' onClick={() => onLogoutClick()} className='dropdown-item'>
                Logout
              </Link>
            </div>
          </li>
        </ul>
      </div>
      <div className='sidebar mysidebar' id='sidebar'>
        <div className='sidebar-inner slimscroll'>
          <div id='sidebar-menu' className='sidebar-menu'>
            <ul>
              <li className='menu-title'>Main</li>
              <li className='active'>
                <Link to='/dashboard/profile'>
                  <i className='fa fa-dashboard'></i> <span className="sidebarmenu">Dashboard</span>
                </Link>
              </li>

              <li className='submenu'>
                <Link to='/dashboard/patients'>
                  <i className='fa fa-wheelchair'></i> <span className="sidebarmenu"> Patients </span>
                  {/* <span className="menu-arrow"></span> */}
                </Link>
                <ul style={{ display: 'none' }}>
                  <li>
                    <Link to='/dashboard/patients'>Patient List</Link>
                  </li>
                  <li>
                    <Link to='/dashboard/Addpatient'>Add Patient</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to='/dashboard/Rendezvous'>
                  <i className='fa fa-calendar'></i> <span className="sidebarmenu">Appointments</span>
                </Link>
              </li>
              <li className='submenu'>
                <Link to='#'>
                  <i className='fa fa-envelope'></i> <span className="sidebarmenu"> Email</span>{' '}
                  <span className='menu-arrow'></span>
                </Link>
                <ul style={{ display: 'none' }}>
                  <li>
                    <Link to='compose.html'>Compose Mail</Link>
                  </li>
                  <li>
                    <Link to='inbox.html'>Inbox</Link>
                  </li>
                  <li>
                    <Link to='mail-view.html'>Mail View</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to='calendar.html'>
                  <i className='fa fa-calendar'></i> <span className="sidebarmenu">Calendar</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapState = state => ({
  profile: state.profile.profile,
});

export default connect(mapState, { logoutUser, clearCurrentProfile })(NavBar);
