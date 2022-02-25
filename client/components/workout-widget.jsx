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
    padding: '10px',
    width: '100%',
    height: '50px'
  },
  cardContent: {
    fontSize: '30px',
    fontWeight: 'bold'
  },
  container: {
    paddingTop: '20px'
  }
};

export default class WorkoutWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    window.location.hash = 'create-workout';
  }

  render() {
    const { handleClick } = this;
    const { maxes } = this.context;
    return (
      <div className='widget-container-secondary' style={styles.container}>
        <div >
          <div>
            <header className='text-center' style={styles.title}>
              Workout
            </header>
            <div className='row justify-between text-center'>
              <div className='row widget-button align-center' style={styles.card} onClick={handleClick}>
                <h5>Create Workout</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

WorkoutWidget.contextType = AppContext;
