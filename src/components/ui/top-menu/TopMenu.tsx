'use client'

import { titleFont } from "@/config/fonts";
import { useUiStore } from "@/store/ui/ui-store";
import Link from "next/link";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";



export const TopMenu = () => {

  const openSideMenu = useUiStore( state => state.openSideMenu );

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
          href="/category/men"
        >
          Hombres
        </Link>
        <Link
          className="m-2 p-2 rounded transition-all  hover:bg-gray-100"
          href="/category/women"
        >
          Mujeres
        </Link>
        <Link
          className="m-2 p-2 rounded transition-all  hover:bg-gray-100"
          href="/category/kid"
        >
          Niños
        </Link>
      </div>

      {/* Search, Cart, Menu */}
      <div className="flex items-center">
        <Link href="/search" className="mx-2" >
          <IoSearchOutline />
        </Link>

        <Link href="/cart" className="mx-2" >
          <div className="relative">
            <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white" >3</span>
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <button
          onClick={ () => openSideMenu() }
          className="mx-2 rounded-md transition-all hover:bg-gray-100"
        >
          Menu
        </button>
      </div>

    </div>
  );
}