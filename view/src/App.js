import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Inicio from "./Paginas/Inicio"
import Overview from './Paginas/Overview';
import Menu from './components/Menu';
import Rodape from './components/Rodape';
import Cadastro from './Paginas/Cadastro';

function App() {
  return (
    <BrowserRouter>
      <Menu/>
      <Routes>
        <Route path='/' element={<Inicio />}/>
        <Route path='/overview' element={<Overview/>} />
        <Route path="/cadastro" element={<Cadastro/>} />
      </Routes>
      <Rodape />
    </BrowserRouter>
  );
}

export default App;
