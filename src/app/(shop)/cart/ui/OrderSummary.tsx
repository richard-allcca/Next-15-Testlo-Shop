'use client';

import { useCartStore } from '@/store/cart/cart-store';
import { currencyFormat } from '@/utils/currencyFormat';
import Link from 'next/link';
import { useEffect, useState } from 'react';


const Summary = () => {
  const [loading, setLoading] = useState(false);
  const summaryOrder = useCartStore(state => state.getSummaryInfo);
  const { totalItems, subTotal, tax, total } = summaryOrder();

  useEffect(() => {
    setLoading(true);
  }, []);

  // Condition to avoid hydration error
  if (loading === false) return null;

  const getTotal = () => {
    if (totalItems === 0) return ` ${totalItems} Artículos`;
    if (totalItems === 1) return ` ${totalItems} Artículo`;
    if (totalItems > 1) return ` ${totalItems} Artículos`;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 h-fit ">
      <h2 className="text-2xl mb-2">Resumen de orden</h2>

      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">{getTotal()}</span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Impuestos</span>
        <span className="text-right">${tax}</span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
      </div>

      <div className='mt-5 mb-2 w-full' >
        <Link
          href={'/checkout/address'}
          className="flex btn-primary justify-center"
        >
          checkout
        </Link>
      </div>
    </div>
  );
};

export default Summary;