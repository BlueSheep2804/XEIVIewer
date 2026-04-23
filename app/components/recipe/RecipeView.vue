<script setup lang="ts">
import type { Recipe } from '~~/shared/tableTypes'

interface Props {
  recipe: Recipe
}
const { recipe } = defineProps<Props>()

const inputClass = computed(() => {
  const column = Math.ceil(Math.sqrt(recipe.input.length))
  if (column < 3) {
    return 'grid-flow-col'
  } else {
    return 'grid-cols-' + column
  }
})
const outputClass = computed(() => {
  const column = Math.ceil(Math.sqrt(recipe.output.length))
  if (column < 3) {
    return 'grid-flow-col'
  } else {
    return 'grid-cols-' + column
  }
})
</script>

<template>
  <div class="flex items-center max-w-fit p-4 rounded-lg border-2 border-gray-700">
    <div class="grid" :class="inputClass">
      <template v-for="value in recipe.input" :key="value.join()">
        <IngredientSlot :ingredient="value" />
      </template>
    </div>
    <UIcon name="lucide:arrow-right" class="size-8 m-4" />
    <div class="grid" :class="outputClass">
      <template v-for="value in recipe.output" :key="value.join()">
        <IngredientSlot :ingredient="value" />
      </template>
    </div>
  </div>
</template>
