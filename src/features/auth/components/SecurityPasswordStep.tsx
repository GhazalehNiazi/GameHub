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
      <p className='text-xs text-zinc-500'>
        Set a password for your account to sign up.
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

      <label className='flex items-center gap-2 py-1 cursor-pointer select-none'>
        <input
          type='checkbox'
          checked={showPass}
          disabled={disabled}
          onChange={() => setShowPass(!showPass)}
          className='rounded text-teal-600 w-4 h-4'
        />
        <span className='text-xs text-zinc-600 font-medium'>
          Show Passwords
        </span>
      </label>

      <div className='p-4 bg-zinc-50 border rounded-xl space-y-2 text-[11px] text-zinc-500'>
        <p className='font-semibold text-zinc-700'>Password guidelines:</p>
        <p className={hasMinLength ? "text-teal-600" : ""}>
          {hasMinLength ? "✓" : "•"} At least 8 characters
        </p>
        <p className={hasNumAndAlpha ? "text-teal-600" : ""}>
          {hasNumAndAlpha ? "✓" : "•"} Must contain letters and numbers
        </p>
      </div>

      <button type='submit' className='hidden' aria-hidden='true' tabIndex={-1} />
    </form>
  );
}
