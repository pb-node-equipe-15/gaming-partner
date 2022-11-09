import AppDataSource from "../../data-source";
import Categories from "../../entities/categories.entities";
import AppError from "../../errors/AppError";

const addCategoryService = async (name: string): Promise<Categories> => {
  const categoriesRespository = AppDataSource.getRepository(Categories);

  if (!name) {
    throw new AppError("Name field is empty", 400);
  }

  const valid = await categoriesRespository.findOneBy({ name });

  if (valid) {
    throw new AppError("category alredy exist", 409);
  }

  const category = categoriesRespository.create({
    name,
  });

  await categoriesRespository.save(category);

  console.log(category);

  return category;
};

export default addCategoryService;
