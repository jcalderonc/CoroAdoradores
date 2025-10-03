const ButtonGroup = ({
  children,
  orientation = 'horizontal',
  spacing = 'md',
  className = ''
}) => {
  const orientationClasses = {
    horizontal: 'flex-row',
    vertical: 'flex-col'
  }

  const spacingClasses = {
    sm: 'gap-1',
    md: 'gap-2',
    lg: 'gap-4'
  }

  const baseClasses = 'inline-flex'
  const orientationClass = orientationClasses[orientation] || orientationClasses.horizontal
  const spacingClass = spacingClasses[spacing] || spacingClasses.md

  return (
    <div className={`${baseClasses} ${orientationClass} ${spacingClass} ${className}`}>
      {children}
    </div>
  )
}

export default ButtonGroup
