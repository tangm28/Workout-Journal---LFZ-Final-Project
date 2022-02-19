import React from 'react';
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
    const { user, route } = this.context;

    // console.log(route);

    // const titleMessage = 'Workout Journal';
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
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.contextType = AppContext;
