import './App.css';
import {Routes, Route} from 'react-router-dom';
import Login from './routes/loginRoutes/Login.jsx';
import Register from './routes/loginRoutes/Register.jsx';
import Index from './routes/userRoutes/Index.jsx';
import AgregarProducto from './routes/userRoutes/AgregarProducto.jsx';
import IndexUser from './routes/guessRoutes/Index.jsx';
import Perfil from './routes/userRoutes/Perfil.jsx';
import Venta from './routes/userRoutes/Venta.jsx';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        
        <Route path='/index' element={<Index />} />
          <Route path='/perfil' element={<Perfil />} />
          <Route path='/venta' element={<Venta />} />

        <Route path='/agregar' element={<AgregarProducto />} />
        <Route path='/' element={<IndexUser />} />



      
      </Routes>
    </div>
  );
}

export default App;
