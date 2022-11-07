import React from 'react';
import './App.css';

import Todo from './components/Todo';

function App() {
  return (
    <div className='wrapper'>
      <div className='app_wrapper'>
        <h2 className='logo_text'>TODOS</h2>
        <Todo />
      </div>
    </div>
  );
}

export default App;
