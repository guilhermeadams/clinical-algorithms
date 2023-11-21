<template>
  <div
    id="editor-elements-toolbar"
    class="shadow-light bg-white q-pa-md"
  >
    <div
      class="create-element-button cursor-pointer text-center q-mb-sm"
      draggable="true"
      @dragstart="setCreatingElement(CustomElement.START)"
    >
      <q-icon
        class="q-mr-sm inline-block"
        name="radio_button_unchecked"
        color="positive"
        size="34px"
      />
      <div class="inline-block q-mt-sm text-positive">
        <b>Início</b>
      </div>
    </div>

    <div
      class="create-element-button cursor-pointer text-center q-mb-md"
      style="border: 2px solid #09F"
      draggable="true"
      @dragstart="setCreatingElement(CustomElement.ACTION)"
    >
      <div style="margin-top:8px;color:#09F">
        <b>Ação</b>
      </div>
    </div>

    <div
      class="create-element-button cursor-pointer text-center action-element"
      draggable="true"
      @dragstart="setCreatingElement(CustomElement.EVALUATION)"
    >
      <img src="../../assets/imgs/elements/action_element.png" />
    </div>

    <div
      class="create-element-button cursor-pointer text-center q-mb-sm"
      draggable="true"
      @dragstart="setCreatingElement(CustomElement.END)"
    >
      <q-icon
        class="q-mr-sm inline-block"
        name="radio_button_unchecked"
        color="red"
        size="34px"
      />
      <div class="inline-block q-mt-sm text-red">
        <b>Término</b>
      </div>
    </div>

    <div
      class="create-element-button cursor-pointer text-center q-mb-sm"
      draggable="true"
      @dragstart="setCreatingElement(CustomElement.LANE)"
    >
      <q-icon
        class="q-mr-sm inline-block"
        name="power_input"
        color="black"
        size="34px"
      />
      <div class="inline-block q-mt-sm text-black">
        <b>Raia</b>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted } from 'vue';
import { CustomElement } from 'src/services/editor/elements/custom-elements';
import Editor from 'src/services/editor';

const editor = inject('editor') as Editor;

const setCreatingElement = (elementName: string) => {
  editor.element.data.elementToCreate = elementName;
};

onMounted(() => {
  const editorStage = document.getElementById('editor-stage');

  if (editorStage) {
    editorStage.addEventListener('dragover', (event) => {
      // prevent default to allow drop
      event.preventDefault();
    });

    editorStage.addEventListener('drop', (event) => {
      editor.element.createElement(event);
    });
  }
});
</script>

<style lang="sass">
.create-element-button
  padding: 10px 0
  border: 1px solid #FFF
  border-radius: 6px
  min-height: 60px

  .action-element
    background-size: cover
</style>
