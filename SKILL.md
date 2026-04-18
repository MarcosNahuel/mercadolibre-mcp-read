---
name: mercadolibre-mcp-read
description: MCP server read-only de Mercado Libre con 7 tools de consulta (productos, órdenes, preguntas, métricas, reputación, competidores, categorías). Sin riesgo de modificar la tienda — ideal para análisis, reporting y exploración.
version: 1.0.0
metadata:
  openclaw:
    requires:
      env:
        - ML_CLIENT_ID
        - ML_CLIENT_SECRET
        - ML_REFRESH_TOKEN
      bins:
        - node
    primaryEnv: ML_REFRESH_TOKEN
    emoji: "🔍"
    homepage: https://github.com/MarcosNahuel/mercadolibre-mcp-read
---

# Mercado Libre MCP (read-only)

Subset seguro para análisis y reporting. No modifica datos en la tienda.

## Cuándo usar esta skill

Invocala cuando el usuario pida:
- Reportes sobre órdenes, ventas, conversion
- Análisis de preguntas recibidas (sin responderlas)
- Métricas de una publicación
- Chequeo de reputación del vendedor
- Búsqueda de competencia por keyword
- Exploración del catálogo de categorías de MercadoLibre

Para **responder preguntas**, **actualizar precio/stock** o **gestionar ads**, cambiar a `@traid/mercadolibre-mcp` (versión comercial completa).

## Tools

| Tool | Input principal | Output |
|---|---|---|
| `list_products` | seller_id | Lista de items con id, título, precio, stock |
| `get_orders` | seller_id, status, date_from | Órdenes con items, comprador, envío, pagos |
| `list_questions` | seller_id, status | Preguntas con texto, fecha, estado |
| `get_item_metrics` | item_id | Visitas, conversion, health_score |
| `get_reputation` | seller_id | Nivel MercadoLíder, power_seller_status |
| `search_competitors` | query, site_id | Productos top por keyword |
| `get_categories` | site_id | Árbol de categorías |

## Setup

Ver [README.md](./README.md) para configuración OAuth.

## Ejemplo de uso

```
User: "¿cuántas preguntas tengo sin responder de la última semana?"
Agent: list_questions({seller_id: "362367800", status: "UNANSWERED"})
→ 23 preguntas sin responder...
```

## Errores comunes

- `401 Unauthorized` → token expiró o ML_CLIENT_SECRET incorrecta
- `403 Forbidden` → scope insuficiente (tu app necesita "read:orders", "read:items", etc.)
- `429 Too Many Requests` → esperar 1 minuto y reintentar

## Relación con otros MCPs

- `mercadolibre/mercadolibre-mcp-server` (oficial) → solo docs search, no seller ops
- `lumile/mercadolibre-mcp` → read-only community, deprecó search
- `dan1d/mercadolibre-mcp` → read-only community, search public
- `@traid/mercadolibre-mcp-read` (este) → read-only completo **con auth**, seller ops
- `@traid/mercadolibre-mcp` (comercial) → 11 tools incluyendo write-back
