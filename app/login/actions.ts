'use server';

export const handleForm = async (formData: FormData) => {
  console.log(formData.get('email'));
  return {
    errors: ['계정과 비밀번호를 다시 확인해 주세요.'],
  };
};
