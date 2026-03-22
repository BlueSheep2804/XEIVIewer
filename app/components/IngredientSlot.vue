<script setup lang="ts">
type Props = {
  ingredient: string
}
const { ingredient } = defineProps<Props>()

const ingredientList = new Ingredient(ingredient)

const tagFetchList = await Promise.all(ingredientList.value.map((element) => {
  if (element.isTag) {
    return useItemTag(element.value.full)
  } else {
    return null
  }
}))
tagFetchList.forEach(async value => await value?.execute())

const tagList = tagFetchList
  .map((value) => {
    return value?.data ?? null
  })

function getTagEntryFromIndex(index: number): string[] {
  const tagRef = tagList[index]
  if (tagRef === null || typeof tagRef === 'undefined') return []
  const tag = tagRef.value
  if (tag === null || typeof tag !== 'object') return []

  if ('entry' in tag) {
    if (!Array.isArray(tag.entry)) return []
    return tag.entry
  }

  return []
}

const getFirstItem = computed(() => {
  const first = ingredientList.value[0]
  if (first?.isTag ?? false) {
    return Identifier.parse(getTagEntryFromIndex(0)[0] ?? '')
  }
  return ingredientList.value[0]?.value ?? Identifier.parse('')
})

const isMultipleItem = computed(() => {
  return ingredientList.value.length > 1 || ingredientList.value[0]?.isTag
})
const isOnlyTag = computed(() => {
  return tagList.length == 1
})
const itemOverride = computed(() => {
  let itemName: string
  let itemId: string
  let modId: string
  if (isOnlyTag.value) {
    const identifier = ingredientList.value[0]?.value
    itemName = $t('common.tag_ingredient', { tag: identifier?.path ?? '' })
    itemId = `#${identifier?.full ?? ''}`
    modId = identifier?.namespace ?? ''
  } else {
    itemName = $t('common.item_group')
    itemId = `${getFirstItem.value.full}, +${ingredientList.value.length - 1}`
    modId = getFirstItem.value.namespace
  }
  return {
    itemName,
    itemId,
    modId
  }
})

const open = ref(false)
</script>

<template>
  <div v-if="isMultipleItem" class="inline-flex aspect-square">
    <UPopover v-model:open="open" arrow :ui="{ content: 'p-4' }">
      <template #anchor>
        <a v-if="getFirstItem" href="#" class="inline-block" @click.prevent="open = true">
          <UChip inset color="success" size="3xl" class="inline-block">
            <ItemImage
              :item-id="getFirstItem"
              :show-link="false"
              :override="itemOverride"
            />
          </UChip>
        </a>
      </template>
      <template #content>
        <p v-if="isOnlyTag" class="text-lg mb-2">
          #{{ ingredientList.value[0]?.value.full }}
        </p>
        <div class="grid grid-cols-3 gap-2">
          <template v-for="(entry, index) in ingredientList.value" :key="entry.value">
            <ItemImage v-if="!entry.isTag" :item-id="entry.value" class="max-w-17" />
            <template v-for="tag in getTagEntryFromIndex(index)" v-else :key="tag">
              <ItemImage :item-id="Identifier.parse(tag)" class="max-w-17" />
            </template>
          </template>
        </div>
      </template>
    </UPopover>
  </div>
  <div v-else class="inline-flex aspect-square">
    <ItemImage :item-id="getFirstItem" />
  </div>
</template>
