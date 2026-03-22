<script setup lang="ts">
import { onKeyDown } from '@vueuse/core'
import type { Item } from '~~/shared/tableTypes'

type Props = {
  itemId?: Identifier
  item?: Item
  showLink?: boolean
  override?: Override
}
const { itemId, item, showLink = true, override = {} } = defineProps<Props>()

const identifier = computed(() => {
  if (typeof itemId === 'undefined') {
    return new Identifier(item?.namespace ?? '', item?.name ?? '')
  } else {
    return itemId
  }
})

const router = useRouter()

const isNone = computed(() => identifier.value.path === '')
const imageUrl = computed(() => `/assets/items/${identifier.value.namespace}/${identifier.value.path}.png`)
const linkUrl = computed(() => `/item/${identifier.value.full}`)

onKeyDown('u', (_) => {
  if (open.value) {
    router.push(getRecipeInputUrl(identifier.value))
  }
}, { dedupe: true })

onKeyDown('r', (_) => {
  if (open.value) {
    router.push(getRecipeOutputUrl(identifier.value))
  }
}, { dedupe: true })

const itemData = ref(item)

const open = ref(false)

const showPopover = async () => {
  if (isNone.value) return
  open.value = true
  if (typeof itemData.value === 'undefined') {
    const { data, execute } = await useItem(identifier.value.full)
    await execute()
    itemData.value = data.value as Item
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

const tooltipItemName = computed(() => {
  if ('itemName' in override) {
    return override.itemName
  }
  return getItemName(itemData.value?.descriptionId)
})
const toolTipItemId = computed(() => {
  if ('itemId' in override) {
    return override.itemId
  }
  return identifier.value.full
})
const toolTipModId = computed(() => {
  if (Object.keys(override).includes('modId')) {
    return firstUppercase(override.modId ?? '')
  }
  return firstUppercase(identifier.value.namespace)
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
        <p>{{ tooltipItemName }}</p>
        <p class="text-muted">
          {{ toolTipItemId }}
        </p>
        <p class="italic light:text-blue-800 dark:text-blue-400">
          {{ toolTipModId }}
        </p>
      </div>
    </template>
  </UPopover>
</template>
