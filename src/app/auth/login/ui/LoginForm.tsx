'use client';

import { authenticate } from '@/actions/auth/login';
import Link from 'next/link';
import { useActionState } from 'react';

const LoginForm = () => {
  const [state, dispatch] = useActionState(authenticate, undefined)
  console.log("🚀 ~ LoginForm ~ state:", state)

  return (
    <form action={dispatch}  className="flex flex-col">

      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 bg-gray-200 rounded mb-5"
        type="email"
        name="email"
      />


      <label htmlFor="password">Contraseña</label>
      <input
        className="px-5 py-2 bg-gray-200 rounded mb-5"
        type="password"
        name="password"
      />

      <button
        type="submit"
        className="btn-primary">
        Ingresar
      </button>


      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/new-account"
        className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>

    </form>
  );
};

export default LoginForm;