import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Cart from './pages/Cart';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Home />} />
      </Routes>
      <Cart />
    </>
  );
}

export default App;
