'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5vw] py-5"
         style={{ backdropFilter: 'blur(14px)', background: 'rgba(26,39,68,0.9)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <Link href="/" className="flex items-center gap-2 font-[family-name:var(--font-jakarta)] font-bold text-[1.05rem] text-white no-underline">
        <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
          <path d="M20 3C13.37 3 8 8.37 8 15c0 9.75 12 22 12 22s12-12.25 12-22C32 8.37 26.63 3 20 3z" fill="#2a8c8c"/>
          <circle cx="20" cy="15" r="5" fill="white"/>
          <circle cx="13" cy="12" r="2.5" fill="rgba(255,255,255,0.4)"/>
          <circle cx="27" cy="12" r="2.5" fill="rgba(255,255,255,0.4)"/>
          <circle cx="20" cy="6" r="3" fill="#e8603a"/>
        </svg>
        Na Minha Região
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link href="/" className="text-[#8a9bc4] text-sm hover:text-white transition-colors">Explorar</Link>
        <Link href="/parceiros" className="text-[#8a9bc4] text-sm hover:text-white transition-colors">Para parceiros</Link>
        <a href="https://wa.me/5511944405488" target="_blank" rel="noopener noreferrer"
           className="bg-[#e8603a] text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-[#f07550] transition-colors">
          Fale conosco
        </a>
      </div>

      <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
          {menuOpen
            ? <><line x1="4" y1="4" x2="18" y2="18"/><line x1="18" y1="4" x2="4" y2="18"/></>
            : <><line x1="3" y1="7" x2="19" y2="7"/><line x1="3" y1="12" x2="19" y2="12"/><line x1="3" y1="17" x2="19" y2="17"/></>}
        </svg>
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#1e2e50] border-b border-[rgba(255,255,255,0.07)] flex flex-col px-[5vw] py-4 gap-3 md:hidden">
          <Link href="/" className="text-[#8a9bc4] text-sm hover:text-white" onClick={() => setMenuOpen(false)}>Explorar</Link>
          <Link href="/parceiros" className="text-[#8a9bc4] text-sm hover:text-white" onClick={() => setMenuOpen(false)}>Para parceiros</Link>
          <a href="https://wa.me/5511944405488" target="_blank" rel="noopener noreferrer"
             className="text-[#e8603a] text-sm font-medium" onClick={() => setMenuOpen(false)}>
            Fale conosco
          </a>
        </div>
      )}
    </nav>
  )
}
