<script setup lang="ts">
import type { RecipeEntry } from '~~/shared/tableTypes'

type Props = {
  ingredient: RecipeEntry[]
}
const { ingredient } = defineProps<Props>()

const ingredientList = new Ingredient(ingredient)

const tagFetchList = await Promise.all(ingredientList.value.map((element) => {
  if (element.isTag) {
    return useTag(element.type, element.entry.full)
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
  if (tagList.length <= index) return []
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

const emptyEntry: IngredientValue = {
  type: 'item_stack',
  entry: Identifier.parse('minecraft:air'),
  amount: 1,
  chance: 1,
  isTag: false
}

const getFirstEntry = computed(() => {
  const first = ingredientList.value[0]
  if (typeof first !== 'undefined' && first.isTag) {
    const entry = getTagEntryFromIndex(0)[0]
    if (typeof entry === 'string') {
      return {
        ...first,
        entry: Identifier.parse(entry)
      }
    } else return emptyEntry
  }
  return first ?? emptyEntry
})

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
    const identifier = ingredientList.value[0]?.entry
    entryName = $t('common.tag_ingredient', { tag: identifier?.path ?? '' })
    entryId = `#${identifier?.full ?? ''}`
    modId = identifier?.namespace ?? ''
  } else {
    entryName = $t('common.group')
    entryId = `${getFirstEntry.value.entry.full}, +${ingredientList.value.length - 1}`
    modId = getFirstEntry.value.entry.namespace
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
              :entry-id="getFirstEntry.entry"
              :count="getFirstEntry.amount"
              :show-link="false"
              :override="entryOverride"
            />
          </UChip>
        </a>
      </template>
      <template #content>
        <p v-if="isOnlyTag" class="text-lg mb-2">
          #{{ ingredientList.value[0]?.entry.full }}
        </p>
        <div class="grid grid-cols-3 gap-2">
          <template v-for="(entry, index) in ingredientList.value" :key="entry.entry">
            <EntryImage
              v-if="!entry.isTag"
              :entry-type="entry.type"
              :entry-id="entry.entry"
              :count="entry.amount"
              class="max-w-17"
            />
            <template v-for="tag in getTagEntryFromIndex(index)" v-else :key="tag">
              <EntryImage
                :entry-type="entry.type"
                :entry-id="Identifier.parse(tag)"
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
      :entry-id="getFirstEntry.entry"
      :count="getFirstEntry.amount"
    />
  </div>
</template>
