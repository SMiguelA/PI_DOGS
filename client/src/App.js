import './css/App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './components/landingPage/landingPage';
import Home from './components/home/Home';
import { useState, useEffect } from 'react';

function App() {

  const [acces, setAccess] = useState(false);
  const navigate = useNavigate();

  // ? validamos que el nombre se usuario no este vacio
  const login = () => {
    setAccess(true);
    navigate('/home');
  };

  // ? validamos que no pueda ingresar a otra ruta sin loguearse
  useEffect(() => {
    !acces && navigate('/');
  },[acces]);



  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage login={login} setAccess={setAccess} />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
