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
        <ItemInfoCard icon="lucide:scroll-text" header="アイテムID" :value="itemId.full" />
        <ItemInfoCard icon="lucide:message-square-text" header="翻訳キー" :value="itemData.descriptionId" />
        <ItemInfoCard icon="lucide:gem" header="レアリティ" :value="itemData.rarity" />
        <ItemInfoCard icon="lucide:axe" header="耐久値" :value="itemData.maxDamage" />
        <ItemInfoCard icon="lucide:code-xml" header="クラス名" :value="itemData.class" />
      </div>
    </UPageSection>
  </div>
</template>
