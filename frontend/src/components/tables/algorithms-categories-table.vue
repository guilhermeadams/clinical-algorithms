<template>
  <q-table
    :rows="categories.data.categories"
    :columns="columns"
    :loading="categories.data.loading"
    title="Categorías"
    :rows-per-page-options="[0]"
    row-key="name"
    flat
    :hide-bottom="categories.data.categories.length !== 0"
  >
    <template v-slot:loading>
      <q-inner-loading
        color="primary"
        showing
      />
    </template>

    <template v-slot:no-data>
      <b>No se encontraron categorías.</b>
    </template>

    <template v-slot:body="props">
      <q-tr :props="props">
        <q-td :props="props" key="name">
          <div
            class="q-py-sm"
          >
            {{ props.row.name }}
          </div>
        </q-td>

        <q-td
          key="action"
          :props="props"
        >
          <q-btn
            class="q-px-md"
            label="Ver categoría"
            color="primary"
            no-caps
            push
          />

          <q-btn
            class="q-px-md q-ml-md"
            label="Borrar"
            color="negative"
            no-caps
            push
          />
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { onMounted, provide } from 'vue';

import AlgorithmsCategories from 'src/services/algorithms-categories';

const categories = new AlgorithmsCategories();
provide(categories, 'categories');

const columns = [
  {
    name: 'name',
    align: 'left',
    label: 'Nombre de la categoría',
    field: 'name',
    style: 'width:80%',
  },
  {
    name: 'action',
    align: 'right',
    label: '',
    field: 'action',
  },
];

onMounted(() => {
  categories.get();
});
</script>
