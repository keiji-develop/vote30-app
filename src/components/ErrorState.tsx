import React from 'react';
import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  retryLabel?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'エラーが発生しました',
  message = 'データの読み込みに失敗しました。もう一度お試しください。',
  retryLabel = '再試行',
  onRetry,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center padding-xl ${className}`}>
      <div className="text-display-md margin-b-md" style={{ color: 'var(--error)' }}>
        ⚠️
      </div>
      
      <h3 className="text-heading-3 margin-b-sm" style={{ color: 'var(--error)' }}>
        {title}
      </h3>
      
      <p className="text-body-small margin-b-lg max-w-md" style={{ color: 'var(--neutral-600)' }}>
        {message}
      </p>
      
      {onRetry && (
        <Button
          variant="primary"
          size="md"
          onClick={onRetry}
        >
          {retryLabel}
        </Button>
      )}
    </div>
  );
}; 