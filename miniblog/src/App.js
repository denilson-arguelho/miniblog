import './App.css';
//Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

//Pages
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
