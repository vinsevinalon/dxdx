'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navigation = () => {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'HOME' },
    { href: '/works', label: 'WORKS' },
    { href: '/studies', label: 'STUDIES' },
    { href: '/contact', label: 'CONTACT' }
  ]

  return (
    <nav className="fixed top-8 left-8 z-50 pointer-events-auto">
      <ul className="flex flex-col gap-4">
        {navItems.map(({ href, label }) => (
          <li key={href}>
            <Link 
              href={href}
              className={`text-white hover:text-gray-300 transition-colors text-lg font-medium ${
                pathname === href ? 'text-yellow-400' : ''
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation