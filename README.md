# @traid/mercadolibre-mcp-read

> MCP server **read-only** para Mercado Libre. 7 tools de consulta y análisis, sin riesgo de modificar tu tienda.

[![npm version](https://badge.fury.io/js/@traid%2Fmercadolibre-mcp-read.svg)](https://www.npmjs.com/package/@traid/mercadolibre-mcp-read)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

Hecho por [TRAID Agency](https://traid.agency) — parte del ecosistema [GlobalStats](https://globalstats-traid.vercel.app).

## ¿Por qué read-only?

Este paquete expone **solo operaciones de lectura** para análisis, reporting, exploración de catálogo y consulta de competencia. Ideal para:

- Dashboards de BI conectados a Mercado Libre
- Agentes que generan reportes sobre ventas, reputación o preguntas
- Investigación de mercado / análisis de competencia
- Integraciones en IDEs agénticos (Claude Code, Cursor, Continue)

**Si necesitás modificar la tienda** (actualizar precio, responder preguntas, gestionar ads), usá la versión completa comercial `@traid/mercadolibre-mcp` — contactar a TRAID Agency.

## Tools incluidas

| Tool | Qué hace |
|------|----------|
| `list_products` | Lista las publicaciones de un vendedor |
| `get_orders` | Obtiene órdenes/ventas con detalle (ítems, comprador, envío) |
| `list_questions` | Lista preguntas recibidas (filtros: item, estado) |
| `get_item_metrics` | Métricas de una publicación: visitas, conversión, health score |
| `get_reputation` | Reputación del vendedor y nivel MercadoLíder |
| `search_competitors` | Busca productos de la competencia por keyword |
| `get_categories` | Categorías y atributos oficiales de ML (para publicar) |

## Instalación

### Desde npm

```bash
npm install -g @traid/mercadolibre-mcp-read
```

### Desde este repo

```bash
git clone https://github.com/MarcosNahuel/mercadolibre-mcp-read
cd mercadolibre-mcp-read
npm install
npm run build
```

## Configuración

Soporta dos modos de autenticación OAuth2:

### Opción A: Token directo (recomendado si renovás el token externo)

```json
{
  "mcpServers": {
    "mercadolibre": {
      "command": "npx",
      "args": ["-y", "@traid/mercadolibre-mcp-read"],
      "env": {
        "ML_ACCESS_TOKEN": "APP_USR-...",
        "ML_SITE_ID": "MLA"
      }
    }
  }
}
```

### Opción B: Auto-refresh (sin dependencias externas)

1. Crear app en [developers.mercadolibre.com](https://developers.mercadolibre.com)
2. Autorizar vía OAuth y guardar `CLIENT_ID`, `CLIENT_SECRET`, `REFRESH_TOKEN`

```json
{
  "mcpServers": {
    "mercadolibre": {
      "command": "npx",
      "args": ["-y", "@traid/mercadolibre-mcp-read"],
      "env": {
        "ML_CLIENT_ID": "...",
        "ML_CLIENT_SECRET": "...",
        "ML_REFRESH_TOKEN": "...",
        "ML_SITE_ID": "MLA"
      }
    }
  }
}
```

El site_id para Argentina es `MLA`; para México `MLM`; para Brasil `MLB`. Ver [lista completa](https://developers.mercadolibre.com.ar/en_us/standard-countries).

## Uso desde Claude Code

1. Agregá el bloque `mcpServers` de arriba a `.mcp.json` o `claude.json`
2. Reiniciá Claude Code
3. Pedile: "listá mis últimas 10 órdenes" o "cuántas preguntas sin responder tengo"

## Uso desde Cursor / Continue / otros clientes MCP

Cualquier cliente que respete el estándar [Model Context Protocol](https://modelcontextprotocol.io/) puede usar este server. Configurar el JSON equivalente en la config del cliente.

## Ejemplos de uso

```
User: ¿cuál es mi publicación más visitada del último mes?
Agent: [llama list_products → identifica el más exitoso por visitas → llama get_item_metrics]
→ Tu publicación MLA123456 (Cortinas Blackout Gris) tuvo 12,000 visitas con 3.2% de conversión...

User: ¿qué está vendiendo más mi competencia en cortinas?
Agent: [llama search_competitors con keyword "cortinas blackout"]
→ Los 5 productos top de competidores son...
```

## Limitaciones conocidas

- La API de Mercado Libre cambió en 2025 y algunos endpoints públicos (ej: `/sites/MLA/search` sin auth) tienen restricciones nuevas. Este MCP usa endpoints autenticados para evitar esos problemas.
- No soporta webhooks — para eventos en tiempo real, usar directamente la API oficial.
- Rate limits están sujetos a los de Mercado Libre (6,000 req/hora por app por default).

## Upgrade path a la versión completa

Cuando necesites escribir a MercadoLibre (responder preguntas automáticamente, actualizar precios, gestionar Product Ads), la versión comercial `@traid/mercadolibre-mcp` agrega:

- `answer_question` — respuesta automática con guardrails
- `update_price` — cambio de precio con historial y rollback
- `update_stock` — sincronización de stock
- `manage_ads` — activar/pausar Product Ads con policy
- Observabilidad completa: logs estructurados, métricas, audit trail
- Soporte comercial y SLA

Contactar: [contacto@traid.agency](mailto:contacto@traid.agency)

## Licencia

MIT © 2026 TRAID Agency

## Contribuir

Issues y PRs bienvenidos en [github.com/MarcosNahuel/mercadolibre-mcp-read](https://github.com/MarcosNahuel/mercadolibre-mcp-read).

## Related

- [@traid/mercadolibre-mcp](https://github.com/MarcosNahuel/mercadolibre-mcp) — versión completa comercial (11 tools con write-back)
- [GlobalStats](https://github.com/MarcosNahuel/globalstats) — dashboard operativo para sellers LATAM que usa este MCP
- [Model Context Protocol](https://modelcontextprotocol.io/) — especificación del protocolo
- [Claude Agent Skills](https://agentskills.io/) — estándar interoperable de Skills para agentes
