'use client';

import { QuantitySelector } from '@/components/product/quantity-selector/QuantitySelector';
import { useCartStore } from '@/store/cart/cart-store';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';


const ProductInCart = () => {
  const cart = useCartStore(state => state.cart);
  const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
  const removeProductFromCart = useCartStore(state => state.removeProductFromCart);

  if (cart.length === 0) {
    redirect('/empty');
  }


  const renderCartItems = cart.map(product => {
    return (
      <div key={`${product.id}-${product.size}`} className="flex mb-5">
        <Link href={`/product/${product.slug}`} >
          <Image
            src={`/products/${product.image}`}
            width={100}
            height={100}
            alt={product.title}
            className='mr-5 rounded-none'
          />
        </Link>

        <div>
          <Link href={`/product/${product.slug}`} className='hover:underline' >
            {` ${product.size} - ${product.title}`}
          </Link>
          <p>{product.price}</p>
          <QuantitySelector
            quantity={product.quantity}
            setQuantity={(quantity) => updateProductQuantity(product, quantity)}
          />
        </div>

        <button
          className="underline mt-3"
          onClick={() => removeProductFromCart(product)}
        >
          Remover
        </button>
      </div>
    );
  });

  return (
    <>
      {renderCartItems}
    </>
  );
};

export default ProductInCart;