/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
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
        source: '/learn/:lesson*',
        destination: '/en/learn/:lesson*',
      },
      {
        source: '/cheatsheet',
        destination: '/en/cheatsheet',
      },
      {
        source: '/playground',
        destination: '/en/playground',
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
        source: '/en/learn/:lesson*',
        destination: '/learn/:lesson*',
        permanent: true,
      },
      {
        source: '/en/cheatsheet',
        destination: '/cheatsheet',
        permanent: true,
      },
      {
        source: '/en/playground',
        destination: '/playground',
        permanent: true,
      },
    ]
  }
}