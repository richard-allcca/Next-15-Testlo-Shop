'use server';

import prisma from "@/lib/prisma";

export const getStockBySlug = async (slug: string) => {


  try {
    const product = await prisma.product.findUnique({
      where: {
        slug
      }
    });

    return product?.inStock || 0;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching product by slug');
  }

};
