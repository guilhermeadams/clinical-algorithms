<template>
  <div class="q-pl-lg" style="margin-top:20px">
    <div class="inline-block q-mr-xl">
      <b>Título:</b> {{ algorithm.title }}
    </div>

    <div class="inline-block q-mr-xl">
      <b>Versão:</b> {{ algorithm.version }}
    </div>

    <div class="inline-block">
      <b class="q-mr-sm">Categorias:</b>
<!--      <q-chip-->
<!--        v-for="category of algorithm.categories"-->
<!--        :key="category"-->
<!--        :label="category"-->
<!--        color="grey-3"-->
<!--        style="padding-left:12px;padding-right:12px;"-->
<!--        dense-->
<!--      />-->
      Nenhuma categoria definida.
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import Editor from 'src/services/editor';

const editor = inject('editor') as Editor;

const algorithm = computed(() => editor.graph.data.algorithm);
</script>
