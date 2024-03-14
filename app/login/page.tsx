'use client';

import FormInput from '@/components/form-input';
import FormButton from '@/components/form-button';
import SocialLogin from '@/components/social-login';

export default function Login() {
  const handleOnClick = async () => {
    const response = await fetch('api/users', {
      method: 'POST',
      body: JSON.stringify({
        username: 'username',
        password: 'password',
      }),
    });
    console.log(await response.json());
  };

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">아래 빈칸을 채워 주세요.</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput
          type="email"
          placeholder="사용자 계정 (이메일)"
          required
          errors={[]}
        />
        <FormInput
          type="password"
          placeholder="비밀번호"
          required
          errors={[]}
        />
      </form>
      <span onClick={handleOnClick}>
        <FormButton loading={false} text="로그인" />
      </span>
      <SocialLogin />
    </div>
  );
}
