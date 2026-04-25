<script setup>
import { onKeyDown } from '@vueuse/core'

const route = useRoute()
const router = useRouter()
const fluidId = ref(Identifier.parse(route.params.id))

const recipeOutputUrl = computed(() => getRecipeOutputUrl(registryIdentifier.fluid, fluidId.value))
const recipeInputUrl = computed(() => getRecipeInputUrl(registryIdentifier.fluid, fluidId.value))

onKeyDown('r', (_) => {
  router.push(recipeOutputUrl.value)
}, { dedupe: true })

onKeyDown('u', (_) => {
  router.push(recipeInputUrl.value)
}, { dedupe: true })

const { data: fluidData, execute } = await useFluid(fluidId.value.full)
await execute()

const fluidName = computed(() => getEntryName(fluidData.value?.descriptionId))
</script>

<template>
  <div>
    <UPageSection v-if="fluidData">
      <FluidImage :fluid="fluidData" :show-link="false" class="max-w-17" />
      <h1 class="text-4xl font-bold">
        {{ fluidName }}
      </h1>
      <div class="flex gap-4 flex-wrap">
        <UButton icon="lucide:scan-search" size="xl" :to="recipeOutputUrl">
          <UKbd>R</UKbd>
          {{ $t('common.view_recipes') }}
        </UButton>
        <UButton icon="lucide:package-search" size="xl" :to="recipeInputUrl">
          <UKbd>U</UKbd>
          {{ $t('common.view_uses') }}
        </UButton>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <EntryInfoCard icon="lucide:scroll-text" :header="$t('fluid.fluid_id')" :value="fluidId.full" />
        <EntryInfoCard icon="lucide:message-square-text" :header="$t('fluid.translation_key')" :value="fluidData.descriptionId" />
        <EntryInfoCard icon="lucide:thermometer-sun" :header="$t('fluid.temperature')" :value="fluidData.temperature" />
      </div>
    </UPageSection>
  </div>
</template>
