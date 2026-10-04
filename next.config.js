/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  output: 'export',
  // Don't generate AGENTS.md / CLAUDE.md in the repo root on `next dev`.
  agentRules: false,
};
