<script setup lang="ts">
type Props = {
  ingredient: string
}
const { ingredient } = defineProps<Props>()

const ingredientList = new Ingredient(ingredient)

const tagList = await Promise.all(ingredientList.value.map((element) => {
  if (element.isTag) {
    const { data: tag } = useFetch(() => `/api/tag/item/${element.value.full}`, {
      server: false
    })
    return tag
  } else {
    return null
  }
}))

const getFirstItem = computed(() => {
  const first = ingredientList.value[0]
  if (first?.isTag ?? false) {
    return Identifier.parse(tagList[0]?.value?.entry[0] ?? '')
  }
  return ingredientList.value[0]?.value ?? Identifier.parse('')
})
const isOnlySingleItem = computed(() => {
  return ingredientList.value.length > 1 || ingredientList.value[0]?.isTag
})
const isOnlyTag = computed(() => {
  return tagList.length == 1 && typeof tagList[0] !== 'undefined'
})

const open = ref(false)
</script>

<template>
  <div v-if="isOnlySingleItem" class="inline-flex">
    <UPopover v-model:open="open" arrow :ui="{ content: 'p-4' }">
      <template #anchor>
        <a v-if="getFirstItem" href="#" class="block" @click.prevent="open = true">
          <UChip inset color="success" size="3xl" class="block">
            <ItemImage :item="getFirstItem" :show-link="false" />
          </UChip>
        </a>
      </template>
      <template #content>
        <h6 v-if="isOnlyTag" class="text-lg">
          #{{ ingredientList.value[0]?.value.full }}
        </h6>
        <div class="grid grid-cols-3 gap-2">
          <template v-for="(entry, index) in ingredientList.value" :key="entry.value">
            <ItemImage v-if="!entry.isTag" :item="entry.value" />
            <ItemImage v-for="tag in tagList[index]?.value?.entry" v-else :key="tag" :item="Identifier.parse(tag)" />
          </template>
        </div>
      </template>
    </UPopover>
  </div>
  <div v-else class="inline-flex aspect-square">
    <ItemImage :item="getFirstItem" />
  </div>
</template>
