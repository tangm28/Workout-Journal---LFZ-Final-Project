import React from 'react';
import AppContext from '../lib/app-context';

const styles = {
  navbar: {
    backgroundColor: '#1bc270',
    height: '50px'
  },
  barMenu: {
    fontSize: '25px'
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold'
  }
};

export default class Navbar extends React.Component {
  renderNavbar() {
    if (this.context.route.path === '') {
      return (
        <div className=''>
          <div className='row nav-container align-center'>
            <i className="fas fa-bars" style={styles.barMenu}></i>
            <span className='nav-center' style={styles.title}>Home</span>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <nav style={styles.navbar}>
        {this.renderNavbar()}
      </nav>
    );
  }
}

Navbar.contextType = AppContext;
