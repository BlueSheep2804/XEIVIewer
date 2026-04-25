import type { RecipeEntry } from '../tableTypes'
import { Identifier } from './identifier'

// eslint-disable-next-line no-useless-escape
const regex = /^(?:(?<count>\d+)x )?(?:(?<isTag>#)?(?<type>[0-9a-z_.\/:-]+);?)(?<id>[0-9a-z_.\/-]+:[0-9a-z_.\/-]+)$/

export class Ingredient {
  public value: IngredientValue[]

  constructor(entries: RecipeEntry[]) {
    if (entries.length == 0) {
      this.value = []
    } else {
      this.value = entries.map(entry => parseIngredientValue(entry))
    }
  }
}

export interface IngredientValue {
  type: Identifier
  entry: Identifier
  isTag: boolean
  amount: number
  chance: number
}

export function parseIngredientValue(entry: string | RecipeEntry): IngredientValue {
  if (typeof entry === 'string') {
    const matchGroup = entry.match(regex)?.groups
    const count = Number.parseInt(matchGroup?.count ?? '1')
    const type = matchGroup?.type ?? 'item'
    const id = matchGroup?.id ?? 'xeiexporter:unknown'
    const isTag = (matchGroup?.isTag ?? '') !== ''
    return {
      type: Identifier.parse(type),
      entry: Identifier.parse(id),
      isTag,
      amount: count,
      chance: 1
    }
  } else {
    return {
      type: Identifier.parse(entry.type),
      entry: Identifier.parse(entry.entry.replace('#', '')),
      isTag: entry.entry.startsWith('#'),
      amount: entry.amount ?? 1,
      chance: entry.chance ?? 1
    }
  }
}
