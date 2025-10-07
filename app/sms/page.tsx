"use client";

import Input from "@/components/input";
import Button from "@/components/button";
import { useFormState } from "react-dom";
import { smsLogin } from "./actions";

const initialState = {
  verifyNumber: false,
  error: undefined,
};

export default function SMSLogin() {
  const [state, dispatch] = useFormState(smsLogin, initialState);

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h2 className="text-xl">Fill in the form below.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        {state.verifyNumber ? (
          <Input
            name="verifyNumber"
            type="number"
            placeholder="Verification Code"
            required
            errors={state.error?.formErrors}
            min={100000}
            max={999999}
          />
        ) : (
          <Input
            name="phoneNumber"
            type="text"
            placeholder="Phone Number"
            required
          />
        )}
        <Button
          text={
            state.verifyNumber ? "Log in with SMS" : "Send Verification Code"
          }
        />
      </form>
    </div>
  );
}
