<template>
  <div class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-3">
        <q-input
          v-model="data.title"
          label="Título do fluxograma"
          bg-color="white"
          outlined
          dense
        />
      </div>

      <div class="col-1">
        <q-input
          v-model="data.version"
          label="Versão"
          bg-color="white"
          outlined
          dense
        />
      </div>

      <div class="col-3">
        <q-select
          v-model="data.categories"
          :options="['Doenças', 'Prevenção', 'Emergências']"
          bg-color="white"
          label="Categorias"
          outlined
          dense
          multiple
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const data = reactive({
  title: '',
  version: '',
  categories: [],
});
</script>
