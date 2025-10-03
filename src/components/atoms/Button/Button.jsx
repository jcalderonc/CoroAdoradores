import { forwardRef } from 'react'

// Button variants
const BUTTON_VARIANTS = {
  primary: 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl',
  secondary: 'bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white',
  outline: 'bg-transparent border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
  danger: 'bg-red-500 hover:bg-red-600 text-white shadow-lg hover:shadow-xl',
  success: 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl',
  warning: 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg hover:shadow-xl',
  info: 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl'
}

// Button sizes
const BUTTON_SIZES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl'
}

// Button shapes
const BUTTON_SHAPES = {
  rounded: 'rounded-md',
  pill: 'rounded-full',
  square: 'rounded-none'
}

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  shape = 'rounded',
  disabled = false,
  loading = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variantClasses = BUTTON_VARIANTS[variant] || BUTTON_VARIANTS.primary
  const sizeClasses = BUTTON_SIZES[size] || BUTTON_SIZES.md
  const shapeClasses = BUTTON_SHAPES[shape] || BUTTON_SHAPES.rounded
  
  const classes = `${baseClasses} ${variantClasses} ${sizeClasses} ${shapeClasses} ${className}`

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={classes}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
