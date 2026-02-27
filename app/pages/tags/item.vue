<script setup lang="ts">
  const { data: itemTags } = await useFetch("/api/tags/item", {
    server: false
  })
</script>

<template>
  <UPageSection>
    <div class="grid gap-4 grid-cols-1 lg:grid-cols-2">
      <template v-for="tag in itemTags">
        <UCard class="block">
          <template #header>
            <h2 class="text-xl">#{{ tag.namespace }}:{{ tag.path }}</h2>
          </template>
          <div class="grid gap-2 place-items-center grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-4 xl:grid-cols-6">
            <template v-for="item in tag.entry">
              <ItemImage :item="Identifier.parse(item)"/>
            </template>
          </div>
        </UCard>
      </template>
    </div>
  </UPageSection>
</template>