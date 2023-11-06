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
      <editor-elements-toolbar />
      <editor-stage />
      <editor-metadata-panel />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  onBeforeMount,
  provide,
  inject,
} from 'vue';

import { onBeforeRouteLeave } from 'vue-router';

import Settings from 'src/services/settings';
import EditorStage from 'components/editor/editor-stage.vue';
import Editor from 'src/services/editor';
import EditorStageHeader from 'components/editor/editor-stage-header.vue';
import EditorElementsToolbar from 'components/editor/editor-elements-toolbar.vue';
import EditorMetadataPanel from 'components/editor/editor-metadata-panel.vue';

provide('editor', new Editor());
const settings = inject('settings') as Settings;

const width = computed(
  () => (settings.page.mainMenu ? 'calc(100% - 300px)' : '100%'),
);

onBeforeMount(() => {
  settings.page.setTitle('Editor de fluxogramas');

  settings.page.mainMenu = false;
});

onBeforeRouteLeave(() => {
  settings.page.mainMenu = true;
});
</script>

<style lang="sass" scoped>
@import "src/css/editor"
</style>
