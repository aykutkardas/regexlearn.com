module.exports = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/en',
      },
      {
        source: '/learn',
        destination: '/en/learn',
      },
      {
        source: '/cheatsheet',
        destination: '/en/cheatsheet',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/en',
        destination: '/',
        permanent: true,
      },
      {
        source: '/en/learn',
        destination: '/learn',
        permanent: true,
      },
      {
        source: '/en/cheatsheet',
        destination: '/cheatsheet',
        permanent: true,
      },
    ]
  }
}