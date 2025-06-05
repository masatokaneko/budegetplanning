import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  className,
}) => {
  const percentage = Math.min(Math.max(value, 0), 100);

  return (
    <div className={cn('h-2 w-full rounded-full bg-gray-200', className)}>
      <div
        className={cn(
          'h-full rounded-full transition-all duration-500',
          percentage >= 100
            ? 'bg-green-500'
            : percentage >= 80
            ? 'bg-yellow-500'
            : 'bg-red-500'
        )}
        style={{ width: `${percentage}%` }}
      />
      <div className="mt-1 text-right text-sm text-gray-600">
        {percentage}%
      </div>
    </div>
  );
}; 