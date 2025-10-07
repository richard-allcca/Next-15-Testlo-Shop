import { initialData } from './seed';
import prisma from './../lib/prisma';

async function main() {

  console.log("Seeding database...");

  // Borrar datos previos
  // await Promise.all([
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
  // ]);

  const { categories = [], products = [] } = initialData;

  // Categories
  const categoriesData = categories.map(name => {
    return {
      name,
    };
  });

  await prisma.category.createMany({
    data: categoriesData
  });

  const categoriesDb = await prisma.category.findMany();

  interface CategoryDb {
    id: string;
    name: string;
  }

  interface CategoriesMap {
    [name: string]: string;
  }

  const categoriesMap: CategoriesMap = categoriesDb.reduce((acc: CategoriesMap, category: CategoryDb) => {
    acc[category.name.toLocaleLowerCase()] = category.id;
    return acc;
  }, {} as CategoriesMap); // <string=shirt, string=categoryId>

  // Products
  for (const product of products) {
    const { images, type, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      }
    });

    // Images
    for (const image of images) {
      await prisma.productImage.create({
        data: {
          url: image,
          productId: dbProduct.id,
        }
      });
    }
  }

  console.log("Database seeded successfully.");

}

(() => {
  main()
    .then(() => console.log("Seeding completed successfully"))
    .catch(e => console.error("Error seeding database:", e))
    .finally(() => prisma.$disconnect());
})();