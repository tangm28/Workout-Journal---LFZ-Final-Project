import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import WorkoutForm from '../components/workout-form';
import WorkoutDays from '../components/workout-days';

const styles = {
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold'
  }
};

export default class MyWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.renderPage = this.renderPage.bind(this);
  }

  renderPage() {
    const { user, route, tempUser, handleCreation } = this.context;
    const altUser = !tempUser
      ? user
      : tempUser;
    if (route.path === 'create-workout' || route === 'update-workout') {
      return <WorkoutForm
        key={route.path}
        action={route.path}
        userData={altUser}
        onCreation={handleCreation} />;
    }
    if (route.path === 'workout-days') {
      return <WorkoutDays
        key={route.path}
        action={route.path}
        userData={altUser} />;
    }
  }

  render() {
    const { user, route, tempUser } = this.context;
    const { renderPage } = this;
    if (!tempUser && !user) return <Redirect to="log-in" />;

    // const altUser = !tempUser
    //   ? user
    //   : tempUser;

    let titleMessage = route.path === 'create-workout'
      ? 'Create Workout'
      : 'Edit Workout';

    titleMessage = route.path === 'workout-days'
      ? 'My Workout'
      : 'Edit Workout';

    return (
      <div className='widget-container'>
        <header className='text-center' style={styles.headerTitle}>
          {titleMessage}
        </header>
        {renderPage()}
      </div>
    );
  }
}

MyWorkout.contextType = AppContext;
