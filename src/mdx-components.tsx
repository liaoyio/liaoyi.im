import type { MDXComponents } from 'mdx/types'
import defaultMdxComponents from 'fumadocs-ui/mdx'
import { MyCustomMDXComponents } from '@/components/mdx'
import { FumadocsComponents } from '@/components/mdx/fumadocs'

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...FumadocsComponents,
    ...MyCustomMDXComponents,
    ...components,
  }
}

export const useMDXComponents = getMDXComponents
