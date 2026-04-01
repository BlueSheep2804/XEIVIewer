<script setup lang="ts">
import type { Fluid } from '~~/shared/tableTypes'

type Props = {
  fluidId?: Identifier
  fluid?: Fluid
  showLink?: boolean
  override?: Override
}
const { fluidId, fluid, showLink = true, override = {} } = defineProps<Props>()

async function getEntryData(): Promise<Fluid> {
  const { data, execute } = await useFluid(fluidId?.full ?? '')
  await execute()
  return data.value as Fluid
}
</script>

<template>
  <EntryImage
    entry-type="fluid"
    :entry-id="fluidId"
    :entry="fluid"
    :get-entry-data="getEntryData"
    :show-link="showLink"
    :override="override"
  />
</template>
