'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import type { ReactNode } from 'react'

interface Props<T extends { id: string }> {
  items: T[]
  renderItem: (item: T) => ReactNode
  autoAdvanceMs?: number
}

export default function Carousel<T extends { id: string }>({
  items,
  renderItem,
  autoAdvanceMs = 5000,
}: Props<T>) {
  const [current, setCurrent] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const total = items.length

  const scrollToIndex = useCallback((index: number) => {
    const container = containerRef.current
    if (!container) return
    const item = container.children[index] as HTMLElement
    if (!item) return
    const containerRect = container.getBoundingClientRect()
    const itemRect = item.getBoundingClientRect()
    const scrollLeft = container.scrollLeft + (itemRect.left - containerRect.left)
    container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
  }, [])

  const goTo = useCallback((index: number) => {
    const next = ((index % total) + total) % total
    setCurrent(next)
    scrollToIndex(next)
  }, [total, scrollToIndex])

  // Auto-advance — restarts whenever current changes (resets timer on manual nav)
  useEffect(() => {
    if (total <= 1) return
    const t = setInterval(() => goTo(current + 1), autoAdvanceMs)
    return () => clearInterval(t)
  }, [current, goTo, total, autoAdvanceMs])

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-scroll snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map(item => (
          <div
            key={item.id}
            className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] flex-shrink-0 snap-start"
          >
            {renderItem(item)}
          </div>
        ))}
      </div>

      {total > 1 && (
        <div className="flex items-center justify-end gap-2 mt-4">
          <button
            onClick={() => goTo(current - 1)}
            className="w-8 h-8 rounded-full bg-[#1e2e50] border border-[rgba(255,255,255,0.1)] text-[#8a9bc4] hover:text-white hover:border-[rgba(42,140,140,0.4)] transition-all flex items-center justify-center text-sm leading-none"
            aria-label="Anterior"
          >
            ←
          </button>
          <span className="text-xs text-[#8a9bc4] w-8 text-center tabular-nums">
            {current + 1}/{total}
          </span>
          <button
            onClick={() => goTo(current + 1)}
            className="w-8 h-8 rounded-full bg-[#1e2e50] border border-[rgba(255,255,255,0.1)] text-[#8a9bc4] hover:text-white hover:border-[rgba(42,140,140,0.4)] transition-all flex items-center justify-center text-sm leading-none"
            aria-label="Próximo"
          >
            →
          </button>
        </div>
      )}
    </div>
  )
}
