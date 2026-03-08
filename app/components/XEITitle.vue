<script setup lang="ts">
type Props = {
  alt?: boolean
}

const { alt = false } = defineProps<Props>()
const gradient = computed(() => ({
  'via-purple-500': !alt,
  'via-30%': !alt,
  'to-blue-500': !alt,
  'via-yellow-500': alt,
  'via-20%': alt,
  'to-green-500': alt
}))
const text = computed(() => {
  if (alt) {
    return 'XEIEXporter'
  } else {
    return 'XEIVIewer'
  }
})
</script>

<template>
  <h1
    class="text-2xl font-extrabold bg-linear-to-r bg-clip-text text-transparent from-red-500 to-60%"
    :class="gradient"
  >
    {{ text }}
  </h1>
</template>
