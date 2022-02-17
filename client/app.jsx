import React from 'react';
import AppContext from './lib/app-context';
import Login from './pages/login';
import Header from './components/header';
import { parseRoute } from './lib';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  renderPage() {
    const { route } = this.state;
    console.log(route);
    if (route.path === '') {
      return <Login />;
    }
    // if (route.path === 'products') {
    //   const productId = route.params.get('productId');
    //   return <ProductDetails productId={productId} />;
    // }
    // return <NotFound />;
  }

  render() {
    const { route } = this.state;
    const contextValue = { route };
    return (
    <AppContext.Provider value={contextValue}>
      <>
        <Header />
        {this.renderPage()}
      </>
    </AppContext.Provider>
    );
  }
}
