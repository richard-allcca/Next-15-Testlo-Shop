import { Title } from "@/components/ui/title/Title";
import Link from "next/link";
import ProductInCart from "./ui/ProductInCart";
import Summary from "./ui/OrderSummary";


export default function CartPage() {

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0" >

      <div className="flex flex-col">

        <Title title='Carrito' />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 ">

          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar más items</span>
            <Link href={'/'} className="underline mb-5" > Continúa comprando </Link>

            {/* Items */}
            <ProductInCart />
          </div>


          {/* Checkout */}
          <Summary />

        </div>

      </div>

    </div>
  );
}
