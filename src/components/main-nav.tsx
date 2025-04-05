import { Link } from '@tanstack/react-router'

const MENU_ITEMS = [
  { to: '/', label: 'Inicio' },
  { to: '/posts', label: 'Blog' },
  { to: '/about', label: 'Sobre Mí' },
  { to: '/contact', label: 'Contacto' },
]

export function MainNav() {
  return (
    <nav className="bg-zinc-900 text-white">
      <div className="w-[70%] mx-auto py-4">
        <ul className="flex items-center gap-8">
          {MENU_ITEMS.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="hover:text-zinc-300 transition-colors"
                activeProps={{
                  className: 'text-blue-400 font-medium',
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
