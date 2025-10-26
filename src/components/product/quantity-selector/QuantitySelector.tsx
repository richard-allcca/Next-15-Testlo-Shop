'use client';

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";


interface Props {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

export const QuantitySelector = ({ quantity, setQuantity }: Props) => {
  const onQuantityChange = ( value: number) => {
    if (value < 1) return;
    setQuantity?.(value);
  }

  return (
    <div className="flex">
      <button onClick={() => onQuantityChange(quantity - 1)}>
        <IoRemoveCircleOutline size={30} />
      </button>

      <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">{quantity}</span>

      <button onClick={ () => onQuantityChange(quantity + 1)} >
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  )
}
