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
      <ItemImage :item="itemId" class="min-w-16 max-w-32 lg:max-w-64 min-h-16 lg:h-32" />
      <h1 class="text-4xl font-bold">
        {{ itemData.descriptionId }}
      </h1>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3">
        <UCard class="m-2">
          <UIcon name="bi:geo-alt-fill" class="size-8" />
          <h2 class="text-lg font-semibold">
            アイテムID
          </h2>
          <p>{{ itemId.full }}</p>
        </UCard>
        <UCard class="m-2">
          <UIcon name="bi:chat-square-text-fill" class="size-8" />
          <h2 class="text-lg font-semibold">
            翻訳キー
          </h2>
          <p>{{ itemData.descriptionId }}</p>
        </UCard>
        <UCard class="m-2">
          <UIcon name="bi:gem" class="size-8" />
          <h2 class="text-lg font-semibold">
            レアリティ
          </h2>
          <p>{{ itemData.rarity }}</p>
        </UCard>
        <UCard class="m-2">
          <UIcon name="bi:usb" class="size-8" />
          <h2 class="text-lg font-semibold">
            耐久値
          </h2>
          <p>{{ itemData.maxDamage }}</p>
        </UCard>
        <UCard class="m-2">
          <UIcon name="bi:code-slash" class="size-8" />
          <h2 class="text-lg font-semibold">
            クラス名
          </h2>
          <p class="wrap-break-word">
            {{ itemData.class }}
          </p>
        </UCard>
      </div>
    </UPageSection>
  </div>
</template>
