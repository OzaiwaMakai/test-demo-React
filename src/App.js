import logo from './logo.svg';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCounter, decreaseCounter } from './redux/action/counterAction';
import MyComponent from './components/MyComponent';
import React from 'react';
import './components/DisplayInfor.scss'

class App extends React.Component {
  render() {
    return (
      <div className='app-container'>
        Hello World
        <MyComponent></MyComponent>
      </div>
    )
  }
}

// const App = () => {
//   const count = useSelector(state => state.counter.count);
//   const dispatch = useDispatch();

//   return (

//   );
// }

export default App;
