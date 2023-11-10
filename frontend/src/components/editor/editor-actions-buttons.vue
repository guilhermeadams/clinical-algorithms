<template>
  <div
    id="editor-actions-buttons"
    class="q-pa-md shadow-light-up"
  >
    <div id="updated-at-info" class="text-center text-body1 text-grey-8">
      Fluxograma e metadados salvos em {{ formatDatetime(graphData.updated_at) }}
    </div>

    <q-btn
      label="Voltar para a lista de fluxogramas"
      class="float-right q-ml-md"
      color="primary"
      flat
      no-caps
      @click="goFlowchartsPage"
    />

    <q-btn
      v-if="saved"
      disable
      label="Salvo"
      icon="check"
      class="float-right"
      style="width:120px"
      color="primary"
      push
    />

    <q-btn
      v-else
      :loading="savingGraph"
      label="Salvar"
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
import { FLOWCHARTS_INDEX } from 'src/router/routes/flowcharts';
import { formatDatetime } from 'src/services/date';

const router = useRouter();

const editor = inject('editor') as Editor;

const graphData = computed(() => editor.graph.data.graph);
const saved = computed(() => editor.graph.data.saved);
const savingGraph = computed(() => editor.graph.data.saving);

const goFlowchartsPage = () => router.push({ name: FLOWCHARTS_INDEX });

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
