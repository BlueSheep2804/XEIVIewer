<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind, { ssrWidth: 1024 })
const isSmallerSm = breakpoints.smaller('sm')

const open = ref(false)
</script>

<template>
  <div>
    <UPopover v-if="!isSmallerSm" v-model:open="open" arrow :ui="{ content: 'p-4' }">
      <template #anchor>
        <a href="#" @click.prevent="open = true">
          <slot name="anchor" />
        </a>
      </template>
      <template #content>
        <slot name="content" />
      </template>
    </UPopover>
    <UDrawer
      v-else
      v-model:open="open"
      handle-only
      :handle="false"
      :overlay="false"
      :ui="{
        content: 'bg-muted h-5/12'
      }"
    >
      <a href="#" @click.prevent="open = true">
        <slot name="anchor" />
      </a>
      <template #content>
        <UScrollArea class="p-8">
          <slot name="content" />
        </UScrollArea>
      </template>
    </UDrawer>
  </div>
</template>
