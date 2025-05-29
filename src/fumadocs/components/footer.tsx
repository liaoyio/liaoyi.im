import { QuarteredGridBackground } from '@/fumadocs/components/background'

export interface FooterNavigationItem {
  name: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export default function Footer({
  navigation,
}: {
  navigation: FooterNavigationItem[]
}) {
  return (
    <footer>
      <div className="relative isolate mx-auto container px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <QuarteredGridBackground maxWidthClass="container" />
        <div className="flex justify-center gap-x-6 md:order-2">
          {navigation.map(item => (
            <a
              key={item.name}
              href={item.href}
              className="dark:text-gray-400 dark:hover:text-gray-500 text-black hover:text-gray-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon aria-hidden="true" className="size-6" />
            </a>
          ))}
        </div>
        <p className="mt-8 text-center text-sm/6 text-gray-600 dark:text-gray-400 md:order-1 md:mt-0">
          &copy; 2025 liaoyi.space. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
