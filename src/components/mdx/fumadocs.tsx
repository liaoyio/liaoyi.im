import type { MDXComponents } from 'mdx/types'
import * as Twoslash from 'fumadocs-twoslash/ui'
import { createGenerator } from 'fumadocs-typescript'
import { AutoTypeTable } from 'fumadocs-typescript/ui'
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion'
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock'
import { ImageZoom } from 'fumadocs-ui/components/image-zoom'
import { Step, Steps } from 'fumadocs-ui/components/steps'
import { Tab, Tabs } from 'fumadocs-ui/components/tabs'
import { TypeTable } from 'fumadocs-ui/components/type-table'

const generator = createGenerator()

export const FumadocsComponents: MDXComponents = {
  // HTML `ref` attribute conflicts with `forwardRef`
  pre: ({ ref: _ref, ...props }) =>
    (
      <CodeBlock {...props}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),
  img: props => <ImageZoom {...props} />,
  // https://fumadocs.dev/docs/ui/components/auto-type-table
  AutoTypeTable: props => <AutoTypeTable {...props} generator={generator} />,
  blockquote: props => <blockquote className="not-italic " {...props} />,
  Tabs,
  Tab,
  Steps,
  Step,
  Accordions,
  Accordion,
  TypeTable,
  ...Twoslash,
}
