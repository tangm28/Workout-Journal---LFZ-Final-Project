import React from 'react';
import AppContext from '../lib/app-context';

export default class Login extends React.Component {
  renderHeader() {
    if (this.context.route.path === '') {
      return (
        <>
          <h1>Hello World!!!!</h1>
        </>
      );
    }
  }

  render() {
    console.log(this.context.route.path);
    // if (!this.context.user) return <Redirect to="sign-in" />;

    return (
      <div>
        {this.renderHeader()}
      </div>
    );
  }
}

// export default function Login(props) {
//   return (
//     <div>
//       <h1>Hello World</h1>
//     </div>
//   );
// }

Login.contextType = AppContext;
