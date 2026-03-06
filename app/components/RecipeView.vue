<script setup lang="ts">
import type { Recipe, RecipeType } from '~~/shared/tableTypes';

interface Props {
  recipe: Recipe,
  recipeType: RecipeType | string
}
const {recipe, recipeType} = defineProps<Props>()

const getRecipeType = computed((): string => {
  if (typeof recipeType === "string") {
    return recipeType
  } else {
    return recipeType.catalyst.join(",")
  }
})
</script>

<template>
  <div class="flex items-center p-4 rounded-lg border-2 border-gray-700">
    <IngredientSlot v-if="recipeType" :ingredient="getRecipeType" class="mr-8"/>
    <div class="grid grid-cols-3">
      <IngredientSlot v-for="value in recipe.input" :ingredient="value"/>
    </div>
    <UIcon name="bi:arrow-right-square-fill" class="size-8 m-4"/>
    <OutputSlot v-for="value in recipe.output" :output="value"/>
    <!-- {{recipe}} -->
  </div>
</template>