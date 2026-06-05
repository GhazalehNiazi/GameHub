import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNewLeagueStore } from "@/store/newLeagueStore";

interface AttendeesFormInputs {
  list: { id: string; resolvedName?: string; avatar?: string }[];
}

export function AttendeesListStep() {
  const { attendees, updateFields, setStep } = useNewLeagueStore();

  const { register, control, handleSubmit, setValue, watch } =
    useForm<AttendeesFormInputs>({
      defaultValues: { list: attendees },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "list",
  });

  const currentList = watch("list");

  // Calculate if we have at least 3 successfully resolved and added attendees
  const resolvedCount = currentList.filter((item) => item.resolvedName).length;
  const isContinueDisabled = resolvedCount < 3;

  const onSubmit = (data: AttendeesFormInputs) => {
    updateFields({ attendees: data.list });
    setStep(3);
  };

  // Intercept the removal action to maintain the strict 3-slot floor boundary
  const handleRemoveClick = (index: number) => {
    if (currentList.length <= 3) {
      // If removing this would leave us with less than 3 total slots,
      // we remove the selected row, but immediately push a clean empty input slot to the end.
      remove(index);
      append({ id: "" });
    } else {
      // Otherwise, we have plenty of fields on the screen, just remove it normally
      remove(index);
    }
  };

  const handleAddClick = (index: number) => {
    const enteredId = currentList[index]?.id?.trim();
    if (!enteredId) return;

    if (enteredId.toLowerCase().includes("leftie")) {
      setValue(`list.${index}.resolvedName`, "Ilialeftie");
      setValue(`list.${index}.avatar`, "🦥");
    } else {
      setValue(`list.${index}.resolvedName`, enteredId);
      setValue(`list.${index}.avatar`, "👤");
    }
  };

  return (
    <form
      id='new-league-form-2'
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-5 animate-fade-in text-left'
    >
      {/* Informational Header Section */}
      <div className='space-y-1'>
        <h2 className='text-sm font-bold text-zinc-900 flex items-center gap-2'>
          ✓ Add Attendees for the league.
        </h2>
        <div className='flex items-start gap-3 p-3 bg-zinc-50 border border-zinc-100 rounded-xl'>
          <span className='text-zinc-400 text-sm mt-0.5'>ℹ️</span>
          <p className='text-[11px] text-zinc-500 leading-normal'>
            After playing with people, you can add them as a friend to access
            them easier here. For now, search your friend's IDs and add them
          </p>
        </div>
      </div>

      {/* Roster Stack */}
      <div className='space-y-3'>
        {fields.map((field, index) => {
          const resolvedName = currentList[index]?.resolvedName;
          const avatar = currentList[index]?.avatar;
          const currentInputValue = currentList[index]?.id || "";

          /* --- STATE 2: USER IS ADDED / RESOLVED --- */
          if (resolvedName) {
            return (
              <div
                key={field.id}
                className='flex items-center justify-between p-3.5 bg-zinc-50 border border-zinc-200/60 rounded-xl animate-fade-in'
              >
                <div className='flex items-center gap-2.5'>
                  <div className='w-7 h-7 rounded-full bg-orange-100 flex items-center justify-center text-sm'>
                    {avatar}
                  </div>
                  <span className='text-xs font-semibold text-zinc-800'>
                    {resolvedName}
                  </span>
                </div>
                <button
                  type='button'
                  onClick={() => handleRemoveClick(index)} // Uses our protective structural interceptor
                  className='px-2.5 py-1 text-[10px] font-bold text-zinc-500 hover:text-zinc-800 bg-white border border-zinc-200 rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer flex items-center gap-1'
                >
                  ー Remove
                </button>
              </div>
            );
          }

          /* --- STATE 1: RAW INPUT WITH EXPLICIT "ADD" BUTTON --- */
          return (
            <div
              key={field.id}
              className='w-full space-y-1.5 text-left animate-fade-in'
            >
              <div className='flex items-center justify-between'>
                <label className='block text-xs font-medium text-zinc-700'>
                  User's ID
                </label>

                {/* Optional UI cleanup: If there are more than 3 input fields total, let them close an un-added empty slot */}
                {currentList.length > 3 && (
                  <button
                    type='button'
                    onClick={() => handleRemoveClick(index)}
                    className='text-[10px] font-semibold text-zinc-400 hover:text-zinc-600 cursor-pointer'
                  >
                    Cancel
                  </button>
                )}
              </div>

              <div className='relative flex items-center'>
                <input
                  placeholder='ID'
                  {...register(`list.${index}.id` as const)}
                  className='w-full pl-4 pr-20 py-3 bg-zinc-50 border border-zinc-200/80 rounded-xl text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 focus:bg-white transition-all'
                />

                {currentInputValue.trim().length > 0 && (
                  <button
                    type='button'
                    onClick={() => handleAddClick(index)}
                    className='absolute right-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-900 text-white text-[11px] font-bold rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer animate-fade-in'
                  >
                    ＋ Add
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Append Trigger link */}
      <button
        type='button'
        onClick={() => append({ id: "" })}
        className='text-xs font-bold text-zinc-800 hover:text-zinc-950 flex items-center gap-1.5 pt-1 pl-1 cursor-pointer transition-colors active:opacity-70'
      >
        <span className='text-sm'>＋</span> Add more members
      </button>

      <input type='submit' className='hidden' disabled={isContinueDisabled} />
    </form>
  );
}
