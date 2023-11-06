<template>
  <div class="q-pt-md q-pl-lg">
    <div class="inline-block q-mr-xl">
      <b>Título:</b> {{ data.title }}
    </div>

    <div class="inline-block q-mr-xl">
      <b>Versão:</b> {{ data.version }}
    </div>

    <div class="inline-block">
      <b class="q-mr-sm">Categorias:</b>
      <q-chip
        v-for="category of data.categories"
        :key="category"
        :label="category"
        color="grey-3"
        style="padding-left:12px;padding-right:12px;"
        dense
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const data = reactive({
  title: 'Fluxograma #1',
  version: '1.1',
  categories: ['Doenças', 'Emergência', 'Teste'],
});
</script>
