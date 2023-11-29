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
      confirm-label="Guardar"
      cancel-label="Salir"
      title="Hay cambios no guardados en este algoritmo."
      item-name="¿Quieres guardar antes de salir?"
      :negative="true"
      @cancel="exitEditor"
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
import { FLOWCHARTS_INDEX, FLOWCHARTS_SEARCH } from 'src/router/routes/algorithms';

const editor = new Editor();
provide('editor', editor);

const settings = inject('settings') as Settings;

const route = useRoute();
const router = useRouter();

const width = computed(
  () => (settings.page.mainMenu ? 'calc(100% - 300px)' : '100%'),
);

const exitEditor = () => {
  if (route.query.search) {
    return router.push({
      name: FLOWCHARTS_SEARCH,
      query: {
        keyword: route.query.search,
      },
    });
  }

  return router.push({ name: FLOWCHARTS_INDEX });
};

const saveGraph = () => {
  editor.graph.save();

  exitEditor();
};

onBeforeMount(() => {
  settings.page.setTitle('Editor de algoritmos');

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
