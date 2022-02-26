import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import WorkoutForm from '../components/workout-form';

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
  }

  render() {
    const { user, route, tempUser } = this.context;
    if (!tempUser && !user) return <Redirect to="log-in" />;
    const altUser = !tempUser
      ? user
      : tempUser;

    const titleMessage = route.path === 'create-workout'
      ? 'Create Workout'
      : 'Edit Workout';

    return (
      <div className='widget-container'>
        <header className='text-center' style={styles.headerTitle}>
          {titleMessage}
        </header>
        <WorkoutForm
          key={route.path}
          action={route.path}
          userData={altUser} />
      </div>
    );
  }
}

MyWorkout.contextType = AppContext;
