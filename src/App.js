import { createContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './redux/slices/filterSlice';
import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

export const SearchContext = createContext('');

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button aria-label="Increment value" onClick={() => dispatch(increment())}>
          Increment
        </button>
        <span>{count}</span>
        <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          Decrement
        </button>
      </div>
    </div>
    // <div className="wrapper">
    //   <SearchContext.Provider value={{ searchValue, setSearchValue }}>
    //     <Header />
    //     <div className="content">
    //       <Routes>
    //         <Route path="/" element={<Home searchValue={searchValue} />} />
    //         <Route path="/сart" element={<Cart />} />
    //         <Route path="*" element={<NotFound />} />
    //       </Routes>
    //     </div>
    //   </SearchContext.Provider>
    // </div>
  );
};

export default App;
