'use server';

import { z } from 'zod';
import validator from 'validator';
import { redirect } from 'next/navigation';

const phoneNumberSchema = z
  .string()
  .trim()
  .refine(
    (phoneNumber) => validator.isMobilePhone(phoneNumber, 'ko-KR'),
    'Invalid phone number format.'
  );
const verifyNumberSchema = z.coerce.number().min(100000).max(999999);

interface ActionState {
  verifyNumber: boolean;
}

export async function smsLogin(prevState: ActionState, formData: FormData) {
  const phoneNumber = formData.get('phoneNumber');
  const verifyNumber = formData.get('verifyNumber');

  if (!prevState.verifyNumber) {
    const result = phoneNumberSchema.safeParse(phoneNumber);
    if (!result.success) {
      return {
        verifyNumber: false,
        error: result.error.flatten(),
      };
    } else {
      return {
        verifyNumber: true,
      };
    }
  } else {
    const result = verifyNumberSchema.safeParse(verifyNumber);
    if (!result.success) {
      return {
        verifyNumber: true,
        error: result.error.flatten(),
      };
    } else {
      redirect('/');
    }
  }
}
