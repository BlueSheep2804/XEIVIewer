<script setup>
import { onKeyDown } from '@vueuse/core'

const route = useRoute()
const router = useRouter()
const itemId = ref(Identifier.parse(route.params.id))

const recipeOutputUrl = computed(() => getRecipeOutputUrl(itemId.value))
const recipeInputUrl = computed(() => getRecipeInputUrl(itemId.value))

onKeyDown('r', (_) => {
  router.push(recipeOutputUrl.value)
}, { dedupe: true })

onKeyDown('u', (_) => {
  router.push(recipeInputUrl.value)
}, { dedupe: true })

const { data: itemData, execute } = await useItem(itemId.value.full)
await execute()

const itemName = computed(() => getEntryName(itemData.value?.descriptionId))
</script>

<template>
  <div>
    <UPageSection v-if="itemData">
      <ItemImage :item="itemData" :show-link="false" class="max-w-17" />
      <h1 class="text-4xl font-bold">
        {{ itemName }}
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
        <EntryInfoCard icon="lucide:scroll-text" :header="$t('item.item_id')" :value="itemId.full" />
        <EntryInfoCard icon="lucide:message-square-text" :header="$t('item.translation_key')" :value="itemData.descriptionId" />
        <EntryInfoCard icon="lucide:gem" :header="$t('item.rarity')" :value="itemData.rarity" />
        <EntryInfoCard icon="lucide:axe" :header="$t('item.durability')" :value="itemData.maxDamage" />
        <EntryInfoCard icon="lucide:code-xml" :header="$t('item.class')" :value="itemData.class" />
      </div>
    </UPageSection>
  </div>
</template>
