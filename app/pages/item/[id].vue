<script setup>
const route = useRoute()
const itemId = ref(Identifier.parse(route.params.id))

const dataUrl = `/api/item/${itemId.value.full}`
const { data: itemData } = await useFetch(() => dataUrl, {
  server: false
})
</script>

<template>
  <div>
    <UPageSection v-if="itemData">
      <ItemImage :item="itemId" :show-link="false" class="min-w-8 max-w-24" />
      <h1 class="text-4xl font-bold">
        {{ itemData.descriptionId }}
      </h1>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ItemInfoCard icon="lucide:scroll-text" :header="$t('item.item_id')" :value="itemId.full" />
        <ItemInfoCard icon="lucide:message-square-text" :header="$t('item.translation_key')" :value="itemData.descriptionId" />
        <ItemInfoCard icon="lucide:gem" :header="$t('item.rarity')" :value="itemData.rarity" />
        <ItemInfoCard icon="lucide:axe" :header="$t('item.durability')" :value="itemData.maxDamage" />
        <ItemInfoCard icon="lucide:code-xml" :header="$t('item.class')" :value="itemData.class" />
      </div>
    </UPageSection>
  </div>
</template>
