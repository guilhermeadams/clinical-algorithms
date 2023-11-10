<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div
      v-if="editor.element.data.selectedId"
      id="editor-metadata-panel"
      class="bg-white shadow-light-up"
    >
      <div id="editor-metadata-panel-header">
        <div class="text-h6 q-px-md q-py-sm">
          Nó: {{ data.name }}
        </div>

        <div
          v-if="isActionElement"
          class="q-pt-sm q-pb-md q-px-md"
        >
          <div><b>Metadados - Blocos Fixos</b></div>

          <q-btn
            class="q-mt-sm full-width"
            label="Inserir bloco fixo"
            color="primary"
            no-caps
            push
            @click="addBlock"
          />
        </div>
      </div>

      <div id="editor-metadata-panel-content" class="q-pa-md">
        <div
          v-if="isActionElement"
        >
          <metadata-fixed-form
            v-for="index of totalForms"
            :key="`metadata-fixed-form-${index}`"
            :index="index"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import {
  computed,
  inject,
  reactive,
  ref,
  watch,
} from 'vue';

import Editor from 'src/services/editor';
import MetadataFixedForm from 'components/forms/editor/metadata-fixed-form.vue';

const editor = inject('editor') as Editor;

const totalForms = ref(0);

const isActionElement = computed(() => editor.element.isAction);

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

const addBlock = () => {
  totalForms.value += 1;
};
</script>

<style lang="sass">
#editor-metadata-panel-header
  position: absolute
  top: 0
  left: 0
  width: 100%
  border-bottom: 1px solid #DDD

#editor-metadata-panel-content
  position: absolute
  top: 138px
  left: 0
  width: 100%
  height: calc(100% - 136px)
  overflow-y: auto
  overflow-x: hidden
</style>
