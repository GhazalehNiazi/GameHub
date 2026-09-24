import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/components/ui/Input";
import { phoneSchema, type PhoneFormValues } from "../schemas/authSchemas";
import type { PhoneFormStepProps } from "../types";

export function PhoneFormStep({
  initialPhone = "",
  onSubmit,
  disabled = false,
}: PhoneFormStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    mode: "onBlur",
    defaultValues: { phone: initialPhone },
  });

  return (
    <form
      id='login-phone-form'
      onSubmit={handleSubmit(onSubmit)}
      className='animate-fade-in w-full'
    >
      <Input
        id='phoneNumber'
        label='Please enter your Phone number'
        placeholder='Phone Number'
        type='tel'
        disabled={disabled}
        autoFocus
        {...register("phone")}
        error={errors.phone?.message}
      />
      <button type='submit' className='hidden' aria-hidden='true' tabIndex={-1} />
    </form>
  );
}
