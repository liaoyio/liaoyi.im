import type { MDXComponents } from 'mdx/types'
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock'
import { Step, Steps } from 'fumadocs-ui/components/steps'
import { Tab, Tabs } from 'fumadocs-ui/components/tabs'
import defaultMdxComponents from 'fumadocs-ui/mdx'
import GithubCodeBlock from '@/components/github-code-block'

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    pre: ({ ref: _ref, ...props }) => (
      <CodeBlock {...props}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),
    Tab,
    Tabs,
    Step,
    Steps,
    GithubCodeBlock,
    ...components,
  }
}

export const useMDXComponents = getMDXComponents
