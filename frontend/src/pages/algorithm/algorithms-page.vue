<template>
  <q-page class="bg-grey-1">
    <div class="row q-mx-md q-py-sm">
      <div class="col-3">
        <search-input
          label="Palabra clave para la búsqueda de algoritmos"
          @search="searchFlowchart"
          @clear="clearSearch"
        />
      </div>

      <div class="col-9 q-pt-lg q-pr-md text-right">
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

import Settings from 'src/services/settings';
import SearchInput from 'components/inputs/search-input.vue';
import AlgorithmsTable from 'components/tables/algorithms-table.vue';
import Algorithms from 'src/services/algorithms';
import EditAlgorithmModal from 'components/modals/algorithms/edit-algorithm-modal.vue';
import { onBeforeRouteLeave } from 'vue-router';
import { FLOWCHARTS_EDITOR } from 'src/router/routes/algorithms';

const algorithms = new Algorithms();
provide('algorithms', algorithms);

const settings = inject('settings') as Settings;

const searchFlowchart = (keyword: string) => algorithms.search(keyword);

const clearSearch = () => algorithms.clearSearch();

const createFlowchart = () => algorithms.startCreating();

onBeforeMount(() => {
  settings.page.setTitle('Mantenimiento de algoritmos');
});

onBeforeRouteLeave((leaveGuard) => {
  if (leaveGuard.name === FLOWCHARTS_EDITOR) {
    settings.page.mainMenu = false;
  }
});
</script>
