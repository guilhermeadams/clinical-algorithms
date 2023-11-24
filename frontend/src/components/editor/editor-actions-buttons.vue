<template>
  <div
    id="editor-actions-buttons"
    class="q-pa-md shadow-light-up"
  >
    <div
      id="updated-at-info" class="text-center text-body1"
    >
      <div
        v-if="saved === null"
      />

      <div
        v-else-if="saved"
        class="text-grey-8"
      >
        Algoritmo guardado el {{ formatDatetime(lastUpdate) }}
      </div>

      <div
        v-else
        class="text-negative"
      >
        Algoritmo pendiente de guardar
      </div>
    </div>

    <q-btn
      label="Volver a la lista de algoritmos"
      icon="arrow_back"
      class="float-right q-ml-md"
      color="primary"
      flat
      no-caps
      @click="goFlowchartsPage"
    />

    <q-btn
      :loading="savingGraph"
      label="Guardar"
      class="float-right"
      style="width:120px"
      color="primary"
      push
      @click="saveGraph"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { useRouter } from 'vue-router';

import Editor from 'src/services/editor';
import { FLOWCHARTS_INDEX } from 'src/router/routes/algorithms';
import { formatDatetime } from 'src/services/date';

const router = useRouter();

const editor = inject('editor') as Editor;

const saved = computed(() => editor.graph.data.saved);
const savingGraph = computed(() => editor.graph.data.saving);
const lastUpdate = computed(() => editor.graph.lastUpdate);

const goFlowchartsPage = () => {
  if (editor.graph.isSaved) {
    router.push({ name: FLOWCHARTS_INDEX });
  } else {
    editor.toggleSaveDialog();
  }
};

const saveGraph = () => {
  editor.graph.save();
};
</script>

<style lang="sass">
#updated-at-info
  position: absolute
  bottom: 21px
  left: 0
  width: calc(100% - 400px)
  -webkit-touch-callout: none
  -webkit-user-select: none
  -html-user-select: none
  -moz-user-select: none
  -ms-user-select: none
  user-select: none
</style>
