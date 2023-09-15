import Home from './components/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CartContent from './components/CarContent/CartContent';
import DataProvider from './components/Context/DataContext';

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/cart" element={<CartContent/>} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App; 
