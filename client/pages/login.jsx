import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import AuthForm from '../components/auth-form';

const styles = {
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  }
};
export default class Login extends React.Component {
  render() {
    const { user, route, handleRegister, handleSignIn } = this.context;

    if (user) return <Redirect to="" />;

    const titleMessage = route.path === 'log-in'
      ? 'Workout Journal'
      : 'Register';

    return (
      <div className='container'>
        <div >
          <div >
            <header className='text-center' style={styles.title}>
              {titleMessage}
            </header>
            <div>
              <AuthForm
                key={route.path}
                action={route.path}
                onSignIn={handleSignIn}
                onRegister={handleRegister}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.contextType = AppContext;
