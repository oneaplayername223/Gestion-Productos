import './App.css';
import {Routes, Route, Link} from 'react-router-dom';
import Login from './routes/loginRoutes/Login.jsx';
import Register from './routes/loginRoutes/Register.jsx';
import Index from './routes/userRoutes/Index.jsx';
import AgregarProducto from './routes/userRoutes/AgregarProducto.jsx';
import IndexUser from './routes/guessRoutes/Index.jsx';
import Perfil from './routes/userRoutes/Perfil.jsx';
import Venta from './routes/userRoutes/Venta.jsx';
import Logout from './components/Logout.jsx';
import Productos from './routes/guessRoutes/Productos.jsx';
import UserCard from './components/guessComponents/UserCard.jsx';
import PerfilUser from './routes/guessRoutes/PerfilUser.jsx';
import Comprar from './routes/guessRoutes/Comprar.jsx';
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
        <Route path='/logout' element={<Logout />} />
        <Route path='/productos/:id' element={<Productos />} />
        <Route path='/perfil/:id' element={<PerfilUser />} />
        <Route path='/comprar/:id' element={<Comprar />} />
        <Route path='/*' element={<h1>Pagina no encontrada<br /> <Link to='/'>Volver</Link>

          
        </h1>} />
        
        
        

        



      
      </Routes>
    </div>
  );
}

export default App;
