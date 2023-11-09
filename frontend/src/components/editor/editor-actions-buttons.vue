<template>
  <div
    id="editor-actions-buttons"
    class="q-pa-lg"
  >
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

const router = useRouter();

const editor = inject('editor') as Editor;

const saved = computed(() => editor.graph.data.saved);

const savingGraph = computed(() => editor.graph.data.saving);

const goFlowchartsPage = () => router.push({ name: FLOWCHARTS_INDEX });

const saveGraph = () => {
  editor.graph.save();
};
</script>
