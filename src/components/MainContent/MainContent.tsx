import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

const MainContent = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainContent;
