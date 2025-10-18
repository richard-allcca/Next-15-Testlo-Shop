'use server';

import { Gender } from "@/generated/prisma";
import prisma from "@/lib/prisma";

interface PaginationProducts {
  page?: number;
  limit?: number;
  gender?: Gender;
}

export const getPaginateProductsWithImages = async ({ page = 1, limit = 10, gender }: PaginationProducts) => {

  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;
  if (isNaN(Number(limit))) limit = 10;

  try {
    // Construir el filtro dinámico para gender
    const whereClause = gender ? { gender } : {};

    // Consulta paginada con filtro opcional por gender
    const products = await prisma.product.findMany({
      take: limit,
      skip: (page - 1) * limit,
      include: {
        ProductImage: {
          take: 2,
          select: { url: true }
        }
      },
      where: whereClause
    });

    // Contar productos según el filtro aplicado
    const totalProducts = await prisma.product.count({ where: whereClause });

    const result = {
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      products: products.map(product => ({
        ...product,
        images: product.ProductImage?.map((image: { url: string; }) => image.url) ?? []
      }))
    };

    return result;

  } catch (error) {
    console.error("Error fetching products with images:", error);
    throw error;
  }

};