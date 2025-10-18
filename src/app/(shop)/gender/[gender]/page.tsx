export const revalidate = 60;

import { getPaginateProductsWithImages } from "@/actions/products/products-pagination";
import { ProductGrid } from "@/components/product-grid/ProductGrid";
import { Pagination } from "@/components/ui/pagination/pagination";
import { Title } from "@/components/ui/title/Title";
import { Gender } from "@/generated/prisma";
// import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

// NOTE: Remove this line after testing con datos estáticos in local
// const products = initialData.products;

interface Props {
  params: {
    gender: Gender;
  },
  searchParams: {
    page?: string;
    limit?: string;
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = await params;
  const { page = '', limit = '' } = await searchParams;

  const listCategories = {
    men: "Hombres",
    women: "Mujeres",
    kid: "Niños",
  }

  const subtitleByGender = listCategories[gender as keyof typeof listCategories] || 'Todos';

  // const productsByCategory = products.filter(product => product.gender === gender);
    const { products, totalPages } = await getPaginateProductsWithImages({
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      gender: gender
    });

  if (products.length === 0) {
    notFound();
  }

  return (
    <>
      <Title
        title={`Artículos para ${subtitleByGender}`}
        subTitle='Todos los productos'
        className="mb-2"
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
