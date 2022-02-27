import React from 'react';
import AppContext from '../lib/app-context';

const styles = {

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
    // const { action } = this.props;
    // const { workoutTemplate, workout } = this.state;
    // const { selectTemplate, createDay, renderDays } = this;

    // const submitButtonText = action === 'create-workout'
    //   ? 'Finished'
    //   : 'Update';

    // const templateOptions = templates.map(template => {
    //   return (
    //     <option key={template.value} value={template.value}>{template.label}</option>)
    //   ;
    // });

    // const workoutDays = workout.map(day => {
    //   return (
    //     <div key={day.day}>
    //       {renderDays(day)}
    //     </div>
    //   );
    // });

    return (
      <div className='widget-container'>
        <header className='text-center' style={styles.title}>
         <h1>helllooo</h1>
        </header>
        <div>
          <div >
          </div>
        </div>
      </div>
    );
  }
}

WorkoutDay.contextType = AppContext;
