<template>
  <q-page class="full-width">
    <div class="row q-mx-md q-py-sm">
      <div class="col-3">
        <search-input
          label="Buscar algoritmos"
          @search="searchFlowchart"
          @clear="clearSearch"
        />
      </div>
    </div>

    <loading-spinner
      v-if="searching"
    />

    <div
      v-else-if="showResults"
      class="row q-mx-md q-py-sm"
    >
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-body1">
              <b>Algoritmo:</b> Arboviroses
            </div>

            <q-list separator>
              <q-item
                v-for="item of items"
                :key="item"
                class="search-result-item"
                clickable
                v-ripple
              >
                <div v-html="item" class="q-mt-sm" />
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
      </div>
  </q-page>
</template>

<script setup lang="ts">
import SearchInput from 'components/inputs/search-input.vue';
import { inject, onBeforeMount, ref } from 'vue';
import Settings from 'src/services/settings';
import LoadingSpinner from 'components/spinners/loading-spinner.vue';

const settings = inject('settings') as Settings;

const items = [
  'Nó: <b>Dengue</b>',
  'Nó: PCT reverso <b>dengue</b>',
  'Nó: Positivo confirma <b>dengue</b>',
];

const searching = ref(false);
const showResults = ref(false);

const searchFlowchart = (keyword: string) => {
  try {
    searching.value = true;
  } finally {
    setTimeout(() => {
      searching.value = false;
      showResults.value = true;
    }, 1000);
  }
  console.log(keyword);
};

const clearSearch = () => {
  showResults.value = false;
};

onBeforeMount(() => {
  settings.page.setTitle('Búsqueda por algoritmos');
});
</script>

<style lang="sass">
.search-result-item b
  color: #FF0000
</style>
