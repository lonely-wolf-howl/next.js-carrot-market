'use client';

import Input from '@/components/input';
import Button from '@/components/button';
import { useFormState } from 'react-dom';
import { smsVerification } from './actions.ts';

export default function SMSLogin() {
  const [state, dispatch] = useFormState(smsVerification, null);

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h2 className="text-xl">아래 빈칸을 채워 주세요.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="phoneNumber"
          type="number"
          placeholder="전화번호"
          required
        />
        <Input
          name="verifyNumber"
          type="number"
          placeholder="인증번호"
          required
        />
        <Button text="SMS 인증" />
      </form>
    </div>
  );
}
