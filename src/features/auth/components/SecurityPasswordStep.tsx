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
      <p className='text-xs text-zinc-600'>
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
            showPass ? "bg-teal-500" : "bg-zinc-200"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
              showPass ? "translate-x-4" : "translate-x-0"
            }`}
          />
        </button>
        <span className='text-xs text-zinc-600 font-medium'>
          Show Passwords
        </span>
      </div>

      <div className='p-4 bg-zinc-50/70 border border-zinc-200/80 rounded-2xl space-y-3 text-xs text-zinc-600'>
        <div className='flex items-center gap-2.5'>
          <div className='w-5 h-5 rounded-full bg-zinc-700 text-white flex items-center justify-center font-serif text-xs font-bold flex-shrink-0'>
            i
          </div>
          <p className='font-medium text-zinc-700 text-[12px] leading-snug'>
            Please follow the guidelines for your password
          </p>
        </div>
        <div className='space-y-1.5 pl-1 text-[11px] text-zinc-500'>
          <p className={`flex items-center gap-2 ${hasMinLength ? "text-teal-600 font-medium" : ""}`}>
            <span>✓</span>
            <span>Your password must be at least 8 characters</span>
          </p>
          <p className={`flex items-center gap-2 ${hasNumAndAlpha ? "text-teal-600 font-medium" : ""}`}>
            <span>✓</span>
            <span>Please use characters and numbers.</span>
          </p>
          <p className='flex items-center gap-2 text-zinc-500'>
            <span>✓</span>
            <span>I will write the rest of it later in documentation.</span>
          </p>
        </div>
      </div>

      <button type='submit' className='hidden' aria-hidden='true' tabIndex={-1} />
    </form>
  );
}
