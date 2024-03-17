'use client';
import { signIn } from 'next-auth/react'

export default function SignIn() {
  return (
    <button
      className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
      onClick={() => signIn()}>
      Entrar
    </button>
  );
}

