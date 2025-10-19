'use client';

import { getStockBySlug } from '@/actions/products/get-stock-by-slug';
import { titleFont } from '@/config/fonts';
import { useEffect, useState } from 'react';

interface Props {
  slug: string;
}

const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getStock();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const getStock = async () => {
    const stock = await getStockBySlug(slug);
    setStock(stock);
    setIsLoading(false);
  }

  return (
    <h1 className={`${titleFont.className} antialiased text-xl font-bold`}>
      {isLoading ? 'Cargando...' : `En Stock: ${stock} `}
    </h1>
  );
};

export default StockLabel;