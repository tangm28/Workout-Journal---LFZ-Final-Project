import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import WorkoutForm from '../components/workout-form';

const styles = {
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  dropdown: {
    backgroundColor: '#171717',
    border: '#1BC270 solid 1px',
    borderRadius: '5px',
    color: 'white',
    fontFamily: 'Quicksand, sans-serif',
    fontSize: '15px',
    fontWeight: 500,
    height: '50px',
    paddingLeft: '7px'
  },
  label: {
    width: '150px',
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '5px 0'
  },
  container: {
    margin: '25px 15px'
  }
};

export default class MyWorkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfWorkoutDays: 2,
      workoutTemplate: 'createOwn'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { user, route, tempUser, handleFullModal, handleProfileCreation, handleMaxUpdate } = this.context;
    const { handleChange } = this;
    if (!tempUser && !user) return <Redirect to="log-in" />;
    const altUser = !tempUser
      ? user
      : tempUser;

    const titleMessage = route.path === 'create-workout'
      ? 'Create Workout'
      : 'Edit Workout';

    console.log(this.state);
    return (
      <div className='widget-container'>
        <header className='text-center' style={styles.title}>
          {titleMessage}
        </header>
        <div style={styles.container}>
          <div className='row justify-between align-center'>
            <label htmlFor="numberOfWorkoutDays" className="" style={styles.label}>
              Number of days:
            </label>
            <select name="numberOfWorkoutDays" id="numberOfWorkoutDays" onChange={handleChange} style={styles.dropdown}>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
          </div>
          <div className='row justify-between align-center m-top20'>
            <label htmlFor="workoutTemplate" className="form-label">
              Template:
            </label>
            <select name="workoutTemplate" id="workoutTemplate" onChange={handleChange} style={styles.dropdown}>
              <option value="createOwn">Create Your Own</option>
              <option value="nsuns">NSUNS</option>
              <option value="stronglifts">StrongLifts</option>
              <option value="ppl">PPL</option>
            </select>
          </div>
        </div>
        <div>
          <div >
            <div>
              <WorkoutForm
                key={route.path}
                action={route.path}
                openModal={handleFullModal}
                userData={altUser}
                onRegister={handleProfileCreation}
                onUpdate={handleMaxUpdate}
                workoutInfo={this.state}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MyWorkout.contextType = AppContext;
