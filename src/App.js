import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import { Home } from './components/Home';
import { About } from './components/About';
import NoteState from './context/notes/NoteState';
import Login from './components/login/Login';
import Signup from './components/login/Signup';
import Alert from './components/Alert';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg : message,
      type : type
    })
    setTimeout(() => {
      setAlert(null);
    },2000)
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar/>
          <Alert alert={alert}/>
          <div>
            <Routes>
              <Route exact path='/' element={<Home showAlert = {showAlert}/>} />
              <Route exact path="/about" element={<About />}/>
              <Route exact path="/login" element={<Login showAlert = {showAlert}/>}/>
              <Route exact path="/signup" element={<Signup showAlert = {showAlert}/>}/>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </> 
  );
}

export default App;
