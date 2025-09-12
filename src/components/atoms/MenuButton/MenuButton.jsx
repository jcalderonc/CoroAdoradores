export function MenuButton({
  children,
  href,
  active = false,
  onNavigate,
  className = "",
}) {
  const baseClasses =
    "px-4 py-2 rounded-md font-medium transition-all duration-500 block";
  const activeClasses = "bg-orange-500 text-slate-900";
  const inactiveClasses = "text-white bg-slate-950 hover:bg-orange-400";
  return (
    <a
      href={href}
      onClick={onNavigate}
      className={`${baseClasses} ${
        active ? activeClasses : inactiveClasses
      } ${className}`}
    >
      {children}
    </a>
  );
}
