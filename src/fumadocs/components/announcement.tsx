import type { badgeVariants } from '@shadcn/badge'
import type { VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'react'
import { Badge } from '@shadcn/badge'
import { cn } from '@/lib/cn'

export type AnnouncementProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof badgeVariants> & {
    themed?: boolean
  }

export function Announcement({
  variant = 'outline',
  themed = false,
  className,
  ...props
}: AnnouncementProps) {
  return (
    <Badge
      variant={variant}
      className={cn(
        'group max-w-full gap-2 rounded-full bg-background px-3 py-0.5 font-medium shadow-sm transition-all',
        'hover:shadow-md',
        themed && 'announcement-themed border-foreground/5',
        className,
      )}
      {...props}
    />
  )
}

export type AnnouncementTagProps = HTMLAttributes<HTMLDivElement>

export function AnnouncementTag({
  className,
  ...props
}: AnnouncementTagProps) {
  return (
    <div
      className={cn(
        '-ml-2.5 shrink-0 truncate rounded-full bg-foreground/5 px-2.5 py-1 text-xs',
        'group-[.announcement-themed]:bg-background/60',
        className,
      )}
      {...props}
    />
  )
}

export type AnnouncementTitleProps = HTMLAttributes<HTMLDivElement>

export function AnnouncementTitle({
  className,
  ...props
}: AnnouncementTitleProps) {
  return (
    <div
      className={cn('flex items-center gap-1 truncate py-1', className)}
      {...props}
    />
  )
}
