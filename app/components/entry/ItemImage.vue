<script setup lang="ts">
import type { Item } from '~~/shared/tableTypes'

type Props = {
  itemId?: Identifier
  item?: Item
  count?: number
  showLink?: boolean
  override?: Override
}
const { itemId, item, count = 1, showLink = true, override = {} } = defineProps<Props>()

const entryType = Identifier.withDefaultNamespace('item')
</script>

<template>
  <EntryImage
    :entry-type="entryType"
    :entry-id="itemId"
    :entry="item"
    :get-entry-data="async () => await getItemData(itemId)"
    :count="count"
    :show-link="showLink"
    :override="override"
  />
</template>
