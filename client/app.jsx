import React, { useState } from 'react';
import Modal from 'react-modal';
import AppContext from './lib/app-context';
import decodeToken from './lib/decode-token';
import Home from './pages/home';
import Login from './pages/login';
import Profile from './pages/profile';
import TrainingMaxes from './pages/trainingMaxes';
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
      testUser: null,
      isOpen: false,
      modal: false
    };
    // const [isOpen, setIsOpen] = useState(false);
    this.handleFullModal = this.handleFullModal.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    /**
     * Listen for hash change events on the window object
     * Each time the window.location.hash changes, parse
     * it with the parseRoute() function and update state
     */
    window.addEventListener('hashchange', () => {
      const newRoute = parseRoute(window.location.hash);
      this.setState({ route: newRoute });
    });
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleClick(event) {
    // this.setState({ isClicked: !this.state.isClicked });
    console.log(event.target);
  }

  handleRegister(result) {
    const { userId } = result;
    this.setState({ testUser: userId });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
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

    // return <NotFound />;
  }

  render() {

    if (this.state.isAuthorizing) return null;
    const { user, route, testUser, setIsOpen, isOpen } = this.state;
    const { handleRegister, handleSignIn, handleFullModal, handleClick } = this;
    const contextValue = { user, route, testUser, handleRegister, handleSignIn, handleFullModal };
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
