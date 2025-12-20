import './App.scss';
import Header from './components/Header/header';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Outlet } from 'react-router-dom';
const App = () => {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-content">
        <div className="sidenav-container">

        </div>
        <div className="app-content">
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>

        </div>
      </div>
    </div>
  );
}

export default App;
