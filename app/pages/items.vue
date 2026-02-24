<script setup lang="ts">
  const { data: items } = await useFetch("/api/items", {
    server: false
  })
</script>

<template>
  <div>
    <!-- {{ items }} -->
    <UPageSection>
      <div class="grid justify-items-center gap-4 grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
        <div v-for="item in items">
            <ItemImage :item="new Identifier(item.namespace, item.name)" />
        </div>
      </div>
    </UPageSection>
  </div>
</template>