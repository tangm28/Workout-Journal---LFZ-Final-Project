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
    const titleMessage = 'Workout Journal';

    return (
      <div className='container'>
        <div >
          <div >
            <header className='text-center' style={styles.title}>
              {titleMessage}
            </header>
            <div>
              <AuthForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.contextType = AppContext;
