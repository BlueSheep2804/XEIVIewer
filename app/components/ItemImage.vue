<script setup lang="ts">
import { onKeyDown } from '@vueuse/core'

type Props = {
  item: Identifier
  showLink?: boolean
  override?: Override
}
const { item: identifier, showLink = true, override = {} } = defineProps<Props>()

const router = useRouter()

const isNone = computed(() => identifier.path === '')
const imageUrl = computed(() => `/assets/items/${identifier.namespace}/${identifier.path}.png`)
const linkUrl = computed(() => `/item/${identifier.full}`)

onKeyDown('u', (_) => {
  if (open.value) {
    router.push(getRecipeInputUrl(identifier))
  }
}, { dedupe: true })

onKeyDown('r', (_) => {
  if (open.value) {
    router.push(getRecipeOutputUrl(identifier))
  }
}, { dedupe: true })

const itemData = ref()

const open = ref(false)

const showPopover = async () => {
  if (isNone.value) return
  open.value = true
  if (typeof itemData.value === 'undefined') {
    const { data, execute } = await useItem(identifier.full)
    await execute()
    itemData.value = data.value
  }
}

const anchor = ref({ x: 0, y: 0 })
const reference = computed(() => ({
  getBoundingClientRect: () =>
    ({
      width: 0,
      height: 0,
      left: anchor.value.x,
      right: anchor.value.x,
      top: anchor.value.y,
      bottom: anchor.value.y,
      ...anchor.value
    } as DOMRect)
}))

const itemName = computed(() => {
  if ('itemName' in override) {
    return override.itemName
  }
  return getItemName(itemData.value?.descriptionId)
})
const itemId = computed(() => {
  if ('itemId' in override) {
    return override.itemId
  }
  return identifier.full
})
const modId = computed(() => {
  if (Object.keys(override).includes('modId')) {
    return firstUppercase(override.modId ?? '')
  }
  return firstUppercase(identifier.namespace)
})
</script>

<template>
  <UPopover
    :open="open"
    :reference="reference"
    :content="{ side: 'top', sideOffset: 24, updatePositionStrategy: 'always' }"
  >
    <div
      class="inline-block aspect-square border-2 border-gray-700 bg-gray-400"
      @pointerenter="showPopover"
      @pointerleave="open = false"
      @pointermove="(event: PointerEvent) => {
        anchor.x = event.clientX
        anchor.y = event.clientY
      }"
    >
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
        <p class="italic light:text-blue-800 dark:text-blue-400">
          {{ modId }}
        </p>
      </div>
    </template>
  </UPopover>
</template>
