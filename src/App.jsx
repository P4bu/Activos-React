
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ShowProduct from './components/ShowProduct';
import CreateProduct from './components/CreateProduct';
import EditProduct from './components/EditProduct';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <ShowProduct/>}></Route>
          <Route path='/CreateProduct' element={ <CreateProduct/>}>Crear</Route>
          <Route path='/EditProduct/:id' element={ <EditProduct/>}>Editar</Route>
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
