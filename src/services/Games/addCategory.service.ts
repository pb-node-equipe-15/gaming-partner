import AppDataSource from "../../data-source";
import Categories from "../../entities/categories.entities";
import AppError from "../../errors/AppError";

const addCategoryService = async (name: string): Promise<Categories> => {
  const categoriesRespository = AppDataSource.getRepository(Categories);
  const categories = await categoriesRespository.findOneBy({ name: name });

  if (!name) {
    throw new AppError("Name field is empty");
  }

  if (categories) {
    throw new AppError("Category already exists", 409);
  }

  const category = categoriesRespository.create({
    name,
  });

  await categoriesRespository.save(category);

  return category;
};

export default addCategoryService;
