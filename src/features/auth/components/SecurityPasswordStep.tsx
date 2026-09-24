import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/components/ui/Input";
import { passwordSchema, type PasswordFormValues } from "../schemas/authSchemas";
import type { SecurityPasswordStepProps } from "../types";

export function SecurityPasswordStep({
  onSubmit,
  disabled = false,
}: SecurityPasswordStepProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    mode: "onBlur",
    defaultValues: { password: "", confirmPassword: "" },
  });

  const [showPass, setShowPass] = useState(false);
  const passwordVal = watch("password", "");

  const hasMinLength = passwordVal.length >= 8;
  const hasNumAndAlpha = /[A-Za-z]/.test(passwordVal) && /\d/.test(passwordVal);

  return (
    <form
      id='password-form'
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-4 animate-fade-in text-left'
    >
      <p className='text-xs text-content-secondary'>
        Please set a password for your account to sign up.
      </p>

      <div className='space-y-3'>
        <Input
          placeholder='Password'
          type={showPass ? "text" : "password"}
          disabled={disabled}
          autoFocus
          {...register("password")}
          error={errors.password?.message}
        />

        <Input
          placeholder='Password Confirmation'
          type={showPass ? "text" : "password"}
          disabled={disabled}
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
      </div>

      <div className='flex items-center gap-2.5 py-1 select-none'>
        <button
          type='button'
          role='switch'
          aria-checked={showPass}
          disabled={disabled}
          onClick={() => setShowPass(!showPass)}
          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            showPass ? "bg-brand" : "bg-surface-muted"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-content-inverse shadow-sm ring-0 transition duration-200 ease-in-out ${
              showPass ? "translate-x-4" : "translate-x-0"
            }`}
          />
        </button>
        <span className='text-xs text-content-secondary font-medium'>
          Show Passwords
        </span>
      </div>

      <div className='p-4 bg-surface-subtle border border-edge rounded-2xl space-y-3 text-xs text-content-secondary'>
        <div className='flex items-center gap-2.5'>
          <div className='w-5 h-5 rounded-full bg-content-secondary text-content-inverse flex items-center justify-center font-serif text-xs font-bold flex-shrink-0'>
            i
          </div>
          <p className='font-medium text-content-secondary text-[12px] leading-snug'>
            Please follow the guidelines for your password
          </p>
        </div>
        <div className='space-y-1.5 pl-1 text-[11px] text-content-muted'>
          <p className={`flex items-center gap-2 ${hasMinLength ? "text-brand font-medium" : ""}`}>
            <span>✓</span>
            <span>Your password must be at least 8 characters</span>
          </p>
          <p className={`flex items-center gap-2 ${hasNumAndAlpha ? "text-brand font-medium" : ""}`}>
            <span>✓</span>
            <span>Please use characters and numbers.</span>
          </p>
          <p className='flex items-center gap-2 text-content-muted'>
            <span>✓</span>
            <span>I will write the rest of it later in documentation.</span>
          </p>
        </div>
      </div>

      <button type='submit' className='hidden' aria-hidden='true' tabIndex={-1} />
    </form>
  );
}
