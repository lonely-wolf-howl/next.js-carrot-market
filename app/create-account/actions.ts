'use server';

import { z } from 'zod';

const checkPassword = (password: string) => {
  return !password.includes('password');
};

const checkPasswordConfirm = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: '문자열만 입력이 가능합니다.',
        required_error: '빈칸을 채워 주세요.',
      })
      .min(3, '3자 이상으로 작성해 주세요.')
      .max(20, '20자 이내로 작성해 주세요.'),
    email: z.string().email(),
    password: z
      .string()
      .min(8, '8자 이상으로 작성해 주세요.')
      .refine(checkPassword, '비밀번호에 포함되면 안되는 단어가 존재합니다.'),
    confirmPassword: z.string().min(8, '8자 이상으로 작성해 주세요.'),
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

  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }
}
