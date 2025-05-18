export interface StackBlitzEmbedProps {
  url: string
}

const StackBlitzEmbed: React.FC<StackBlitzEmbedProps> = (props) => {
  return <iframe className="h-[35rem] w-full rounded-lg border-none" src={props.url} />
}

export default StackBlitzEmbed
