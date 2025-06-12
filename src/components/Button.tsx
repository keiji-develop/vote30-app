import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'icon' | 'close' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = "font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantStyles = {
    primary: `text-white border border-transparent hover:opacity-90 focus:ring-2`,
    secondary: `text-white border hover:opacity-90 focus:ring-2`,
    ghost: `bg-transparent border border-transparent hover:opacity-80 focus:ring-2`,
    icon: `bg-white/80 border border-transparent hover:bg-white/90 hover:shadow-lg focus:ring-2 rounded-full shadow`,
    close: `bg-transparent border border-transparent hover:opacity-70 focus:ring-1 text-2xl font-semibold leading-none`,
    danger: `bg-red-600 text-white hover:bg-red-700 focus:ring-red-500`
  };

  const sizeStyles = {
    sm: 'px-3 py-1 text-sm rounded',
    md: 'px-6 py-2 text-base rounded',
    lg: 'px-8 py-3 text-lg rounded-lg'
  };

  const iconSizeStyles = {
    sm: 'p-1 text-lg',
    md: 'p-2 text-2xl',
    lg: 'p-3 text-3xl'
  };

  const closeSizeStyles = {
    sm: 'p-1 text-lg',
    md: 'p-2 text-2xl',
    lg: 'p-3 text-3xl'
  };

  const getVariantColor = (variant: ButtonVariant) => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--primary)',
          borderColor: 'var(--primary)',
          '--tw-ring-color': 'var(--primary-light)'
        };
      case 'secondary':
        return {
          backgroundColor: 'transparent',
          borderColor: 'var(--neutral-800)',
          color: 'var(--neutral-800)',
          '--tw-ring-color': 'var(--neutral-300)'
        };
      case 'ghost':
        return {
          color: 'var(--neutral-700)',
          '--tw-ring-color': 'var(--neutral-300)'
        };
      case 'icon':
        return {
          color: 'var(--neutral-500)',
          '--tw-ring-color': 'var(--primary-light)'
        };
      case 'close':
        return {
          color: 'var(--neutral-800)',
          '--tw-ring-color': 'var(--neutral-300)'
        };
      case 'danger':
        return {
          backgroundColor: 'var(--red-600)',
          borderColor: 'var(--red-600)',
          '--tw-ring-color': 'var(--red-500)'
        };
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    if (variant === 'icon') return iconSizeStyles[size];
    if (variant === 'close') return closeSizeStyles[size];
    return sizeStyles[size];
  };

  const combinedClassName = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${getSizeStyles()}
    ${className}
  `.trim();

  return (
    <button
      className={combinedClassName}
      style={getVariantColor(variant)}
      {...props}
    >
      {children}
    </button>
  );
} 