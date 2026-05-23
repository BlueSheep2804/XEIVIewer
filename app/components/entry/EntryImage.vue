<script setup lang="ts">
import { onKeyDown } from '@vueuse/core'
import type { CommonEntry } from '~~/shared/tableTypes'

type Props = {
  entryType: string
  entryId?: Identifier
  uniqueId?: string
  entry?: CommonEntry
  count?: number
  showLink?: boolean
  override?: EntryOverride
}
const { entryType, entryId, uniqueId, entry, count = 1, showLink = true, override = {} } = defineProps<Props>()

const identifier = computed(() => {
  if (typeof entryId === 'undefined') {
    return new Identifier(entry?.namespace ?? '', entry?.path ?? '')
  } else {
    return entryId
  }
})
const modDisplayName: Ref<string | undefined> = ref()

const { data: ingredientTypes, execute: fetchIngredientTypes } = await useIngredientTypes()
await fetchIngredientTypes()
const ingredientTypeInfo = ingredientTypes.value?.find(value => value.id === entryType)

const { data: mods, execute } = await useMods()
await execute()

const router = useRouter()

const air = Identifier.withDefaultNamespace('air')
const isNone = computed(() => (
  identifier.value.equals(air)
  || (
    typeof entry === 'undefined'
    && typeof entryId === 'undefined'
  )
))

function uniqueIdToPath(id: string): string | undefined {
  const split = id.split(':')
  if (split.length > 2) {
    const pathArray = [split[0], split[1], split.slice(2).join(';').replaceAll(/["?#*<>]/g, '-')]
    return pathArray.join('/')
  }
}

const imageUrl = computed(() => {
  if (typeof entry !== 'undefined') {
    if (entry.uniqueId !== '') {
      const path = uniqueIdToPath(entry.uniqueId)
      if (typeof path !== 'undefined') {
        return `/assets/${entryType}/${path}.png`
      }
    }
  }
  if (typeof uniqueId !== 'undefined' && uniqueId !== '') {
    const path = uniqueIdToPath(uniqueId)
    if (typeof path !== 'undefined') {
      return `/assets/${entryType}/${path}.png`
    }
  }
  return `/assets/${entryType}/${identifier.value.namespace}/${identifier.value.path}.png`
})
const linkUrl = computed(() => `/ingredient/${entryType}/${identifier.value.full}`)

const displayCount = computed(() => {
  if (ingredientTypeInfo?.isMilliUnit ?? false) {
    if (count >= (10 ** 15)) {
      return toExponential(count) + 'B'
    } else if (count >= (10 ** 12)) {
      return Math.floor(count / (10 ** 12)) + 'GB'
    } else if (count >= (10 ** 9)) {
      return Math.floor(count / (10 ** 9)) + 'MB'
    } else if (count >= (10 ** 6)) {
      return Math.floor(count / (10 ** 6)) + 'KB'
    } else if (count >= (10 ** 3)) {
      return Math.floor(count / (10 ** 3)) + 'B'
    }
    return count + 'mB'
  }
  if (count >= (10 ** 12)) {
    return toExponential(count)
  } else if (count >= (10 ** 9)) {
    return Math.floor(count / (10 ** 9)) + 'G'
  } else if (count >= (10 ** 6)) {
    return Math.floor(count / (10 ** 6)) + 'M'
  } else if (count >= (10 ** 3)) {
    return Math.floor(count / (10 ** 3)) + 'K'
  }
  return count.toString()
})

onKeyDown('u', (_) => {
  if (open.value) {
    router.push(getRecipeInputUrl(entryType, identifier.value))
  }
}, { dedupe: true })

onKeyDown('r', (_) => {
  if (open.value) {
    router.push(getRecipeOutputUrl(entryType, identifier.value))
  }
}, { dedupe: true })

const {
  data: entryData,
  status: entryFetchStatus,
  execute: entryFetch
} = await useIngredient(
  entryType,
  typeof uniqueId !== 'undefined' && uniqueId !== '' ? uniqueId : entryId?.full ?? '',
  typeof uniqueId !== 'undefined' && uniqueId !== ''
)

const open = ref(false)

const showPopover = async () => {
  if (isNone.value) return
  open.value = true
  if (typeof entry === 'undefined' && entryFetchStatus.value !== 'success') {
    await entryFetch()
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
  if ('entryName' in override && typeof override.entryName === 'string') {
    return override.entryName
  }

  if (typeof entry !== 'undefined') {
    return TextComponent.fromJson(entry.name).toHtml()
  } else {
    return TextComponent.fromJson(entryData.value?.name).toHtml()
  }
})
const toolTipItemId = computed(() => {
  if ('entryId' in override && typeof override.entryId === 'string') {
    return override.entryId
  }
  return identifier.value.full
})
const toolTipModId = computed(() => {
  let modId = identifier.value.namespace
  if ('modId' in override && typeof override.modId === 'string') {
    modId = override.modId
  }
  return getModNameByObject(modId, mods)
})
</script>

<template>
  <UPopover
    :open="open"
    :reference="reference"
    :open-delay="0"
    :close-delay="0"
    :content="{ side: 'top', sideOffset: 24, updatePositionStrategy: 'always' }"
  >
    <div
      class="flex flex-row-reverse items-end-safe aspect-square border-2 border-gray-700 bg-gray-400"
      @pointerenter="showPopover"
      @pointerleave="open = false"
      @pointermove="(event: PointerEvent) => {
        anchor.x = event.clientX
        anchor.y = event.clientY
      }"
    >
      <NuxtLink v-if="showLink && !isNone" :to="linkUrl">
        <img :src="imageUrl" style="image-rendering: pixelated;">
      </NuxtLink>
      <img v-else :src="imageUrl" style="image-rendering: pixelated;">
      <div v-if="count !== 1" class="absolute pointer-events-none p-0.5 m-1 rounded bg-gray-900/40 backdrop-blur-md">
        <p class="text-white text-sm">
          {{ displayCount }}
        </p>
      </div>
    </div>

    <template #content>
      <div class="p-2 pointer-events-none">
        <p v-html="tooltipItemName" />
        <p v-if="count.toString() !== displayCount" class="text-toned text-sm">
          {{ count.toLocaleString() }}
          {{ (ingredientTypeInfo?.isMilliUnit ?? false) ? 'mB' : '' }}
        </p>
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
