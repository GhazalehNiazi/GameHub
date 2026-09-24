import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/shared/components/ui/Input";
import { profileSchema, type ProfileFormValues } from "../schemas/authSchemas";
import type { ProfileDetailsStepProps } from "../types";

const AVATARS = [
  { id: "cat", emoji: "🐱", bg: "bg-purple-100" },
  { id: "monkey", emoji: "🐵", bg: "bg-indigo-100" },
  { id: "sloth", emoji: "🦥", bg: "bg-orange-100" },
  { id: "goat", emoji: "🐐", bg: "bg-amber-100" },
];

export function ProfileDetailsStep({
  initialValues,
  onSubmit,
  disabled = false,
}: ProfileDetailsStepProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: "onBlur",
    defaultValues: {
      name: initialValues?.name || "",
      username: initialValues?.username || "",
      avatar: initialValues?.avatar || "cat",
    },
  });

  const currentAvatar = watch("avatar");

  return (
    <form
      id='profile-form'
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-4 animate-fade-in text-left'
    >
      <p className='text-xs text-zinc-600'>
        Please Provide the required information to create your account.
      </p>

      <div className='space-y-3'>
        <Input
          placeholder='Name'
          disabled={disabled}
          autoFocus
          {...register("name")}
          error={errors.name?.message}
        />

        <Input
          placeholder='User Name'
          disabled={disabled}
          {...register("username")}
          error={errors.username?.message}
        />
      </div>

      <div className='flex items-center gap-3 p-3 bg-zinc-50 border border-zinc-100 rounded-xl'>
        <div className='w-5 h-5 rounded-full bg-zinc-700 text-white flex items-center justify-center font-serif text-xs font-bold flex-shrink-0'>
          i
        </div>
        <p className='text-[12px] text-zinc-500 leading-snug'>
          Your Username must be unique and it can not be changed later.
        </p>
      </div>

      <div className='space-y-2'>
        <h4 className='text-xs font-medium text-zinc-700'>Chose your avatar</h4>
        <input type='hidden' {...register("avatar")} />
        <div className='flex gap-3 overflow-x-auto py-1'>
          {AVATARS.map((av) => (
            <button
              key={av.id}
              type='button'
              disabled={disabled}
              onClick={() => setValue("avatar", av.id, { shouldValidate: true })}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all border-2 flex-shrink-0 cursor-pointer ${av.bg} ${
                currentAvatar === av.id
                  ? "border-teal-500 scale-105 shadow-sm"
                  : "border-transparent opacity-60"
              }`}
            >
              {av.emoji}
            </button>
          ))}
        </div>
      </div>

      <button type='submit' className='hidden' aria-hidden='true' tabIndex={-1} />
    </form>
  );
}
