import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNewLeagueStore } from "../store/newLeagueStore";
import {
  attendeesSchema,
  type AttendeesFormValues,
} from "../schemas/leagueSchemas";

export function AttendeesListStep() {
  const { attendees, updateFields, setStep } = useNewLeagueStore();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<AttendeesFormValues>({
    resolver: zodResolver(attendeesSchema),
    defaultValues: { list: attendees },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "list",
  });

  const currentList = watch("list");

  const listError =
    errors.list?.root?.message ||
    (errors.list as { message?: string } | undefined)?.message;

  const resolveAttendeeAtIndex = (index: number) => {
    const enteredId = currentList[index]?.id?.trim();
    if (!enteredId) return;

    if (enteredId.toLowerCase().includes("leftie")) {
      setValue(`list.${index}.resolvedName`, "Ilialeftie", {
        shouldValidate: true,
      });
      setValue(`list.${index}.avatar`, "🦥");
    } else {
      setValue(`list.${index}.resolvedName`, enteredId, {
        shouldValidate: true,
      });
      setValue(`list.${index}.avatar`, "👤");
    }
    clearErrors("list");
  };

  const handleAddClick = (index: number) => {
    resolveAttendeeAtIndex(index);
  };

  const onSubmit = (data: AttendeesFormValues) => {
    const validAttendees = data.list.filter((item) => item.resolvedName?.trim());
    updateFields({
      attendees: validAttendees.length >= 3 ? validAttendees : data.list,
    });
    setStep(3);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Auto-resolve any inputs where the user entered an ID but did not explicitly click the "Add" button
    currentList.forEach((item, index) => {
      const enteredId = item?.id?.trim();
      if (enteredId && !item.resolvedName) {
        if (enteredId.toLowerCase().includes("leftie")) {
          setValue(`list.${index}.resolvedName`, "Ilialeftie");
          setValue(`list.${index}.avatar`, "🦥");
        } else {
          setValue(`list.${index}.resolvedName`, enteredId);
          setValue(`list.${index}.avatar`, "👤");
        }
      }
    });

    handleSubmit(onSubmit)(e);
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

  return (
    <form
      id='new-league-form-2'
      onSubmit={handleFormSubmit}
      className='space-y-5 animate-fade-in text-left'
    >
      {/* Informational Header Section */}
      <div className='space-y-1'>
        <h2 className='text-sm font-bold text-content flex items-center gap-2'>
          ✓ Add Attendees for the league.
        </h2>
        <div className='flex items-start gap-3 p-3 bg-surface-subtle border border-edge-subtle rounded-xl'>
          <span className='text-content-subtle text-sm mt-0.5'>ℹ️</span>
          <p className='text-[11px] text-content-muted leading-normal'>
            After playing with people, you can add them as a friend to access
            them easier here. For now, search your friend's IDs and add them
          </p>
        </div>
        {listError && (
          <p className='text-[11px] text-danger font-medium pl-1 pt-1'>
            {listError}
          </p>
        )}
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
                className='flex items-center justify-between p-3.5 bg-surface-subtle border border-edge rounded-xl animate-fade-in'
              >
                <div className='flex items-center gap-2.5'>
                  <div className='w-7 h-7 rounded-full bg-badge-orange-bg flex items-center justify-center text-sm'>
                    {avatar}
                  </div>
                  <span className='text-xs font-semibold text-content'>
                    {resolvedName}
                  </span>
                </div>
                <button
                  type='button'
                  onClick={() => handleRemoveClick(index)} // Uses our protective structural interceptor
                  className='px-2.5 py-1 text-[10px] font-bold text-content-muted hover:text-content bg-surface border border-edge rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer flex items-center gap-1'
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
                <label className='block text-xs font-medium text-content-secondary'>
                  User's ID
                </label>

                {/* Optional UI cleanup: If there are more than 3 input fields total, let them close an un-added empty slot */}
                {currentList.length > 3 && (
                  <button
                    type='button'
                    onClick={() => handleRemoveClick(index)}
                    className='text-[10px] font-semibold text-content-subtle hover:text-content-secondary cursor-pointer'
                  >
                    Cancel
                  </button>
                )}
              </div>

              <div className='relative flex items-center'>
                <input
                  placeholder='ID'
                  {...register(`list.${index}.id` as const)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddClick(index);
                    }
                  }}
                  className='w-full pl-4 pr-20 py-3 bg-surface-subtle border border-edge rounded-xl text-sm text-content placeholder:text-content-subtle focus:outline-none focus:border-brand focus:bg-surface transition-all'
                />

                {currentInputValue.trim().length > 0 && (
                  <button
                    type='button'
                    onClick={() => handleAddClick(index)}
                    className='absolute right-2 px-3 py-1.5 bg-action-primary hover:bg-action-primary-hover text-action-primary-fg text-[11px] font-bold rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer animate-fade-in'
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
        className='text-xs font-bold text-content-secondary hover:text-content flex items-center gap-1.5 pt-1 pl-1 cursor-pointer transition-colors active:opacity-70'
      >
        <span className='text-sm'>＋</span> Add more members
      </button>
    </form>
  );
}
