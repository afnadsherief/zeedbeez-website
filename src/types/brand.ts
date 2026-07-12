/**
 * Brand and market types.
 * Designed to support all current and future markets without redesign.
 */

export type Market = 'ae' | 'in' | 'gcc' | 'eu' | 'uk' | 'us' | 'au' | 'sea'

export type ProductId = 'hypermoon' | 'herbze' | 'zeedbeez-pro' | 'sleep-better'

export interface Product {
  readonly id: ProductId
  readonly name: string
  readonly market: Market
  readonly tagline: string
}

export interface MarketConfig {
  readonly code: Market
  readonly name: string
  readonly currency: string
  readonly locale: string
  readonly products: ReadonlyArray<ProductId>
}
