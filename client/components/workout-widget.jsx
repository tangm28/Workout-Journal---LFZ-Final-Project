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
    padding: '0 20px 10px',
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
    padding: '10px 0 5px'
  },
  noMargin: {
    margin: '0 15px'
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
        {/* <div>
          <header className='text-center' style={styles.title}>
            Day 1
          </header>
          <div className='row justify-between text-center'>
            <div style={styles.card} onClick={handleClick}>
              <div className='row align-center justify-between' style={styles.inputContainer}>
                <p style={styles.noMargin}>Bench</p>
              </div>
              <div className='row align-center justify-between' style={styles.inputContainer}>
                <p style={styles.noMargin}>Bench</p>
              </div>
              <div className='row align-center justify-between' style={styles.inputContainer}>
                <p style={styles.noMargin}>Bench</p>
              </div>
            </div>
            <div className=''>
              <button type="submit" className="btn-form">
                Week Finished
              </button>
            </div>
          </div>
        </div> */}
        <div >
          <div>
            <header className='text-center' style={styles.title}>
              Workout
            </header>
            <div className='row justify-between text-center'>
              <div className='row widget-button align-center' style={styles.createButton} onClick={handleClick}>
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
