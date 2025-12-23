'use client';

import type { InputHTMLAttributes } from 'react';

import { cn } from '@/src/lib/cn';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className, ...props }: InputProps) => (
  <input
    className={cn(
      'h-10 w-full rounded-md border border-border bg-transparent px-3 text-sm',
      'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-black/30',
      className
    )}
    {...props}
  />
);
