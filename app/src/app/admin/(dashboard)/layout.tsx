import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/negocios', label: 'Negócios', icon: '🏪' },
  { href: '/admin/guias', label: 'Guias', icon: '👤' },
  { href: '/admin/bairros', label: 'Bairros', icon: '📍' },
  { href: '/admin/billing', label: 'Billing', icon: '💳' },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const auth = cookieStore.get('admin_auth')?.value
  const isAuthenticated = auth === process.env.ADMIN_PASSWORD

  if (!isAuthenticated) redirect('/admin/login')

  return (
    <div className="min-h-screen flex" style={{ background: '#0f1929', color: '#f5f7fa' }}>
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-[rgba(255,255,255,0.07)] flex flex-col">
        <div className="p-5 border-b border-[rgba(255,255,255,0.07)]">
          <Link href="/" className="flex items-center gap-2 text-white no-underline">
            <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
              <path d="M20 3C13.37 3 8 8.37 8 15c0 9.75 12 22 12 22s12-12.25 12-22C32 8.37 26.63 3 20 3z" fill="#2a8c8c"/>
              <circle cx="20" cy="15" r="5" fill="white"/>
              <circle cx="20" cy="6" r="3" fill="#e8603a"/>
            </svg>
            <span className="font-[family-name:var(--font-jakarta)] font-bold text-sm">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 flex flex-col gap-1">
          {NAV_ITEMS.map(item => (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[#8a9bc4] text-sm hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors">
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-[rgba(255,255,255,0.07)]">
          <Link href="/admin/logout" className="flex items-center gap-2 px-3 py-2 text-[#8a9bc4] text-xs hover:text-white transition-colors rounded-lg">
            ↩ Sair
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  )
}
