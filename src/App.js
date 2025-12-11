import './App.scss';
import Header from './components/Header/header';
import { Outlet, Link } from 'react-router-dom';
const App = () => {
  return (
    <div classname="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div classname="main-content">
        <div className="sidenav-container">

        </div>
        <div className="app-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
