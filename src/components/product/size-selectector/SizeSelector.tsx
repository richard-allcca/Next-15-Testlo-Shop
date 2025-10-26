import type { Size } from "@/interfaces/product.interface";
import clsx from "clsx";

interface Props {
  selectedSize?: Size;
  availableSizes: Size[];

  setSize?: (size: Size) => void;
}

export const SizeSelector = ({ selectedSize, availableSizes, setSize }: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Tallas disponibles</h3>

      <div className="flex">
        {
          availableSizes.map(size => {
            return (
              <button
                key={size}
                onClick={() => setSize?.(size)}
                className={
                  clsx(
                    "mx-2 hover:underline text-lg",
                    {
                      'underline': size === selectedSize
                    }
                  )
                }
              >
                {size}
              </button>
            )
          })
        }
      </div>
    </div>
  )
}
