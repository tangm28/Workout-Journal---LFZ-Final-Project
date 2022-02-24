import React from 'react';

const styles = {
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
};

export default class MaxesWidget extends React.Component {

  render() {
    return (
      <div className='container'>
        <div >
          <div >
            <header className='text-center' style={styles.title}>
              Current Training Maxes
            </header>
            <div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
