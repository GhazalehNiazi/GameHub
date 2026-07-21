import React from "react";
import { useForm } from "react-hook-form";
import { useNewLeagueStore } from "../store/newLeagueStore";
import { Input } from "@/shared/components/ui/Input";
import { Select } from "@/shared/components/ui/Select";
import type { SetupInputs } from "../types";

const FIFA_VERSIONS = [
  { value: "fc25", label: "EA Sports FC 25" },
  { value: "fc24", label: "EA Sports FC 24" },
  { value: "fifa23", label: "FIFA 23" },
  { value: "fifa22", label: "FIFA 22" },
];

export function LeagueSetupStep() {
  const { leagueName, fifaVersion, updateFields, setStep } =
    useNewLeagueStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetupInputs>({
    defaultValues: { leagueName, fifaVersion },
  });

  const onSubmit = (data: SetupInputs) => {
    updateFields(data);
    setStep(2); // Advances state machine smoothly to Step 2
  };

  return (
    <form
      id='new-league-form-1'
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-5 animate-fade-in text-left'
    >
      <div>
        <Input
          label='Set a name for your league'
          placeholder='Name'
          {...register("leagueName", { required: "League name is required" })}
        />
        {errors.leagueName && (
          <p className='text-[10px] text-red-500 mt-1 pl-1'>
            {errors.leagueName.message}
          </p>
        )}
      </div>

      <div>
        <Select
          label='What fifa game are you playing?'
          subLabel='Fifa Version'
          placeholder='Select'
          options={FIFA_VERSIONS}
          {...register("fifaVersion", {
            required: "Please select a FIFA version",
          })}
        />
        {errors.fifaVersion && (
          <p className='text-[10px] text-red-500 mt-1 pl-1'>
            {errors.fifaVersion.message}
          </p>
        )}
      </div>
    </form>
  );
}
