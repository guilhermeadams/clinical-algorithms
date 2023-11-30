<template>
  <q-page class="full-width bg-grey-1">
    <div class="row q-mx-md q-py-sm">
      <div class="col-3">
        <search-input
          :value="data.initialKeyword"
          label="Palabra clave para la búsqueda de algoritmos"
          @clear="clearSearch"
          @search="searchFlowchart"
        />
      </div>
    </div>

    <loading-spinner
      v-if="data.searching"
    />

    <div
      v-else-if="hasResults"
      class="row q-mx-md"
    >
      <div class="col-12">
        <div class="text-body1 text-grey-7 q-mb-md">Resultados de la búsqueda:</div>

        <!-- RESULTS CARDS -->
        <div
          v-for="key of Object.keys(data.results)"
          :key="`result-${key}`"
        >
          <algorithms-search-result
            v-if="data.results"
            :keyword="data.keyword"
            :result="data.results[key]"
          />
        </div>
      </div>
    </div>

    <div
      v-else-if="data.results !== null"
      class="q-px-md text-grey-7"
    >
      No se encontraron resultados en la búsqueda.
    </div>
  </q-page>
</template>

<script setup lang="ts">
import {
  computed,
  onBeforeMount,
  reactive,
  provide,
  inject,
} from 'vue';

import { useRoute } from 'vue-router';

import Settings from 'src/services/settings';

import SearchInput from 'components/inputs/search-input.vue';
import LoadingSpinner from 'components/spinners/loading-spinner.vue';
import Algorithms, { IAlgorithmThoroughSearchResult } from 'src/services/algorithms';
import AlgorithmsSearchResult from 'components/items/algorithms-search-result-item.vue';

const route = useRoute();

const settings = inject('settings') as Settings;

const algorithms = new Algorithms();
provide('algorithms', algorithms);

const data: {
  searching: boolean,
  results: IAlgorithmThoroughSearchResult[] | null,
  initialKeyword: string,
  keyword: string,
} = reactive({
  searching: false,
  results: null,
  initialKeyword: '',
  keyword: '',
});

const hasResults = computed(() => {
  if (data.results === null) return false;

  return Object.keys(data.results).length > 0;
});

const searchFlowchart = async (keyword: string) => {
  try {
    data.searching = true;
    data.keyword = keyword;

    const results = await algorithms.thorough_search(keyword);

    data.results = { ...results };
  } finally {
    setTimeout(() => {
      data.searching = false;
    }, 1000);
  }
};

const clearSearch = () => {
  data.results = null;
  data.keyword = '';
};

onBeforeMount(() => {
  if (route.query.keyword) {
    data.initialKeyword = String(route.query.keyword);
  }

  settings.page.setTitle('Publicación de algoritmos (visualización para uso de usuarios finales)');
});
</script>

<style lang="sass">
.search-result-item .highlight-text
  color: #FF0000 !important
</style>
