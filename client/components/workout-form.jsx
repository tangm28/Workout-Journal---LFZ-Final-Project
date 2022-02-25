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
          day: 1,
          name: 'Day 1',
          exercise: [
            { exerciseId: 10001, name: '' }
          ],
          nextExerciseId: 10002
        },
        {
          day: 2,
          name: 'Day 2',
          exercise: [
            { exerciseId: 20001, name: '' }
          ],
          nextExerciseId: 20002
        }
      ],
      day: ['Day 1', 'Day 2'],
      workout: [
        { exerciseId: 1, name: '' }
      ],
      // nextExerciseId: 2,
      userId: this.props.userData
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(event) {
    if (event.target.textContent === 'Add') {
      console.log(event.target.parentElement.parentElement.id);
      const dayOfChange = Number(event.target.parentElement.parentElement.id[3]) - 1;
      const { tempWorkout } = this.state;
      // console.log(tempWorkout[dayOfChange].nextExerciseId);
      const nextId = tempWorkout[dayOfChange].nextExerciseId;
      const updatedWorkout = tempWorkout.slice(0);
      console.log(nextId);
      // console.log(updatedWorkout[dayOfChange].exercise);
      // const newExercise = {}
      updatedWorkout[dayOfChange].exercise.push({ exerciseId: nextId, name: '' });
      updatedWorkout[dayOfChange].nextExerciseId++;
      console.log(updatedWorkout);
      // updatedWorkout.push({ exerciseId: this.state.nextExerciseId, name: '' });
      this.setState({ tempWorkout: updatedWorkout });
    }
  }

  handleChange(event) {
    const { tempWorkout } = this.state;
    // console.log(event.target.value);
    const dayOfChange = Number(event.target.id[0]) - 1;
    let indexOfChange = -1;
    for (let i = 0; i < tempWorkout.length; i++) {
      if (indexOfChange < 0) {
        indexOfChange = tempWorkout[i].exercise.findIndex(x => x.exerciseId === Number(event.target.id));
      }
    }

    // const { workout } = this.state;
    // const indexOfChange = workout.findIndex(x => x.exerciseId === Number(event.target.id));
    const updatedWorkout = tempWorkout.slice(0);
    // console.log(updatedWorkout[dayOfChange].exercise[indexOfChange].name);
    updatedWorkout[dayOfChange].exercise[indexOfChange].name = event.target.value;
    // updatedWorkout[indexOfChange].name = event.target.value;
    this.setState({ tempWorkout: updatedWorkout });
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

  renderExerciseEntry(value, id, day) {
    return (
      // console.log(id, day)
      <div className='row align-center justify-between' style={styles.inputContainer}>
        <div>
          <input
            required
            id={id}
            type="text"
            name={id}
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
    // console.log(day.day);
    const renderExerciseEntry = this.state.tempWorkout.map(workout => {
      // console.log(workout.exercise.map(exercises => {
      //   console.log(exercises);
      // }));
      return workout.exercise.map(exercises => {
        // console.log(Number((exercises.exerciseId + '')[0]));
        // console.log(workout.day);

        if (workout.day === day.day) {
          // console.log(exercises.exerciseId);
          // console.log(workout.day);
          return (
            <div key={exercises.exerciseId} onChange={this.handleChange}>
              {this.renderExerciseEntry(exercises.name, exercises.exerciseId, workout.day)}
            </div>
          );
        }

        // console.log(exercises);
      //   {
      //           // <div key={workout.exercise.exerciseId} onChange={this.handleChange}>
      // //   {this.renderExerciseEntry(workout.exercise.name, workout.exercise.exerciseId)}
      // // </div>
      //   }
      })
      // <div key={workout.exercise.exerciseId} onChange={this.handleChange}>
      //   {this.renderExerciseEntry(workout.exercise.name, workout.exercise.exerciseId)}
      // </div>
      ;
    });
    // const renderExerciseEntry = this.state.workout.map(workout => {
    //   return (
    //     <div key={workout.exerciseId} onChange={this.handleChange}>
    //       {this.renderExerciseEntry(workout.name, workout.exerciseId)}
    //     </div>
    //   );
    // });
    // console.log('day' + day.day);
    const dayId = 'day' + day.day;
    return (
      <div id={dayId} className='container-secondary m-top20'>
        <div className="row justify-center align-center">
          <input
            autoFocus
            id={uniqueId}
            type="text"
            name={uniqueId}
            placeholder={day.name}
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
    //     <div key={workout.exerciseId} onChange={handleChange}>
    //       {this.renderExerciseEntry(workout.name, workout.exerciseId)}
    //     </div>
    //   );
    // });
    // const renderExerciseDay = this.state.day.map(day => {
    //   const uniqueId = this.state.day.indexOf(day);
    //   return (
    //     <div key={uniqueId}>
    //       {this.renderExerciseDay(uniqueId, day)}
    //     </div>
    //   );
    // });
    const renderExerciseDay = this.state.tempWorkout.map(day => {
      const uniqueId = this.state.tempWorkout.indexOf(day);
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
