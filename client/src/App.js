import React from 'react';
import {useDispatch, useSelector} from "react-redux";

function App() {

    const dispatch = useDispatch();
    const {email} = useSelector(state => state.auth);

  return (
      <div className="App">
        <h1>React !!! {email}</h1>
      </div>
  );
}

export default App;
