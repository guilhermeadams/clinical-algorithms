<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div
      v-if="editor.element.data.selectedId"
      id="editor-metadata-panel"
      class="shadow-light bg-white q-pa-md"
    >
      <div class="text-h6 q-mb-md">
        Nó: {{ data.name }}
      </div>

      <div>
        Campos de metadados..
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { inject, reactive, watch } from 'vue';
import Editor from 'src/services/editor';

const editor = inject('editor') as Editor;

const data = reactive({
  title: '',
  name: '',
});

const setInitialValue = () => {
  data.title = editor.element.getTitle();
  data.name = editor.element.getName();
};

watch(() => editor.element.data.selectedId, (value) => {
  if (value) {
    setInitialValue();
  }
});
</script>
