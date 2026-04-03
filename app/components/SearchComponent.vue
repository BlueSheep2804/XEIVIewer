<script setup lang="ts">
const route = useRoute()
const router = useRouter()

interface Props {
  entries: SearchDefine
}
const { entries } = defineProps<Props>()
const search = defineModel<Search>('search', { required: true })

async function updateUrlQuery() {
  await router.push({
    query: search.value as Record<string, string>
  })
}

function updateSearchQuery() {
  const searchEntryTemp: Search = {}
  Object.keys(route.query).forEach((key) => {
    searchEntryTemp[key as keyof typeof searchEntryTemp] = route.query[key] as string
  })
  search.value = {}
  search.value = { ...searchEntryTemp }
}

updateSearchQuery()

watch(route, updateSearchQuery)
</script>

<template>
  <UCollapsible>
    <UButton
      :label="$t('common.search')"
      trailing-icon="lucide:chevron-down"
      :ui="{
        trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
      }"
    />
    <template #content>
      <form>
        <div class="mt-2 p-4 sm:w-lg bg-elevated rounded-lg grid gap-4 grid-cols-1 sm:grid-cols-2">
          <template v-for="(entry, index) in entries" :key="entry.label">
            <UFormField :label="entry.label">
              <template v-if="entry.items.length > 0">
                <USelect
                  v-if="entry.disableSearch"
                  v-model="search[index]"
                  :items="entry.items"
                  class="w-full"
                  @change="updateUrlQuery"
                />
                <UInputMenu
                  v-else
                  v-model="search[index]"
                  :items="entry.items"
                  clear
                  class="w-full"
                  @change="updateUrlQuery"
                />
              </template>
              <UInput
                v-else
                v-model="search[index]"
                class="w-full"
                @change="updateUrlQuery"
              >
                <template v-if="search[index]?.length" #trailing>
                  <UButton
                    variant="link"
                    color="neutral"
                    @click="search[index] = '';updateUrlQuery()"
                  />
                </template>
              </UInput>
            </UFormField>
          </template>
        </div>
      </form>
    </template>
  </UCollapsible>
</template>
