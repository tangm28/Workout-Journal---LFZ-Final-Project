import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import MaxesForm from '../components/maxes-form';

const styles = {
  title: {
    fontSize: 30,
    fontWeight: 'bold'
  }
};
export default class TrainingMaxes extends React.Component {
  render() {
    const { user, route, testUser } = this.context;

    return (
      <div className='widget-container'>
        <header className='text-center' style={styles.title}>
          Let&apos;s Get Started
        </header>
        <p className='maxes-text'>
          What is your 1 rep max for the following exercises?
          (If you&apos;re not sure, that&apos;s okay.
          Use this <a className="text-muted" href=''>
            calculator
          </a>
          )</p>
        <div>
          <div >
            <div>
              <MaxesForm
                key={route.path}
                action={route.path}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

TrainingMaxes.contextType = AppContext;
