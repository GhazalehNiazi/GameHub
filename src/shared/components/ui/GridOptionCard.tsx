import React from "react";
import type { GridOptionCardProps } from "@/shared/types";

export function GridOptionCard({
  icon,
  title,
  isSelected,
  onClick,
}: GridOptionCardProps) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`flex-1 p-4 bg-white border rounded-2xl flex items-center gap-2.5 shadow-sm text-left transition-all duration-150 cursor-pointer active:scale-[0.98] ${
        isSelected
          ? "border-teal-500 bg-teal-50/5 ring-1 ring-teal-500"
          : "border-zinc-200 hover:border-zinc-300"
      }`}
    >
      <div
        className={`text-zinc-600 font-medium ${isSelected ? "text-teal-600" : ""}`}
      >
        {icon}
      </div>
      <span className='text-xs font-semibold text-zinc-800 tracking-tight leading-snug'>
        {title}
      </span>
    </button>
  );
}
