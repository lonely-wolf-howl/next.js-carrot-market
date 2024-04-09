'use server';

import { z } from 'zod';
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from '@/lib/constants';
import db from '@/lib/db';
import bcrypt from 'bcrypt';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const checkPasswordConfirm = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

const checkUsernameIsUnique = async (username: string) => {
  const isExist = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });

  return !Boolean(isExist);
};

const checkEmailIsUnique = async (email: string) => {
  const isExist = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return !Boolean(isExist);
};

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: '문자열만 입력이 가능합니다.',
        required_error: '빈칸을 채워 주세요.',
      })
      .toLowerCase()
      .trim()
      .refine(checkUsernameIsUnique, '이미 존재하는 사용자 이름입니다.'),
    email: z
      .string()
      .email()
      .toLowerCase()
      .refine(checkEmailIsUnique, '이미 존재하는 계정입니다.'),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH, '8자 이상으로 작성해 주세요.')
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirmPassword: z
      .string()
      .min(PASSWORD_MIN_LENGTH, '8자 이상으로 작성해 주세요.'),
  })
  .refine(checkPasswordConfirm, {
    message: '입력된 비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  };

  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 10);

    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    const cookie = await getIronSession(cookies(), {
      cookieName: 'carrot-market',
      password: process.env.COOKIE_PASSWORD!,
    });
    //@ts-ignore
    cookie.id = user.id; // encrypt
    await cookie.save();

    redirect('/profile');
  }
}
