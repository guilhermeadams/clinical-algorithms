<template>
  <q-table
    :rows="algorithms.flowchartsList"
    :columns="columns"
    :loading="algorithms.data.loading"
    title="Algoritmos"
    :rows-per-page-options="[0]"
    row-key="name"
    flat
    :hide-bottom="!(algorithms.flowchartsList && !algorithms.flowchartsList.length)"
  >
    <template v-slot:loading>
      <q-inner-loading showing color="primary" />
    </template>

    <template v-slot:no-data>
      <b>No se encontraron algoritmos.</b>
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td :props="props" key="title">
          <div
            class="cursor-pointer q-py-sm"
          >
            <b>{{ props.row.title }}</b>
          </div>
        </q-td>

        <q-td key="version" :props="props">
          {{ props.row.version }}
        </q-td>

        <q-td key="author" :props="props">
          {{ props.row.author || 'No definido' }}
        </q-td>

        <q-td key="action" :props="props">
          <q-btn
            class="q-px-md q-mr-md"
            label="Ver datos básicos"
            color="primary"
            no-caps
            push
            @click.stop="viewFlowchartData(props.row)"
          />

          <q-btn
            class="q-px-md"
            label="Editar algoritmo"
            color="primary"
            no-caps
            push
            @click.stop="editFlowchart(props.row.id)"
          />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { inject, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import Algorithms, { IFlowchart } from 'src/services/algorithms';
import { FLOWCHARTS_EDITOR } from 'src/router/routes/algorithms';

const algorithms = inject('algorithms') as Algorithms;

const router = useRouter();

const columns = [
  {
    name: 'title',
    align: 'left',
    label: 'Título',
    field: 'title',
    style: 'width:25%',
  },
  {
    name: 'version',
    align: 'center',
    label: 'Versión',
    field: 'version',
    style: 'width:100px',
  },
  {
    name: 'author',
    align: 'left',
    label: 'Autor',
    field: 'author',
    style: 'width:25%',
  },
  {
    name: 'action',
    align: 'right',
    label: '',
    field: 'action',
  },
];

const editFlowchart = (flowchartId: number) => {
  router.push({
    name: FLOWCHARTS_EDITOR,
    query: {
      id: flowchartId,
    },
  });
};

const viewFlowchartData = (flowchart: IFlowchart) => algorithms.viewFlowchartData(flowchart);

onBeforeMount(() => {
  algorithms.getAll();
});
</script>
