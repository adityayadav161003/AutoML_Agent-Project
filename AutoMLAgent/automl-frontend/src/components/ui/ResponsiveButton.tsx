import React, { KeyboardEvent, forwardRef } from 'react';

interface ResponsiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const ResponsiveButton = forwardRef<HTMLButtonElement, ResponsiveButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      className = '',
      onKeyDown,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = 'rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    // Size styles
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg',
    };
    
    // Variant styles
    const variantStyles = {
      primary: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white focus:ring-purple-500',
      secondary: 'bg-gray-800 hover:bg-gray-700 text-white focus:ring-gray-500',
      outline: 'border border-gray-600 hover:bg-gray-800 text-white focus:ring-gray-500',
      ghost: 'hover:bg-gray-800 text-white focus:ring-gray-500',
    };
    
    // Width styles
    const widthStyles = fullWidth ? 'w-full' : '';
    
    // Disabled styles
    const disabledStyles = props.disabled ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-lg';
    
    // Combined styles
    const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyles} ${disabledStyles} ${className}`;
    
    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
      // Handle Enter key press
      if (e.key === 'Enter') {
        e.preventDefault();
        if (!props.disabled && !isLoading) {
          props.onClick?.(e as any);
        }
      }
      
      // Call the original onKeyDown handler if provided
      onKeyDown?.(e);
    };
    
    return (
      <button
        ref={ref}
        className={combinedStyles}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {isLoading ? (
          <>
            <span className="inline-block animate-spin mr-2">⟳</span>
            {loadingText || children}
          </>
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

ResponsiveButton.displayName = 'ResponsiveButton';

export default ResponsiveButton;