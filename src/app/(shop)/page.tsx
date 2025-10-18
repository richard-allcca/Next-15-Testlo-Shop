export const revalidate = 60;

import { getPaginateProductsWithImages } from "@/actions/products/products-pagination";
import { ProductGrid } from "@/components/product-grid/ProductGrid";
import { Title } from "@/components/ui/title/Title";
import { redirect } from "next/navigation";
import { Pagination } from './../../components/ui/pagination/pagination';

// NOTE: Remove this line after testing con datos estáticos in local
// const products = initialData.products;

interface Props {
  searchParams: {
    page?: string;
    limit?: string;
  }
}


export default async function Home({ searchParams }: Props) {
  const { page = '', limit = '' } = await searchParams;

  const { products, totalPages } = await getPaginateProductsWithImages({
    page: Number(page) || 1,
    limit: Number(limit) || 10
  });

  if (products.length === 0) {
    redirect('/');
  }

  return (
    <div>
      <Title
        title="Tienda"
        subTitle="Todos los productos"
        className="mb-2"
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
