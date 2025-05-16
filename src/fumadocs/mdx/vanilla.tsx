import type { TableOfContents } from 'fumadocs-core/server'
import type { ReactNode } from 'react'
import { QuarteredGridBackground } from '@fumadocs/components/background'
import { Section } from '@fumadocs/section'
import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import { DocsPage } from 'fumadocs-ui/page'
import { cn } from '@/lib/cn'

interface MdxLayoutProps {
  children: ReactNode
  title: string
  toc?: TableOfContents
}

export default function VanillaMdx({
  children,
  title,
  toc,
}: MdxLayoutProps): ReactNode {
  return (
    <>
      <Section className="p-4 lg:p-6">
        <h1 className="text-center font-bold text-3xl leading-tight tracking-tighter md:text-4xl">
          {title}
        </h1>
      </Section>

      <DocsLayout
        nav={{ enabled: false }}
        tree={{
          name: 'JustMDX',
          children: [],
        }}
        sidebar={{ enabled: false, prefetch: false, tabs: false }}
        containerProps={{
          className: cn(
            'vanilla-page-layout relative container md:[--fd-nav-height:57px]',
          ),
        }}
      >
        <QuarteredGridBackground maxWidthClass="container" />
        <DocsPage
          toc={toc}
          article={{
            className: 'vanilla-page-article !m-[unset] max-w-none',
          }}
          tableOfContent={{
            style: 'clerk',
            single: false,
          }}
        >
          <div className="prose min-w-0">{children}</div>
        </DocsPage>
      </DocsLayout>
    </>
  )
}
