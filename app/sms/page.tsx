'use client';

import Input from '@/components/input';
import Button from '@/components/button';
import { useFormState } from 'react-dom';
import { smsLogin } from './actions';

const initialState = {
  verifyNumber: false,
  error: undefined,
};

export default function SMSLogin() {
  const [state, dispatch] = useFormState(smsLogin, initialState);

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h2 className="text-xl">아래 빈칸을 채워 주세요.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        {state.verifyNumber ? (
          <Input
            name="verifyNumber"
            type="number"
            placeholder="인증번호"
            required
            errors={state.error?.formErrors}
            min={100000}
            max={999999}
          />
        ) : (
          <Input
            name="phoneNumber"
            type="text"
            placeholder="전화번호"
            required
          />
        )}
        <Button
          text={state.verifyNumber ? 'SMS 로그인' : 'SMS 인증번호 발송'}
        />
      </form>
    </div>
  );
}
