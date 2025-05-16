'use client'

import type { HTMLAttributes } from 'react'
import { PlusIcon } from 'lucide-react'
import { QuarteredGridBackground } from '@/fumadocs/components/background'
import { cn } from '@/lib/cn'

type SectionProps = { sectionClassName?: string } & HTMLAttributes<HTMLDivElement>

function Cross() {
  return (
    <div className="relative h-6 w-6">
      <div className="absolute left-3 h-6 w-px bg-background" />
      <div className="absolute top-3 h-px w-6 bg-background" />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2">
        <PlusIcon size={20} className="text-border/70 dark:text-border" />
      </div>
    </div>
  )
}

export function Section({
  children,
  sectionClassName,
  className,
  ...props
}: SectionProps) {
  return (
    <section className={sectionClassName} {...props}>
      <div className="container relative mx-auto">
        <QuarteredGridBackground maxWidthClass="container" />
        <div className={cn(className)}>{children}</div>
        <div className="-bottom-3 -left-3 absolute z-10 hidden h-6 sm:block">
          <Cross />
        </div>
        <div className="-bottom-3 -right-3 -translate-x-px absolute z-10 hidden h-6 sm:block">
          <Cross />
        </div>
      </div>
    </section>
  )
}
