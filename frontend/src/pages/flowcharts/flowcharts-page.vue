<template>
  <q-page>
    <div class="row q-mx-md q-py-sm">
      <div class="col-3">
        <search-input
          label="Buscar fluxogramas"
          @search="searchFlowchart"
          @clear="clearSearch"
        />
      </div>

      <div class="col-9 q-pt-lg q-pr-md text-right">
        <q-btn
          label="Cadastrar fluxograma"
          color="primary"
          push
          @click="createFlowchart"
        />
      </div>
    </div>

    <div class="row q-mx-md q-mb-sm">
      <div class="col-12">
        <flowcharts-table />
      </div>
    </div>

    <edit-flowchart-modal />
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
import FlowchartsTable from 'components/tables/flowcharts-table.vue';
import Flowcharts from 'src/services/flowcharts';
import EditFlowchartModal from 'components/modals/flowcharts/edit-flowchart-modal.vue';
import { onBeforeRouteLeave } from 'vue-router';
import { FLOWCHARTS_EDITOR } from 'src/router/routes/flowcharts';

const flowcharts = new Flowcharts();
provide('flowcharts', flowcharts);

const settings = inject('settings') as Settings;

const searchFlowchart = (keyword: string) => flowcharts.search(keyword);

const clearSearch = () => flowcharts.clearSearch();

const createFlowchart = () => flowcharts.startCreating();

onBeforeMount(() => {
  settings.page.setTitle('Fluxogramas');
});

onBeforeRouteLeave((leaveGuard) => {
  if (leaveGuard.name === FLOWCHARTS_EDITOR) {
    settings.page.mainMenu = false;
  }
});
</script>
