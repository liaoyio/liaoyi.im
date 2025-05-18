export default function Layout(props: { children: React.ReactNode, modal: React.ReactNode }) {
  // console.log(props)
  return (
    <>
      {props.children}
      {props.modal}
      <div id="modal-root" />
    </>
  )
}
