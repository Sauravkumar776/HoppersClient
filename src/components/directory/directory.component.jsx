import Category from "../category-item/category-item.component";
import './directory.styles.scss';

const Directory = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories.map((categories) => {
        return <Category key={categories.id} category={categories} />;
      })}
    </div>
  );
};

export default Directory;
