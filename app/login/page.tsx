'use client';

import Input from '@/components/input';
import Button from '@/components/button';
import SocialLogin from '@/components/social-login';
import { useFormState } from 'react-dom';
import { login } from './actions';
import { PASSWORD_MIN_LENGTH } from '@/lib/constants';

export default function Login() {
  const [state, dispatch] = useFormState(login, null);

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">아래 빈칸을 채워 주세요.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="email"
          type="email"
          placeholder="사용자 계정 (이메일)"
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          errors={state?.fieldErrors.password}
          minLength={PASSWORD_MIN_LENGTH}
        />
        <Button text="로그인" />
      </form>
      <SocialLogin />
    </div>
  );
}
