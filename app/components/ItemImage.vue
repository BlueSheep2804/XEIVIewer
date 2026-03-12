<script setup lang="ts">
type Props = {
  item: Identifier
  showLink?: boolean
  override?: Override
}
const { item: identifier, showLink = true, override = {} } = defineProps<Props>()

const isNone = computed(() => identifier.path === '')
const imageUrl = computed(() => `/assets/items/${identifier.namespace}/${identifier.path}.png`)
const linkUrl = computed(() => `/item/${identifier.full}`)

const { data: itemData, execute } = await useItem(identifier.full)

const open = ref(false)

const showPopover = () => {
  if (isNone.value) return
  open.value = true
  if (typeof itemData.value === 'undefined') {
    execute()
  }
}

const itemName = computed(() => {
  if (Object.keys(override).includes('itemName')) {
    return override.itemName
  }
  return getItemName(itemData.value?.descriptionId)
})
const itemId = computed(() => {
  if (Object.keys(override).includes('itemId')) {
    return override.itemId
  }
  return identifier.full
})
</script>

<template>
  <UPopover :open="open" :content="{ side: 'right' }">
    <div class="inline-block aspect-square border-2 border-gray-700 bg-gray-400" @pointerenter="showPopover" @pointerleave="open = false">
      <NuxtLink v-if="showLink && !isNone" :to="linkUrl">
        <img :src="imageUrl">
      </NuxtLink>
      <img v-else-if="!showLink && !isNone" :src="imageUrl">
      <div v-else class="w-full h-full" />
    </div>

    <template #content>
      <div class="p-2">
        <p>{{ itemName }}</p>
        <p class="text-muted">
          {{ itemId }}
        </p>
      </div>
    </template>
  </UPopover>
</template>
