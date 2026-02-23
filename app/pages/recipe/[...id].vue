<script setup>
  const route = useRoute()
  const resourceLocation = ref(Identifier.parse(route.params.id.join("/")))

  const dataUrl = `/api/recipe/${resourceLocation.value.full}`
  // const imageUrl = `/export/assets/items/${namespace.value}/${path.value}.png`
  const { data: recipeData } = await useFetch(() => dataUrl, {
    server: false
  })
</script>

<template>
  <div>
    <UPageSection v-if="recipeData">
      <!-- <img :src="imageUrl" class="min-w-16 max-w-32 lg:max-w-64 min-h-16 lg:h-32"> -->
      <h1 class="text-4xl font-bold">{{ resourceLocation.full }}</h1>
      <!-- {{ itemData }} -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3">
        <UCard class="m-2">
          <UIcon name="bi:geo-alt-fill" class="size-8"/>
          <h2 class="text-lg font-semibold">材料</h2>
          <div v-for="input in recipeData.input">
            <IngredientSlot :ingredient="input" />
          </div>
          <!-- <p>{{ recipeData.input }}</p> -->
        </UCard>
        <UCard class="m-2">
          <UIcon name="bi:chat-square-text-fill" class="size-8"/>
          <h2 class="text-lg font-semibold">完成品</h2>
          <div v-for="output in recipeData.output">
            <ItemImage :item="Identifier.parse(output[0])" />
          </div>
          <p>{{ recipeData.output }}</p>
        </UCard>
        <!-- <UCard class="m-2">
          <UIcon name="bi:gem" class="size-8"/>
          <h2 class="text-lg font-semibold">レアリティ</h2>
          <p>{{ recipeData.rarity }}</p>
        </UCard>
        <UCard class="m-2">
          <UIcon name="bi:usb" class="size-8"/>
          <h2 class="text-lg font-semibold">耐久値</h2>
          <p>{{ recipeData.max_damage }}</p>
        </UCard>
        <UCard class="m-2">
          <UIcon name="bi:code-slash" class="size-8"/>
          <h2 class="text-lg font-semibold">クラス名</h2>
          <p class="wrap-break-word">{{ recipeData.class }}</p>
        </UCard> -->
      </div>
    </UPageSection>
  </div>
</template>
