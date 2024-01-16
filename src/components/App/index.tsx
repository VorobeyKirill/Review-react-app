import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import MainApp from '../MainApp';
import {
    useSelector,
} from 'react-redux';

function App() {
    // type Todo from the MainApp component should be used instead of any here
    // It's a good practice to move selector function separately above the component or to the separate file
    // You can simplify the function inside the useSelector: (state: StateInterface) => state.list.todos
    const todos = useSelector((state: {list: { todos: any[] }}) => state.list.todos);

  return (
      // туду лист для юзеров:
    // Different naming styles for classNames. It's better to use BEM.
    // For example: app-container, app-container__header, app-container__footer
    <div className="App main">
      <header className="App-header">
        TODO list with users:
        {/* The unused comment should be removed, it'll allow us to remove logo import and logo itself from our final bundle */}
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
      </header>
        {/* MAIN APP: */}
        {/* Better to wrap <MainApp> in a <main> tag for accessibility, since you already have <header> and <footer> */}
        <MainApp todos={todos}/>

        {/* Remove unnecessary curly braces around the className */}
        <footer className='App-footer'>
              <a
                href="https://example.org"
                target="_blank"
                className={"App-footer-link"}
              >
                All right reserved
              </a>
        </footer>
    </div>
  );
}

export default App;
