import React from 'react';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import MaxesWidget from '../components/maxes-widget';
import WorkoutWidget from '../components/workout-widget';

export default class Home extends React.Component {
  render() {
    if (!this.context.user) return <Redirect to="log-in" />;

    return (
      <div>
        <MaxesWidget />
        <WorkoutWidget />
      </div>
    );
  }
}

Home.contextType = AppContext;
