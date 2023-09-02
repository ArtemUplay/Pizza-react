import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IPizza } from './FullPizza.types';

const FullPizza = () => {
  const [currentPizza, setCurrentPizza] = useState<IPizza>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getCurrentPizza = async () => {
      try {
        const { data } = await axios.get(`https://641ac58ef398d7d95d5e1fa0.mockapi.io/items/${id}`);
        setCurrentPizza(data);
      } catch (error) {
        alert('Данная пицца не найдена');
        navigate('/');
      }
    };

    getCurrentPizza();
  }, []);

  if (!currentPizza) {
    return <p>'Загрузка...'</p>;
  }

  return (
    <div className="container">
      <img src={currentPizza.imageUrl} alt={currentPizza.title} />
      <h2>{currentPizza.title}</h2>
      <h4>{currentPizza.price} ₽</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullPizza;
