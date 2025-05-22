import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

function Dot(props: { delay?: number }) {
  return (
    <div
      className="bg-[#adadad] size-2 animate-pulse rounded-full"
      style={{ animationDelay: `${props.delay}ms` }}
    />
  )
}

function Message(props: {
  active: boolean
  text?: string
  typing?: boolean
}) {
  return (
    <div className="reveal reveal-xs bg-[#e8e8e8] flex max-w-max rounded-xl px-3 py-1 text-left">
      {props.typing
        ? (
            <div className="inline-flex h-6.5 items-center gap-1">
              <Dot />
              <Dot delay={props.active ? 100 : 0} />
              <Dot delay={props.active ? 200 : 0} />
            </div>
          )
        : (
            <span>{props.text}</span>
          )}
    </div>
  )
}

export function Chat({
  active,
  setActive,
}: {
  active: boolean
  setActive: () => void
}) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!active)
      return
    const durations = [1000, 500, 1500, 2000]
    const delay = durations[step] || 2500

    if (step < 4) {
      const timeout = setTimeout(() => setStep(step + 1), delay)
      return () => clearTimeout(timeout)
    }

    if (step === 4) {
      setActive()
      setTimeout(() => {
        setStep(0)
      }, 500)
    }
  }, [active, step])

  return (
    <div
      className={cn(
        'ease-bounce invisible absolute bottom-16 flex scale-105 flex-col justify-end gap-2 font-sans opacity-0 blur duration-800 sm:bottom-10',
        { 'visible scale-100 opacity-100 blur-none': active },
      )}
    >
      <Message
        active={active}
        text="yooo sorry"
        typing={step === 0}
      />
      {step > 1 && (
        <Message
          active={active}
          text={'i\'ll update you later 🤫'}
          typing={step === 2}
        />
      )}
    </div>
  )
}
