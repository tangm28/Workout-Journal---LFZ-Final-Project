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
    const { user, route, tempUser, handleFullModal, handleProfileCreation, handleMaxUpdate } = this.context;
    if (!tempUser && !user) return <Redirect to="log-in" />;
    const altUser = !tempUser
      ? user
      : tempUser;

    const titleMessage = route.path === 'create-maxes'
      ? "Let's Get Started"
      : 'Current Training Maxes';

    const maxesDescription = route.path === 'create-maxes'
      ? ''
      : 'hidden';

    return (
      <div className='widget-container'>
        <header className='text-center' style={styles.title}>
          {titleMessage}
        </header>
        <p className={`maxes-text ${maxesDescription}`}>
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
                userData={altUser}
                onRegister={handleProfileCreation}
                onUpdate={handleMaxUpdate}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TrainingMaxes.contextType = AppContext;
