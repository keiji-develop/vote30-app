import React from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = '🔍',
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center padding-xl ${className}`}>
      <div className="text-display-md margin-b-md" style={{ color: 'var(--neutral-400)' }}>
        {icon}
      </div>
      
      <h3 className="text-heading-3 margin-b-sm" style={{ color: 'var(--neutral-700)' }}>
        {title}
      </h3>
      
      {description && (
        <p className="text-body-small margin-b-lg max-w-md" style={{ color: 'var(--neutral-500)' }}>
          {description}
        </p>
      )}
      
      {actionLabel && onAction && (
        <Button
          variant="primary"
          size="md"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}; 