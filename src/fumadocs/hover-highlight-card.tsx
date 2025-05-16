import { cn } from '@/lib/cn'

export function HoverHighlightCard(
  {
    children,
    className,
    hasTranslate = true,
  }: {
    children: React.ReactNode
    className?: string
    hasTranslate?: boolean
  },
) {
  return (
    <div
      className={cn(
        'group relative px-4 py-8 overflow-hidden transition-all duration-300',
        'border border-dashed bg-white dark:bg-background will-change-transform',
        hasTranslate && 'hover:-translate-y-0.5',
        className,
      )}
    >
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100',
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:4px_4px]" />
      </div>

      <div className="relative size-full">
        {children}
      </div>

      <div
        className={cn(
          'absolute inset-0 -z-10 p-px',
          'bg-gradient-to-br from-transparent',
          'transition-opacity duration-300',
          'via-gray-100/40 to-transparent dark:via-white/10 opacity-0 group-hover:opacity-100',
        )}
      />
    </div>
  )
}
