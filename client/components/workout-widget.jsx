import React from 'react';
import AppContext from '../lib/app-context';

const styles = {
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '20px'
  },
  card: {
    backgroundColor: '#2F2F2F',
    borderRadius: '10px',
    padding: '5px 10px',
    width: '100%'
  },
  createButton: {
    backgroundColor: '#2F2F2F',
    borderRadius: '10px',
    padding: '20px',
    width: '100%'
  },
  cardContainer: {
    backgroundColor: '#2f2f2f',
    borderRadius: '10px',
    padding: '0 10px 20px'
  },
  container: {
    paddingTop: '20px'
  },
  inputContainer: {
    borderBottom: '#8f8f8f solid 1px',
    padding: '7px 0',
    fontWeight: 'bold'
  },
  inputContainerLast: {
    padding: '7px 0',
    fontWeight: 'bold'
  },
  noMargin: {
    margin: '0 10px'
  },
  buttonContainer: {
    width: '100%'
  },
  carouselArrow: {
    color: '#2cc47a',
    fontSize: '30px'
  },
  carouselDotsSelected: {
    color: '#2cc47a',
    fontSize: '13px',
    padding: '15px 5px 0'
  },
  carouselDots: {
    color: '#2f2f2f',
    fontSize: '13px',
    padding: '15px 5px 0'
  }
};

export default class WorkoutWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDay: 1
    };
    this.handleClick = this.handleClick.bind(this);
    this.renderWorkoutCreated = this.renderWorkoutCreated.bind(this);
    this.renderCreateWorkout = this.renderCreateWorkout.bind(this);
  }

  handleClick(event) {
    window.location.hash = 'create-workout';
  }

  renderDays() {
    // console.log(this.context.workout[0].exercise);
    // const exercises = this.context.workout[0].exercise;
    // const numOfWorkout = this.context.workout[0].exercise.length;
    const days = this.context.workout.map((workout, i) => {
      // console.log(this.context.workout.length);
      // console.log(i);
      return (
        workout.exercise.map((exercise, j) => {
          const isHidden = i + 1 === this.state.currentDay
            ? ''
            : 'hidden';
          console.log(workout.exercise.length);
          console.log('j', j);
          const isLastExercise = j + 1 === workout.exercise.length
            ? styles.inputContainerLast
            : styles.inputContainer;
          return (
            <div className={isHidden} key={exercise.exerciseId}>
              <div className='row align-center justify-between' style={isLastExercise}>
                <p style={styles.noMargin}>{exercise.exerciseName}</p>
              </div>
            </div>
          );
        })
      );
    });

    return days;
  }

  renderWorkoutCreated() {
    console.log(this.context.workout);
    const carouselDots = this.context.workout.map((workout, i) => {
      const daySelected = i + 1 === this.state.currentDay
        ? styles.carouselDotsSelected
        : styles.carouselDots;
      return (
        <i className="fas fa-circle" key={i} style={daySelected}></i>
      );
    });

    return (
      <div>
        <div className="">
          <header className='row align-center justify-between' style={styles.title}>
            <i className="fas fa-chevron-left" style={styles.carouselArrow}></i>
            Day 1
            <i className="fas fa-chevron-right" style={styles.carouselArrow}></i>
          </header>
        </div>
        <div className='row justify-between text-center'>
          <div style={styles.card} onClick={this.handleClick}>
            {this.renderDays()}
          </div>
          <div style={styles.buttonContainer}>
            <div>
              {carouselDots}
            </div>
            <button type="submit" className="btn-form">
              Week Finished
            </button>
          </div>
        </div>
      </div>
    );
  }

  renderCreateWorkout() {
    return (
      <div>
        <div>
          <header className='text-center' style={styles.title}>
            Workout
          </header>
          <div className='row justify-between text-center'>
            <div className='row widget-button align-center' style={styles.createButton} onClick={this.handleClick}>
              <h5>Create Workout</h5>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { handleClick, renderWorkoutCreated, renderCreateWorkout } = this;
    const { workout } = this.context;
    // if (workout.length > 0) {
    //   console.log(workout);
    // }
    const isWorkoutCreated = workout.length > 0
      ? <div>{renderWorkoutCreated()}</div>
      : <div>{renderCreateWorkout()}</div>;
    return (
      <div className='widget-container-secondary' style={styles.container}>
        {isWorkoutCreated}
      </div>
    );
  }
}

WorkoutWidget.contextType = AppContext;
