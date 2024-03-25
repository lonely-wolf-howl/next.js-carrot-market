'use server';

import { z } from 'zod';

const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);

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
      .max(20, '20자 이내로 작성해 주세요.')
      .toLowerCase()
      .trim(),
    email: z.string().email().toLowerCase(),
    password: z
      .string()
      .min(8, '8자 이상으로 작성해 주세요.')
      .regex(
        passwordRegex,
        '대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.'
      ),
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
  } else {
    console.log(result.data);
  }
}
