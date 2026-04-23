import type { PgTable } from 'drizzle-orm/pg-core'
import { fluids, items, tagsFluid, tagsItem } from '../schema'

export const registries: Record<string, PgTable> = {
  item: items,
  fluid: fluids
}

export const registryTags: Record<string, PgTable> = {
  item: tagsItem,
  fluid: tagsFluid
}

export const registryIdentifier = {
  item: Identifier.withDefaultNamespace('item'),
  fluid: Identifier.withDefaultNamespace('fluid')
}
