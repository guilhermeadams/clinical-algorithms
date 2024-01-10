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
      <editor-elements-toolbar v-if="!readOnly" />

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
  onBeforeMount,
  provide,
  inject,
} from 'vue';

import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router';

import Settings from 'src/services/settings';
import EditorStage from 'components/editor/editor-stage.vue';
import Editor from 'src/services/editor';
import Algorithms from 'src/services/algorithms';
import EditorStageHeader from 'components/editor/editor-stage-header.vue';
import EditorElementsToolbar from 'components/editor/editor-elements-toolbar.vue';
import EditorMetadataPanel from 'components/editor/editor-metadata-panel.vue';
import EditorActionsButtons from 'components/editor/editor-actions-buttons.vue';
import SimpleModal from 'components/modals/simple-modal.vue';

import {
  ALGORITHMS_INDEX,
  ALGORITHMS_SEARCH,
} from 'src/router/routes/algorithms';

const route = useRoute();
const router = useRouter();

const editor = new Editor({ route, router });
provide('editor', editor);

const algorithms = new Algorithms();

const settings = inject('settings') as Settings;

const width = computed(
  () => (settings.page.mainMenu ? 'calc(100% - 300px)' : '100%'),
);

const readOnly = computed(() => editor.data.readOnly);

const exitEditor = () => {
  if (route.query.search) {
    return router.push({
      name: ALGORITHMS_SEARCH,
      query: {
        keyword: route.query.search,
      },
    });
  }

  return router.push({ name: ALGORITHMS_INDEX });
};

const saveGraph = () => {
  editor.graph.save();

  exitEditor();
};

onBeforeMount(async () => {
  settings.page.mainMenu = false;

  const { id, mode } = route.query;

  if (
    id
    && typeof id === 'string'
    && typeof mode === 'string'
  ) {
    await editor.graph.open(id, mode);

    settings.page.setTitle(editor.data.readOnly ? 'Publicación de algoritmo' : 'Editar algoritmo');
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
