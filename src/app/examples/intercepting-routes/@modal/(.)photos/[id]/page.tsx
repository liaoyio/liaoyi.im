import Image from 'next/image'
import { Modal } from './modal'

export default async function PhotoModal({ params }: { params: Promise<{ id: string }> }) {
  const photoId = (await params).id
  return (
    <Modal>
      <Image src={`/images/t${photoId}.jpg`} fill alt={photoId} className="rounded-lg" />
    </Modal>
  )
}
