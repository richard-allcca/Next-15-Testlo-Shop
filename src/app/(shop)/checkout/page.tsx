import { Title } from "@/components/ui/title/Title";
import Link from "next/link";

import { initialData } from "@/seed/seed";
import Image from "next/image";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0" >

      <div className="flex flex-col">

        <Title title='Verificar Orden' />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 ">

          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Ajustar elementos</span>
            <Link href={'/'} className="underline mb-5" >
              Editar carrito
            </Link>

            {/* Ttems */}
            {
              productsInCart.map(product => {
                return (
                  <div key={product.slug} className="flex mb-5">
                    <Image
                      src={`/products/${product.images[0]}`}
                      width={100}
                      height={100}
                      alt={product.title}
                      className='mr-5 rounded-none'
                    />

                    <div>
                      <p>{product.title}</p>
                      <p>{product.price} x 3</p>
                      <p className='font-bold' >Subtotal: $ {product.price + 3}</p>
                      {/* <QuantitySelector quantity={3} /> */}
                    </div>
                  </div>
                );
              })
            }
          </div>


          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7">

            <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl" >Richard Allcca</p>
              <p>Av. panamericana</p>
              <p>col. centro</p>
              <p>Distrito - Grocio prado</p>
              <p>123.123.123</p>
            </div>

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Resumen de orden</h2>

            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">3 artículos</span>

              <span>Subtotal</span>
              <span className="text-right">$ 100</span>

              <span>Impuestos</span>
              <span className="text-right">$ 100</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">$ 100</span>
            </div>

            <div className='mt-5 mb-2 w-full' >

              {/* Disclaimer */}
              <p className="mb-5" >
                <span className="text-x5" >
                  Al hacer click en &quot;Colocar orden&quot;, aceptas nuestros <a href="#" className='underline' >Términos y condiciones</a>
                </span>
              </p>

              <Link
                href={'/orders/123'}
                className="flex btn-primary justify-center"
              >
                Colocar orden
              </Link>
            </div>
          </div>



        </div>

      </div>

    </div>
  );
}
