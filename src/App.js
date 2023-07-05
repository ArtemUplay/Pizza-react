import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';

import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import FullPizza from './components/FullPizza';
import MainContent from './components/MainContent';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainContent />}>
        <Route path="" element={<Home />} />
        <Route path="сart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
