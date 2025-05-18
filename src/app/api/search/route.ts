import { createFromSource } from 'fumadocs-core/search/server'
import { postsSource } from '@/lib/source'

export const { GET } = createFromSource(postsSource)
