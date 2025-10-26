'use client';

import { QuantitySelector } from '@/components/product/quantity-selector/QuantitySelector';
import { SizeSelector } from '@/components/product/size-selectector/SizeSelector';
import { CartProduct, Product, Size } from '@/interfaces/product.interface';
import { useState } from 'react';
import { useCartStore } from './../../../../../store/cart/cart-store';

interface AddToCartProps {
  product: Product;
}

export const AddToCart = ({ product }: AddToCartProps) => {
  const addProductToCart = useCartStore( state => state.addProductToCart );

  const [selectedSize, setSelectedSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [isSizeSelected, setSizeSelected] = useState(true)

  const renderAlert = () => {
    if (isSizeSelected) return null;

    return (
      <div className="alert text-red-700 border-red-700 fade-in">
        Por favor, selecciona una talla antes de agregar al carrito.
      </div>
    );
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeSelected(false);
      return;
    }

    // Aquí puedes manejar la lógica para agregar el producto al carrito
    console.log(`Agregado al carrito: ${product.title}, Talla: ${selectedSize}, Cantidad: ${quantity}`);
    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      size: selectedSize,
      quantity,
      image: product.images[0],
    };

    addProductToCart( cartProduct );
    setSizeSelected(true);
    setQuantity(1);
    setSelectedSize(undefined);
  };

  return (
    <>
      {renderAlert()}
      {/* Selector de Tallas */}
      <SizeSelector selectedSize={selectedSize} availableSizes={product.sizes} setSize={setSelectedSize} />

      {/* Selector de cantidad */}
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

      {/* Button */}
      <button
        onClick={handleAddToCart}
        className="btn-primary my-5"
      >
        Agregar al carrito
      </button>
    </>
  );
};
