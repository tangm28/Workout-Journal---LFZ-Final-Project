import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import ProfileForm from '../components/profile-form';

const styles = {
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  }
};
export default class TrainingMaxes extends React.Component {
  render() {

    return (
      <div className='widget-container'>
        <header className='text-center' style={styles.title}>
          Let&apos;s Get Started
        </header>
        <div>
          <div >
            <div>
              {/* <ProfileForm

              /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TrainingMaxes.contextType = AppContext;
