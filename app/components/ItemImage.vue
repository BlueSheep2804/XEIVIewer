<script setup lang="ts">
import type { Item } from '~~/shared/tableTypes'

type Props = {
  itemId?: Identifier
  item?: Item
  showLink?: boolean
  override?: Override
}
const { itemId, item, showLink = true, override = {} } = defineProps<Props>()

async function getEntryData(): Promise<Item> {
  const { data, execute } = await useItem(itemId?.full ?? '')
  await execute()
  return data.value as Item
}
</script>

<template>
  <EntryImage
    entry-type="item"
    :entry-id="itemId"
    :entry="item"
    :get-entry-data="getEntryData"
    :show-link="showLink"
    :override="override"
  />
</template>
