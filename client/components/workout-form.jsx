import React from 'react';
import AppContext from '../lib/app-context';

const styles = {
  deleteIcon: {
    color: 'white'
  },
  deleteIconContainer: {
    padding: '5px',
    borderRadius: '50%',
    backgroundColor: 'red',
    marginBottom: '3px',
    fontSize: 'x-small'
  },
  addIconContainer: {
    borderRadius: '50%',
    backgroundColor: '#2f2f2f',
    marginTop: '20px',
    padding: '10px'
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
  },
  headerTitle: {
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
  }
};

const templates = [
  { label: 'Create Your Own', value: 'createOwn' },
  { label: 'NSUNS 5/3/1', value: 'nsuns' },
  { label: 'Stronglifts', value: 'stronglifts' },
  { label: 'PPL', value: 'ppl' }
];

export default class WorkoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutTemplate: 'createOwn',
      workout: [

      ]
    };
    this.createDay = this.createDay.bind(this);
    this.selectTemplate = this.selectTemplate.bind(this);
    this.renderDays = this.renderDays.bind(this);
    this.renderExerciseEntry = this.renderExerciseEntry.bind(this);
    this.deleteDay = this.deleteDay.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateExercises = this.updateExercises.bind(this);
    this.addExercise = this.addExercise.bind(this);
    this.deleteExercise = this.deleteExercise.bind(this);
    this.clearExercise = this.clearExercise.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  deleteDay(event) {
    const { workout } = this.state;
    if (workout.length > 1) {
      const dayOfChange = Number(event.target.parentElement.parentElement.id[3] - 1);
      let tempWorkout = workout.slice(0);
      const updateWorkout = tempWorkout.splice(0, dayOfChange);
      const changeWorkout = tempWorkout.splice(1);
      for (let i = 0; i < changeWorkout.length; i++) {
        for (let j = 0; j < changeWorkout[i].exercise.length; j++) {
          changeWorkout[i].exercise[j] = {
            exerciseId: changeWorkout[i].exercise[j].exerciseId - 10000,
            name: changeWorkout[i].exercise[j].name
          };
        }
        changeWorkout[i] = {
          day: changeWorkout[i].day - 1,
          exercise: changeWorkout[i].exercise,
          name: changeWorkout[i].name,
          nextExerciseId: changeWorkout[i].nextExerciseId - 10000
        };
      }
      tempWorkout = updateWorkout.concat(changeWorkout);
      this.setState({ workout: tempWorkout });
    }
  }

  updateTitle(event) {
    const { workout } = this.state;
    const dayOfChange = Number(event.target.id[0]) - 1;
    const updatedWorkout = workout.slice(0);
    updatedWorkout[dayOfChange].name = event.target.value;
    this.setState({ workout: updatedWorkout });
  }

  updateExercises(event) {
    const { workout } = this.state;
    const dayOfChange = Number(event.target.id[0]) - 1;
    let indexOfChange = -1;
    for (let i = 0; i < workout.length; i++) {
      if (indexOfChange < 0) {
        indexOfChange = workout[i].exercise.findIndex(x => x.exerciseId === Number(event.target.id));
      }
    }
    const updatedWorkout = workout.slice(0);
    updatedWorkout[dayOfChange].exercise[indexOfChange].name = event.target.value;
    this.setState({ workout: updatedWorkout });
  }

  addExercise(event) {
    if (event.target.textContent === 'Add') {
      const dayOfChange = Number(event.target.parentElement.parentElement.id[3]) - 1;
      const { workout } = this.state;
      const nextId = workout[dayOfChange].nextExerciseId;
      const updatedWorkout = workout.slice(0);
      updatedWorkout[dayOfChange].exercise.push({ exerciseId: nextId, name: '' });
      updatedWorkout[dayOfChange].nextExerciseId++;
      this.setState({ workout: updatedWorkout });
    }
  }

  deleteExercise(event) {
    if (event.target.className === 'fas fa-minus') {
      const { workout } = this.state;
      const dayOfChange = Number(event.target.parentElement.parentElement.parentElement.id[8] - 1);
      const deleteId = Number(event.target.parentElement.parentElement.parentElement.id.substring(8));
      let nextId = deleteId;
      const deleteIndex = workout[dayOfChange].exercise.findIndex(exercise => exercise.exerciseId === deleteId);
      const tempWorkout = workout.slice(0);
      const updateWorkout = tempWorkout[dayOfChange].exercise.splice(0, deleteIndex);
      const changeWorkout = tempWorkout[dayOfChange].exercise.splice(1);
      if (updateWorkout.length === 0 && changeWorkout.length === 0) {
        tempWorkout[dayOfChange].exercise = [{ exerciseId: nextId, name: '' }];
        tempWorkout[dayOfChange].nextExerciseId = nextId + 1;
      } else {
        for (let i = 0; i < changeWorkout.length; i++) {
          updateWorkout.push({ exerciseId: nextId, name: changeWorkout[i].name });
          nextId++;
        }

        tempWorkout[dayOfChange].exercise = updateWorkout;
        tempWorkout[dayOfChange].nextExerciseId = nextId;
      }
      this.setState({ workout: tempWorkout });
    }
  }

  clearExercise(event) {
    if (event.target.textContent === 'Clear') {
      const dayOfChange = Number(event.target.parentElement.parentElement.id[3]) - 1;
      const { workout } = this.state;
      const resetId = ((dayOfChange + 1) * 10000) + 1;
      const updatedWorkout = workout.slice(0);
      updatedWorkout[dayOfChange].exercise = [{ exerciseId: resetId, name: '' }];
      updatedWorkout[dayOfChange].nextExerciseId = resetId + 1;
      this.setState({ workout: updatedWorkout });
    }
  }

  selectTemplate(event) {
    this.setState({ workoutTemplate: event.target.value });
  }

  createDay() {
    const { workout } = this.state;
    const day = workout.length + 1;
    const newWorkout = workout.slice(0);
    const updateWorkout = newWorkout.concat({
      day: day,
      name: '',
      exercise: [
        { exerciseId: (day * 10000) + 1, name: '' }
      ],
      nextExerciseId: (day * 10000) + 2
    });
    this.setState({ workout: updateWorkout });
  }

  renderDays(day) {
    const renderExerciseEntry = day.exercise.map(workout => {
      return (
        <div key={workout.exerciseId}>
          {this.renderExerciseEntry(workout, day.nextExerciseId)}
       </div>
      );
    });

    const dayId = 'day' + day.day;
    const tempPlaceholder = 'Day ' + day.day;
    const uniqueId = day.day;
    return (
    <div id={dayId} className='container-tertiary m-top20'>
      <div className='row justify-end'>
        <i className="fas fa-times" onClick={this.deleteDay}></i>
      </div>
      <div className="row justify-center align-center" style={styles.container}>
        <input
          autoFocus
          id={uniqueId}
          type="text"
          name={uniqueId}
            placeholder={tempPlaceholder}
          value={this.state.workout[uniqueId - 1].name}
          onChange={this.updateTitle}
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
        <button type="button" className="btn-form-small" onClick={this.addExercise}>
          Add
        </button>
        <button type="button" className="btn-form-small" onClick={this.clearExercise} style={styles.clearButton}>
          Clear
        </button>
      </div>
    </div>
    );
  }

  renderExerciseEntry(workout) {
    const containerId = 'exercise' + workout.exerciseId;
    return (
      <div id={containerId} className='row align-center justify-between' style={styles.inputContainer}>
        <div>
          <input
            required
            id={workout.exerciseId}
            type="text"
            name={workout.exerciseId}
            value={workout.name}
            style={styles.input}
            className='exercise-input'
            onChange={this.updateExercises}
            placeholder='Input exercise here' />
        </div>
        <div>
          <div className='row justify-center align-center' onClick={this.deleteExercise} style={styles.deleteIconContainer}>
            <i className="fas fa-minus" style={styles.deleteIcon}></i>
          </div>
        </div>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    const { user } = this.context;
    const { workout, workoutTemplate } = this.state;
    const { action } = this.props;
    const reqBody = {
      template: workoutTemplate,
      numOfDays: workout.length,
      userId: user.userId
    };
    if (workout.length > 0) {
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reqBody)
      };
      fetch('/api/workout/create-workout', req)
        .then(res => res.json())
        .then(result => {
          if (workoutTemplate === 'createOwn') {
            for (let i = 0; i < workout.length; i++) {
              const name = workout[i].name === ''
                ? 'empty'
                : workout[i].name;
              const reqBodyDay = {
                workoutName: name,
                templateId: result.templateId
              };
              const reqDay = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqBodyDay)
              };
              fetch('/api/workout/create-your-own', reqDay)
                .then(res => res.json())
                .then(result => {
                  for (let j = 0; j < workout[i].exercise.length; j++) {
                    const reqBodyExercise = {
                      exerciseName: workout[i].exercise[j].name,
                      workoutId: result.workoutId
                    };
                    const reqExercise = {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(reqBodyExercise)
                    };
                    fetch('/api/workout/create-exercise', reqExercise)
                      .then(res => res.json())
                      .then(result => {
                        if (action === 'create-workout') {
                          window.location.hash = 'workout-days';
                          this.props.onCreation();
                        }
                      });
                  }
                });
            }
          }
        });
    }
  }

  render() {
    const { action } = this.props;
    const { workoutTemplate, workout } = this.state;
    const { selectTemplate, createDay, renderDays, handleSubmit } = this;

    const submitButtonText = action === 'create-workout'
      ? 'Finished'
      : 'Update';

    const templateOptions = templates.map(template => {
      return (
        <option key={template.value} value={template.value}>{template.label}</option>)
      ;
    });

    const workoutDays = workout.map(day => {
      return (
        <div key={day.day}>
          {renderDays(day)}
        </div>
      );
    });

    return (
      <div>
        <form action="" onSubmit={handleSubmit}>
          <div style={styles.container}>
            <div className='row justify-between align-center'>
              <label className="form-label">
                Template:
              </label>
              <select name="workoutTemplate" id="workoutTemplate" value={workoutTemplate} onChange={selectTemplate} style={styles.dropdown}>
                {templateOptions}
              </select>
            </div>
            <div>
              {workoutDays}
            </div>
          </div>
          <div className='row justify-center'>
            <div className='row justify-center align-center' style={styles.addIconContainer} onClick={createDay}>
              <i className="fas fa-plus"></i>
            </div>
          </div>
          <div className='row justify-center'>
            <button type="submit" className="btn-form">
              {submitButtonText}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

WorkoutForm.contextType = AppContext;
