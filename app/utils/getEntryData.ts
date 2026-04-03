import type { Fluid, Item, CommonEntry } from '~~/shared/tableTypes'

export type GetEntryData = (entryId: Identifier | undefined) => Promise<CommonEntry>

export async function getItemData(itemId: Identifier | undefined): Promise<Item> {
  const { data, execute } = await useItem(itemId?.full ?? '')
  await execute()
  return data.value as Item
}

export async function getFluidData(fluidId: Identifier | undefined): Promise<Fluid> {
  const { data, execute } = await useFluid(fluidId?.full ?? '')
  await execute()
  return data.value as Fluid
}

export type EntryGetters = {
  [key: string]: GetEntryData
}
export const entryGetters: EntryGetters = {
  [Identifier.withDefaultNamespace('item').full]: getItemData,
  [Identifier.withDefaultNamespace('fluid').full]: getFluidData
}

export function entryGetter(key: string): GetEntryData {
  const getter = entryGetters[key]
  if (typeof getter === 'undefined') {
    return async _ => ({
      id: -1,
      namespace: 'xeiexporter',
      name: 'unknown',
      descriptionId: 'item.xeiexporter.unknown'
    })
  }
  return getter
}
