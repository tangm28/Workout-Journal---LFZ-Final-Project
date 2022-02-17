import React from 'react';
import AppContext from '../lib/app-context';

const styles = {
  header: {
    backgroundColor: '#1bc270',
    height: '50px'
  }
};

export default class Header extends React.Component {
  renderHeader() {
    if (this.context.route.path === '') {
      return (
        <>
        </>
      );
    }
  }

  render() {
    return (
      <header style={styles.header}>
        {this.renderHeader()}
      </header>
    );
  }
}

Header.contextType = AppContext;

// export default function Header(props) {
//   return (
//     <header className="mb-5">
//       <nav className="navbar navbar-dark bg-dark shadow-sm">
//         <div className="container">
//           <div className="col px-0">
//             {/* this anchor should go back to the catalog at '#' */}
//             <a href="" className="navbar-brand">
//               <i className="fa fa-dollar-sign" /> Wicked Sales
//             </a>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// }
