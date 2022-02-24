import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import MaxesForm from '../components/maxes-form';

const styles = {
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  openCalc: {
    color: '#1bc270',
    textDecoration: 'underline'
  }
};
export default class TrainingMaxes extends React.Component {

  render() {
    const { route, tempUser, handleFullModal, handleProfileCreation } = this.context;
    if (!tempUser) return <Redirect to="log-in" />;

    return (
      <div className='widget-container'>
        <header className='text-center' style={styles.title}>
          Let&apos;s Get Started
        </header>
        <p className='maxes-text'>
          What is your 1 rep max for the following exercises?
          (If you&apos;re not sure, that&apos;s okay.
          Use this <span onClick={handleFullModal} style={styles.openCalc}>
            calculator
          </span>
          )</p>
        <div>
          <div >
            <div>
              <MaxesForm
                key={route.path}
                action={route.path}
                openModal={handleFullModal}
                userData={tempUser}
                onRegister={handleProfileCreation}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TrainingMaxes.contextType = AppContext;
