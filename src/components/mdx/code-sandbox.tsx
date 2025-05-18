export interface CodeSandboxEmbedProps {
  url: string
}

const CodeSandboxEmbed: React.FC<CodeSandboxEmbedProps> = (props) => {
  return <iframe className="h-[35rem] w-full rounded-lg border-none" src={props.url} />
}

export default CodeSandboxEmbed
