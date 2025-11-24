'use server';

import { signIn } from "../../../auth.config";


export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    // await sleep(1000); // Simular retardo de red
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return 'success';
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return 'CredentialsSignin';
    }
    return 'CredentialsSignin';
  }
}