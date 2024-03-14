import FormInput from '@/components/form-input';
import FormButton from '@/components/form-button';

export default function SMSLogin() {
  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h2 className="text-xl">아래 빈칸을 채워 주세요.</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput type="number" placeholder="전화번호" required errors={[]} />
        <FormInput type="number" placeholder="인증번호" required errors={[]} />
        <FormButton loading={false} text="SMS 인증" />
      </form>
    </div>
  );
}
