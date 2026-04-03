<script setup lang="ts">
import type { Fluid } from '~~/shared/tableTypes'

type Props = {
  fluidId?: Identifier
  fluid?: Fluid
  count?: number
  showLink?: boolean
  override?: Override
}
const { fluidId, fluid, showLink = true, override = {} } = defineProps<Props>()

const entryType = Identifier.withDefaultNamespace('fluid')
</script>

<template>
  <EntryImage
    :entry-type="entryType"
    :entry-id="fluidId"
    :entry="fluid"
    :get-entry-data="async () => await getFluidData(fluidId)"
    :count="count"
    :show-link="showLink"
    :override="override"
  />
</template>
