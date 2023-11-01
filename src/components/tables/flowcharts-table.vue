<template>
  <q-table
    :rows="flowcharts.flowchartsList"
    :columns="columns"
    :loading="flowcharts.data.loading"
    title="Fluxogramas"
    row-key="name"
    flat
    hide-bottom
  >
    <template v-slot:loading>
      <q-inner-loading showing color="primary" />
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
          {{ props.row.author }}
        </q-td>

        <q-td key="action" :props="props">
          <q-btn
            class="q-px-md q-mr-md"
            label="Ver dados básicos"
            color="primary"
            no-caps
            push
            @click.stop="editFlowchartData(props.row)"
          />

          <q-btn
            class="q-px-md"
            label="Editar fluxograma"
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
import { inject } from 'vue';
import Flowcharts, { IFlowchart } from 'src/services/flowcharts';
import { useRouter } from 'vue-router';
import { EDITOR } from 'src/router/routes/editor';

const flowcharts = inject('flowcharts') as Flowcharts;

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
    label: 'Versão',
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
    name: EDITOR,
    query: {
      id: flowchartId,
    },
  });
};

const editFlowchartData = (flowchart: IFlowchart) => flowcharts.editFlowchartData(flowchart);
</script>
