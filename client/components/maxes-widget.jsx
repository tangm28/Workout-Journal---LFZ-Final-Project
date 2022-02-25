import React from 'react';
import AppContext from '../lib/app-context';

const styles = {
  title: {
    fontSize: '20px',
    fontWeight: 'bold'
  },
  card: {
    backgroundColor: '#2F2F2F',
    borderRadius: '10px',
    padding: '10px'
  },
  cardContent: {
    fontSize: '30px',
    fontWeight: 'bold'
  }
};

export default class MaxesWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    window.location.hash = 'update-maxes';
  }

  render() {
    const { handleClick } = this;
    const { maxes } = this.context;
    return (
      <div className='widget-container-secondary'>
        <div >
          <div onClick={handleClick}>
            <header className='text-center' style={styles.title}>
              Current Training Maxes
            </header>
            <div className='row justify-between text-center'>
              <div>
                <div className='card' style={styles.card}>
                  <h5>Bench</h5>
                  <span style={styles.cardContent}>{maxes.currentBench}</span>
                </div>
              </div>
              <div className='card' style={styles.card}>
                <h5>Squat</h5>
                <span style={styles.cardContent}>{maxes.currentSquat}</span>
              </div>
              <div className='card' style={styles.card}>
                <h5>Deadlift</h5>
                <span style={styles.cardContent}>{maxes.currentDeadlift}</span>
              </div>
              <div className='card' style={styles.card}>
                <h5>OHP</h5>
                <span style={styles.cardContent}>{maxes.currentOhp}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MaxesWidget.contextType = AppContext;
