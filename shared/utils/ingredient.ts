import { Identifier } from './identifier'

// eslint-disable-next-line no-useless-escape
const regex = /^(?:(?<count>\d+)x )?(?:(?<isTag>#)?(?<type>[0-9a-z_.\/:-]+);?)(?<id>[0-9a-z_.\/-]+:[0-9a-z_.\/-]+)$/

export class Ingredient {
  public value: IngredientValue[]

  constructor(entries: string) {
    if (entries.length == 0) {
      this.value = []
    } else {
      this.value = entries.split(',').map(entry => parseIngredientValue(entry))
    }
  }
}

export interface IngredientValue {
  type: Identifier
  value: Identifier
  isTag: boolean
  count: number
}

export function parseIngredientValue(entry: string): IngredientValue {
  const matchGroup = entry.match(regex)?.groups
  const count = Number.parseInt(matchGroup?.count ?? '1')
  const type = matchGroup?.type ?? 'item'
  const id = matchGroup?.id ?? 'xeiexporter:unknown'
  const isTag = (matchGroup?.isTag ?? '') !== ''
  return {
    type: Identifier.parse(type),
    value: Identifier.parse(id),
    isTag,
    count
  }
}
