import { QuantitySelector } from "@/components/product/quantity-selector/QuantitySelector";
import { SizeSelector } from "@/components/product/size-selectector/SizeSelector";
import { ProductMobilSlidesShow } from "@/components/product/slidesShow/ProductMobilSlidesShow";
import { ProductSlidesShow } from "@/components/product/slidesShow/ProductSlidesShow";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string
  };
}

export default async function ProductSlugPage({ params }: Props) {

  const { slug } = await params;
  const product = initialData.products.find(p => p.slug === slug);
  console.log("🚀 ~ ProductSlugPage ~ product:", product)

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3" >
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2">

        {/* Mobil SlidesShow */}
        <ProductMobilSlidesShow
          images={product.images}
          title={product.title}
          className="md:hidden"
        />

        {/* Desktop SlidesShow */}
        <ProductSlidesShow
          images={product.images}
          title={product.title}
          className="hidden md:block"
        />
      </div>

      {/* Details */}
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased text-xl`}>{product?.title}</h1>
        <p className="text-lg mb-5">${product?.price}</p>

        {/* Selector de Tallas */}
        <SizeSelector selectedSize={product.sizes[0]} availableSizes={product.sizes} />

        {/* Selector de cantidad */}
        <QuantitySelector
          quantity={2}
        />

        {/* Button */}
        <button
          className="btn-primary my-5"
        >
          Agregar al carrito
        </button>

        {/* Description */}
        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{product.description}</p>

      </div>
    </div>
  );
}
