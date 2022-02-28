import React from 'react';
import AppContext from '../lib/app-context';

const styles = {
  dayContainer: {
    fontSize: '15px',
    fontWeight: 'bold'
  }
};

export default class WorkoutDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutTemplate: 'createOwn',
      workout: [

      ]
    };

  }

  render() {
    const { workout } = this.context;
    console.log(workout);
    const renderDays = workout.map((day, index) => {

      const dayName = day.workoutName === ''
        ? 'Day ' + (index + 1)
        : day.workoutName;
      console.log(dayName);
      return (
        <div className='container-day m-top20' key={day.workoutName}>
          <div >
            <span style={styles.dayContainer}>{dayName}</span>
          </div>
        </div>
      );
    });

    return (
      <div >
        {renderDays}
        <div className='row justify-center'>
          <button type="button" className="btn-form">
            Week Finished
          </button>
        </div>
      </div>
    );
  }
}

WorkoutDay.contextType = AppContext;
