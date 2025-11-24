'use client';

import { authenticate } from '@/actions/auth/login';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { IoInformationOutline } from 'react-icons/io5';

export const LoginForm = () => {
  const router = useRouter();
  const [state, dispatch] = useActionState(authenticate, undefined)

  useEffect(() => {
    if (state === 'success') {
      router.replace('/')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])


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

      {
        state === 'CredentialsSignin' && (
          <>
            <IoInformationOutline className="text-red-500 mb-2" size={24} />
            <p className="text-red-500 mb-5 text-sm">
              Credenciales inválidas. Por favor, intenta de nuevo.
            </p>
          </>
        )
      }

      <LoginButton />

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/new-account"
        className="btn-secondary text-center"
      >
        Crear una nueva cuenta
      </Link>

    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className={clsx({
        'btn-primary': !pending,
        'btn-primary-disabled': pending,
      })}
    >
      {pending ? 'Cargando...' : 'Ingresar'}
    </button>
  )

}