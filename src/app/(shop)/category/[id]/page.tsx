import { ProductGrid } from "@/components/product-grid/ProductGrid";
import { Title } from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";

const products = initialData.products;

interface Props {
  params: {
    id: string;
  };
}

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;

  const listCategories = {
    men: "Hombres",
    women: "Mujeres",
    kid: "Niños",
  }

  const subtitleById = listCategories[id as keyof typeof listCategories] || 'Todos';

  const productsByCategory = products.filter(product => product.gender === id);

  // TODO - Implementation not found
  // notFound();

  return (
    <>
      <Title
        title={`Artículos para ${subtitleById}`}
        subTitle='Todos los productos'
        className="mb-2"
      />
      <ProductGrid products={productsByCategory} />
    </>
  );
}
