import React from 'react';
import Modal from 'react-modal';
import AppContext from './lib/app-context';
import decodeToken from './lib/decode-token';
import Home from './pages/home';
import Login from './pages/login';
import Profile from './pages/profile';
import TrainingMaxes from './pages/trainingMaxes';
import MyWorkout from './pages/workout';
import NavBar from './components/navbar';
import Footer from './components/footer';
import MaxesCalculator from './components/maxes-calculator';
import { parseRoute } from './lib';

Modal.setAppElement('#root');
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash),
      tempUser: null,
      isOpen: false,
      modal: false,
      maxes: {}
    };
    this.handleFullModal = this.handleFullModal.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleProfileCreation = this.handleProfileCreation.bind(this);
    this.handleMaxUpdate = this.handleMaxUpdate.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const newRoute = parseRoute(window.location.hash);
      this.setState({ route: newRoute });
    });
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });
    if (user !== null) {
      fetch(`/api/account/get-maxes/${user.userId}`)
        .then(res => res.json())
        .then(result => {
          const { benchMax, squatMax, deadliftMax, ohpMax, maxesUnit } = result;
          this.setState({
            maxes: {
              currentBench: benchMax,
              currentSquat: squatMax,
              currentDeadlift: deadliftMax,
              currentOhp: ohpMax,
              currentUnit: maxesUnit
            }
          });
        });
    }
  }

  handleMaxUpdate(result) {
    const { maxesUnit, benchMax, squatMax, deadliftMax, ohpMax } = result;
    this.setState({
      maxes: {
        currentBench: benchMax,
        currentSquat: squatMax,
        currentDeadlift: deadliftMax,
        currentOhp: ohpMax,
        currentUnit: maxesUnit
      }
    });
  }

  handleRegister(result) {
    const { userId } = result;
    this.setState({ tempUser: userId });
  }

  handleProfileCreation() {
    this.setState({ tempUser: null });
  }

  handleLogIn(result) {
    const { user, token } = result;
    fetch(`/api/account/get-maxes/${user.userId}`)
      .then(res => res.json())
      .then(result => {
        const { benchMax, squatMax, deadliftMax, ohpMax, maxesUnit } = result;
        this.setState({
          user: user,
          maxes: {
            currentBench: benchMax,
            currentSquat: squatMax,
            currentDeadlift: deadliftMax,
            currentOhp: ohpMax,
            currentUnit: maxesUnit
          }
        });
      });
    window.localStorage.setItem('react-context-jwt', token);
  }

  handleFullModal() {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  }

  renderPage() {
    const { path } = this.state.route;
    if (path === '') {
      return <Home />;
    }
    if (path === 'log-in' || path === 'register') {
      return <Login />;
    }
    if (path === 'profile' || path === 'create-profile') {
      return <Profile />;
    }
    if (path === 'update-maxes' || path === 'create-maxes') {
      return <TrainingMaxes />;
    }
    if (path === 'workout' || path === 'workout-days' ||
      path === 'create-workout' || path === 'update-workout') {
      return <MyWorkout />;
    }

    // return <NotFound />;
  }

  render() {
    if (this.state.isAuthorizing) return null;
    const { user, route, tempUser, isOpen, maxes } = this.state;
    const { handleRegister, handleLogIn, handleFullModal, handleProfileCreation, handleMaxUpdate } = this;
    const contextValue = {
      user,
      route,
      tempUser,
      handleRegister,
      handleLogIn,
      handleFullModal,
      handleProfileCreation,
      maxes,
      handleMaxUpdate
    };
    return (
    <AppContext.Provider value={contextValue}>
      <>
        <Modal
          isOpen={isOpen}
          // onRequestClose={toggleModal}
          className='modal'
          overlayClassName='overlay'
          contentLabel="My dialog"
        >
            <MaxesCalculator />
        </Modal>
        <NavBar />
        {this.renderPage()}
        <Footer />
      </>
    </AppContext.Provider>
    );
  }
}
