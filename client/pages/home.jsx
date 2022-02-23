import React from 'react';
// import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

// const styles = {
//   gifContainer: {
//     width: '100%',
//     height: '100%',
//     paddingBottom: '75%',
//     position: 'relative'
//   },
//   gif: {
//     position: 'absolute'
//   }
// };

export default class Home extends React.Component {
  render() {
    // if (!this.context.user) return <Redirect to="log-in" />;

    return (
      <div>
        <h1>Main Page</h1>
      </div>
    );
  }
}

Home.contextType = AppContext;
