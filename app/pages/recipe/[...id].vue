<script setup>
  const route = useRoute()
  const resourceLocation = ref(Identifier.parse(route.params.id.join("/")))

  const dataUrl = `/api/recipe/${route.params.id.join("/")}`
  const { data: recipeData } = await useFetch(() => dataUrl, {
    server: false
  })
</script>

<template>
  <div>
    <UPageSection v-if="recipeData">
      <h1 class="text-4xl font-bold">{{ resourceLocation.full }}</h1>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3">
        <UCard class="m-2">
          <UIcon name="bi:grid-3x3-gap-fill" class="size-8"/>
          <h2 class="text-lg font-semibold">材料</h2>
          <div class="grid grid-cols-3 gap-2 justify-items-center w-fit">
            <IngredientSlot v-for="input in recipeData.input" :ingredient="input"/>
          </div>
          <!-- <p>{{ recipeData.input }}</p> -->
        </UCard>
        <UCard class="m-2">
          <UIcon name="bi:hammer" class="size-8"/>
          <h2 class="text-lg font-semibold">完成品</h2>
          <div v-for="output in recipeData.output">
            <OutputSlot :output="output" />
          </div>
          <!-- <p>{{ recipeData.output }}</p> -->
        </UCard>
      </div>
    </UPageSection>
  </div>
</template>
