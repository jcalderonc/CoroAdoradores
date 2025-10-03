import Button from '../Button/Button'

const IconButton = ({
  icon,
  children,
  variant = 'ghost',
  size = 'md',
  className = '',
  ...props
}) => {
  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-7 w-7'
  }

  const iconSize = iconSizes[size] || iconSizes.md

  return (
    <Button
      variant={variant}
      size={size}
      className={`p-2 ${className}`}
      {...props}
    >
      {icon && (
        <span className={iconSize}>
          {icon}
        </span>
      )}
      {children && (
        <span className={children ? 'ml-2' : ''}>
          {children}
        </span>
      )}
    </Button>
  )
}

export default IconButton
