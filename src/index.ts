#!/usr/bin/env node

// @traid/mercadolibre-mcp-read — subset READ-ONLY del MCP de Mercado Libre.
// 7 tools de lectura para análisis, reporting y consulta sin riesgo de modificar la tienda.
//
// Para write-back (update_price, update_stock, answer_question, manage_ads) ver:
//   @traid/mercadolibre-mcp (versión completa, comercial)

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'

// 7 tools de lectura
import { registerListProducts } from './tools/products.js'
import { registerGetOrders } from './tools/orders.js'
import { registerListQuestions } from './tools/questions.js'
import { registerGetItemMetrics } from './tools/metrics.js'
import { registerGetReputation } from './tools/reputation.js'
import { registerSearchCompetitors } from './tools/competitors.js'
import { registerGetCategories } from './tools/categories.js'

const server = new McpServer({
  name: 'mercadolibre-read',
  version: '1.0.0',
})

// Registrar las 7 tools read-only
registerListProducts(server)
registerGetOrders(server)
registerListQuestions(server)
registerGetItemMetrics(server)
registerGetReputation(server)
registerSearchCompetitors(server)
registerGetCategories(server)

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('[ml-mcp-read] Server iniciado — 7 tools read-only disponibles')
}

main().catch((error) => {
  console.error('[ml-mcp-read] Error fatal:', error)
  process.exit(1)
})
