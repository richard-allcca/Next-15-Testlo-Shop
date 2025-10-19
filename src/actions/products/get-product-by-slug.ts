'use server';

import prisma from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {


  try {

    const product = await prisma.product.findFirst({
      include: {
        ProductImage: {
          select: {
            url: true
          }
        }
      },
      where: {
        slug: slug
      }
    })

    if (!product) {
      return null;
    }

    const formattedProduct = {
      ...product,
      images: product?.ProductImage?.map((image) => image.url) ?? []
    }

    return formattedProduct;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching product by slug');
  }

}