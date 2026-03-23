<script setup lang="ts">
import type { Mod } from '~~/shared/tableTypes'

const { data: mods, execute } = await useMods()
await execute()

const allMods: ComputedRef<Mod[]> = computed(() => {
  if (!Array.isArray(mods.value)) return []
  return mods.value
})
</script>

<template>
  <UPageSection>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <template v-for="mod in allMods" :key="mod.modId">
        <UCard>
          <template #header>
            <!-- <UTooltip :text="mod.fileName"> -->
            <p class="text-lg">
              {{ mod.displayName }}
            </p>
            <div class="flex justify-between">
              <p class="text-sm text-muted">
                {{ mod.modId }}
              </p>
              <p class="text-sm text-muted">
                {{ mod.version }}
              </p>
            </div>
            <!-- </UTooltip> -->
          </template>
          <!-- <ul class="pl-4 list-disc"> -->
          <BadgeComponent icon="lucide:users" :label="$t('mods.authors')" :text="mod.authors" color="success" />
          <!-- <p>
            <UBadge :label="$t('mods.authors')" color="success" variant="subtle" class="mr-1.5 rounded-full" />
            <span>{{ mod.authors }}</span>
          </p> -->
          <BadgeComponent icon="lucide:book-open" :label="$t('mods.license')" :text="mod.license" color="warning" />
          <!-- <p>
            <UBadge :label="$t('mods.license')" color="warning" variant="subtle" class="mr-1.5 rounded-b-full" />
            <span>{{ mod.license }}</span>
          </p> -->
          <p class="mt-2">
            {{ mod.description }}
          </p>
        </UCard>
      </template>
    </div>
  </UPageSection>
</template>
