'use client';

import type { SelectHTMLAttributes } from 'react';

import { cn } from '@/lib/cn';

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
};

export const Select = ({ options, value, onChange, className, ...props }: SelectProps) => (
  <select
    className={cn(
      'h-10 rounded-md border border-border bg-transparent px-3 text-sm',
      'focus:outline-none focus:ring-2 focus:ring-black/30',
      className
    )}
    value={value}
    onChange={(event) => onChange(event.target.value)}
    {...props}
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
