export const headerData = [
  {
    id: "home",
    href: "#home",
    label: "Home",
    requireAuth: false,
    hideWhenAuthenticated: false,
  },
  {
    id: "scheduler",
    href: "#scheduler",
    label: "Calendario",
    requireAuth: true,
    hideWhenAuthenticated: false,
  },
  {
    id: "rehearsals",
    href: "#rehearsals",
    label: "Misas",
    requireAuth: false,
    hideWhenAuthenticated: false,
  },
  {
    id: "profile",
    href: "#profile",
    label: "Mi Perfil",
    requireAuth: true,
    hideWhenAuthenticated: false,
  },
  {
    id: "login",
    href: "#login",
    label: "Login",
    requireAuth: false,
    hideWhenAuthenticated: true, // Hide when user is logged in
  },
  {
    id: "register",
    href: "#register",
    label: "Registro",
    requireAuth: false,
    hideWhenAuthenticated: true, // Hide when user is logged in
  },
];
