
import { React, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SocketServiceSingleton from './api/socket';
import { Paragraph, Title } from './components/Typogrhaphy';
import { getUsers } from './redux/users/actions';




function App() {
  const d = useDispatch();

  useEffect(() => {
    d(getUsers())
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Title>Hello</Title>
        <Paragraph>Hello</Paragraph>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
