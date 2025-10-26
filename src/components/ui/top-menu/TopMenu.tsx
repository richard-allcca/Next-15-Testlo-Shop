'use client';

import { titleFont } from "@/config/fonts";
import { useCartStore } from "@/store/cart/cart-store";
import { useUiStore } from "@/store/ui/ui-store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

// NOTE - loading state to avoid hydration error

export const TopMenu = () => {
  const [loading, setLoading] = useState(false);

  const openSideMenu = useUiStore(state => state.openSideMenu);
  const totalItems = useCartStore(state => state.getTotalItems());

  useEffect(() => {
    setLoading(true);
  }, []);

  if (!loading) return null;

  const getHrefCart = () => {
    return totalItems > 0 ? '/cart' : '/empty';
  }

  return (
    <div className="flex px-5 py-2 justify-between items-center w-full">

      {/* Logo */}
      <div>
        <Link
          href="/"
          aria-label="Go to home page"
        >
          <span className={`${titleFont.className} font-bold`} >Teslo</span>
          <span> | shop</span>
        </Link>
      </div>

      {/* Center Menu */}
      <div className="hidden sm:block  gap-3">
        <Link
          className="m-2 p-2 rounded transition-all  hover:bg-gray-100"
          href="/gender/men"
        >
          Hombres
        </Link>
        <Link
          className="m-2 p-2 rounded transition-all  hover:bg-gray-100"
          href="/gender/women"
        >
          Mujeres
        </Link>
        <Link
          className="m-2 p-2 rounded transition-all  hover:bg-gray-100"
          href="/gender/kid"
        >
          Niños
        </Link>
      </div>

      {/* Search, Cart, Menu */}
      <div className="flex items-center">
        <Link href="/search" className="mx-2" >
          <IoSearchOutline />
        </Link>

        <Link href={getHrefCart()} className="mx-2" >
          <div className="relative">
            <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white" >{totalItems}</span>
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <button
          onClick={() => openSideMenu()}
          className="mx-2 rounded-md transition-all hover:bg-gray-100"
        >
          Menu
        </button>
      </div>

    </div>
  );
};