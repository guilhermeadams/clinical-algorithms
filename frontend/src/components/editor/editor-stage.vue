<template>
  <div id="editor-stage-wrapper" class="overflow-auto">
    <div id="editor-stage"></div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted } from 'vue';

import Editor from 'src/services/editor';
import { useRoute } from 'vue-router';

const editor = inject('editor') as Editor;

const route = useRoute();

onMounted(async () => {
  await editor.init('editor-stage');

  if (route.query.node && editor.data.readOnly) {
    setTimeout(() => {
      editor.element.select(String(route.query.node));
    }, 100);
  }
});
</script>

<style lang="sass">
#editor-stage-wrapper
  position: absolute
  width: 100%
  height: 100%
</style>
