import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import ProfileForm from '../components/profile-form';

const styles = {
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  }
};
export default class Profile extends React.Component {
  render() {
    // if (!this.context.user) return <Redirect to="log-in" />;
    const { user, route, testUser } = this.context;

    console.log(testUser);

    // const titleMessage = 'Workout Journal';
    const titleMessage = route.path === 'create-profile'
      ? 'Create Profile'
      : 'Profile';

    return (
      <div className='widget-container'>
        <header className='text-center' style={styles.title}>
          {titleMessage}
        </header>
        <div>
          <div >
            <div>
              <ProfileForm
                key={route.path}
                action={route.path}
                userData={testUser}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.contextType = AppContext;
