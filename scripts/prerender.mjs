// Injects the server-rendered homepage into dist/index.html so crawlers without JS see the content.
import { readFileSync, writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const indexPath = resolve('dist/index.html')
const { render } = await import(pathToFileURL(resolve('dist-server/entry-server.js')).href)

const html = readFileSync(indexPath, 'utf8')
const marker = '<div id="root"></div>'
if (!html.includes(marker)) {
  throw new Error('prerender: <div id="root"></div> not found in dist/index.html')
}

const appHtml = render()
writeFileSync(indexPath, html.replace(marker, `<div id="root">${appHtml}</div>`))
console.log(`prerender: injected ${appHtml.length} chars into dist/index.html`)
