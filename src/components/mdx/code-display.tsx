'use client'

interface CodeDisplayProps {
  component: React.ReactNode
  children: React.ReactNode
}

export default function CodeDisplay({ component, children }: CodeDisplayProps) {
  return (
    <div className="flex flex-col gap-6 overflow-hidden">
      <div className="w-full p-8 flex items-center justify-center  rounded-lg border bg-gray-50 dark:bg-fd-card/200">
        {component}
      </div>
      <div className="w-full overflow-hidden">{children}</div>
    </div>
  )
}

/**
 * Usage:
 <CodeDisplay component={<Opacity />}>
  <include lang="tsx" meta={{title: "opacity.tsx"}}>
    ../../../components/animations/opacity.tsx
  </ include>
</CodeDisplay>
 */
