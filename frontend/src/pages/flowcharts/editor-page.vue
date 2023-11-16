<template>
  <div
    :style="{ width }"
    id="editor"
    class="bg-grey-4 overflow-hidden"
  >
    <div id="editor-header">
      <editor-stage-header />
    </div>

    <div id="editor-content" class="bg-white overflow-auto">
      <!-- ELEMENTS -->
      <editor-elements-toolbar />

      <!-- STAGE -->
      <editor-stage />

      <!-- METADATA -->
      <editor-metadata-panel />

      <!-- ACTIONS -->
      <editor-actions-buttons />
    </div>

    <simple-modal
      :show="editor.data.showSaveDialog"
      confirm-label="Salvar"
      cancel-label="Sair"
      title="Existem alterações não salvas neste fluxograma"
      item-name="Deseja salvar antes de sair?"
      :negative="true"
      @cancel="goFlowchartsPage"
      @confirm="saveGraph"
    />
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  // onBeforeUnmount,
  onBeforeMount,
  provide,
  inject,
} from 'vue';

import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router';

import Settings from 'src/services/settings';
import EditorStage from 'components/editor/editor-stage.vue';
import Editor from 'src/services/editor';
import EditorStageHeader from 'components/editor/editor-stage-header.vue';
import EditorElementsToolbar from 'components/editor/editor-elements-toolbar.vue';
import EditorMetadataPanel from 'components/editor/editor-metadata-panel.vue';
import EditorActionsButtons from 'components/editor/editor-actions-buttons.vue';
import SimpleModal from 'components/modals/simple-modal.vue';
import { FLOWCHARTS_INDEX } from 'src/router/routes/flowcharts';

const editor = new Editor();
provide('editor', editor);

const settings = inject('settings') as Settings;

const route = useRoute();
const router = useRouter();

const width = computed(
  () => (settings.page.mainMenu ? 'calc(100% - 300px)' : '100%'),
);

const goFlowchartsPage = () => {
  router.push({ name: FLOWCHARTS_INDEX });
};

const saveGraph = async () => {
  await editor.graph.save();

  return router.push({ name: FLOWCHARTS_INDEX });
};

onBeforeMount(() => {
  settings.page.setTitle('Editor de fluxogramas');

  settings.page.mainMenu = false;

  const { id } = route.query;

  if (id && typeof id === 'string') {
    editor.graph.open(id);
  }
});

onBeforeRouteLeave(() => {
  settings.page.mainMenu = true;

  editor.reset();
});
</script>

<style lang="sass" scoped>
@import "src/css/editor"
</style>
