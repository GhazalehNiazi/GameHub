import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNewLeagueStore } from "../store/newLeagueStore";
import { Input } from "@/shared/components/ui/Input";
import { Select } from "@/shared/components/ui/Select";
import {
  leagueSetupSchema,
  type LeagueSetupFormValues,
} from "../schemas/leagueSchemas";

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
  } = useForm<LeagueSetupFormValues>({
    resolver: zodResolver(leagueSetupSchema),
    defaultValues: { leagueName, fifaVersion },
  });

  const onSubmit = (data: LeagueSetupFormValues) => {
    updateFields(data);
    setStep(2);
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
          {...register("leagueName")}
          error={errors.leagueName?.message}
        />
      </div>

      <div>
        <Select
          label='What fifa game are you playing?'
          subLabel='Fifa Version'
          placeholder='Select'
          options={FIFA_VERSIONS}
          {...register("fifaVersion")}
          error={errors.fifaVersion?.message}
        />
      </div>
    </form>
  );
}
