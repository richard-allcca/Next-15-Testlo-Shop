'use client';

import { logout } from '@/actions/auth/logout';
import { useUiStore } from '@/store/ui/ui-store';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonAddOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5';

export const Sidebar = () => {

  const isSideMenuOpen = useUiStore(state => state.isSideMenuOpen);
  const closeMenu = useUiStore(state => state.closeSideMenu);

  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <>

      {/* Background black */}
      {
        isSideMenuOpen && <div className='fixed top-0 left-0 h-screen z-10 bg-black opacity-30' ></div>
      }

      {/* blur */}
      {
        isSideMenuOpen && <div className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"></div>
      }

      {/* Side menu */}
      <nav className={
        clsx(
          "fixed p-5 right-0 top-0 w-[400px] h-screen bg-white z-20 transform transition-all duration-300",
          {
            "translate-x-full": !isSideMenuOpen
          }
        )
      }>
        <IoCloseOutline
          width={50}
          className='absolute top-5 right-5 text-3xl cursor-pointer'
          onClick={() => { closeMenu(); }}
        />

        {/* Input */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-3" />
          <input
            type="text"
            placeholder='Buscar...'
            className="w-full bg-gray rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Menu */}
        <Link
          href="/profile"
          onClick={() => closeMenu()}
          className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
        >
          <IoPersonAddOutline size={30} className="mr-3 text-xl" />
          <span className='text-lg font-medium'>Perfil</span>
        </Link>

        <Link
          href="/"
          className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
        >
          <IoTicketOutline size={30} className="mr-3 text-xl" />
          <span className='text-lg font-medium'>Ordenes</span>
        </Link>

        {
          !isAuthenticated && (
            <Link
              href="/auth/login"
              onClick={() => closeMenu()}
              className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
            >
              <IoLogInOutline size={30} className="mr-3 text-xl" />
              <span className='text-lg font-medium'>Ingresar</span>
            </Link>
          )
        }

        {
          isAuthenticated && (
            <button
              onClick={() => { logout(); closeMenu(); }}
              className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all w-full'
            >
              <IoLogOutOutline size={30} className="mr-3 text-xl" />
              <span className='text-lg font-medium'>Salir</span>
            </button>
          )
        }

        {/* Line separator */}
        <div className="w-full h-px bg-gray-200 my-10"></div>

        <Link
          href="/"
          className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
        >
          <IoShirtOutline size={30} className="mr-3 text-xl" />
          <span className='text-lg font-medium'>Products</span>
        </Link>

        <Link
          href="/"
          className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
        >
          <IoTicketOutline size={30} className="mr-3 text-xl" />
          <span className='text-lg font-medium'>Ordenes</span>
        </Link>

        <Link
          href="/"
          className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'
        >
          <IoPeopleOutline size={30} className="mr-3 text-xl" />
          <span className='text-lg font-medium'>Usuarios</span>
        </Link>

      </nav>

    </>

  );
};
