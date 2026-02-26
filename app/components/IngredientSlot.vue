<script setup lang="ts">
const { ingredient } = defineProps({
  ingredient: String
})

const isSingle = !(ingredient?.includes(",") ?? true)
const ingredientList = (isSingle ? [ingredient] : ingredient?.split(", "))?.map((value) => Identifier.parse(value ?? "")) ?? []

const open = ref(false)
</script>

<template>
  <div v-if="ingredientList.length > 1" class="inline-flex">
    <UPopover arrow v-model:open="open" :ui="{ content: 'p-4'}">
      <template #anchor>
        <a href="#" @click.prevent="open = true" class="inline-flex">
          <ItemImage :item="ingredientList[0]" :show-link="false"/>
          <UIcon name="bi:back" class="absolute p-0.5 m-1"></UIcon>
        </a>
      </template>
      <template #content>
        <div class="grid grid-cols-3 gap-2">
          <ItemImage v-for="i in ingredientList" :item="i"/>
        </div>
      </template>
    </UPopover>
  </div>
  <div v-else class="inline-flex">
    <ItemImage :item="ingredientList[0]"/>
  </div>
</template>