<script setup lang="ts">
import type { Recipe, RecipeType } from '~~/shared/tableTypes'

interface Props {
  recipe: Recipe
  recipeType?: RecipeType | undefined
}
const { recipe, recipeType } = defineProps<Props>()

const getRecipeType = computed((): string => {
  return recipeType?.catalyst?.join(',') ?? ''
})
</script>

<template>
  <div class="flex items-center max-w-fit p-4 rounded-lg border-2 border-gray-700">
    <IngredientSlot v-if="getRecipeType" :ingredient="getRecipeType" class="mr-8" />
    <div class="grid grid-cols-3">
      <template v-for="value in recipe.input" :key="value">
        <IngredientSlot :ingredient="value" />
      </template>
    </div>
    <UIcon name="lucide:arrow-right" class="size-8 m-4" />
    <template v-for="value in recipe.output" :key="value">
      <OutputSlot :output="value" />
    </template>
  </div>
</template>
