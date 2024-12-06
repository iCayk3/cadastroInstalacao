import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Inicio from "./Paginas/Inicio"
import Overview from './Paginas/Overview';
import Menu from './components/Menu';

function App() {
  return (
    <BrowserRouter>
      <Menu/>
      <Routes>
        <Route path='/' element={<Inicio />}/>
        <Route path='/overview' element={<Overview/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
