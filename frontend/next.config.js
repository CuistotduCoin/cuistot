const withPlugins = require('next-compose-plugins')
const withTypescript = require('@zeit/next-typescript')
const withCSS = require('@zeit/next-css')
const withMDX = require('@zeit/next-mdx')()

module.exports = withPlugins([withTypescript, withMDX, withCSS])
