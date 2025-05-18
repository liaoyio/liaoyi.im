import type { BaseLayoutProps, LinkItemType } from 'fumadocs-ui/layouts/shared'
import Image from 'next/image'
import { Icons } from '@/fumadocs/components/icons'

export const title = 'liaoyi.im'

export const description
  = 'Personal website of liaoyi.im. This is where I articulate my work, open source projects, thoughts, ideas, work, commentary and opinions.'
export const owner = 'liaoyi.im'

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <Image
          src="/avatar.jpg"
          width={28}
          height={28}
          alt="ly avatar"
          className="rounded-full"
        />
        {' '}
        liaoyi.im
      </>
    ),
  },
  links: [
    {
      text: 'Docs',
      url: '/docs',
    },
  ],
}

export const linkItems: LinkItemType[] = [
  {
    icon: <Icons.info />,
    text: 'Posts',
    url: '/posts',
    active: 'url',
  },
  {
    icon: <Icons.info />,
    text: 'About',
    url: '/about',
    active: 'url',
  },
]
