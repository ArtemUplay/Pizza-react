import { ICategoriesProps } from './Categories.types';

const Categories = ({ categoryId, onChangeCategory }: ICategoriesProps) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => {
          return (
            <li key={index} onClick={() => onChangeCategory(index)} className={categoryId === index ? 'active' : ''}>
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
