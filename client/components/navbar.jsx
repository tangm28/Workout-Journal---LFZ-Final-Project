import React from 'react';
import AppContext from '../lib/app-context';

const styles = {
  navbar: {
    backgroundColor: '#1bc270',
    height: '50px'
  },
  iconSize: {
    fontSize: '25px'
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold'
  },
  container: {
    position: 'relative',
    height: '50px'
  }
};

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.renderNavbar = this.renderNavbar.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  renderNavbar() {
    if (this.context.route.path === '') {
      return (
        <div className='row nav-container align-center' style={styles.container}>
          <div className='' >
            <i className="fas fa-bars" style={styles.barMenu}></i>
            <span className='nav-center' style={styles.title}>Home</span>
          </div>
        </div>
      );
    }
    if (this.context.route.path === 'update-maxes') {
      return (
        <div className='' style={styles.container}>
          <div className='row nav-container align-center justify-between'>
            <div className=''>
              <i className="fas fa-arrow-left" style={styles.iconSize} onClick={this.handleClick}></i>
            </div>
            <div className=''>
              <i className="fas fa-chart-bar" style={styles.iconSize}></i>
            </div>
          </div>
          </div>
      );
    }
    if (this.context.route.path === 'create-workout') {
      return (
        <div className='' style={styles.container}>
          <div className='row nav-container align-center justify-between'>
            <div className=''>
              <i className="fas fa-arrow-left" style={styles.iconSize} onClick={this.handleClick}></i>
            </div>
          </div>
        </div>
      );
    }
  }

  handleClick(event) {
    window.location.hash = '#';
  }

  render() {
    const { renderNavbar } = this;
    return (
      <nav style={styles.navbar}>
        {renderNavbar()}
      </nav>
    );
  }
}

Navbar.contextType = AppContext;
