import React from 'react';

const styles = {
  deleteIcon: {
    color: 'white'
  },
  deleteIconContainer: {
    height: '20px',
    width: '20px',
    borderRadius: '50%',
    backgroundColor: 'red',
    marginBottom: '5px'
  },
  input: {
    backgroundColor: '#2f2f2f',
    border: 'none',
    color: 'white',
    fontFamily: 'Quicksand, sans-serif',
    paddingLeft: '10px',
    lineHeight: '1.3rem',
    width: '200px'
  },
  inputContainer: {
    borderBottom: '#8f8f8f solid 1px',
    padding: '10px 0 5px'
  },
  title: {
    fontSize: '20px'
  },
  container: {
    paddingTop: '10px'
  },
  clearButton: {
    backgroundColor: '#8f8f8f'
  }
};

// background - color: #2f2f2f;
// border: #8f8f8f solid 1px;
// border - radius: 5px;
// color: white;
// font - family: Quicksand, sans - serif;
// font - size: 15px;
// font - weight: 500;
// height: 50px;
// padding - left: 7px;

export default class WorkoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempWorkout: [
        {
          day1: 'Day 1',
          exercise: [
            { exerciseID: 1, name: '' }
          ]
        },
        {
          day2: 'Day 2',
          exercise: [
            { exerciseID: 1, name: '' }
          ]
        }
      ],
      day: ['Day 1', 'Day 2'],
      workout: [
        { exerciseID: 1, name: '' }
      ],
      nextExerciseID: 2,
      userId: this.props.userData
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(event) {
    if (event.target.textContent === 'Add') {
      const { workout } = this.state;
      const updatedWorkout = workout.slice(0);
      updatedWorkout.push({ exerciseID: this.state.nextExerciseID, name: '' });
      this.setState({ workout: updatedWorkout, nextExerciseID: this.state.nextExerciseID + 1 });
    }
  }

  handleChange(event) {
    const { workout } = this.state;
    const indexOfChange = workout.findIndex(x => x.exerciseID === Number(event.target.id));
    const updatedWorkout = workout.slice(0);
    updatedWorkout[indexOfChange].name = event.target.value;
    this.setState({ workout: updatedWorkout });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { action } = this.props;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch(`/api/account/${action}`, req)
      .then(res => res.json())
      .then(result => {
        if (action === 'create-profile') {
          window.location.hash = 'create-maxes';
        }

      });
  }

  renderExerciseEntry(value, id) {
    const uniqueId = id;
    return (
      <div className='row align-center justify-between' style={styles.inputContainer}>
        <div>
          <input
            required
            id={uniqueId}
            type="text"
            name={uniqueId}
            value={value}
            style={styles.input}
            className='exercise-input'
            onChange={this.handleChange}
            placeholder='Input exercise here' />
        </div>
        <div>
          <div className='row justify-center align-center' style={styles.deleteIconContainer}>
            <i className="fas fa-minus" style={styles.deleteIcon}></i>
          </div>
        </div>
      </div>
    );
  }

  renderExerciseDay(uniqueId, day) {
    const renderExerciseEntry = this.state.workout.map(workout => {
      return (
        <div key={workout.exerciseID} onChange={this.handleChange}>
          {this.renderExerciseEntry(workout.name, workout.exerciseID)}
        </div>
      );
    });

    return (
      <div className='container-secondary m-top20'>
        <div className="row justify-center align-center">
          <input
            autoFocus
            id={uniqueId}
            type="text"
            name={uniqueId}
            placeholder={day}
            className="input-secondary text-center"
            style={styles.title} />
        </div>
        <div className="m-top20">
          <label htmlFor="Exercise" className="form-label">
            Exercise:
          </label>
          {renderExerciseEntry}
        </div>
        <div className='row justify-center'>
          <button type="button" className="btn-form-small" onClick={this.handleClick}>
            Add
          </button>
          <button type="button" className="btn-form-small" style={styles.clearButton}>
            Clear
          </button>
        </div>
      </div>
    );
  }

  render() {
    const {
      userHeightUnit, userWeightUnit
    } = this.state;
    const { action, workoutInfo } = this.props;
    const { handleChange, handleSubmit, handleClick } = this;
    const submitButtonText = action === 'create-workout'
      ? 'Finished'
      : 'Update';
    // console.log(workoutInfo.numberOfWorkoutDays);
    // if (workoutInfo.numberOfWorkoutDays > 2) {
    //   con
    // }
    // const renderExerciseEntry = this.state.workout.map(workout => {
    //   return (
    //     <div key={workout.exerciseID} onChange={handleChange}>
    //       {this.renderExerciseEntry(workout.name, workout.exerciseID)}
    //     </div>
    //   );
    // });
    const renderExerciseDay = this.state.day.map(day => {
      const uniqueId = this.state.day.indexOf(day);
      return (
        <div key={uniqueId}>
          {this.renderExerciseDay(uniqueId, day)}
        </div>
      );
    });

    console.log(this.state);

    return (
      <form className="" onSubmit={handleSubmit}>
        {renderExerciseDay}
        {/* {this.renderExerciseDay()} */}
        {/* <div className='container-secondary'>
          <div className="row justify-center align-center">
            <input
              autoFocus
              id="workout"
              type="text"
              name="workout"
              placeholder='Day 1'
              className="input-secondary text-center"
              style={styles.title} />
          </div>
          <div className="m-top20">
            <label htmlFor="Exercise" className="form-label">
              Exercise:
            </label>
            {renderExerciseEntry}
          </div>
          <div className='row justify-center'>
            <button type="button" className="btn-form-small" onClick={handleClick}>
              Add
            </button>
            <button type="button" className="btn-form-small" style={styles.clearButton}>
              Clear
            </button>
          </div>
        </div> */}
        <div className='row justify-center'>
          <button type="submit" className="btn-form">
            {submitButtonText}
          </button>
        </div>
      </form>
    );
  }
}
