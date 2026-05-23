<script setup>
import { onKeyDown } from '@vueuse/core'

const route = useRoute()
const router = useRouter()
const ingredientId = ref(Identifier.parse(route.params.id))
const ingredientType = ref(route.params.type)

const recipeOutputUrl = computed(() => getRecipeOutputUrl(ingredientType.value, ingredientId.value))
const recipeInputUrl = computed(() => getRecipeInputUrl(ingredientType.value, ingredientId.value))

onKeyDown('r', (_) => {
  router.push(recipeOutputUrl.value)
}, { dedupe: true })

onKeyDown('u', (_) => {
  router.push(recipeInputUrl.value)
}, { dedupe: true })

const { data: itemData, execute } = await useIngredient(ingredientType.value, ingredientId.value.full)
await execute()

const itemName = computed(() => TextComponent.fromJson(itemData.value?.name))
</script>

<template>
  <div>
    <UPageSection v-if="itemData">
      <EntryImage
        :entry-type="ingredientType"
        :entry="itemData"
        :show-link="false"
        class="max-w-17"
      />
      <h1 class="text-4xl font-bold" v-html="itemName.toHtml()" />
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
        <EntryInfoCard icon="lucide:scroll-text" :header="$t('item.item_id')" :value="ingredientId.full" />
        <EntryInfoCard icon="lucide:message-square-text" :header="$t('item.translation_key')" :value="itemData.descriptionId" />
      </div>
    </UPageSection>
  </div>
</template>
