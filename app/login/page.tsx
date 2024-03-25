'use client';

import FormInput from '@/components/form-input';
import FormButton from '@/components/form-button';
import SocialLogin from '@/components/social-login';
import { useFormState } from 'react-dom';
import { handleForm } from './actions.ts';

export default function Login() {
  const [state, action] = useFormState(handleForm, null);

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">아래 빈칸을 채워 주세요.</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <FormInput
          name="email"
          type="email"
          placeholder="사용자 계정 (이메일)"
          required
        />
        <FormInput
          name="password"
          type="password"
          placeholder="비밀번호"
          required
        />
        <FormButton text="로그인" />
      </form>
      <SocialLogin />
    </div>
  );
}
