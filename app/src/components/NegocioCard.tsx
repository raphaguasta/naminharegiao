'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { NegocioCompleto } from '@/lib/types'

const PRECO_LABEL = { '$': 'Econômico', '$$': 'Moderado', '$$$': 'Premium' }

export default function NegocioCard({ negocio }: { negocio: NegocioCompleto }) {
  const foto = negocio.fotos[0]

  return (
    <Link href={`/${negocio.slug}`}
      className="block bg-[#1e2e50] border border-[rgba(255,255,255,0.07)] rounded-2xl overflow-hidden hover:border-[rgba(42,140,140,0.4)] hover:-translate-y-1 transition-all duration-200 group">
      {foto && (
        <div className="relative h-44 w-full overflow-hidden">
          <Image src={foto} alt={negocio.nome} fill className="object-cover group-hover:scale-105 transition-transform duration-300" unoptimized />
          {negocio.destaque && (
            <span className="absolute top-2 left-2 bg-[#e8603a] text-white text-[0.65rem] font-semibold px-2 py-0.5 rounded-full">
              ✓ Destaque
            </span>
          )}
          {negocio.categoria && (
            <span className="absolute top-2 right-2 bg-[rgba(0,0,0,0.6)] text-white text-[0.65rem] px-2 py-0.5 rounded-full">
              {negocio.categoria.icone} {negocio.categoria.nome}
            </span>
          )}
        </div>
      )}
      <div className="p-4">
        <h3 className="font-[family-name:var(--font-jakarta)] font-bold text-white text-base mb-1 group-hover:text-[#3aabab] transition-colors line-clamp-1">
          {negocio.nome}
        </h3>
        <p className="text-[#8a9bc4] text-sm leading-relaxed line-clamp-2 mb-3">{negocio.descricao}</p>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {negocio.preco_medio && (
              <span className="text-[0.7rem] text-[#8a9bc4] bg-[rgba(255,255,255,0.05)] px-2 py-0.5 rounded-full">
                {negocio.preco_medio} · {PRECO_LABEL[negocio.preco_medio]}
              </span>
            )}
            {negocio.bairro && (
              <span className="text-[0.7rem] text-[#8a9bc4] bg-[rgba(255,255,255,0.05)] px-2 py-0.5 rounded-full">
                {negocio.bairro.nome}
              </span>
            )}
          </div>
          {(negocio.whatsapp || negocio.instagram) && (
            <div className="flex gap-1.5">
              {negocio.whatsapp && (
                <a href={`https://wa.me/${negocio.whatsapp}`} target="_blank" rel="noopener noreferrer"
                   className="text-[#3aabab] hover:text-[#2a8c8c] transition-colors" onClick={e => e.stopPropagation()}
                   title="WhatsApp">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.555 4.122 1.528 5.855L.057 23.998l6.304-1.654A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.017-1.378l-.36-.213-3.737.981.998-3.645-.234-.374A9.818 9.818 0 012.182 12C2.182 6.574 6.574 2.182 12 2.182S21.818 6.574 21.818 12 17.426 21.818 12 21.818z"/>
                  </svg>
                </a>
              )}
              {negocio.instagram && (
                <a href={`https://instagram.com/${negocio.instagram}`} target="_blank" rel="noopener noreferrer"
                   className="text-[#8a9bc4] hover:text-white transition-colors" onClick={e => e.stopPropagation()}
                   title="Instagram">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
