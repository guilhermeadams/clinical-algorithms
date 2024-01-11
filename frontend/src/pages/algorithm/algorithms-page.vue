<template>
  <q-page class="bg-grey-1">
    <div class="row q-mx-md q-py-sm">
      <div class="col-9">
        <div class="float-left q-mr-lg" style="width:370px">
          <search-input
            label="Palabra clave para la búsqueda de algoritmos"
            @search="searchAlgorithm"
            @clear="tryClearingSearch"
          />
        </div>

        <div class="float-left q-mr-lg" style="width:auto;min-width:150px">
          <q-select
            v-model="algorithms.data.searchCategory"
            :options="algorithmsCategories.data.categories"
            :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name : '- Null -'"
            label="Categorías"
            clearable
            @update:model-value="searchAlgorithmByCategory"
          />
        </div>
      </div>

      <div class="col-3 q-pt-lg q-pr-md text-right">
        <q-btn
          label="Registrar algoritmo"
          color="primary"
          push
          @click="createFlowchart"
        />
      </div>
    </div>

    <div class="q-px-md">
      <q-card class="shadow-light">
        <q-card-section>
          <algorithms-table />
        </q-card-section>
      </q-card>
    </div>

    <edit-algorithm-modal />
  </q-page>
</template>

<script setup lang="ts">
import {
  onBeforeMount,
  provide,
  inject,
} from 'vue';

import { onBeforeRouteLeave } from 'vue-router';

import Settings from 'src/services/settings';
import SearchInput from 'components/inputs/search-input.vue';
import AlgorithmsTable from 'components/tables/algorithms-table.vue';
import Algorithms from 'src/services/algorithms';
import EditAlgorithmModal from 'components/modals/algorithms/edit-algorithm-modal.vue';
import { ALGORITHMS_EDITOR } from 'src/router/routes/algorithms';
import AlgorithmsCategories from 'src/services/algorithms-categories';

const algorithms = new Algorithms();
provide('algorithms', algorithms);

const algorithmsCategories = new AlgorithmsCategories();
provide('algorithmsCategories', algorithmsCategories);

const settings = inject('settings') as Settings;

const searchAlgorithm = (keyword: string) => {
  algorithms.data.searchKeyword = keyword;

  algorithms.search();
};

const searchAlgorithmByCategory = () => {
  if (!algorithms.data.searchKeyword && !algorithms.data.searchCategory) {
    algorithms.clearSearch();

    algorithms.getAll();
  } else {
    algorithms.search();
  }
};

const createFlowchart = () => algorithms.startCreating();

const tryClearingSearch = () => {
  algorithms.clearSearch();

  if (algorithms.data.searchCategory) {
    algorithms.search();
  } else {
    algorithms.getAll();
  }
};

onBeforeMount(() => {
  settings.page.setTitle('Mantenimiento de algoritmos');

  algorithmsCategories.get();
});

onBeforeRouteLeave((leaveGuard) => {
  if (leaveGuard.name === ALGORITHMS_EDITOR) {
    settings.page.mainMenu = false;
  }
});
</script>
