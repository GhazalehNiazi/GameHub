import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useRegisterStore } from "../store/registerStore";
import { Input } from "@/shared/components/ui/Input";
import { authService } from "@/services/api";

export function SecurityPasswordStep() {
  const navigate = useNavigate();
  const store = useRegisterStore();
  const [showPass, setShowPass] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { password: "", confirmPassword: "" },
  });

  const passwordVal = watch("password", "");
  const hasMinLength = passwordVal.length >= 8;
  const hasNumAndAlpha = /[A-Za-z]/.test(passwordVal) && /\d/.test(passwordVal);

  const onSubmit = async (data: { password: "" }) => {
    setIsSubmitting(true);
    setApiError("");
    try {
      await authService.register({
        name: store.name || "User",
        username: store.username || "user123",
        avatar: store.avatar || "🐵",
        game: store.game || "FIFA 24",
        password: data.password,
      });
      store.resetStore();
      navigate("/dashboard");
    } catch (err: any) {
      setApiError(err.message || "Failed to create account");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      id='step-form-3'
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-4 animate-fade-in text-left'
    >
      {apiError && (
        <div className='p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium text-center'>
          {apiError}
        </div>
      )}
      <p className='text-xs text-zinc-500'>
        Set a password for your account to sign up.
      </p>

      <div className='space-y-3'>
        <Input
          placeholder='Password'
          type={showPass ? "text" : "password"}
          {...register("password", {
            required: "Password is required",
            validate: {
              length: (v) => v.length >= 8 || "Must be at least 8 characters",
              alphaNum: (v) =>
                (/[A-Za-z]/.test(v) && /\d/.test(v)) ||
                "Must contain both letters and numbers",
            },
          })}
        />
        {errors.password && (
          <p className='text-[10px] text-red-500 pl-1'>
            {errors.password.message}
          </p>
        )}

        <Input
          placeholder='Password Confirmation'
          type={showPass ? "text" : "password"}
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (v) => v === passwordVal || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <p className='text-[10px] text-red-500 pl-1'>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <label className='flex items-center gap-2 py-1 cursor-pointer select-none'>
        <input
          type='checkbox'
          checked={showPass}
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
    </form>
  );
}
