const isDevelopment = process.env.NODE_ENV === "development";

module.exports = {
  async rewrites() {
    return !isDevelopment ? [] : [
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
}