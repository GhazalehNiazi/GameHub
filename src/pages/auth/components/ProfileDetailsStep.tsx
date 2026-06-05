import React from "react";
import { useForm } from "react-hook-form";
import { useRegisterStore } from "@/store/registerStore";
import { Input } from "@/components/ui/Input";

interface ProfileFormInputs {
  name: string;
  username: string;
}

export function ProfileDetailsStep() {
  const { name, username, avatar, updateFields, setStep } = useRegisterStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormInputs>({
    defaultValues: { name, username },
  });

  const onSubmit = (data: ProfileFormInputs) => {
    updateFields(data);
    setStep(2);
  };

  const avatars = [
    { id: "cat", emoji: "🐱", bg: "bg-purple-100" },
    { id: "monkey", emoji: "🐵", bg: "bg-indigo-100" },
    { id: "sloth", emoji: "🦥", bg: "bg-orange-100" },
    { id: "goat", emoji: "🐐", bg: "bg-amber-100" },
  ];

  return (
    <form
      id='step-form-1'
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-4 animate-fade-in text-left'
    >
      <p className='text-xs text-zinc-500'>
        Provide your information to create your account.
      </p>

      <div className='space-y-3'>
        <Input
          placeholder='Name'
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className='text-[10px] text-red-500 pl-1'>{errors.name.message}</p>
        )}

        <Input
          placeholder='User Name'
          {...register("username", {
            required: "Username is required",
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message: "Alphanumeric and underscores only",
            },
          })}
        />
        {errors.username && (
          <p className='text-[10px] text-red-500 pl-1'>
            {errors.username.message}
          </p>
        )}
      </div>

      <div className='flex items-start gap-2 p-3 bg-zinc-50 border rounded-xl'>
        <p className='text-[11px] text-zinc-500'>
          Your Username must be unique and cannot be changed later.
        </p>
      </div>

      <div className='space-y-2'>
        <h4 className='text-xs font-medium text-zinc-700'>Choose an avatar</h4>
        <div className='flex gap-3 overflow-x-auto py-1'>
          {avatars.map((av) => (
            <button
              key={av.id}
              type='button'
              onClick={() => updateFields({ avatar: av.id })}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all border-2 flex-shrink-0 cursor-pointer ${av.bg} ${
                avatar === av.id
                  ? "border-teal-500 scale-105 shadow-sm"
                  : "border-transparent opacity-60"
              }`}
            >
              {av.emoji}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}
