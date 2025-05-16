// Define a type for blog posts that matches the structure used in the app
export interface BlogPost {
  slugs?: string[]
  data: {
    date: Date
    tags?: string[]
    series?: string
    seriesPart?: number
    [key: string]: any
  }
  [key: string]: any
}

export interface BlogConfig {
  blogTitle: string
  blogDescription: string
  siteName: string
  siteUrl?: string
  defaultAuthorName: string
  author?: { name: string, url: string }
  creator?: string
  xUsername: string
  paginationTitle: (page: number) => string
  paginationDescription: (page: number) => string
  categoryPaginationTitle: (category: string, page: number) => string
  categoryPaginationDescription: (category: string, page: number) => string
  blogBase: string
  blogOgImageBase: string
  pageSize: number
}
