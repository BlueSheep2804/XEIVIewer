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

const getFirstEntry = computed(() => {
  const first = ingredientList.value[0]
  if (typeof first !== 'undefined' && first.isTag) {
    return {
      ...first,
      value: Identifier.parse(getTagEntryFromIndex(0)[0] ?? '')
    }
  }
  return first ?? {
    type: Identifier.parse('item'),
    value: Identifier.parse('minecraft:air'),
    count: 1,
    isTag: false
  }
})

const getFirstEntryDataGetter = computed(() => {
  return getEntryDataGetter(getFirstEntry.value.type, getFirstEntry.value.value)
})

function getEntryDataGetter(type: Identifier, value: Identifier) {
  return () => entryGetter(type.full)(value)
}

const isMultipleEntry = computed(() => {
  return ingredientList.value.length > 1 || ingredientList.value[0]?.isTag
})
const isOnlyTag = computed(() => {
  return tagList.length == 1
})
const entryOverride = computed<EntryOverride>(() => {
  let entryName: string
  let entryId: string
  let modId: string
  if (isOnlyTag.value) {
    const identifier = ingredientList.value[0]?.value
    entryName = $t('common.tag_ingredient', { tag: identifier?.path ?? '' })
    entryId = `#${identifier?.full ?? ''}`
    modId = identifier?.namespace ?? ''
  } else {
    entryName = $t('common.group')
    entryId = `${getFirstEntry.value.value.full}, +${ingredientList.value.length - 1}`
    modId = getFirstEntry.value.value.namespace
  }
  return {
    entryName,
    entryId,
    modId
  }
})

const open = ref(false)
</script>

<template>
  <div v-if="isMultipleEntry" class="inline-flex aspect-square">
    <UPopover v-model:open="open" arrow :ui="{ content: 'p-4' }">
      <template #anchor>
        <a v-if="getFirstEntry" href="#" @click.prevent="open = true">
          <UChip inset color="success" size="3xl">
            <EntryImage
              :entry-type="getFirstEntry.type"
              :entry-id="getFirstEntry.value"
              :count="getFirstEntry.count"
              :show-link="false"
              :override="entryOverride"
              :get-entry-data="getFirstEntryDataGetter"
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
            <EntryImage
              v-if="!entry.isTag"
              :entry-type="entry.type"
              :entry-id="entry.value"
              :get-entry-data="getEntryDataGetter(entry.type, entry.value)"
              :count="entry.count"
              class="max-w-17"
            />
            <template v-for="tag in getTagEntryFromIndex(index)" v-else :key="tag">
              <EntryImage
                :entry-type="entry.type"
                :entry-id="Identifier.parse(tag)"
                :get-entry-data="getEntryDataGetter(entry.type, Identifier.parse(tag))"
                class="max-w-17"
              />
            </template>
          </template>
        </div>
      </template>
    </UPopover>
  </div>
  <div v-else class="inline-flex aspect-square">
    <EntryImage
      :entry-type="getFirstEntry.type"
      :entry-id="getFirstEntry.value"
      :get-entry-data="getFirstEntryDataGetter"
      :count="getFirstEntry.count"
    />
  </div>
</template>
