import { defaultShouldDehydrateQuery, isServer, QueryClient } from '@tanstack/react-query'

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: query =>
          defaultShouldDehydrateQuery(query)
          || query.state.status === 'pending',
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined

export function getQueryClient() {
  if (isServer) {
    return createQueryClient()
  }
  else {
    if (!browserQueryClient)
      browserQueryClient = createQueryClient()
    return browserQueryClient
  }
}
