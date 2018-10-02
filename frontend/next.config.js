require('dotenv').config();

const webpack = require('webpack');
const withPlugins = require('next-compose-plugins')
const withTypescript = require('@zeit/next-typescript')
const withCSS = require('@zeit/next-css')
const withMDX = require('@zeit/next-mdx')()

const nextConfig = {
  distDir: 'build',
  generateBuildId: async () => {
    return 'cuistot'
  },
  webpack: (config) => {
    config.plugins.push(
      new webpack.EnvironmentPlugin(process.env)
    )
    return config
  }
};

module.exports = withPlugins([withTypescript, withMDX, withCSS], nextConfig)
