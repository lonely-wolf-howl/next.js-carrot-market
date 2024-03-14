import FormInput from '@/components/form-input';
import FormButton from '@/components/form-button';
import SocialLogin from '@/components/social-login';

export default function Login() {
  const handleForm = async (formData: FormData) => {
    'use server';
    console.log(formData.get('email'), formData.get('password'));
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
    console.log('login success!');
  };

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">아래 빈칸을 채워 주세요.</h2>
      </div>
      <form action={handleForm} className="flex flex-col gap-3">
        <FormInput
          name="email"
          type="email"
          placeholder="사용자 계정 (이메일)"
          required
          errors={[]}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          errors={[]}
        />
        <FormButton text="로그인" />
      </form>
      <SocialLogin />
    </div>
  );
}
