const isDevelopment = process.env.NODE_ENV === "development";

module.exports = {
  async redirects() {
    return !isDevelopment ? [] : [
      {
        source: '/',
        destination: '/en',
        permanent: true,
      },
      {
        source: '/learn',
        destination: '/en/learn',
        permanent: true,
      },
      {
        source: '/cheatsheet',
        destination: '/en/cheatsheet',
        permanent: true,
      },
    ]
  },
}