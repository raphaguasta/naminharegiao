import Nav from '@/components/Nav'

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="pt-20">{children}</main>
      <footer className="border-t border-[rgba(255,255,255,0.07)] px-[5vw] py-6 flex flex-wrap items-center justify-between gap-3 mt-16">
        <p className="text-[#8a9bc4] text-xs">© {new Date().getFullYear()} Na Minha Região. Todos os direitos reservados.</p>
        <div className="flex gap-5">
          <a href="/parceiros" className="text-[#8a9bc4] text-xs hover:text-white transition-colors">Para parceiros</a>
          <a href="https://wa.me/5511944405488" target="_blank" rel="noopener noreferrer" className="text-[#8a9bc4] text-xs hover:text-white transition-colors">Contato</a>
        </div>
      </footer>
    </>
  )
}
