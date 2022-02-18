import React from 'react';
import AppContext from './lib/app-context';
import Home from './pages/home';
import Login from './pages/login';
import NavBar from './components/navbar';
import Footer from './components/footer';
import { parseRoute } from './lib';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
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
    const user = false;
    this.setState({ user, isAuthorizing: false });
  }

  renderPage() {
    console.log(this.state);
    const { path } = this.state.route;
    if (path === '') {
      return <Home />;
    }
    if (path === 'log-in' || path === 'register') {
      return <Login />;
    }
    // return <NotFound />;
  }

  render() {

    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const contextValue = { user, route };
    return (
    <AppContext.Provider value={contextValue}>
      <>
        <NavBar />
        {this.renderPage()}
        <Footer />
      </>
    </AppContext.Provider>
    );
  }
}
