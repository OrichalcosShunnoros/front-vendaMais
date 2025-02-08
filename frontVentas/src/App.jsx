import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { RegistroVenta } from './components/RegistroVenta';
import { RegistroProducto } from './components/RegistroProducto';


export const App = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <Routes>
          <Route path="/RegistroVenta" element={<RegistroVenta />} />
          <Route path="/RegistroProducto" element={<RegistroProducto />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
