import React from "react";
import { Input } from "@/components/ui/Input";

interface PhoneFormStepProps {
  phone: string;
  onChange: (value: string) => void;
}

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
