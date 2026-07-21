import React from "react";
import { Input } from "@/shared/components/ui/Input";
import type { PhoneFormStepProps } from "../types";

export function PhoneFormStep({ phone, onChange }: PhoneFormStepProps) {
  return (
    <div className='animate-fade-in w-full'>
      <Input
        id='phoneNumber'
        label='Please enter your Phone number'
        placeholder='Phone Number'
        type='tel'
        value={phone}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
