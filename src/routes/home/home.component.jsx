
import Directory from "../../components/directory/directory.component";
import categories from "../.././category.json";

const  Home = () => {
  const categoriesData = categories;

  return (
    <>
      <Directory categories={categoriesData} />
    </>
  );
}

export default Home;