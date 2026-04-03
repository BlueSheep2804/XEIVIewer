<script setup lang="ts">
import { onKeyDown } from '@vueuse/core'
import type { CommonEntry } from '~~/shared/tableTypes'

type Props = {
  entryType: Identifier
  entryId?: Identifier
  entry?: CommonEntry
  getEntryData: () => Promise<CommonEntry>
  count?: number
  showLink?: boolean
  override?: Override
}
const { entryType, entryId, entry, getEntryData, count = 1, showLink = true, override = {} } = defineProps<Props>()

const identifier = computed(() => {
  if (typeof entryId === 'undefined') {
    return new Identifier(entry?.namespace ?? '', entry?.name ?? '')
  } else {
    return entryId
  }
})
const modDisplayName: Ref<string | undefined> = ref()

const router = useRouter()

const air = Identifier.withDefaultNamespace('air')
const isNone = computed(() => identifier.value.equals(air))
const imageUrl = computed(() => `/assets/${entryType.simple}s/${identifier.value.namespace}/${identifier.value.path}.png`)
const linkUrl = computed(() => `/${entryType.simple}/${identifier.value.full}`)

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

const entryData = ref(entry)

const open = ref(false)

const showPopover = async () => {
  if (isNone.value) return
  open.value = true
  if (typeof entryData.value === 'undefined' && typeof getEntryData !== 'undefined') {
    entryData.value = await getEntryData()
  }
  if (typeof modDisplayName.value === 'undefined') {
    modDisplayName.value = await getModName(identifier.value.namespace)
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
  return getEntryName(entryData.value?.descriptionId)
})
const toolTipItemId = computed(() => {
  if ('itemId' in override) {
    return override.itemId
  }
  return identifier.value.full
})
const toolTipModId = computed(() => {
  if ('modId' in override && typeof override.modId === 'string') {
    return firstUppercase(override.modId)
  }
  return modDisplayName.value ?? firstUppercase(identifier.value.namespace)
})
</script>

<template>
  <UPopover
    :open="open"
    :reference="reference"
    :content="{ side: 'top', sideOffset: 24, updatePositionStrategy: 'always' }"
  >
    <div
      class="inline-flex flex-row-reverse items-end-safe aspect-square border-2 border-gray-700 bg-gray-400"
      @pointerenter="showPopover"
      @pointerleave="open = false"
      @pointermove="(event: PointerEvent) => {
        anchor.x = event.clientX
        anchor.y = event.clientY
      }"
    >
      <div>
        <NuxtLink v-if="showLink && !isNone" :to="linkUrl">
          <img :src="imageUrl" class="w-16" style="image-rendering: pixelated;">
        </NuxtLink>
        <img v-else-if="!showLink && !isNone" :src="imageUrl" class="w-16" style="image-rendering: pixelated;">
        <div v-else class="w-full h-full" />
      </div>
      <div v-if="count !== 1" class="absolute pointer-events-none p-0.5 m-1 rounded bg-gray-900/40 backdrop-blur-md">
        <p class="text-white text-sm">
          {{ count }}
        </p>
      </div>
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
