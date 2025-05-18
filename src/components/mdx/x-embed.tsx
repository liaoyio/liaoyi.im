'use client'

import type { XEmbedProps } from 'react-social-media-embed'
import { XEmbed as XEmbedClient } from 'react-social-media-embed'

export default function XEmbed({ ...props }: XEmbedProps) {
  return (
    <div className="flex justify-center">
      <XEmbedClient {...props} />
    </div>
  )
}
