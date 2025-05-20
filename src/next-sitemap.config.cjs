const BASE_URL
  = process.env.NODE_ENV === 'development' || !process.env.NEXT_PUBLIC_SITE_URL
    ? new URL('http://localhost:3000')
    : new URL(`https://${process.env.NEXT_PUBLIC_SITE_URL}`)

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  outDir: 'out',
  siteUrl: BASE_URL,
  generateRobotsTxt: true,
  transform: async (config, path) => {
    if (hasIgnorePath(path)) {
      return null
    }
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
}

function hasIgnorePath(path) {
  const pathsToIgnore = ['/api/', 'og', 'examples']
  return pathsToIgnore.some(pattern => path.includes(pattern))
}
