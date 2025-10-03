import Button from '../Button/Button'

export function MenuButton({
  children,
  href,
  active = false,
  onNavigate,
  className = "",
  variant = "ghost",
  size = "md"
}) {
  const handleClick = (e) => {
    e.preventDefault()
    if (onNavigate) {
      onNavigate()
    }
  }

  return (
    <Button
      variant={active ? "primary" : variant}
      size={size}
      onClick={handleClick}
      className={`${active ? 'shadow-lg' : ''} ${className}`}
    >
      {children}
    </Button>
  )
}