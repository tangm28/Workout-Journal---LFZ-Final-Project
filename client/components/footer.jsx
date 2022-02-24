import React from 'react';
import AppContext from '../lib/app-context';

const styles = {
  footer: {
    backgroundColor: '#1bc270'
  }
};

export default class Footer extends React.Component {
  renderFooter() {
    if (this.context.route.path === '') {
      return (
        <>
        </>
      );
    }
  }

  render() {
    return (
      <footer style={styles.footer}>
        {this.renderFooter()}
      </footer>
    );
  }
}

Footer.contextType = AppContext;
